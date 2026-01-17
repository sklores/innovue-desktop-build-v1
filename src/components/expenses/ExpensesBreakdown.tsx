type ExpensesBreakdownProps = {
  total: string;
  categories: Record<string, string>;
  percents: Record<string, string>;
};

const breakdownRows = [
  "Labor",
  "COGS",
  "Fixed costs",
  "Utilities",
  "Chemicals",
  "Linen",
] as const;

const ExpensesBreakdown = ({ total, categories, percents }: ExpensesBreakdownProps) => {
  return (
    <div className="breakdown-table" role="table">
      <div className="breakdown-row breakdown-row--header" role="row">
        <span className="breakdown-row__label" role="columnheader">
          Category
        </span>
        <span className="breakdown-row__value" role="columnheader">
          Amount
        </span>
        <span className="breakdown-row__percent" role="columnheader">
          % of Total
        </span>
      </div>
      <div className="breakdown-row expense-breakdown__row--total" role="row">
        <span className="breakdown-row__label" role="cell">
          Total Expenses
        </span>
        <span className="breakdown-row__value" role="cell">
          {total}
        </span>
        <span className="breakdown-row__percent" role="cell">
          100%
        </span>
      </div>
      {breakdownRows.map((label) => (
        <div key={label} className="breakdown-row" role="row">
          <span className="breakdown-row__label" role="cell">
            {label}
          </span>
          <span className="breakdown-row__value" role="cell">
            {categories[label]}
          </span>
          <span className="breakdown-row__percent" role="cell">
            {percents[label]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ExpensesBreakdown;
