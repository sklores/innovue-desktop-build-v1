const PrimaryNav = () => {
  return (
    <nav className="primary-nav" aria-label="Primary">
      <div className="primary-nav__header">
        <p className="primary-nav__label">Modules</p>
      </div>
      <ul className="primary-nav__list">
        <li className="primary-nav__item primary-nav__item--active">Sales</li>
        <li className="primary-nav__item">Expenses</li>
        <li className="primary-nav__item">Financials</li>
        <li className="primary-nav__item">Presence</li>
        <li className="primary-nav__item">Reporting</li>
      </ul>
    </nav>
  );
};

export default PrimaryNav;
