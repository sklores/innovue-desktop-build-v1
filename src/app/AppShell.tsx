type PrimaryTabKey =
  | "sales"
  | "expenses"
  | "financials"
  | "presence"
  | "settings"
  | "reporting";

import { useEffect, useMemo, useRef, useState } from "react";

import PrimaryNav from "../navigation/PrimaryNav";
import SecondaryNav from "../navigation/SecondaryNav";
import { primaryTabs, secondaryTabsByPrimary } from "../navigation/navConfig";
import OnlineView from "../pages/OnlineView";
import ReportingView from "../pages/ReportingView";
import ExpensesView from "../pages/ExpensesView";
import SalesView from "../pages/SalesView";
import FinancialsView from "../components/financials/FinancialsView";
import FinancialsKpisView from "../components/financials/FinancialsKpisView";
import ExpensesBreakdown from "../components/expenses/ExpensesBreakdown";
import ExpensesBudgets from "../components/expenses/ExpensesBudgets";

type PrimaryTabKey =
  | "sales"
  | "expenses"
  | "financials"
  | "presence"
  | "settings"
  | "reporting";

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

const budgetsTimeOptions = ["Week", "Month", "Quarter", "Year"];

const isPrimaryTab = (value: string): value is PrimaryTabKey =>
  ["sales", "expenses", "financials", "presence", "settings", "reporting"].includes(
    value,
  );

