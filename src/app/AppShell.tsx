import { useMemo, useState } from "react";

import PrimaryNav from "../navigation/PrimaryNav";
import SecondaryNav from "../navigation/SecondaryNav";
import { primaryTabs, secondaryTabs } from "../navigation/navConfig";

const AppShell = () => {
  const [activePrimaryId, setActivePrimaryId] = useState(primaryTabs[0].id);
  const [activeSecondaryId, setActiveSecondaryId] = useState(secondaryTabs[0].id);

  const activePrimary = useMemo(() => {
    return primaryTabs.find((tab) => tab.id === activePrimaryId) ?? primaryTabs[0];
  }, [activePrimaryId]);

  const activeSecondary = useMemo(() => {
    return secondaryTabs.find((tab) => tab.id === activeSecondaryId) ?? secondaryTabs[0];
  }, [activeSecondaryId]);

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
              <div>
                <h2 className="truth-card__title">{activePrimary.label}</h2>
                <p className="truth-card__subtitle">{activeSecondary.label}</p>
              </div>
              <SecondaryNav
                tabs={secondaryTabs}
                activeId={activeSecondaryId}
                onChange={setActiveSecondaryId}
              />
            </div>
            <p className="truth-card__summary">Placeholder summary</p>
          </section>

          <section className="truth-card">
            <h3 className="truth-card__section-title">Placeholder section</h3>
            <p className="truth-card__body">Placeholder summary</p>
          </section>

          <section className="truth-card">
            <h3 className="truth-card__section-title">Placeholder section</h3>
            <div className="truth-table">
              <div className="truth-table__row truth-table__row--head">
                <span>Placeholder table</span>
                <span>Placeholder table</span>
                <span>Placeholder table</span>
              </div>
              <div className="truth-table__row">
                <span>Placeholder</span>
                <span>Placeholder</span>
                <span>Placeholder</span>
              </div>
              <div className="truth-table__row">
                <span>Placeholder</span>
                <span>Placeholder</span>
                <span>Placeholder</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AppShell;
