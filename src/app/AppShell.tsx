import { useMemo, useState } from "react";

import PrimaryNav from "../navigation/PrimaryNav";
import SecondaryNav from "../navigation/SecondaryNav";

const primaryTabs = [
  {
    id: "sales",
    label: "Sales",
    header: "Desktop Truth Board",
    subtitle: "A calm, executive snapshot of revenue momentum and pipeline stability.",
    region: "North America",
  },
  {
    id: "expenses",
    label: "Expenses",
    header: "Desktop Truth Board",
    subtitle: "A steady view of cost posture, operational rhythm, and spend discipline.",
    region: "North America",
  },
  {
    id: "financials",
    label: "Financials",
    header: "Desktop Truth Board",
    subtitle: "An editorial read on balance, liquidity, and quarter-to-date outcomes.",
    region: "North America",
  },
  {
    id: "presence",
    label: "Presence",
    header: "Desktop Truth Board",
    subtitle: "A grounded look at visibility signals, reach, and brand cadence.",
    region: "North America",
  },
  {
    id: "reporting",
    label: "Reporting",
    header: "Desktop Truth Board",
    subtitle: "A composed digest of reporting rhythm and executive-ready highlights.",
    region: "North America",
  },
];

const secondaryTabs = [
  {
    id: "overview",
    label: "Overview",
    summary: "A high-level narrative emphasizing stability and measured progress.",
  },
  {
    id: "breakdown",
    label: "Breakdown",
    summary: "A focused readout of what is working and where attention is needed.",
  },
  {
    id: "forecast",
    label: "Forecast",
    summary: "A forward view grounded in current signals and cautious optimism.",
  },
];

const AppShell = () => {
  const [activePrimaryId, setActivePrimaryId] = useState(primaryTabs[0].id);
  const [activeSecondaryId, setActiveSecondaryId] = useState(secondaryTabs[0].id);

  const activePrimary = useMemo(() => {
    return primaryTabs.find((tab) => tab.id === activePrimaryId) ?? primaryTabs[0];
  }, [activePrimaryId]);

  const activeSecondary = useMemo(() => {
    return secondaryTabs.find((tab) => tab.id === activeSecondaryId) ?? secondaryTabs[0];
  }, [activeSecondaryId]);

  const sectionCopy = useMemo(() => {
    const lead = `${activePrimary.label} ${activeSecondary.label.toLowerCase()}`;
    return {
      pipeline: `${lead} signals show a steady lift with limited volatility across the funnel.`,
      watchlist: `${lead} watchlist remains stable with two accounts requiring soft follow-up.`,
      regional: `${lead} outlook is balanced, with modest acceleration in core markets.`,
      rhythm: `${lead} activity cadence is consistent with the last two reporting cycles.`,
    };
  }, [activePrimary.label, activeSecondary.label]);

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
          activeId={activePrimaryId}
          onChange={setActivePrimaryId}
        />

        <main className="app-content">
          <section className="truth-card truth-card--header">
            <div>
              <h2 className="truth-card__title">{activePrimary.header}</h2>
              <p className="truth-card__subtitle">{activePrimary.subtitle}</p>
            </div>
            <div className="truth-card__meta">
              <div>
                <p className="truth-card__meta-label">Last updated</p>
                <p className="truth-card__meta-value">Moments ago</p>
              </div>
              <div>
                <p className="truth-card__meta-label">Region focus</p>
                <p className="truth-card__meta-value">{activePrimary.region}</p>
              </div>
            </div>
          </section>

          <section className="truth-card">
            <div className="truth-card__header">
              <h3 className="truth-card__section-title">Pipeline health</h3>
              <span className="truth-card__section-meta">Stable confidence</span>
            </div>
            <p className="truth-card__body">{sectionCopy.pipeline}</p>
          </section>

          <section className="truth-card">
            <div className="truth-card__header">
              <h3 className="truth-card__section-title">Key account watchlist</h3>
              <span className="truth-card__section-meta">Quiet monitoring</span>
            </div>
            <p className="truth-card__body">{sectionCopy.watchlist}</p>
          </section>

          <section className="truth-card">
            <div className="truth-card__header">
              <h3 className="truth-card__section-title">Regional outlook</h3>
              <span className="truth-card__section-meta">Current quarter</span>
            </div>
            <div className="truth-table">
              <div className="truth-table__row truth-table__row--head">
                <span>Region</span>
                <span>Momentum</span>
                <span>Note</span>
              </div>
              <div className="truth-table__row">
                <span>North</span>
                <span>Steady</span>
                <span>Core accounts stable</span>
              </div>
              <div className="truth-table__row">
                <span>Central</span>
                <span>Improving</span>
                <span>New opportunities emerging</span>
              </div>
              <div className="truth-table__row">
                <span>South</span>
                <span>Measured</span>
                <span>Focus on retention</span>
              </div>
            </div>
            <p className="truth-card__body">{sectionCopy.regional}</p>
          </section>

          <section className="truth-card">
            <div className="truth-card__header">
              <h3 className="truth-card__section-title">Activity rhythm</h3>
              <span className="truth-card__section-meta">Weekly cadence</span>
            </div>
            <p className="truth-card__body">{sectionCopy.rhythm}</p>
          </section>
        </main>

        <SecondaryNav
          label={`${activePrimary.label} context`}
          tabs={secondaryTabs}
          activeId={activeSecondaryId}
          onChange={setActiveSecondaryId}
          contextTitle={`${activeSecondary.label} brief`}
          contextBody={activeSecondary.summary}
        />
      </div>
    </div>
  );
};

export default AppShell;
