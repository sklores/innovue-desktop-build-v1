import { useEffect, useMemo, useState } from "react";

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

const breakdownRows = [
  "In-store",
  "Takeout",
  "Delivery",
  "3rd-party tips",
  "Check average",
  "Covers",
];

const AppShell = () => {
  const [activePrimaryId, setActivePrimaryId] = useState(primaryTabs[0].id);
  const [activeSecondaryId, setActiveSecondaryId] = useState(
    secondaryTabsByPrimary[primaryTabs[0].id][0].id,
  );
  const [activeTime, setActiveTime] = useState(timeOptions[7]);

  const activePrimary = useMemo(() => {
    return primaryTabs.find((tab) => tab.id === activePrimaryId) ?? primaryTabs[0];
  }, [activePrimaryId]);

  const secondaryTabs = useMemo(() => {
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

  const activeMetrics = salesOverviewMetrics[activeTime] ?? salesOverviewMetrics.Week;
  const activeBreakdown =
    salesBreakdownMetrics[activeTime] ?? salesBreakdownMetrics.Week;

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-header__kicker">InnoVue Desktop</p>
          <h1 className="app-header__title">Truth Board</h1>
        </div>
        <div className="app-header__meta">
          <p className="app-header__meta-label">Last updated</p>
          <span className="app-header__meta-value">Just now</span>
        </div>
      </header>

      <div className="app-body">
        <PrimaryNav
          items={primaryTabs}
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
              <h3 className="truth-section__title">Placeholder section</h3>
            </div>

            {isSalesOverview || isSalesBreakdown ? (
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
                ) : (
                  <div className="breakdown-table" role="table">
                    {breakdownRows.map((label) => (
                      <div key={label} className="breakdown-row" role="row">
                        <span className="breakdown-row__label" role="cell">
                          {label}
                        </span>
                        <span className="breakdown-row__value" role="cell">
                          {activeBreakdown[label]}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
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
