const SecondaryNav = () => {
  return (
    <aside className="secondary-nav" aria-label="Secondary">
      <div className="secondary-nav__header">
        <p className="secondary-nav__label">Sales views</p>
      </div>
      <div className="secondary-nav__tabs">
        <span className="secondary-nav__tab secondary-nav__tab--active">Overview</span>
        <span className="secondary-nav__tab">Breakdown</span>
        <span className="secondary-nav__tab">Forecast</span>
      </div>
      <div className="secondary-nav__panel">
        <p className="secondary-nav__panel-title">Focus summary</p>
        <p className="secondary-nav__panel-body">
          Snapshot highlights the strongest revenue drivers and areas of watch for the week.
        </p>
      </div>
    </aside>
  );
};

export default SecondaryNav;
