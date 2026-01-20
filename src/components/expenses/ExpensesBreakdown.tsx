type ExpensesBreakdownProps = {
  total: string;
  categories: Record<string, string>;
  percents: Record<string, string>;
};

const breakdownRows = [
  { key: "Labor", label: "Labor" },
  { key: "COGS", label: "COGS" },
  { key: "Fixed costs", label: "Fixed Costs" },
  { key: "Utilities", label: "Utilities" },
  { key: "Chemicals", label: "Chemicals" },
  { key: "Linen", label: "Linen" },
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
      {breakdownRows.map((row) => (
        <div key={row.key} className="breakdown-row" role="row">
          <span className="breakdown-row__label" role="cell">
            {row.label}
          </span>
          <span className="breakdown-row__value" role="cell">
            {categories[row.key]}
          </span>
          <span className="breakdown-row__percent" role="cell">
            {percents[row.key]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ExpensesBreakdown;
