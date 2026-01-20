import { useEffect, useMemo, useRef, useState } from "react";

import PrimaryNav from "../navigation/PrimaryNav";
import SecondaryNav from "../navigation/SecondaryNav";
import { primaryTabs, secondaryTabsByPrimary } from "../navigation/navConfig";
import OnlineView from "../pages/OnlineView";
import ReportingView from "../pages/ReportingView";
import ExpensesView from "../pages/ExpensesView";
import SalesView from "../pages/SalesView";

const timeOptions = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
  "Week",
  "Month",
  "Year",
];

const financialsTimeOptions = ["Week", "Month", "Quarter", "Year"];
const budgetsTimeOptions = ["Week", "Month", "Quarter", "Year"];

const salesOverviewMetrics: Record<string, { gross: string; net: string }> = {
  Mon: { gross: "$128,400", net: "$121,050" },
  Tue: { gross: "$134,900", net: "$126,340" },
  Wed: { gross: "$142,250", net: "$133,880" },
  Thu: { gross: "$136,780", net: "$129,410" },
  Fri: { gross: "$158,900", net: "$149,520" },
  Sat: { gross: "$92,600", net: "$88,140" },
  Sun: { gross: "$84,200", net: "$80,780" },
  Week: { gross: "$877,030", net: "$829,120" },
  Month: { gross: "$3,421,900", net: "$3,228,400" },
  Year: { gross: "$41,882,000", net: "$39,304,500" },
};

const expensesOverviewTotals: Record<string, string> = {
  Mon: "$42,380",
  Tue: "$44,910",
  Wed: "$46,220",
  Thu: "$45,670",
  Fri: "$49,830",
  Sat: "$31,540",
  Sun: "$28,960",
  Week: "$289,510",
  Month: "$1,184,200",
  Year: "$14,402,800",
};



