import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";

type CashflowDetail = {
  label: string;
  sales: number;
  expenses: number;
};

type CashflowDayEntry = {
  day: number;
  current: boolean;
  sales: number;
  expenses: number;
};

type CashflowWeekEntry = {
  label: string;
  sales: number;
  expenses: number;
};

type CashflowEntry = CashflowDayEntry | CashflowWeekEntry;

type FinancialsViewProps = {
  activeSecondaryId: string | null;
  activeTime: string;
  financialsTime: string;
  cashflowView: "Month" | "Week";
  setCashflowView: Dispatch<SetStateAction<"Month" | "Week">>;
};

const financialsTimeOptions = ["Week", "Month", "Quarter", "Year"];

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

const cashflowMonth = "September 2024";
const cashflowDays: CashflowDayEntry[] = [
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

const cashflowWeek: CashflowWeekEntry[] = [
  { label: "Mon · 08", sales: 16400, expenses: 17100 },
  { label: "Tue · 09", sales: 18900, expenses: 16250 },
  { label: "Wed · 10", sales: 20300, expenses: 18880 },
  { label: "Thu · 11", sales: 17600, expenses: 15400 },
  { label: "Fri · 12", sales: 19300, expenses: 16850 },
  { label: "Sat · 13", sales: 22100, expenses: 20100 },
  { label: "Sun · 14", sales: 14800, expenses: 14050 },
];

const cashflowSalesItems = [
  { label: "Credit card sales", share: 0.55 },
  { label: "Cash sales", share: 0.18 },
  { label: "3rd-party delivery sales", share: 0.17 },
  { label: "Sales tax collected", share: 0.06 },
  { label: "Tips collected", share: 0.04 },
];

const cashflowExpenseItems = [
  { label: "Northern Provisions", share: 0.4 },
  { label: "Harbor Supply Co.", share: 0.25 },
  { label: "Capital Farms", share: 0.2 },
  { label: "District Utilities", share: 0.15 },
];

const kpiItems = [
  { label: "Prime Cost", value: "--%" },
  { label: "Sales per Labor Hour", value: "$--" },
  { label: "Worked vs Scheduled Hours", value: "--%" },
  { label: "Sales per Sq Ft", value: "$--" },
  { label: "Net Profit %", value: "--%" },
  { label: "Rent as % of Sales", value: "--%" },
  { label: "Average Weekly Sales", value: "$--" },
  { label: "Average Employee Hourly Wage", value: "$-- / hr" },
];

const formatCurrency = (value: number) => `$${Math.round(value).toLocaleString()}`;
const formatCompact = (value: number) => `$${(value / 1000).toFixed(1)}k`;
const formatMargin = (value: number) => `${Math.round(value * 100)}%`;

const getShadeClass = (net: number) => {
  if (net <= -2000) return "cashflow-day--neg-strong";
  if (net <= -500) return "cashflow-day--neg";
  if (net < 500) return "cashflow-day--neutral";
  if (net < 2000) return "cashflow-day--pos";
  return "cashflow-day--pos-strong";
};

const parseCurrency = (value: string) => {
  const numeric = Number(value.replace(/[^0-9.-]+/g, ""));
  return Number.isNaN(numeric) ? 0 : numeric;
};

const FinancialsView = ({
  activeSecondaryId,
  activeTime,
  financialsTime,
  cashflowView,
  setCashflowView,
}: FinancialsViewProps) => {
  void activeTime;
  const normalizedSecondaryId = activeSecondaryId ?? "";

  const [cashflowDetail, setCashflowDetail] = useState<CashflowDetail | null>(null);
  const [proFormaSalesAdjustment, setProFormaSalesAdjustment] = useState(0);
  const [proFormaCogsPercent, setProFormaCogsPercent] = useState(34);
  const [proFormaLaborPercent, setProFormaLaborPercent] = useState(30);
  const [proFormaOperatingPercent, setProFormaOperatingPercent] = useState(26);
  const [selectedFinancialsTime, setSelectedFinancialsTime] = useState(financialsTime);

  useEffect(() => {
    setSelectedFinancialsTime(financialsTime);
  }, [financialsTime]);

  const scenarios = useMemo(() => {
    const baseSales = 52000;
    const adjustedSales = baseSales * (1 + proFormaSalesAdjustment / 100);
    const totalCostPercent =
      proFormaCogsPercent + proFormaLaborPercent + proFormaOperatingPercent;
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

    return [
      buildScenario("high", "High", 1.15, "proforma-row--positive", "proforma-bar--high"),
      buildScenario("medium", "Medium", 1, "proforma-row--neutral", "proforma-bar--medium"),
      buildScenario("low", "Low", 0.85, "proforma-row--negative", "proforma-bar--low"),
    ];
  }, [
    proFormaSalesAdjustment,
    proFormaCogsPercent,
    proFormaLaborPercent,
    proFormaOperatingPercent,
  ]);

  const cashflowEntries: CashflowEntry[] =
    cashflowView === "Month" ? cashflowDays : cashflowWeek;

  const handleCashflowDetailOpen = (entry: CashflowDetail) => {
    setCashflowDetail(entry);
  };

  const handleCashflowDetailClose = () => {
    setCashflowDetail(null);
  };

  const getCashflowDayLabel = (entry: CashflowEntry, index: number) => {
    if (cashflowView === "Month" && "day" in entry) {
      const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const weekday = weekdays[index % weekdays.length];
      return `${weekday}, Sep ${entry.day}`;
    }

    if ("label" in entry) {
      return ` ${entry.label.replace(" · ", ", Sep ")}`;
    }

    return "";
  };

  const renderCashflowDetailModal = () => {
    if (!cashflowDetail) {
      return null;
    }

    const totalSales = cashflowDetail.sales;
    const totalExpenses = cashflowDetail.expenses;
    const netTotal = totalSales - totalExpenses;

    return (
      <div className="modal-overlay" role="presentation" onClick={handleCashflowDetailClose}>
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
                {formatCurrency(cashflowDetail.sales - cashflowDetail.expenses)}
              </span>
              <button type="button" className="modal-close" onClick={handleCashflowDetailClose}>
                ×
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="modal-section">
              <p className="metric__label">Sales In</p>
              <div className="modal-list">
                {cashflowSalesItems.map((item) => (
                  <div key={item.label} className="modal-row">
                    <span className="modal-row__label">{item.label}</span>
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
                {cashflowExpenseItems.map((item) => (
                  <div key={item.label} className="modal-row">
                    <span className="modal-row__label">{item.label}</span>
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
                <span className="modal-row__value">{formatCurrency(totalSales)}</span>
              </div>
              <div className="modal-row">
                <span className="modal-row__label">Total Expenses Out</span>
                <span className="modal-row__value">{formatCurrency(totalExpenses)}</span>
              </div>
              <div className="modal-row modal-row--strong">
                <span className="modal-row__label">Net Profit</span>
                <span className="modal-row__value">{formatCurrency(netTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCashflow = () => (
    <div className="truth-section__content">
      <div className="cashflow-header">
        <span className="metric__label">Cashflow view</span>
        <h4 className="cashflow-title">{cashflowMonth}</h4>
        <div className="time-selector" role="tablist" aria-label="Cashflow view">
          {["Month", "Week"].map((option) => (
            <button
              key={option}
              type="button"
              className={`time-pill${cashflowView === option ? " time-pill--active" : ""}`}
              onClick={() => setCashflowView(option as "Month" | "Week")}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="cashflow-calendar" role="grid">
        {cashflowEntries.map((entry, index) => {
          const net = entry.sales - entry.expenses;
          const netLabel = `${net >= 0 ? "+" : "-"} ${formatCompact(Math.abs(net))}`;
          const isMuted =
            cashflowView === "Month" && "current" in entry && !entry.current;
          const dayLabel = getCashflowDayLabel(entry, index);
          const dayLabelTrimmed = dayLabel.trim();
          const entryKey = `${"day" in entry ? entry.day : entry.label}-${index}`;

          return (
            <div
              key={entryKey}
              className={`cashflow-day ${getShadeClass(net)}${
                isMuted ? " cashflow-day--muted" : ""
              }`}
              role="gridcell"
              tabIndex={0}
              onClick={() =>
                handleCashflowDetailOpen({
                  label: dayLabelTrimmed,
                  sales: entry.sales,
                  expenses: entry.expenses,
                })
              }
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleCashflowDetailOpen({
                    label: dayLabelTrimmed,
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
      {renderCashflowDetailModal()}
    </div>
  );

  const renderProfitLoss = () => {
    const getSalesValue = (period: string) => {
      if (period === "Quarter") {
        const monthSales = parseCurrency(salesOverviewMetrics.Month.gross);
        return monthSales * 3;
      }
      return parseCurrency(
        salesOverviewMetrics[period]?.gross ?? salesOverviewMetrics.Month.gross,
      );
    };

    const getExpenseValue = (period: string) => {
      if (period === "Quarter") {
        const monthExpenses = parseCurrency(expensesOverviewTotals.Month);
        return monthExpenses * 3;
      }
      return parseCurrency(expensesOverviewTotals[period] ?? expensesOverviewTotals.Month);
    };

    const salesValue = getSalesValue(selectedFinancialsTime);
    const expensesValue = getExpenseValue(selectedFinancialsTime);
    const profitValue = salesValue - expensesValue;
    const expensePercent =
      salesValue > 0 ? Math.round((expensesValue / salesValue) * 100) : 0;
    const profitPercent =
      salesValue > 0 ? Math.round((profitValue / salesValue) * 100) : 0;

    return (
      <div className="truth-section__content">
        <div className="time-selector" role="tablist" aria-label="Time range">
          {financialsTimeOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={`time-pill${
                selectedFinancialsTime === option ? " time-pill--active" : ""
              }`}
              onClick={() => setSelectedFinancialsTime(option)}
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
  };

  const renderProForma = () => (
    <>
      <section className="truth-section">
        <div className="truth-section__content">
          <div className="proforma-header">
            <p className="proforma-subtitle">Scenario-based profitability snapshot</p>
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
              <div key={scenario.id} className={`proforma-row ${scenario.tone}`} role="row">
                <span className="proforma-cell proforma-cell--label" role="cell">
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
                <span className="proforma-controls__label">Sales (adjustment)</span>
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
                <span className="proforma-controls__value">{proFormaSalesAdjustment}%</span>
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
                  onChange={(event) => setProFormaCogsPercent(Number(event.target.value))}
                />
                <span className="proforma-controls__value">{proFormaCogsPercent}%</span>
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
                  onChange={(event) => setProFormaLaborPercent(Number(event.target.value))}
                />
                <span className="proforma-controls__value">{proFormaLaborPercent}%</span>
              </label>
              <label className="proforma-controls__row">
                <span className="proforma-controls__label">Operating Expenses %</span>
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
  );

  const renderKpis = () => (
    <section className="truth-section">
      <div className="truth-section__content">
        <div className="kpi-grid" role="list">
          {kpiItems.map((item) => (
            <div key={item.label} className="kpi-tile" role="listitem">
              <p className="kpi-tile__value">{item.value}</p>
              <p className="kpi-tile__label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  let content: React.ReactNode = null;

  if (normalizedSecondaryId === "cashflow") {
    content = renderCashflow();
  } else if (normalizedSecondaryId === "profit-loss") {
    content = renderProfitLoss();
  } else if (normalizedSecondaryId === "pro-forma") {
    content = renderProForma();
  } else if (normalizedSecondaryId === "kpis") {
    content = renderKpis();
  }

  return <>{content}</>;
};

export default FinancialsView;
