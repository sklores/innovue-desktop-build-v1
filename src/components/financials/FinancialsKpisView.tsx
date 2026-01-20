const FinancialsKpisView = () => {
  return (
    <section className="truth-section">
      <div className="truth-section__content">
        <div className="kpi-grid" role="list">
          <div className="kpi-tile kpi-tile--positive" role="listitem">
            <p className="kpi-tile__value">62%</p>
            <p className="kpi-tile__label">Prime Cost</p>
          </div>
          <div className="kpi-tile kpi-tile--positive" role="listitem">
            <p className="kpi-tile__value">$78</p>
            <p className="kpi-tile__label">Sales per Labor Hour</p>
          </div>
          <div className="kpi-tile kpi-tile--negative" role="listitem">
            <p className="kpi-tile__value">-4%</p>
            <p className="kpi-tile__label">Worked vs Scheduled Hours</p>
          </div>
          <div className="kpi-tile kpi-tile--positive" role="listitem">
            <p className="kpi-tile__value">$1,240</p>
            <p className="kpi-tile__label">Sales per Sq Ft</p>
          </div>
          <div className="kpi-tile kpi-tile--positive" role="listitem">
            <p className="kpi-tile__value">18%</p>
            <p className="kpi-tile__label">Net Profit %</p>
          </div>
          <div className="kpi-tile kpi-tile--neutral" role="listitem">
            <p className="kpi-tile__value">9%</p>
            <p className="kpi-tile__label">Rent as % of Sales</p>
          </div>
          <div className="kpi-tile kpi-tile--positive" role="listitem">
            <p className="kpi-tile__value">$84,700</p>
            <p className="kpi-tile__label">Average Weekly Sales</p>
          </div>
          <div className="kpi-tile kpi-tile--neutral" role="listitem">
            <p className="kpi-tile__value">$21 / hr</p>
            <p className="kpi-tile__label">Avg Employee Hourly Wage</p>
          </div>
          <div className="kpi-tile kpi-tile--positive" role="listitem">
            <p className="kpi-tile__value">$312,000</p>
            <p className="kpi-tile__label">EBITDA</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialsKpisView;
