import { useState } from "react";

const trendRows = [
  { label: "Total Sales", change: "+4.2%", direction: "up" },
  { label: "In-store", change: "+2.6%", direction: "up" },
  { label: "Takeout", change: "-1.8%", direction: "down" },
  { label: "Delivery (3rd-party sales)", change: "+0.0%", direction: "flat" },
  { label: "Tips", change: "+3.1%", direction: "up" },
  { label: "Check Average", change: "-0.6%", direction: "down" },
  { label: "Covers", change: "+1.4%", direction: "up" },
] as const;

const toDateOptions = ["WTD", "MTD", "YTD"] as const;
type ToDateOption = (typeof toDateOptions)[number];

const toDateSummary = {
  WTD: {
    title: "Week to Date",
    label: "Today vs same weekday last week",
    change: "+2.1%",
    direction: "up",
  },
  MTD: {
    title: "Month to Date",
    label: "Month to date vs same month last year",
    change: "-0.9%",
    direction: "down",
  },
  YTD: {
    title: "Year to Date",
    label: "Year to date vs last year to date",
    change: "+3.4%",
    direction: "up",
  },
} as const satisfies Record<
  ToDateOption,
  { title: string; label: string; change: string; direction: "up" | "down" | "flat" }
>;

const toDateBreakdowns = {
  WTD: [
    { label: "Total Sales", change: "+2.1%", direction: "up" },
    { label: "In-store", change: "+1.4%", direction: "up" },
    { label: "Takeout", change: "-0.3%", direction: "flat" },
    { label: "Delivery (3rd-party sales)", change: "+0.8%", direction: "up" },
    { label: "Tips", change: "+1.9%", direction: "up" },
    { label: "Check Average", change: "-0.4%", direction: "down" },
    { label: "Covers", change: "+1.1%", direction: "up" },
  ],
  MTD: [
    { label: "Total Sales", change: "-0.9%", direction: "down" },
    { label: "In-store", change: "-1.2%", direction: "down" },
    { label: "Takeout", change: "+0.5%", direction: "up" },
    { label: "Delivery (3rd-party sales)", change: "+0.1%", direction: "flat" },
    { label: "Tips", change: "-0.6%", direction: "down" },
    { label: "Check Average", change: "+0.2%", direction: "flat" },
    { label: "Covers", change: "-0.8%", direction: "down" },
  ],
  YTD: [
    { label: "Total Sales", change: "+3.4%", direction: "up" },
    { label: "In-store", change: "+2.8%", direction: "up" },
    { label: "Takeout", change: "+1.6%", direction: "up" },
    { label: "Delivery (3rd-party sales)", change: "+0.4%", direction: "flat" },
    { label: "Tips", change: "+2.2%", direction: "up" },
    { label: "Check Average", change: "+0.7%", direction: "up" },
    { label: "Covers", change: "+1.9%", direction: "up" },
  ],
} as const satisfies Record<
  ToDateOption,
  { label: string; change: string; direction: "up" | "down" | "flat" }[]
>;

const directionMeta = {
  up: { arrow: "↑", className: "sales-trends__value--up" },
  down: { arrow: "↓", className: "sales-trends__value--down" },
  flat: { arrow: "→", className: "sales-trends__value--flat" },
} as const;

const SalesTrends = () => {
  const [activeToDate, setActiveToDate] = useState<ToDateOption>("WTD");
  const activeBreakdown = toDateBreakdowns[activeToDate];

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
      <div className="sales-trends__to-date">
        <div className="sales-trends__header">
          <h4 className="sales-trends__title">To-Date Performance</h4>
          <p className="sales-trends__helper">
            To-date performance compared to the same point in the prior period.
          </p>
        </div>
        <div className="sales-trends__selector" role="tablist">
          {toDateOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={`sales-trends__pill ${
                activeToDate === option ? "sales-trends__pill--active" : ""
              }`}
              onClick={() => setActiveToDate(option)}
              role="tab"
              aria-selected={activeToDate === option}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="sales-trends__cards">
          {toDateOptions.map((option) => {
            const summary = toDateSummary[option];
            const meta = directionMeta[summary.direction];
            return (
              <div
                key={summary.title}
                className={`sales-trends__card ${
                  activeToDate === option ? "sales-trends__card--active" : ""
                }`}
              >
                <p className="sales-trends__card-title">{summary.title}</p>
                <p className="sales-trends__card-label">{summary.label}</p>
                <p className={`sales-trends__card-value ${meta.className}`}>
                  <span className="sales-trends__arrow" aria-hidden="true">
                    {meta.arrow}
                  </span>
                  {summary.change}
                </p>
              </div>
            );
          })}
        </div>
        <div className="sales-trends__mini-table" role="table">
          <div className="sales-trends__row sales-trends__row--header" role="row">
            <span className="sales-trends__cell" role="columnheader">
              Category
            </span>
            <span className="sales-trends__cell" role="columnheader">
              Change
            </span>
          </div>
          {activeBreakdown.map((row) => {
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
      </div>
    </section>
  );
};

export default SalesTrends;