const AppShell = () => {
  const primaryNavItems = useMemo(() => {
    const settingsTab = primaryTabs.find((tab) => tab.id === "settings");
    const baseTabs = primaryTabs.filter((tab) => tab.id !== "settings");
    return [
      ...baseTabs,
      { id: "reporting", label: "Reporting" },
      settingsTab ?? { id: "settings", label: "Settings" },
    ];
  }, []);

  const [activePrimaryId, setActivePrimaryId] = useState(primaryNavItems[0].id);
  const [activeSecondaryId, setActiveSecondaryId] = useState<string | null>(
    secondaryTabsByPrimary[primaryNavItems[0].id]?.[0]?.id ?? null,
  );
  const [activeTime, setActiveTime] = useState(timeOptions[7]);
  const [financialsTime, setFinancialsTime] = useState(
    financialsTimeOptions[1],
  );
  const prevPrimaryId = useRef(activePrimaryId);
  const [cashflowView, setCashflowView] = useState<"Month" | "Week">("Month");
  const [cashflowDetail, setCashflowDetail] = useState<{
    label: string;
    sales: number;
    expenses: number;
  } | null>(null);
  const [proFormaSalesAdjustment, setProFormaSalesAdjustment] = useState(0);
  const [proFormaCogsPercent, setProFormaCogsPercent] = useState(34);
  const [proFormaLaborPercent, setProFormaLaborPercent] = useState(30);
  const [proFormaOperatingPercent, setProFormaOperatingPercent] = useState(26);
  const [notificationPreferences, setNotificationPreferences] = useState([
    {
      id: "sales-low",
      label: "Sales unusually low for the day",
      enabled: true,
      sensitivity: "Medium",
    },
    {
      id: "expenses-spike",
      label: "Expenses spike vs typical",
      enabled: true,
      sensitivity: "High",
    },
    {
      id: "negative-review",
      label: "New negative review",
      enabled: true,
      sensitivity: "Low",
    },
    {
      id: "no-social-posts",
      label: "No social posts in X days",
      enabled: false,
      sensitivity: "Medium",
    },
    {
      id: "negative-cashflow",
      label: "Negative cashflow day",
      enabled: false,
      sensitivity: "Medium",
    },
  ]);

  const activePrimary = useMemo(() => {
    return primaryNavItems.find((tab) => tab.id === activePrimaryId) ?? primaryNavItems[0];
  }, [activePrimaryId, primaryNavItems]);

  const secondaryTabs = useMemo(() => {
    return secondaryTabsByPrimary[activePrimaryId] ?? [];
  }, [activePrimaryId]);

  useEffect(() => {
    // Secondary tab is intentionally reset on primary change to prevent cross-primary leakage.
    const validSecondaryIds = secondaryTabs.map((tab) => tab.id);
    if (secondaryTabs.length === 0) {
      setActiveSecondaryId(null);
      return;
    }
    if (!activeSecondaryId || !validSecondaryIds.includes(activeSecondaryId)) {
      setActiveSecondaryId(secondaryTabs[0].id);
    }
  }, [activePrimaryId, secondaryTabs, activeSecondaryId]);

  useEffect(() => {
    if (prevPrimaryId.current === "expenses" && activePrimaryId !== "expenses") {
      setActiveSecondaryId(secondaryTabs[0]?.id ?? null);
    }
    prevPrimaryId.current = activePrimaryId;
  }, [activePrimaryId, secondaryTabs]);

  useEffect(() => {
    setActiveTime(timeOptions[7]);
  }, [activePrimaryId, activeSecondaryId]);

  const hasValidSecondary =
    !!activeSecondaryId &&
    secondaryTabs.some((tab) => tab.id === activeSecondaryId);
  const isFinancialsCashflow =
    hasValidSecondary &&
    activePrimaryId === "financials" &&
    activeSecondaryId === "cashflow";
  const isFinancialsProForma =
    hasValidSecondary &&
    activePrimaryId === "financials" &&
    activeSecondaryId === "pro-forma";
  const isFinancialsProfitLoss =
    hasValidSecondary &&
    activePrimaryId === "financials" &&
    activeSecondaryId === "profit-loss";
  const isFinancialsKpis =
    hasValidSecondary &&
    activePrimaryId === "financials" &&
    activeSecondaryId === "kpis";
  const isPresence = activePrimaryId === "presence";
  const isReporting = activePrimaryId === "reporting";
  const isSettingsBusiness =
    hasValidSecondary &&
    activePrimaryId === "settings" &&
    activeSecondaryId === "business";
  const isSettingsOperations =
    hasValidSecondary &&
    activePrimaryId === "settings" &&
    activeSecondaryId === "operations";
  const isSettingsFinancialAssumptions =
    hasValidSecondary &&
    activePrimaryId === "settings" &&
    activeSecondaryId === "financial-assumptions";
  const isSettingsAlerts =
    hasValidSecondary &&
    activePrimaryId === "settings" &&
    activeSecondaryId === "alerts";
  const isSettingsDisplay =
    hasValidSecondary &&
    activePrimaryId === "settings" &&
    activeSecondaryId === "display";

  const handleCashflowDetailOpen = (entry: {
    label: string;
    sales: number;
    expenses: number;
  }) => {
    setCashflowDetail(entry);
  };

  const handleCashflowDetailClose = () => {
    setCashflowDetail(null);
  };

  const handleNotificationToggle = (id: string) => {
    setNotificationPreferences((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, enabled: !notification.enabled }
          : notification,
      ),
    );
  };

  const handleNotificationChange = (id: string, value: string) => {
    setNotificationPreferences((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, sensitivity: value } : notification,
      ),
    );
  };

  const isTimeBasedView =
    (hasValidSecondary &&
      activePrimaryId === "sales" &&
      ["breakdown", "forecast", "product"].includes(activeSecondaryId)) ||
    (hasValidSecondary &&
      activePrimaryId === "expenses" &&
      ["breakdown", "budgets"].includes(activeSecondaryId));

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-header__kicker">GCDC</p>
          <h1 className="app-header__title">InnoVue Desktop</h1>
        </div>
        <div className="app-header__meta">
          <span className="app-header__meta-item">
            <span className="app-header__meta-label">Last updated</span>
            <span className="app-header__meta-value">Just now</span>
          </span>
          <span className="app-header__meta-item">
            <span className="app-header__meta-label">Current time</span>
            <span className="app-header__meta-value">09:41 AM</span>
          </span>
          <span className="app-header__meta-item">
            <span className="app-header__meta-label">Weather</span>
            <span className="app-header__meta-value">Sunny · 72°</span>
          </span>
        </div>
      </header>

      <div className="app-body">
        <PrimaryNav
          items={primaryNavItems}
          activeId={activePrimaryId}
          onChange={setActivePrimaryId}
        />

        <main className="app-content">
          <div className="app-content-inner">
            <section className="truth-card truth-card--lead">
              <div className="truth-card__header">
                <h2 className="truth-card__title">{activePrimary.label}</h2>
                {/* Secondary tabs are intentionally rendered from a single source to prevent cross-primary leakage. */}
                {/* SecondaryNav is intentionally rendered once at the top of the content area. */}
                {secondaryTabs.length > 0 ? (
                  <SecondaryNav
                    key={activePrimaryId}
                    tabs={secondaryTabs}
                    activeId={activeSecondaryId ?? ""}
                    onChange={setActiveSecondaryId}
                  />
                ) : null}
              </div>
            </section>

            {(() => {
              if (activePrimaryId === "sales" && activeSecondaryId === "trends") {
                return (
                  <SalesView
                    activeSecondaryId={activeSecondaryId ?? ""}
                    activeTime={activeTime}
                  />
                );
              }

              if (
                activePrimaryId === "expenses" &&
                ["vendors", "invoices"].includes(activeSecondaryId ?? "")
              ) {
                return (
                  <ExpensesView
                    activeSecondaryId={activeSecondaryId ?? ""}
                    activeTime={activeTime}
                  />
                );
              }

              return isFinancialsProForma ? (
                <>
                  <section className="truth-section">
                  {(() => {
                    const formatCurrency = (value: number) =>
                      `$${Math.round(value).toLocaleString()}`;
                    const formatMargin = (value: number) =>
                      `${Math.round(value * 100)}%`;
                    const baseSales = 52000;
                    const adjustedSales =
                      baseSales * (1 + proFormaSalesAdjustment / 100);
                    const totalCostPercent =
                      proFormaCogsPercent +
                      proFormaLaborPercent +
                      proFormaOperatingPercent;
                    const buildScenario = (
                      id: string,
                      label: string,
                      multiplier: number,
                      tone: string,
                      bar: string,
                    ) => {
                      const sales = adjustedSales * multiplier;
                      const costs = sales * (totalCostPercent / 100);
                      const profit = sales - costs;
                      return {
                        id,
                        label,
                        monthly: formatCurrency(profit),
                        yearly: formatCurrency(profit * 12),
                        margin: formatMargin(sales ? profit / sales : 0),
                        tone,
                        bar,
                      };
                    };
                    const scenarios = [
                      buildScenario(
                        "high",
                        "High",
                        1.15,
                        "proforma-row--positive",
                        "proforma-bar--high",
                      ),
                      buildScenario(
                        "medium",
                        "Medium",
                        1,
                        "proforma-row--neutral",
                        "proforma-bar--medium",
                      ),
                      buildScenario(
                        "low",
                        "Low",
                        0.85,
                        "proforma-row--negative",
                        "proforma-bar--low",
                      ),
                    ];

                    return (
                      <div className="truth-section__content">
                        <div className="proforma-header">
                          <p className="proforma-subtitle">
                            Scenario-based profitability snapshot
                          </p>
                        </div>
                        <div className="proforma-table" role="table">
                          <div className="proforma-row proforma-row--header" role="row">
                            <span className="proforma-cell" role="columnheader">
                              Scenario
                            </span>
                            <span className="proforma-cell" role="columnheader">
                              Monthly Profit
                            </span>
                            <span className="proforma-cell" role="columnheader">
                              Yearly Profit
                            </span>
                            <span className="proforma-cell" role="columnheader">
                              Profit Margin
                            </span>
                          </div>
                          {scenarios.map((scenario) => (
                            <div
                              key={scenario.id}
                              className={`proforma-row ${scenario.tone}`}
                              role="row"
                            >
                              <span
                                className="proforma-cell proforma-cell--label"
                                role="cell"
                              >
                                {scenario.label}
                              </span>
                              <span className="proforma-cell" role="cell">
                                {scenario.monthly}
                              </span>
                              <span className="proforma-cell" role="cell">
                                {scenario.yearly}
                              </span>
                              <span className="proforma-cell" role="cell">
                                {scenario.margin}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="proforma-bars" role="presentation">
                          {scenarios.map((scenario) => (
                            <div key={scenario.id} className="proforma-bar-row">
                              <span className="proforma-bar-label">{scenario.label}</span>
                              <span className={`proforma-bar ${scenario.bar}`} />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </section>
                <section className="truth-section">
                  <div className="truth-section__content">
                    <div className="proforma-controls">
                      <div className="proforma-controls__header">
                        <p className="proforma-controls__title">Pro Forma Controls</p>
                        <p className="proforma-controls__subtitle">
                          Adjust assumptions to preview profitability.
                        </p>
                      </div>
                      <div className="proforma-controls__rows">
                        <label className="proforma-controls__row">
                          <span className="proforma-controls__label">
                            Sales (adjustment)
                          </span>
                          <input
                            className="proforma-controls__slider"
                            type="range"
                            min="-15"
                            max="15"
                            step="1"
                            value={proFormaSalesAdjustment}
                            onChange={(event) =>
                              setProFormaSalesAdjustment(Number(event.target.value))
                            }
                          />
                          <span className="proforma-controls__value">
                            {proFormaSalesAdjustment}%
                          </span>
                        </label>
                        <label className="proforma-controls__row">
                          <span className="proforma-controls__label">COGS %</span>
                          <input
                            className="proforma-controls__slider"
                            type="range"
                            min="20"
                            max="45"
                            step="1"
                            value={proFormaCogsPercent}
                            onChange={(event) =>
                              setProFormaCogsPercent(Number(event.target.value))
                            }
                          />
                          <span className="proforma-controls__value">
                            {proFormaCogsPercent}%
                          </span>
                        </label>
                        <label className="proforma-controls__row">
                          <span className="proforma-controls__label">Labor %</span>
                          <input
                            className="proforma-controls__slider"
                            type="range"
                            min="20"
                            max="45"
                            step="1"
                            value={proFormaLaborPercent}
                            onChange={(event) =>
                              setProFormaLaborPercent(Number(event.target.value))
                            }
                          />
                          <span className="proforma-controls__value">
                            {proFormaLaborPercent}%
                          </span>
                        </label>
                        <label className="proforma-controls__row">
                          <span className="proforma-controls__label">
                            Operating Expenses %
                          </span>
                          <input
                            className="proforma-controls__slider"
                            type="range"
                            min="10"
                            max="35"
                            step="1"
                            value={proFormaOperatingPercent}
                            onChange={(event) =>
                              setProFormaOperatingPercent(Number(event.target.value))
                            }
                          />
                          <span className="proforma-controls__value">
                            {proFormaOperatingPercent}%
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            ) : isFinancialsKpis ? (
              <section className="truth-section">
                <div className="truth-section__content">
                  <div className="kpi-grid" role="list">
                    {[
                      { label: "Prime Cost", value: "--%" },
                      { label: "Sales per Labor Hour", value: "$--" },
                      { label: "Worked vs Scheduled Hours", value: "--%" },
                      { label: "Sales per Sq Ft", value: "$--" },
                      { label: "Net Profit %", value: "--%" },
                      { label: "Rent as % of Sales", value: "--%" },
                      { label: "Average Weekly Sales", value: "$--" },
                      { label: "Average Employee Hourly Wage", value: "$-- / hr" },
                    ].map((item) => (
                      <div key={item.label} className="kpi-tile" role="listitem">
                        <p className="kpi-tile__value">{item.value}</p>
                        <p className="kpi-tile__label">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ) : (
              <section className="truth-section">
                {isTimeBasedView ? (
                  <div className="truth-section__content">
                    <div
                      className="time-selector"
                      role="tablist"
                      aria-label="Time range"
                    >
                      {((activePrimaryId === "expenses" &&
                        activeSecondaryId === "budgets")
                        ? budgetsTimeOptions
                        : timeOptions
                      ).map(
                        (option) => (
                        <button
                          key={option}
                          type="button"
                          className={`time-pill${
                            activeTime === option ? " time-pill--active" : ""
                          }`}
                          onClick={() => setActiveTime(option)}
                        >
                          {option}
                        </button>
                        ),
                      )}
                    </div>

                {activePrimaryId === "sales" ? (
                  <SalesView
                    activeSecondaryId={activeSecondaryId ?? ""}
                    activeTime={activeTime}
                  />
                ) : null}

                {activePrimaryId === "expenses" ? (
                  <ExpensesView
                    activeSecondaryId={activeSecondaryId ?? ""}
                    activeTime={activeTime}
                  />
                ) : null}
              </div>
            ) : isFinancialsCashflow ? (
              (() => {
                const cashflowMonth = "September 2024";
                const cashflowDays = [
                  { day: 26, current: false, sales: 14200, expenses: 15680 },
                  { day: 27, current: false, sales: 16800, expenses: 15100 },
                  { day: 28, current: false, sales: 19200, expenses: 18350 },
                  { day: 29, current: false, sales: 15800, expenses: 17020 },
                  { day: 30, current: false, sales: 17600, expenses: 16240 },
                  { day: 31, current: false, sales: 18450, expenses: 17480 },
                  { day: 1, current: true, sales: 18200, expenses: 15600 },
                  { day: 2, current: true, sales: 16600, expenses: 14200 },
                  { day: 3, current: true, sales: 19200, expenses: 17100 },
                  { day: 4, current: true, sales: 17800, expenses: 16550 },
                  { day: 5, current: true, sales: 20400, expenses: 18800 },
                  { day: 6, current: true, sales: 21400, expenses: 19350 },
                  { day: 7, current: true, sales: 15600, expenses: 14900 },
                  { day: 8, current: true, sales: 16400, expenses: 17100 },
                  { day: 9, current: true, sales: 18900, expenses: 16250 },
                  { day: 10, current: true, sales: 20300, expenses: 18880 },
                  { day: 11, current: true, sales: 17600, expenses: 15400 },
                  { day: 12, current: true, sales: 19300, expenses: 16850 },
                  { day: 13, current: true, sales: 22100, expenses: 20100 },
                  { day: 14, current: true, sales: 14800, expenses: 14050 },
                  { day: 15, current: true, sales: 18200, expenses: 17650 },
                  { day: 16, current: true, sales: 19600, expenses: 18200 },
                  { day: 17, current: true, sales: 20500, expenses: 19100 },
                  { day: 18, current: true, sales: 18700, expenses: 17000 },
                  { day: 19, current: true, sales: 21000, expenses: 18950 },
                  { day: 20, current: true, sales: 23000, expenses: 21100 },
                  { day: 21, current: true, sales: 15200, expenses: 14800 },
                  { day: 22, current: true, sales: 16800, expenses: 15900 },
                  { day: 23, current: true, sales: 18900, expenses: 19600 },
                  { day: 24, current: true, sales: 20100, expenses: 18400 },
                  { day: 25, current: true, sales: 19400, expenses: 17350 },
                  { day: 26, current: true, sales: 20900, expenses: 20150 },
                  { day: 27, current: true, sales: 22200, expenses: 20600 },
                  { day: 28, current: true, sales: 16400, expenses: 15500 },
                  { day: 29, current: true, sales: 17500, expenses: 16800 },
                  { day: 30, current: true, sales: 18700, expenses: 19450 },
                  { day: 1, current: false, sales: 19800, expenses: 18200 },
                  { day: 2, current: false, sales: 17200, expenses: 16350 },
                  { day: 3, current: false, sales: 18900, expenses: 17700 },
                  { day: 4, current: false, sales: 20100, expenses: 19050 },
                  { day: 5, current: false, sales: 18200, expenses: 16800 },
                ];
                const cashflowWeek = [
                  { label: "Mon · 08", sales: 16400, expenses: 17100 },
                  { label: "Tue · 09", sales: 18900, expenses: 16250 },
                  { label: "Wed · 10", sales: 20300, expenses: 18880 },
                  { label: "Thu · 11", sales: 17600, expenses: 15400 },
                  { label: "Fri · 12", sales: 19300, expenses: 16850 },
                  { label: "Sat · 13", sales: 22100, expenses: 20100 },
                  { label: "Sun · 14", sales: 14800, expenses: 14050 },
                ];

                const formatCompact = (value: number) =>
                  `$${(value / 1000).toFixed(1)}k`;
                const formatCurrency = (value: number) =>
                  `$${Math.round(value).toLocaleString()}`;

                const getShadeClass = (net: number) => {
                  if (net <= -2000) return "cashflow-day--neg-strong";
                  if (net <= -500) return "cashflow-day--neg";
                  if (net < 500) return "cashflow-day--neutral";
                  if (net < 2000) return "cashflow-day--pos";
                  return "cashflow-day--pos-strong";
                };

                return (
                  <div className="truth-section__content">
                    <div className="cashflow-header">
                      <span className="metric__label">Cashflow view</span>
                      <h4 className="cashflow-title">{cashflowMonth}</h4>
                      <div
                        className="time-selector"
                        role="tablist"
                        aria-label="Cashflow view"
                      >
                        {["Month", "Week"].map((option) => (
                          <button
                            key={option}
                            type="button"
                            className={`time-pill${
                              cashflowView === option ? " time-pill--active" : ""
                            }`}
                            onClick={() =>
                              setCashflowView(option as "Month" | "Week")
                            }
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="cashflow-calendar" role="grid">
                      {(cashflowView === "Month"
                        ? cashflowDays
                        : cashflowWeek
                      ).map((entry, index) => {
                        const net = entry.sales - entry.expenses;
                        const netLabel = `${net >= 0 ? "+" : "-"} ${formatCompact(
                          Math.abs(net),
                        )}`;
                        const isMuted =
                          cashflowView === "Month" &&
                          "current" in entry &&
                          !entry.current;
                        const dayLabel =
                          cashflowView === "Month"
                            ? (() => {
                                const weekdays = [
                                  "Mon",
                                  "Tue",
                                  "Wed",
                                  "Thu",
                                  "Fri",
                                  "Sat",
                                  "Sun",
                                ];
                                const weekday = weekdays[index % weekdays.length];
                                return `${weekday}, Sep ${entry.day}`;
                              })()
                            : ` ${"label" in entry ? entry.label.replace(" · ", ", Sep ") : ""}`;
                        return (
                          <div
                            key={`${"day" in entry ? entry.day : entry.label}-${index}`}
                            className={`cashflow-day ${getShadeClass(net)}${
                              isMuted ? " cashflow-day--muted" : ""
                            }`}
                            role="gridcell"
                            tabIndex={0}
                            onClick={() =>
                              handleCashflowDetailOpen({
                                label: dayLabel.trim(),
                                sales: entry.sales,
                                expenses: entry.expenses,
                              })
                            }
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                handleCashflowDetailOpen({
                                  label: dayLabel.trim(),
                                  sales: entry.sales,
                                  expenses: entry.expenses,
                                });
                              }
                            }}
                          >
                            <span className="cashflow-day__date">
                              {"day" in entry ? entry.day : entry.label}
                            </span>
                            <span className="cashflow-day__net">{netLabel}</span>
                            <span className="cashflow-day__detail">
                              Sales: {formatCompact(entry.sales)}
                            </span>
                            <span className="cashflow-day__detail">
                              Exp: {formatCompact(entry.expenses)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    {cashflowDetail ? (
                      <div
                        className="modal-overlay"
                        role="presentation"
                        onClick={handleCashflowDetailClose}
                      >
                        <div
                          className="modal-sheet"
                          role="dialog"
                          aria-modal="true"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <div className="modal-header">
                            <div>
                              <p className="modal-title">{cashflowDetail.label}</p>
                              <p className="modal-subtitle">Cashflow detail</p>
                            </div>
                            <div className="modal-header__meta">
                              <span className="modal-net">
                                {formatCurrency(
                                  cashflowDetail.sales - cashflowDetail.expenses,
                                )}
                              </span>
                              <button
                                type="button"
                                className="modal-close"
                                onClick={handleCashflowDetailClose}
                              >
                                ×
                              </button>
                            </div>
                          </div>
                          {(() => {
                            const salesItems = [
                              { label: "Credit card sales", share: 0.55 },
                              { label: "Cash sales", share: 0.18 },
                              { label: "3rd-party delivery sales", share: 0.17 },
                              { label: "Sales tax collected", share: 0.06 },
                              { label: "Tips collected", share: 0.04 },
                            ];
                            const expenseItems = [
                              { label: "Northern Provisions", share: 0.4 },
                              { label: "Harbor Supply Co.", share: 0.25 },
                              { label: "Capital Farms", share: 0.2 },
                              { label: "District Utilities", share: 0.15 },
                            ];
                            const totalSales = cashflowDetail.sales;
                            const totalExpenses = cashflowDetail.expenses;
                            const netTotal = totalSales - totalExpenses;

                            return (
                              <div className="modal-body">
                                <div className="modal-section">
                                  <p className="metric__label">Sales In</p>
                                  <div className="modal-list">
                                    {salesItems.map((item) => (
                                      <div key={item.label} className="modal-row">
                                        <span className="modal-row__label">
                                          {item.label}
                                        </span>
                                        <span className="modal-row__value">
                                          {formatCurrency(totalSales * item.share)}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className="modal-section">
                                  <p className="metric__label">Expenses Out</p>
                                  <div className="modal-list">
                                    {expenseItems.map((item) => (
                                      <div key={item.label} className="modal-row">
                                        <span className="modal-row__label">
                                          {item.label}
                                        </span>
                                        <span className="modal-row__value">
                                          {formatCurrency(totalExpenses * item.share)}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className="modal-summary">
                                  <div className="modal-row">
                                    <span className="modal-row__label">Total Sales In</span>
                                    <span className="modal-row__value">
                                      {formatCurrency(totalSales)}
                                    </span>
                                  </div>
                                  <div className="modal-row">
                                    <span className="modal-row__label">
                                      Total Expenses Out
                                    </span>
                                    <span className="modal-row__value">
                                      {formatCurrency(totalExpenses)}
                                    </span>
                                  </div>
                                  <div className="modal-row modal-row--strong">
                                    <span className="modal-row__label">Net Profit</span>
                                    <span className="modal-row__value">
                                      {formatCurrency(netTotal)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })()
            ) : isFinancialsProfitLoss ? (
              (() => {
                const parseCurrency = (value: string) => {
                  const numeric = Number(value.replace(/[^0-9.-]+/g, ""));
                  return Number.isNaN(numeric) ? 0 : numeric;
                };

                const formatCurrency = (value: number) =>
                  `$${Math.round(value).toLocaleString()}`;

                const getSalesValue = (period: string) => {
                  if (period === "Quarter") {
                    const monthSales = parseCurrency(
                      salesOverviewMetrics.Month.gross,
                    );
                    return monthSales * 3;
                  }
                  return parseCurrency(
                    salesOverviewMetrics[period]?.gross ??
                      salesOverviewMetrics.Month.gross,
                  );
                };

                const getExpenseValue = (period: string) => {
                  if (period === "Quarter") {
                    const monthExpenses = parseCurrency(expensesOverviewTotals.Month);
                    return monthExpenses * 3;
                  }
                  return parseCurrency(
                    expensesOverviewTotals[period] ?? expensesOverviewTotals.Month,
                  );
                };

                const salesValue = getSalesValue(financialsTime);
                const expensesValue = getExpenseValue(financialsTime);
                const profitValue = salesValue - expensesValue;
                const expensePercent =
                  salesValue > 0
                    ? Math.round((expensesValue / salesValue) * 100)
                    : 0;
                const profitPercent =
                  salesValue > 0
                    ? Math.round((profitValue / salesValue) * 100)
                    : 0;

                return (
                  <div className="truth-section__content">
                    <div
                      className="time-selector"
                      role="tablist"
                      aria-label="Time range"
                    >
                      {financialsTimeOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`time-pill${
                            financialsTime === option ? " time-pill--active" : ""
                          }`}
                          onClick={() => setFinancialsTime(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    <div className="breakdown-table" role="table">
                      <div className="breakdown-row breakdown-row--header" role="row">
                        <span className="breakdown-row__label" role="columnheader">
                          Line item
                        </span>
                        <span className="breakdown-row__value" role="columnheader">
                          Amount
                        </span>
                        <span className="breakdown-row__percent" role="columnheader">
                          % of Sales
                        </span>
                      </div>
                      <div className="breakdown-row" role="row">
                        <span className="breakdown-row__label" role="cell">
                          Sales
                        </span>
                        <span className="breakdown-row__value" role="cell">
                          {formatCurrency(salesValue)}
                        </span>
                        <span className="breakdown-row__percent" role="cell">
                          100%
                        </span>
                      </div>
                      <div className="breakdown-row" role="row">
                        <span className="breakdown-row__label" role="cell">
                          Expenses
                        </span>
                        <span className="breakdown-row__value" role="cell">
                          {formatCurrency(expensesValue)}
                        </span>
                        <span className="breakdown-row__percent" role="cell">
                          {expensePercent}%
                        </span>
                      </div>
                      <div className="breakdown-row" role="row">
                        <span className="breakdown-row__label" role="cell">
                          Profit
                        </span>
                        <span className="breakdown-row__value" role="cell">
                          {formatCurrency(profitValue)}
                        </span>
                        <span className="breakdown-row__percent" role="cell">
                          {profitPercent}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()
            ) : isPresence ? (
              <OnlineView activeSecondaryId={activeSecondaryId} />
            ) : isReporting ? (
              <ReportingView
                activeSecondaryId={activeSecondaryId}
                notificationPreferences={notificationPreferences}
                handleNotificationToggle={handleNotificationToggle}
                handleNotificationChange={handleNotificationChange}
              />
            ) : isSettingsBusiness ? (
              <div className="truth-section__content">
                <div className="settings-section">
                  <div className="settings-section__header">
                    <p className="settings-section__subtitle">
                      Core business details used across reporting and profiles.
                    </p>
                  </div>
                  <div className="settings-card">
                    <div className="settings-form">
                      <label className="settings-field">
                        <span className="settings-field__label">Business name</span>
                        <input
                          className="settings-input"
                          type="text"
                          placeholder="Business name"
                        />
                      </label>
                      <label className="settings-field">
                        <span className="settings-field__label">Address</span>
                        <input
                          className="settings-input"
                          type="text"
                          placeholder="Street address"
                        />
                      </label>
                      <div className="settings-grid">
                        <label className="settings-field">
                          <span className="settings-field__label">Zip code</span>
                          <input
                            className="settings-input"
                            type="text"
                            placeholder="Zip code"
                          />
                        </label>
                        <label className="settings-field">
                          <span className="settings-field__label">Website URL</span>
                          <input
                            className="settings-input"
                            type="text"
                            placeholder="https://example.com"
                          />
                        </label>
                      </div>
                      <label className="settings-field">
                        <span className="settings-field__label">Time zone</span>
                        <select className="settings-input">
                          <option>Eastern (ET)</option>
                          <option>Central (CT)</option>
                          <option>Mountain (MT)</option>
                          <option>Pacific (PT)</option>
                        </select>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ) : isSettingsOperations ? (
              <div className="truth-section__content">
                <div className="settings-section">
                  <div className="settings-section__header">
                    <p className="settings-section__subtitle">
                      Day-to-day defaults used by ordering and operations.
                    </p>
                  </div>
                  <div className="settings-card">
                    <div className="settings-form">
                      <label className="settings-field">
                        <span className="settings-field__label">
                          Default delivery days
                        </span>
                        <input
                          className="settings-input"
                          type="text"
                          placeholder="e.g. Mon / Wed / Fri"
                        />
                      </label>
                      <label className="settings-field">
                        <span className="settings-field__label">
                          Default delivery minimum
                        </span>
                        <input
                          className="settings-input"
                          type="text"
                          placeholder="$0.00"
                        />
                      </label>
                      <label className="settings-field">
                        <span className="settings-field__label">Cash deposit day(s)</span>
                        <input
                          className="settings-input"
                          type="text"
                          placeholder="e.g. Tue / Thu"
                        />
                      </label>
                      <div className="settings-toggle-row">
                        <span className="settings-field__label">Tax handling</span>
                        <label className="toggle">
                          <input type="checkbox" />
                          <span className="toggle__track" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : isSettingsFinancialAssumptions ? (
              <div className="truth-section__content">
                <div className="settings-section">
                  <div className="settings-section__header">
                    <p className="settings-section__subtitle">
                      Default assumptions applied to forecasts and summaries.
                    </p>
                  </div>
                  <div className="settings-card">
                    <div className="settings-form">
                      <label className="settings-field">
                        <span className="settings-field__label">Sales tax %</span>
                        <input
                          className="settings-input"
                          type="text"
                          placeholder="e.g. 8%"
                        />
                      </label>
                      <label className="settings-field">
                        <span className="settings-field__label">Tip %</span>
                        <input
                          className="settings-input"
                          type="text"
                          placeholder="e.g. 18%"
                        />
                      </label>
                      <label className="settings-field">
                        <span className="settings-field__label">Payroll burden %</span>
                        <input
                          className="settings-input"
                          type="text"
                          placeholder="e.g. 12%"
                        />
                      </label>
                      <label className="settings-field">
                        <span className="settings-field__label">Default labor %</span>
                        <input
                          className="settings-input"
                          type="text"
                          placeholder="e.g. 30%"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ) : isSettingsAlerts ? (
              <div className="truth-section__content">
                <div className="settings-section">
                  <div className="settings-section__header">
                    <p className="settings-section__subtitle">
                      Alert toggles and sensitivity levels for key signals.
                    </p>
                  </div>
                  <div className="settings-card">
                    <div className="settings-list" role="list">
                      {notificationPreferences.map((notification) => (
                        <div
                          key={notification.id}
                          className="settings-row"
                          role="listitem"
                        >
                          <span className="settings-row__label">
                            {notification.label}
                          </span>
                          <label className="toggle">
                            <input
                              type="checkbox"
                              checked={notification.enabled}
                              onChange={() => handleNotificationToggle(notification.id)}
                            />
                            <span className="toggle__track" />
                          </label>
                          <select
                            className="settings-input settings-input--compact"
                            value={notification.sensitivity}
                            onChange={(event) =>
                              handleNotificationChange(
                                notification.id,
                                event.target.value,
                              )
                            }
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : isSettingsDisplay ? (
              <div className="truth-section__content">
                <div className="settings-section">
                  <div className="settings-section__header">
                    <p className="settings-section__subtitle">
                      Display and formatting preferences for the desktop view.
                    </p>
                  </div>
                  <div className="settings-card">
                    <div className="settings-form">
                      <label className="settings-field">
                        <span className="settings-field__label">Currency format</span>
                        <select className="settings-input">
                          <option>USD ($)</option>
                          <option>EUR (€)</option>
                          <option>GBP (£)</option>
                        </select>
                      </label>
                      <label className="settings-field">
                        <span className="settings-field__label">Week start day</span>
                        <select className="settings-input">
                          <option>Mon</option>
                          <option>Sun</option>
                        </select>
                      </label>
                      <div className="settings-toggle-row">
                        <span className="settings-field__label">Light / dark mode</span>
                        <label className="toggle">
                          <input type="checkbox" />
                          <span className="toggle__track" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              ) : (
                <p className="truth-section__body">Placeholder summary</p>
              )}
            </section>
              );
            })()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppShell;
