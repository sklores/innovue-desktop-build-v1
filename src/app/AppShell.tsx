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

  const activeMetrics = salesOverviewMetrics[activeTime] ?? salesOverviewMetrics.Week;

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

            {isSalesOverview ? (
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
