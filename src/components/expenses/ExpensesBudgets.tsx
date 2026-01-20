type BudgetRow = {
  id: string;
  label: string;
  budget: number;
  actual: number;
};

const budgetRows: BudgetRow[] = [
  { id: "labor", label: "Labor", budget: 356400, actual: 372900 },
  { id: "cogs", label: "COGS", budget: 320600, actual: 309800 },
  { id: "fixed-costs", label: "Fixed Costs", budget: 186900, actual: 192300 },
  { id: "utilities", label: "Utilities", budget: 92300, actual: 88750 },
  { id: "chemicals", label: "Chemicals", budget: 48500, actual: 51200 },
  { id: "linen", label: "Linen", budget: 36200, actual: 34150 },
];

const formatCurrency = (value: number) => `$${Math.round(value).toLocaleString()}`;

const ExpensesBudgets = () => {
  const totals = budgetRows.reduce(
    (accumulator, row) => {
      return {
        budget: accumulator.budget + row.budget,
        actual: accumulator.actual + row.actual,
      };
    },
    { budget: 0, actual: 0 },
  );

  const rowsWithTotals = [
    ...budgetRows,
    { id: "total", label: "Total", budget: totals.budget, actual: totals.actual },
  ];

  return (
    <section className="truth-section">
      <div className="truth-section__content">
        <div className="expenses-budgets" role="table">
          <div className="expenses-budgets__row expenses-budgets__row--header" role="row">
            <span className="expenses-budgets__cell" role="columnheader">
              Category
            </span>
            <span className="expenses-budgets__cell expenses-budgets__cell--number" role="columnheader">
              Budget
            </span>
            <span className="expenses-budgets__cell expenses-budgets__cell--number" role="columnheader">
              Actual
            </span>
            <span className="expenses-budgets__cell expenses-budgets__cell--number" role="columnheader">
              Variance
            </span>
            <span className="expenses-budgets__cell expenses-budgets__cell--number" role="columnheader">
              % of Budget
            </span>
          </div>
          {rowsWithTotals.map((row) => {
            const variance = row.actual - row.budget;
            let varianceClass = "expenses-budgets__variance--neutral";
            if (variance > 0) {
              varianceClass = "expenses-budgets__variance--negative";
            } else if (variance < 0) {
              varianceClass = "expenses-budgets__variance--positive";
            }
            const percentOfBudget = row.budget
              ? Math.round((row.actual / row.budget) * 100)
              : 0;
            const isTotal = row.id === "total";

            return (
              <div
                key={row.id}
                className={`expenses-budgets__row${isTotal ? " expenses-budgets__row--total" : ""}`}
                role="row"
              >
                <span className="expenses-budgets__cell" role="cell">
                  {row.label}
                </span>
                <span
                  className="expenses-budgets__cell expenses-budgets__cell--number"
                  role="cell"
                >
                  {formatCurrency(row.budget)}
                </span>
                <span
                  className="expenses-budgets__cell expenses-budgets__cell--number"
                  role="cell"
                >
                  {formatCurrency(row.actual)}
                </span>
                <span
                  className={`expenses-budgets__cell expenses-budgets__cell--number ${varianceClass}`}
                  role="cell"
                >
                  {formatCurrency(variance)}
                </span>
                <span
                  className="expenses-budgets__cell expenses-budgets__cell--number"
                  role="cell"
                >
                  {percentOfBudget}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExpensesBudgets;
