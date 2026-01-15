import { useEffect, useMemo, useState } from "react";

import PrimaryNav from "../navigation/PrimaryNav";
import SecondaryNav from "../navigation/SecondaryNav";
import { primaryTabs, secondaryTabsByPrimary } from "../navigation/navConfig";

const AppShell = () => {
  const [activePrimaryId, setActivePrimaryId] = useState(primaryTabs[0].id);
  const [activeSecondaryId, setActiveSecondaryId] = useState(
    secondaryTabsByPrimary[primaryTabs[0].id][0].id,
  );

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
            <p className="truth-section__body">Placeholder summary</p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AppShell;
