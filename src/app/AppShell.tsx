import { useEffect, useMemo, useState } from "react";
import type { KeyboardEvent } from "react";

import PrimaryNav from "../navigation/PrimaryNav";
import SecondaryNav from "../navigation/SecondaryNav";
import { primaryTabs, secondaryTabsByPrimary } from "../navigation/navConfig";

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

const reportingTabs = [
  { id: "tab-a", label: "Tab A" },
  { id: "tab-b", label: "Tab B" },
];

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

const expensesCategoryMetrics: Record<string, Record<string, string>> = {
  Mon: {
    Labor: "$18,900",
    COGS: "$11,400",
    "Fixed costs": "$6,200",
    Utilities: "$2,300",
    Chemicals: "$1,100",
    Linen: "$480",
  },
  Tue: {
    Labor: "$19,700",
    COGS: "$12,100",
    "Fixed costs": "$6,300",
    Utilities: "$2,260",
    Chemicals: "$1,140",
    Linen: "$490",
  },
  Wed: {
    Labor: "$20,200",
    COGS: "$12,700",
    "Fixed costs": "$6,400",
    Utilities: "$2,280",
    Chemicals: "$1,160",
    Linen: "$520",
  },
  Thu: {
    Labor: "$19,900",
    COGS: "$12,300",
    "Fixed costs": "$6,350",
    Utilities: "$2,240",
    Chemicals: "$1,120",
    Linen: "$510",
  },
  Fri: {
    Labor: "$21,600",
    COGS: "$13,500",
    "Fixed costs": "$6,600",
    Utilities: "$2,460",
    Chemicals: "$1,180",
    Linen: "$520",
  },
  Sat: {
    Labor: "$14,200",
    COGS: "$9,100",
    "Fixed costs": "$5,100",
    Utilities: "$1,760",
    Chemicals: "$840",
    Linen: "$360",
  },
  Sun: {
    Labor: "$13,400",
    COGS: "$8,600",
    "Fixed costs": "$4,900",
    Utilities: "$1,640",
    Chemicals: "$810",
    Linen: "$330",
  },
  Week: {
    Labor: "$128,900",
    COGS: "$79,700",
    "Fixed costs": "$41,800",
    Utilities: "$13,940",
    Chemicals: "$6,350",
    Linen: "$2,760",
  },
  Month: {
    Labor: "$528,400",
    COGS: "$326,300",
    "Fixed costs": "$171,200",
    Utilities: "$56,900",
    Chemicals: "$26,100",
    Linen: "$11,300",
  },
  Year: {
    Labor: "$6,410,000",
    COGS: "$3,946,000",
    "Fixed costs": "$2,080,000",
    Utilities: "$676,000",
    Chemicals: "$312,000",
    Linen: "$136,000",
  },
};

const expensesCategoryPercentages: Record<string, Record<string, string>> = {
  Mon: {
    Labor: "45%",
    COGS: "27%",
    "Fixed costs": "15%",
    Utilities: "5%",
    Chemicals: "3%",
    Linen: "1%",
  },
  Tue: {
    Labor: "44%",
    COGS: "27%",
    "Fixed costs": "14%",
    Utilities: "5%",
    Chemicals: "3%",
    Linen: "1%",
  },
  Wed: {
    Labor: "44%",
    COGS: "28%",
    "Fixed costs": "14%",
    Utilities: "5%",
    Chemicals: "3%",
    Linen: "1%",
  },
  Thu: {
    Labor: "44%",
    COGS: "27%",
    "Fixed costs": "14%",
    Utilities: "5%",
    Chemicals: "3%",
    Linen: "1%",
  },
  Fri: {
    Labor: "43%",
    COGS: "27%",
    "Fixed costs": "13%",
    Utilities: "5%",
    Chemicals: "2%",
    Linen: "1%",
  },
  Sat: {
    Labor: "45%",
    COGS: "29%",
    "Fixed costs": "16%",
    Utilities: "6%",
    Chemicals: "3%",
    Linen: "1%",
  },
  Sun: {
    Labor: "46%",
    COGS: "30%",
    "Fixed costs": "15%",
    Utilities: "6%",
    Chemicals: "3%",
    Linen: "1%",
  },
  Week: {
    Labor: "45%",
    COGS: "28%",
    "Fixed costs": "14%",
    Utilities: "5%",
    Chemicals: "2%",
    Linen: "1%",
  },
  Month: {
    Labor: "45%",
    COGS: "28%",
    "Fixed costs": "14%",
    Utilities: "5%",
    Chemicals: "2%",
    Linen: "1%",
  },
  Year: {
    Labor: "44%",
    COGS: "28%",
    "Fixed costs": "14%",
    Utilities: "5%",
    Chemicals: "2%",
    Linen: "1%",
  },
};

