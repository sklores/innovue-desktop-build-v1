type BudgetRow = {
  id: string;
  label: string;
  budget: number;
  actual: number;
};

type TimeKey =
  | "Mon"
  | "Tue"
  | "Wed"
  | "Thu"
  | "Fri"
  | "Sat"
  | "Sun"
  | "Week"
  | "Month"
  | "Quarter"
  | "Year";

const budgetsByTime: Record<TimeKey, BudgetRow[]> = {
  Mon: [
    { id: "labor", label: "Labor", budget: 12720, actual: 13210 },
    { id: "cogs", label: "COGS", budget: 11860, actual: 11450 },
    { id: "fixed-costs", label: "Fixed Costs", budget: 6740, actual: 6930 },
    { id: "utilities", label: "Utilities", budget: 3320, actual: 3180 },
    { id: "chemicals", label: "Chemicals", budget: 1760, actual: 1890 },
    { id: "linen", label: "Linen", budget: 1980, actual: 1900 },
  ],
  Tue: [
    { id: "labor", label: "Labor", budget: 13240, actual: 13620 },
    { id: "cogs", label: "COGS", budget: 12460, actual: 12180 },
    { id: "fixed-costs", label: "Fixed Costs", budget: 6900, actual: 7020 },
    { id: "utilities", label: "Utilities", budget: 3520, actual: 3400 },
    { id: "chemicals", label: "Chemicals", budget: 1820, actual: 1940 },
    { id: "linen", label: "Linen", budget: 1970, actual: 1900 },
  ],
  Wed: [
    { id: "labor", label: "Labor", budget: 13610, actual: 14180 },
    { id: "cogs", label: "COGS", budget: 12840, actual: 12560 },
    { id: "fixed-costs", label: "Fixed Costs", budget: 7050, actual: 7160 },
    { id: "utilities", label: "Utilities", budget: 3600, actual: 3520 },
    { id: "chemicals", label: "Chemicals", budget: 1900, actual: 2050 },
    { id: "linen", label: "Linen", budget: 2020, actual: 1960 },
  ],
  Thu: [
    { id: "labor", label: "Labor", budget: 13420, actual: 13880 },
    { id: "cogs", label: "COGS", budget: 12690, actual: 12340 },
    { id: "fixed-costs", label: "Fixed Costs", budget: 6980, actual: 7100 },
    { id: "utilities", label: "Utilities", budget: 3540, actual: 3440 },
    { id: "chemicals", label: "Chemicals", budget: 1860, actual: 2010 },
    { id: "linen", label: "Linen", budget: 2180, actual: 2080 },
  ],
  Fri: [
    { id: "labor", label: "Labor", budget: 14950, actual: 15640 },
    { id: "cogs", label: "COGS", budget: 13920, actual: 13480 },
    { id: "fixed-costs", label: "Fixed Costs", budget: 7540, actual: 7820 },
    { id: "utilities", label: "Utilities", budget: 3780, actual: 3640 },
    { id: "chemicals", label: "Chemicals", budget: 2080, actual: 2250 },
    { id: "linen", label: "Linen", budget: 2560, actual: 2440 },
  ],
  Sat: [
    { id: "labor", label: "Labor", budget: 9380, actual: 9120 },
    { id: "cogs", label: "COGS", budget: 8780, actual: 8520 },
    { id: "fixed-costs", label: "Fixed Costs", budget: 4940, actual: 5060 },
    { id: "utilities", label: "Utilities", budget: 2380, actual: 2320 },
    { id: "chemicals", label: "Chemicals", budget: 1420, actual: 1560 },
    { id: "linen", label: "Linen", budget: 640, actual: 600 },
  ],
  Sun: [
    { id: "labor", label: "Labor", budget: 8620, actual: 8380 },
    { id: "cogs", label: "COGS", budget: 8020, actual: 7760 },
    { id: "fixed-costs", label: "Fixed Costs", budget: 4580, actual: 4700 },
    { id: "utilities", label: "Utilities", budget: 2180, actual: 2100 },
    { id: "chemicals", label: "Chemicals", budget: 1240, actual: 1360 },
    { id: "linen", label: "Linen", budget: 1320, actual: 1260 },
  ],
  Week: [
    { id: "labor", label: "Labor", budget: 86520, actual: 88930 },
    { id: "cogs", label: "COGS", budget: 80450, actual: 78520 },
    { id: "fixed-costs", label: "Fixed Costs", budget: 44980, actual: 46290 },
    { id: "utilities", label: "Utilities", budget: 21820, actual: 21100 },
    { id: "chemicals", label: "Chemicals", budget: 11820, actual: 12650 },
    { id: "linen", label: "Linen", budget: 13920, actual: 13340 },
  ],
  Month: [
    { id: "labor", label: "Labor", budget: 356400, actual: 372900 },
    { id: "cogs", label: "COGS", budget: 320600, actual: 309800 },
    { id: "fixed-costs", label: "Fixed Costs", budget: 186900, actual: 192300 },
    { id: "utilities", label: "Utilities", budget: 92300, actual: 88750 },
    { id: "chemicals", label: "Chemicals", budget: 48500, actual: 51200 },
    { id: "linen", label: "Linen", budget: 36200, actual: 34150 },
  ],
  Quarter: [
    { id: "labor", label: "Labor", budget: 1069200, actual: 1118700 },
    { id: "cogs", label: "COGS", budget: 961800, actual: 929400 },
    { id: "fixed-costs", label: "Fixed Costs", budget: 560700, actual: 576900 },
    { id: "utilities", label: "Utilities", budget: 276900, actual: 266400 },
    { id: "chemicals", label: "Chemicals", budget: 145500, actual: 153600 },
    { id: "linen", label: "Linen", budget: 108500, actual: 102450 },
  ],
  Year: [
    { id: "labor", label: "Labor", budget: 4348800, actual: 4556400 },
    { id: "cogs", label: "COGS", budget: 3902800, actual: 3779200 },
    { id: "fixed-costs", label: "Fixed Costs", budget: 2276400, actual: 2347200 },
    { id: "utilities", label: "Utilities", budget: 1107600, actual: 1074000 },
    { id: "chemicals", label: "Chemicals", budget: 582000, actual: 618400 },
    { id: "linen", label: "Linen", budget: 385200, actual: 362800 },
  ],
};

const formatCurrency = (value: number) => `$${Math.round(value).toLocaleString()}`;

type ExpensesBudgetsProps = {
  activeTime: string;
};

const ExpensesBudgets = ({ activeTime }: ExpensesBudgetsProps) => {
  const timeKey = (activeTime as TimeKey) in budgetsByTime ? (activeTime as TimeKey) : "Week";
  const budgetRows = budgetsByTime[timeKey];

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