const AppShell = () => {
  const secondaryTabs: Record<
    PrimaryTabKey,
    { id: string; label: string }[]
  > = {
    sales: secondaryTabsByPrimary.sales,
    expenses: secondaryTabsByPrimary.expenses,
    financials: secondaryTabsByPrimary.financials,
    presence: secondaryTabsByPrimary.presence,
    settings: secondaryTabsByPrimary.settings,
    reporting: secondaryTabsByPrimary.reporting,
  };
  const primaryNavItems = useMemo(() => {
    const settingsTab = primaryTabs.find((tab) => tab.id === "settings");
    const baseTabs = primaryTabs.filter((tab) => tab.id !== "settings");
    return [
      ...baseTabs,
      { id: "reporting", label: "Reporting" },
      settingsTab ?? { id: "settings", label: "Settings" },
    ];
  }, []);

  const [activePrimaryTab, setActivePrimaryTab] = useState<PrimaryTabKey>("sales");
  const [activeSecondaryId, setActiveSecondaryId] = useState<string | null>(
    secondaryTabs.sales[0]?.id ?? null,
  );
  const [activeTime, setActiveTime] = useState(timeOptions[7]);
  const [financialsTime] = useState("Month");
  const prevPrimaryId = useRef(activePrimaryTab);
  const [cashflowView, setCashflowView] = useState<"Month" | "Week">("Month");
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
    return primaryNavItems.find((tab) => tab.id === activePrimaryTab) ?? primaryNavItems[0];
  }, [activePrimaryTab, primaryNavItems]);

  const activeSecondaryTabs = useMemo(() => {
    return secondaryTabs[activePrimaryTab] ?? [];
  }, [activePrimaryTab, secondaryTabs]);

  useEffect(() => {
    // Secondary tab is intentionally reset on primary change to prevent cross-primary leakage.
    const validSecondaryIds = activeSecondaryTabs.map(
      (tab: { id: string; label: string }) => tab.id,
    );
    if (activeSecondaryTabs.length === 0) {
      setActiveSecondaryId(null);
      return;
    }
    if (!activeSecondaryId || !validSecondaryIds.includes(activeSecondaryId)) {
      setActiveSecondaryId(activeSecondaryTabs[0].id);
    }
  }, [activePrimaryTab, activeSecondaryTabs, activeSecondaryId]);

  useEffect(() => {
    if (prevPrimaryId.current === "expenses" && activePrimaryTab !== "expenses") {
      setActiveSecondaryId(activeSecondaryTabs[0]?.id ?? null);
    }
    prevPrimaryId.current = activePrimaryTab;
  }, [activePrimaryTab, activeSecondaryTabs]);

  useEffect(() => {
    setActiveTime(timeOptions[7]);
  }, [activePrimaryTab, activeSecondaryId]);

  const hasValidSecondary =
    !!activeSecondaryId &&
    activeSecondaryTabs.some((tab: { id: string; label: string }) => tab.id === activeSecondaryId);
  const isPresence = activePrimaryTab === "presence";
  const isReporting = activePrimaryTab === "reporting";
  const isSettingsBusiness =
    hasValidSecondary &&
    activePrimaryTab === "settings" &&
    activeSecondaryId === "business";
  const isSettingsOperations =
    hasValidSecondary &&
    activePrimaryTab === "settings" &&
    activeSecondaryId === "operations";
  const isSettingsFinancialAssumptions =
    hasValidSecondary &&
    activePrimaryTab === "settings" &&
    activeSecondaryId === "financial-assumptions";
  const isSettingsAlerts =
    hasValidSecondary &&
    activePrimaryTab === "settings" &&
    activeSecondaryId === "alerts";
  const isSettingsDisplay =
    hasValidSecondary &&
    activePrimaryTab === "settings" &&
    activeSecondaryId === "display";

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
      activePrimaryTab === "sales" &&
      ["breakdown", "forecast", "product"].includes(activeSecondaryId)) ||
    (hasValidSecondary &&
      activePrimaryTab === "expenses" &&
      ["breakdown", "budgets"].includes(activeSecondaryId));

  const isExpensesVendors =
    hasValidSecondary &&
    activePrimaryTab === "expenses" &&
    activeSecondaryId === "vendors";

  let content = null;

  if (activePrimaryTab === "sales" && activeSecondaryId === "trends") {
    content = (
      <SalesView activeSecondaryId={activeSecondaryId ?? ""} activeTime={activeTime} />
    );
  } else if (
    activePrimaryTab === "expenses" &&
    ["vendors", "invoices"].includes(activeSecondaryId ?? "")
  ) {
    content = (
      <ExpensesView
        activeSecondaryId={activeSecondaryId ?? ""}
        activeTime={activeTime}
      />
    );
  } else if (activePrimaryTab === "financials" && activeSecondaryId === "kpis") {
    content = <FinancialsKpisView />;
  } else if (activePrimaryTab === "financials") {
    content = (
      <FinancialsView
        activeSecondaryId={activeSecondaryId}
        activeTime={activeTime}
        financialsTime={financialsTime}
        cashflowView={cashflowView}
        setCashflowView={setCashflowView}
      />
    );
  } else {
    let sectionContent = null;

    if (isTimeBasedView) {
      sectionContent = (
        <div className="truth-section__content">
          <div className="time-selector" role="tablist" aria-label="Time range">
            {((activePrimaryTab === "expenses" && activeSecondaryId === "budgets")
              ? budgetsTimeOptions
              : timeOptions
            ).map((option) => (
              <button
                key={option}
                type="button"
                className={`time-pill${activeTime === option ? " time-pill--active" : ""}`}
                onClick={() => setActiveTime(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {activePrimaryTab === "sales" ? (
            <SalesView
              activeSecondaryId={activeSecondaryId ?? ""}
              activeTime={activeTime}
            />
          ) : activePrimaryTab === "expenses" &&
            activeSecondaryId === "breakdown" ? (
            <ExpensesBreakdown activeTime={activeTime} total="" categories={{}} percents={{}} />
          ) : activePrimaryTab === "expenses" &&
            activeSecondaryId === "budgets" ? (
            <ExpensesBudgets activeTime={activeTime} />
          ) : null}
        </div>
      );
    } else if (isExpensesVendors) {
      const vendorRows = [
        {
          id: "northern-provisions",
          name: "Northern Provisions",
          accountsPayable: "$48,900",
          email: "orders@northernprovisions.com",
          phone: "(202) 555-0132",
          paymentTerms: "Net 14",
          accountNumber: "•••• 4821",
          deliveryDays: "Mon / Wed / Fri",
          deliveryMinimum: "$250",
          orderGuide: ["Seasonal produce", "Protein cuts", "Dry goods"],
        },
        {
          id: "harbor-supply",
          name: "Harbor Supply Co.",
          accountsPayable: "$37,450",
          email: "billing@harborsupply.co",
          phone: "(202) 555-0194",
          paymentTerms: "Net 21",
          accountNumber: "•••• 7754",
          deliveryDays: "Tue / Thu",
          deliveryMinimum: "$300",
          orderGuide: ["Packaging", "Paper products", "Cleaning supplies"],
        },
        {
          id: "capital-farms",
          name: "Capital Farms",
          accountsPayable: "$29,120",
          email: "support@capitalfarms.com",
          phone: "(202) 555-0178",
          paymentTerms: "Net 30",
          accountNumber: "•••• 2146",
          deliveryDays: "Mon / Thu",
          deliveryMinimum: "$200",
          orderGuide: ["Dairy", "Eggs", "Specialty greens"],
        },
        {
          id: "district-utilities",
          name: "District Utilities",
          accountsPayable: "$18,760",
          email: "account@districtutilities.com",
          phone: "(202) 555-0109",
          paymentTerms: "Net 15",
          accountNumber: "•••• 0913",
          deliveryDays: "Monthly",
          deliveryMinimum: "$0",
          orderGuide: ["Electric", "Water", "Gas"],
        },
      ];
      void vendorRows;

      sectionContent = (
        <div className="truth-section__content">
          {activePrimaryTab === "expenses" ? (
            <ExpensesView
              activeSecondaryId={activeSecondaryId ?? ""}
              activeTime={activeTime}
            />
          ) : null}
        </div>
      );
    } else if (isPresence) {
      sectionContent = <OnlineView activeSecondaryId={activeSecondaryId} />;
    } else if (isReporting) {
      sectionContent = (
        <ReportingView
          activeSecondaryId={activeSecondaryId}
          notificationPreferences={notificationPreferences}
          handleNotificationToggle={handleNotificationToggle}
          handleNotificationChange={handleNotificationChange}
        />
      );
    } else if (isSettingsBusiness) {
      sectionContent = (
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
      );
    } else if (isSettingsOperations) {
      sectionContent = (
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
                  <span className="settings-field__label">Default delivery days</span>
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
      );
    } else if (isSettingsFinancialAssumptions) {
      sectionContent = (
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
      );
    } else if (isSettingsAlerts) {
      sectionContent = (
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
                    <span className="settings-row__label">{notification.label}</span>
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
                        handleNotificationChange(notification.id, event.target.value)
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
      );
    } else if (isSettingsDisplay) {
      sectionContent = (
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
      );
    } else {
      sectionContent = <p className="truth-section__body">Placeholder summary</p>;
    }

    content = <section className="truth-section">{sectionContent}</section>;
  }

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
          activeId={activePrimaryTab}
          onChange={(id) => {
            if (isPrimaryTab(id)) {
              setActivePrimaryTab(id);
            }
          }}
        />

        <main className="app-content">
          <div className="app-content-inner">
            <section className="truth-card truth-card--lead">
              <div className="truth-card__header">
                <h2 className="truth-card__title">{activePrimary.label}</h2>
                {/* Secondary tabs are intentionally rendered from a single source to prevent cross-primary leakage. */}
                {/* SecondaryNav is intentionally rendered once at the top of the content area. */}
                {activeSecondaryTabs.length > 0 ? (
                  <SecondaryNav
                    key={activePrimaryTab}
                    tabs={activeSecondaryTabs}
                    activeId={activeSecondaryId ?? ""}
                    onChange={setActiveSecondaryId}
                  />
                ) : null}
              </div>
            </section>
            {content}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppShell;