const salesBreakdownMetrics: Record<string, Record<string, string>> = {
  Mon: {
    "In-store": "$48,200",
    Takeout: "$31,400",
    Delivery: "$28,100",
    "3rd-party tips": "$3,600",
    "Check average": "$42.10",
    Covers: "1,142",
  },
  Tue: {
    "In-store": "$52,900",
    Takeout: "$34,200",
    Delivery: "$29,500",
    "3rd-party tips": "$3,900",
    "Check average": "$41.80",
    Covers: "1,208",
  },
  Wed: {
    "In-store": "$56,300",
    Takeout: "$36,900",
    Delivery: "$31,400",
    "3rd-party tips": "$4,100",
    "Check average": "$43.20",
    Covers: "1,274",
  },
  Thu: {
    "In-store": "$54,100",
    Takeout: "$35,400",
    Delivery: "$30,600",
    "3rd-party tips": "$3,800",
    "Check average": "$42.60",
    Covers: "1,236",
  },
  Fri: {
    "In-store": "$62,800",
    Takeout: "$40,200",
    Delivery: "$34,900",
    "3rd-party tips": "$4,700",
    "Check average": "$45.10",
    Covers: "1,412",
  },
  Sat: {
    "In-store": "$38,900",
    Takeout: "$27,100",
    Delivery: "$24,200",
    "3rd-party tips": "$2,400",
    "Check average": "$39.70",
    Covers: "986",
  },
  Sun: {
    "In-store": "$34,500",
    Takeout: "$24,800",
    Delivery: "$22,600",
    "3rd-party tips": "$2,100",
    "Check average": "$38.90",
    Covers: "912",
  },
  Week: {
    "In-store": "$347,700",
    Takeout: "$229,900",
    Delivery: "$201,300",
    "3rd-party tips": "$24,600",
    "Check average": "$42.20",
    Covers: "8,170",
  },
  Month: {
    "In-store": "$1,362,400",
    Takeout: "$936,800",
    Delivery: "$799,300",
    "3rd-party tips": "$95,700",
    "Check average": "$42.70",
    Covers: "32,580",
  },
  Year: {
    "In-store": "$16,204,000",
    Takeout: "$11,402,000",
    Delivery: "$9,286,000",
    "3rd-party tips": "$1,192,000",
    "Check average": "$43.10",
    Covers: "382,400",
  },
};

const salesBreakdownPercentages: Record<string, Record<string, string>> = {
  Mon: {
    "In-store": "38%",
    Takeout: "25%",
    Delivery: "22%",
    "3rd-party tips": "3%",
  },
  Tue: {
    "In-store": "39%",
    Takeout: "25%",
    Delivery: "22%",
    "3rd-party tips": "3%",
  },
  Wed: {
    "In-store": "40%",
    Takeout: "26%",
    Delivery: "22%",
    "3rd-party tips": "3%",
  },
  Thu: {
    "In-store": "39%",
    Takeout: "26%",
    Delivery: "23%",
    "3rd-party tips": "3%",
  },
  Fri: {
    "In-store": "40%",
    Takeout: "25%",
    Delivery: "22%",
    "3rd-party tips": "3%",
  },
  Sat: {
    "In-store": "42%",
    Takeout: "29%",
    Delivery: "26%",
    "3rd-party tips": "3%",
  },
  Sun: {
    "In-store": "41%",
    Takeout: "29%",
    Delivery: "26%",
    "3rd-party tips": "2%",
  },
  Week: {
    "In-store": "40%",
    Takeout: "26%",
    Delivery: "23%",
    "3rd-party tips": "3%",
  },
  Month: {
    "In-store": "40%",
    Takeout: "27%",
    Delivery: "23%",
    "3rd-party tips": "3%",
  },
  Year: {
    "In-store": "41%",
    Takeout: "29%",
    Delivery: "24%",
    "3rd-party tips": "3%",
  },
};

const salesForecastSeries: Record<
  string,
  {
    today: number[];
    past: number[];
    projected: number[];
  }
