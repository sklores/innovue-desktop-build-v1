import { useMemo, useState } from "react";

import PrimaryNav from "../navigation/PrimaryNav";
import SecondaryNav from "../navigation/SecondaryNav";

const primaryTabs = [
  {
    id: "sales",
    label: "Sales",
    header: "Sales Overview",
    subheader: "Performance Snapshot",
    contextLabel: "Sales context",
  },
  {
    id: "expenses",
    label: "Expenses",
    header: "Expense Clarity",
    subheader: "Monthly Spend",
    contextLabel: "Expense context",
  },
  {
    id: "financials",
    label: "Financials",
    header: "Financial Health",
    subheader: "Quarterly Standing",
    contextLabel: "Financial context",
  },
  {
    id: "presence",
    label: "Presence",
    header: "Market Presence",
    subheader: "Visibility Signals",
    contextLabel: "Presence context",
  },
  {
    id: "reporting",
    label: "Reporting",
    header: "Reporting Suite",
    subheader: "Executive Briefings",
    contextLabel: "Reporting context",
  },
];

const secondaryTabs = [
  {
    id: "overview",
    label: "Overview",
    body: "A composed summary of the current trend line, highlighting stability and incremental lift.",
  },
  {
    id: "breakdown",
    label: "Breakdown",
    body: "A quiet decomposition of primary drivers, offering clarity on the strongest contributors.",
  },
  {
    id: "forecast",
    label: "Forecast",
    body: "A forward-looking outlook that emphasizes measured growth and anticipated variance.",
  },
];

const AppShell = () => {
  const [activePrimary, setActivePrimary] = useState(primaryTabs[0]);
  const [activeSecondary, setActiveSecondary] = useState(secondaryTabs[0]);

  const contextCopy = useMemo(() => {
    return {
      title: `${activePrimary.label} briefing`,
      body: `Guidance and interpretation for ${activePrimary.label.toLowerCase()} signals across the week.`,
    };
  }, [activePrimary]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__brand">
          <div className="app-header__logo" aria-hidden="true">
            Logo
          </div>
          <div>
            <p className="app-header__label">Client</p>
            <h1 className="app-header__title">InnoVue Capital</h1>
          </div>
        </div>
        <div className="app-header__time">
          <p className="app-header__label">Current time</p>
          <span className="app-header__time-value">09:41 AM</span>
        </div>
      </header>

      <div className="app-body">
        <PrimaryNav
          items={primaryTabs}
          activeId={activePrimary.id}
          onChange={(id) => {
            const next = primaryTabs.find((tab) => tab.id === id);
            if (next) {
              setActivePrimary(next);
            }
          }}
        />

        <main className="app-content">
          <section className="content-card">
            <div className="content-card__header">
              <div>
                <p className="content-card__eyebrow">{activePrimary.header}</p>
                <h2 className="content-card__title">{activePrimary.subheader}</h2>
              </div>
              <span className="content-card__meta">Updated moments ago</span>
            </div>
            <div className="content-card__grid">
              <div className="stat-card">
                <p className="stat-card__label">Monthly insight</p>
                <p className="stat-card__value">$1.24M</p>
                <p className="stat-card__caption">Calm momentum</p>
              </div>
              <div className="stat-card">
                <p className="stat-card__label">Engagement</p>
                <p className="stat-card__value">128</p>
                <p className="stat-card__caption">Balanced activity</p>
              </div>
              <div className="stat-card">
                <p className="stat-card__label">Signal health</p>
                <p className="stat-card__value">Stable</p>
                <p className="stat-card__caption">No anomalies detected</p>
              </div>
            </div>
          </section>

          <section className="content-card">
            <div className="content-card__header">
              <div>
                <p className="content-card__eyebrow">{activeSecondary.label}</p>
                <h2 className="content-card__title">Context Narrative</h2>
              </div>
              <span className="content-card__meta">Contextual summary</span>
            </div>
            <div className="content-card__rows">
              <div className="content-row">
                <div>
                  <p className="content-row__title">Editorial note</p>
                  <p className="content-row__subtitle">{activeSecondary.body}</p>
                </div>
                <p className="content-row__value">Drafted</p>
              </div>
              <div className="content-row">
                <div>
                  <p className="content-row__title">Focus area</p>
                  <p className="content-row__subtitle">Measured progress with room for refinement.</p>
                </div>
                <p className="content-row__value">Aligned</p>
              </div>
              <div className="content-row">
                <div>
                  <p className="content-row__title">Next step</p>
                  <p className="content-row__subtitle">Maintain cadence and monitor weekly shifts.</p>
                </div>
                <p className="content-row__value">Ongoing</p>
              </div>
            </div>
          </section>
        </main>

        <SecondaryNav
          label={activePrimary.contextLabel}
          tabs={secondaryTabs}
          activeId={activeSecondary.id}
          onChange={(id) => {
            const next = secondaryTabs.find((tab) => tab.id === id);
            if (next) {
              setActiveSecondary(next);
            }
          }}
          contextTitle={contextCopy.title}
          contextBody={contextCopy.body}
        />
      </div>
    </div>
  );
};

export default AppShell;
