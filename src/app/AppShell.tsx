import PrimaryNav from "../navigation/PrimaryNav";
import SecondaryNav from "../navigation/SecondaryNav";

const AppShell = () => {
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
        <PrimaryNav />
        <SecondaryNav />

        <main className="app-content">
          <section className="content-card">
            <div className="content-card__header">
              <div>
                <p className="content-card__eyebrow">Sales Overview</p>
                <h2 className="content-card__title">Performance Snapshot</h2>
              </div>
              <span className="content-card__meta">Updated moments ago</span>
            </div>
            <div className="content-card__grid">
              <div className="stat-card">
                <p className="stat-card__label">Monthly revenue</p>
                <p className="stat-card__value">$1.24M</p>
                <p className="stat-card__caption">+4.2% vs last month</p>
              </div>
              <div className="stat-card">
                <p className="stat-card__label">Active accounts</p>
                <p className="stat-card__value">128</p>
                <p className="stat-card__caption">Stable engagement</p>
              </div>
              <div className="stat-card">
                <p className="stat-card__label">Pipeline health</p>
                <p className="stat-card__value">Strong</p>
                <p className="stat-card__caption">Balanced mid-funnel</p>
              </div>
            </div>
          </section>

          <section className="content-card">
            <div className="content-card__header">
              <div>
                <p className="content-card__eyebrow">Forecast</p>
                <h2 className="content-card__title">Quarterly Outlook</h2>
              </div>
              <span className="content-card__meta">Next 90 days</span>
            </div>
            <div className="content-card__rows">
              <div className="content-row">
                <div>
                  <p className="content-row__title">Projected revenue</p>
                  <p className="content-row__subtitle">Range based on current commitments</p>
                </div>
                <p className="content-row__value">$3.8M – $4.1M</p>
              </div>
              <div className="content-row">
                <div>
                  <p className="content-row__title">Renewal momentum</p>
                  <p className="content-row__subtitle">Accounts at moderate risk</p>
                </div>
                <p className="content-row__value">Low variance</p>
              </div>
              <div className="content-row">
                <div>
                  <p className="content-row__title">Key focus</p>
                  <p className="content-row__subtitle">Enterprise segments remain strongest</p>
                </div>
                <p className="content-row__value">Prioritize enterprise</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AppShell;