> = {
  Mon: {
    today: [24, 32, 28, 36, 42, 38, 44],
    past: [18, 26, 24, 30, 36, 33, 37],
    projected: [24, 32, 30, 35, 40, 42, 45],
  },
  Tue: {
    today: [26, 34, 30, 38, 44, 40, 46],
    past: [20, 28, 26, 32, 38, 35, 39],
    projected: [26, 34, 32, 37, 42, 44, 47],
  },
  Wed: {
    today: [28, 36, 32, 40, 46, 42, 48],
    past: [22, 30, 28, 34, 40, 37, 41],
    projected: [28, 36, 34, 39, 44, 46, 49],
  },
  Thu: {
    today: [27, 35, 31, 39, 45, 41, 47],
    past: [21, 29, 27, 33, 39, 36, 40],
    projected: [27, 35, 33, 38, 43, 45, 48],
  },
  Fri: {
    today: [30, 40, 36, 45, 52, 48, 54],
    past: [24, 34, 31, 39, 45, 42, 47],
    projected: [30, 40, 38, 44, 50, 52, 56],
  },
  Sat: {
    today: [20, 28, 26, 32, 36, 34, 38],
    past: [16, 22, 21, 26, 30, 28, 32],
    projected: [20, 28, 27, 31, 35, 37, 39],
  },
  Sun: {
    today: [18, 24, 22, 28, 32, 30, 34],
    past: [14, 20, 19, 24, 28, 26, 30],
    projected: [18, 24, 23, 27, 31, 33, 35],
  },
  Week: {
    today: [24, 30, 28, 36, 42, 40, 46],
    past: [20, 26, 24, 31, 36, 34, 38],
    projected: [24, 30, 29, 35, 40, 42, 45],
  },
  Month: {
    today: [22, 26, 24, 28, 32, 30, 34],
    past: [18, 22, 20, 24, 28, 26, 30],
    projected: [22, 26, 25, 29, 33, 35, 37],
  },
  Year: {
    today: [18, 22, 20, 24, 28, 26, 30],
    past: [14, 18, 16, 20, 24, 22, 26],
    projected: [18, 22, 21, 25, 29, 31, 33],
  },
};

const breakdownRows = [
  "In-store",
  "Takeout",
  "Delivery",
  "3rd-party tips",
  "Check average",
  "Covers",
];

const expensesCategoryRows = [
  "Labor",
  "COGS",
  "Fixed costs",
  "Utilities",
  "Chemicals",
  "Linen",
];

const parseCurrency = (value: string) => {
  const numeric = Number(value.replace(/[^0-9.-]+/g, ""));
  return Number.isNaN(numeric) ? 0 : numeric;
};

