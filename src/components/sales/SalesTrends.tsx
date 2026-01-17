const trendRows = [
  { label: "Total Sales", change: "+4.2%", direction: "up" },
  { label: "In-store", change: "+2.6%", direction: "up" },
  { label: "Takeout", change: "-1.8%", direction: "down" },
  { label: "Delivery (3rd-party sales)", change: "+0.0%", direction: "flat" },
  { label: "Tips", change: "+3.1%", direction: "up" },
  { label: "Check Average", change: "-0.6%", direction: "down" },
  { label: "Covers", change: "+1.4%", direction: "up" },
] as const;

const directionMeta = {
  up: { arrow: "↑", className: "sales-trends__value--up" },
  down: { arrow: "↓", className: "sales-trends__value--down" },
  flat: { arrow: "→", className: "sales-trends__value--flat" },
} as const;

const SalesTrends = () => {
  return (
    <section className="sales-trends">
      <div className="sales-trends__header">
        <h3 className="sales-trends__title">Sales Trends</h3>
        <p className="sales-trends__helper">Change vs prior comparable period</p>
      </div>
      <div className="sales-trends__table" role="table">
        <div className="sales-trends__row sales-trends__row--header" role="row">
          <span className="sales-trends__cell" role="columnheader">
            Category
          </span>
          <span className="sales-trends__cell" role="columnheader">
            Change
          </span>
        </div>
        {trendRows.map((row) => {
          const meta = directionMeta[row.direction];
          return (
            <div key={row.label} className="sales-trends__row" role="row">
              <span className="sales-trends__cell" role="cell">
                {row.label}
              </span>
              <span
                className={`sales-trends__cell sales-trends__value ${meta.className}`}
                role="cell"
              >
                <span className="sales-trends__arrow" aria-hidden="true">
                  {meta.arrow}
                </span>
                {row.change}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SalesTrends;