const buildPath = (values: number[], width = 520, height = 180) => {
  if (values.length === 0) {
    return "";
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = width / (values.length - 1);
  const points = values.map((value, index) => {
    const x = index * step;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  });
  return `M ${points[0]} ${points.slice(1).map((point) => `L ${point}`).join(" ")}`;
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
  const [activeSecondaryId, setActiveSecondaryId] = useState(
    secondaryTabsByPrimary[primaryNavItems[0].id][0].id,
  );
  const [activeTime, setActiveTime] = useState(timeOptions[7]);
  const [openVendorId, setOpenVendorId] = useState<string | null>(null);
  const [openOrderGuideId, setOpenOrderGuideId] = useState<string | null>(null);

  const activePrimary = useMemo(() => {
    return primaryNavItems.find((tab) => tab.id === activePrimaryId) ?? primaryNavItems[0];
  }, [activePrimaryId, primaryNavItems]);

  const secondaryTabs = useMemo(() => {
    if (activePrimaryId === "reporting") {
      return reportingTabs;
    }
    return secondaryTabsByPrimary[activePrimaryId] ?? secondaryTabsByPrimary.sales;
  }, [activePrimaryId]);

  const activeSecondary = useMemo(() => {
    return secondaryTabs.find((tab) => tab.id === activeSecondaryId) ?? secondaryTabs[0];
  }, [secondaryTabs, activeSecondaryId]);

  useEffect(() => {
    setActiveSecondaryId(secondaryTabs[0].id);
  }, [secondaryTabs]);

  useEffect(() => {
    setActiveTime(timeOptions[7]);
  }, [activePrimaryId, activeSecondaryId]);

  const isSalesOverview =
    activePrimaryId === "sales" && activeSecondaryId === "overview";
  const isSalesBreakdown =
    activePrimaryId === "sales" && activeSecondaryId === "breakdown";
  const isSalesForecast =
    activePrimaryId === "sales" && activeSecondaryId === "forecast";
  const isExpensesOverview =
    activePrimaryId === "expenses" && activeSecondaryId === "overview";
  const isExpensesCategories =
    activePrimaryId === "expenses" && activeSecondaryId === "categories";
  const isExpensesVendors =
    activePrimaryId === "expenses" && activeSecondaryId === "vendors";

  const activeMetrics = salesOverviewMetrics[activeTime] ?? salesOverviewMetrics.Week;
  const activeBreakdown =
    salesBreakdownMetrics[activeTime] ?? salesBreakdownMetrics.Week;
  const activeBreakdownPercent =
    salesBreakdownPercentages[activeTime] ?? salesBreakdownPercentages.Week;
  const activeForecast =
    salesForecastSeries[activeTime] ?? salesForecastSeries.Week;
  const activeExpensesTotal =
    expensesOverviewTotals[activeTime] ?? expensesOverviewTotals.Week;
  const activeExpensesCategories =
    expensesCategoryMetrics[activeTime] ?? expensesCategoryMetrics.Week;
  const activeExpensesPercents =
    expensesCategoryPercentages[activeTime] ?? expensesCategoryPercentages.Week;
  const sortedVendors = useMemo(() => {
    if (!isExpensesVendors || vendorRows.length === 0) {
      return [];
    }
    return [...vendorRows].sort(
      (a, b) => parseCurrency(b.accountsPayable) - parseCurrency(a.accountsPayable),
    );
  }, [isExpensesVendors]);

  const handleVendorToggle = (id: string) => {
    setOpenVendorId((prev) => (prev === id ? null : id));
    setOpenOrderGuideId(null);
  };

  const handleVendorKeyDown = (event: KeyboardEvent<HTMLDivElement>, id: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleVendorToggle(id);
    }
  };

  const handleOrderGuideToggle = (id: string) => {
    setOpenOrderGuideId((prev) => (prev === id ? null : id));
  };

  const handleOrderGuideKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    id: string,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOrderGuideToggle(id);
    }
  };

  const isTimeBasedView =
    isSalesOverview ||
    isSalesBreakdown ||
    isSalesForecast ||
    isExpensesOverview ||
    isExpensesCategories;

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
          <section className="truth-card truth-card--lead">
            <div className="truth-card__header">
              <h2 className="truth-card__title">{activePrimary.label}</h2>
              <SecondaryNav
                tabs={secondaryTabs}
                activeId={activeSecondary.id}
                onChange={setActiveSecondaryId}
              />
            </div>
          </section>

          <section className="truth-section">
            <div className="truth-section__header">
              <p className="truth-section__subtitle">{activeSecondary.label}</p>
              <h3 className="truth-section__title">{activeSecondary.label}</h3>
            </div>

            {isTimeBasedView ? (
              <div className="truth-section__content">
                <div className="time-selector" role="tablist" aria-label="Time range">
                  {timeOptions.map((option) => (
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
                  ))}
                </div>

                {isSalesOverview ? (
                  <div className="metrics">
                    <div className="metric">
                      <p className="metric__label">Gross Sales</p>
                      <p className="metric__value">{activeMetrics.gross}</p>
                    </div>
                    <div className="metric">
                      <p className="metric__label">Net Sales</p>
                      <p className="metric__value">{activeMetrics.net}</p>
                    </div>
                  </div>
                ) : null}

                {isSalesBreakdown ? (
                  <div className="breakdown-table" role="table">
                    <div className="breakdown-row breakdown-row--header" role="row">
                      <span className="breakdown-row__label" role="columnheader">
                        Category
                      </span>
                      <span className="breakdown-row__value" role="columnheader">
                        Amount
                      </span>
                      <span className="breakdown-row__percent" role="columnheader">
                        % of Total
                      </span>
                    </div>
                    {breakdownRows.map((label) => (
                      <div key={label} className="breakdown-row" role="row">
                        <span className="breakdown-row__label" role="cell">
                          {label}
                        </span>
                        <span className="breakdown-row__value" role="cell">
                          {activeBreakdown[label]}
                        </span>
                        <span className="breakdown-row__percent" role="cell">
                          {activeBreakdownPercent[label] ?? "—"}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}

                {isSalesForecast ? (
                  <div className="forecast-chart" role="img" aria-label="Sales forecast">
                    <svg viewBox="0 0 520 180" aria-hidden="true">
                      <path
                        className="forecast-line forecast-line--past"
                        d={buildPath(activeForecast.past)}
                      />
                      <path
                        className="forecast-line forecast-line--today"
                        d={buildPath(activeForecast.today)}
                      />
                      <path
                        className="forecast-line forecast-line--projected"
                        d={buildPath(activeForecast.projected)}
                      />
                    </svg>
                  </div>
                ) : null}

                {isExpensesOverview ? (
                  <div className="metrics">
                    <div className="metric">
                      <p className="metric__label">Total Expenses</p>
                      <p className="metric__value">{activeExpensesTotal}</p>
                    </div>
                  </div>
                ) : null}

                {isExpensesCategories ? (
                  <div className="breakdown-table" role="table">
                    <div className="breakdown-row breakdown-row--header" role="row">
                      <span className="breakdown-row__label" role="columnheader">
                        Category
                      </span>
                      <span className="breakdown-row__value" role="columnheader">
                        Amount
                      </span>
                      <span className="breakdown-row__percent" role="columnheader">
                        % of Total
                      </span>
                    </div>
                    {expensesCategoryRows.map((label) => (
                      <div key={label} className="breakdown-row" role="row">
                        <span className="breakdown-row__label" role="cell">
                          {label}
                        </span>
                        <span className="breakdown-row__value" role="cell">
                          {activeExpensesCategories[label]}
                        </span>
                        <span className="breakdown-row__percent" role="cell">
                          {activeExpensesPercents[label]}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : isExpensesVendors ? (
              <div className="truth-section__content">
                <div className="breakdown-table vendor-list" role="list">
                  {sortedVendors.map((vendor) => {
                    const isOpen = openVendorId === vendor.id;
                    const isOrderGuideOpen = openOrderGuideId === vendor.id;
                    return (
                      <div key={vendor.id} role="listitem">
                        <div
                          className={`breakdown-row vendor-row${
                            isOpen ? " vendor-row--open" : ""
                          }`}
                          role="button"
                          tabIndex={0}
                          aria-expanded={isOpen}
                          onClick={() => handleVendorToggle(vendor.id)}
                          onKeyDown={(event) => handleVendorKeyDown(event, vendor.id)}
                        >
                          <span className="breakdown-row__label">{vendor.name}</span>
                          <span className="breakdown-row__value">
                            {vendor.accountsPayable}
                          </span>
                        </div>
                        <div
                          className={`vendor-details${
                            isOpen ? " vendor-details--open" : ""
                          }`}
                          aria-hidden={!isOpen}
                        >
                          <div className="vendor-details__grid">
                            <div className="vendor-section vendor-section--tight">
                              <span className="metric__label">Identity / Contact</span>
                              <span className="vendor-title">{vendor.name}</span>
                              <span className="breakdown-row__label">
                                {vendor.email}
                              </span>
                              <span className="breakdown-row__label">
                                {vendor.phone}
                              </span>
                            </div>
                            <div className="vendor-section">
                              <span className="metric__label">Payment</span>
                              <div className="vendor-row__detail">
                                <span className="breakdown-row__label">
                                  Accounts payable
                                </span>
                                <span className="breakdown-row__value">
                                  {vendor.accountsPayable}
                                </span>
                              </div>
                              <div className="vendor-row__detail">
                                <span className="breakdown-row__label">
                                  Payment terms
                                </span>
                                <span className="breakdown-row__value">
                                  {vendor.paymentTerms}
                                </span>
                              </div>
                              <div className="vendor-row__detail">
                                <span className="breakdown-row__label">
                                  Account number
                                </span>
                                <span className="breakdown-row__value">
                                  {vendor.accountNumber}
                                </span>
                              </div>
                            </div>
                            <div className="vendor-section">
                              <span className="metric__label">Operations</span>
                              <div className="vendor-row__detail">
                                <span className="breakdown-row__label">
                                  Delivery days
                                </span>
                                <span className="breakdown-row__value">
                                  {vendor.deliveryDays}
                                </span>
                              </div>
                              <div className="vendor-row__detail">
                                <span className="breakdown-row__label">
                                  Delivery minimum
                                </span>
                                <span className="breakdown-row__value">
                                  {vendor.deliveryMinimum}
                                </span>
                              </div>
                            </div>
                            <div className="vendor-section">
                              <div
                                role="button"
                                tabIndex={0}
                                aria-expanded={isOrderGuideOpen}
                                onClick={() => handleOrderGuideToggle(vendor.id)}
                                onKeyDown={(event) =>
                                  handleOrderGuideKeyDown(event, vendor.id)
                                }
                                className="vendor-order-toggle"
                              >
                                <span className="metric__label">Order guide</span>
                              </div>
                              <div
                                className={`vendor-order-details${
                                  isOrderGuideOpen ? " vendor-order-details--open" : ""
                                }`}
                                aria-hidden={!isOrderGuideOpen}
                              >
                                <ul
                                  className="vendor-order-list"
                                >
                                  {vendor.orderGuide.map((item) => (
                                    <li key={item} className="breakdown-row__label">
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className="truth-section__body">Placeholder summary</p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default AppShell;
