type ExpensesBudgetsProps = {
  activeTime: string;
};

const ExpensesBudgets = ({ activeTime }: ExpensesBudgetsProps) => {
  const parseCurrency = (value: string) => {
    const numeric = Number(value.replace(/[^0-9.-]+/g, ""));
    return Number.isNaN(numeric) ? 0 : numeric;
  };
  const formatCurrency = (value: number) => `$${Math.round(value).toLocaleString()}`;
  const budgetsByTime: Record<string, Record<string, number>> = {
    Week: {
      Labor: 52000,
      COGS: 33000,
      "Fixed costs": 18000,
      Utilities: 7200,
      Chemicals: 3200,
      Linen: 2200,
    },
    Month: {
      Labor: 214000,
      COGS: 134000,
      "Fixed costs": 72000,
      Utilities: 29400,
      Chemicals: 12800,
      Linen: 8800,
    },
    Quarter: {
      Labor: 642000,
      COGS: 402000,
      "Fixed costs": 216000,
      Utilities: 88200,
      Chemicals: 38400,
      Linen: 26400,
    },
    Year: {
      Labor: 2580000,
      COGS: 1620000,
      "Fixed costs": 864000,
      Utilities: 352800,
      Chemicals: 153600,
      Linen: 105600,
    },
  };
  const actualsByTime: Record<string, Record<string, number>> = {
    Week: {
      Labor: 49800,
      COGS: 35200,
      "Fixed costs": 18000,
      Utilities: 7200,
      Chemicals: 3600,
      Linen: 2100,
    },
    Month: {
      Labor: 219000,
      COGS: 126000,
      "Fixed costs": 72000,
      Utilities: 30100,
      Chemicals: 12400,
      Linen: 9200,
    },
    Quarter: {
      Labor: 635000,
      COGS: 418000,
      "Fixed costs": 216000,
      Utilities: 87000,
      Chemicals: 40200,
      Linen: 24800,
    },
    Year: {
      Labor: 2520000,
      COGS: 1685000,
      "Fixed costs": 864000,
      Utilities: 360000,
      Chemicals: 150000,
      Linen: 98000,
    },
  };
  const budgets = budgetsByTime[activeTime] ?? budgetsByTime.Week;
  const budgetRows = [
    { key: "Labor", label: "Labor" },
    { key: "COGS", label: "COGS" },
    { key: "Fixed costs", label: "Fixed Costs" },
    { key: "Utilities", label: "Utilities" },
    { key: "Chemicals", label: "Chemicals" },
    { key: "Linen", label: "Linen" },
  ];
  const budgetDetails: Record<string, { label: string; share: number }[]> = {
    Labor: [
      { label: "Cook", share: 0.45 },
      { label: "Manager", share: 0.33 },
      { label: "Cashier", share: 0.22 },
    ],
    COGS: [
      { label: "Food", share: 0.52 },
      { label: "Beverage", share: 0.28 },
      { label: "Alcohol", share: 0.2 },
    ],
    "Fixed costs": [
      { label: "Rent", share: 0.5 },
      { label: "Insurance", share: 0.2 },
      { label: "Accounting", share: 0.18 },
      { label: "Bookkeeping", share: 0.12 },
    ],
    Utilities: [
      { label: "Electric", share: 0.4 },
      { label: "Gas", share: 0.25 },
      { label: "Water", share: 0.2 },
      { label: "Internet", share: 0.15 },
    ],
    Chemicals: [
      { label: "Cleaning supplies", share: 0.6 },
      { label: "Sanitizer", share: 0.4 },
    ],
    Linen: [
      { label: "Linen service", share: 0.7 },
      { label: "Towels", share: 0.3 },
    ],
  };
  const totals = budgetRows.reduce(
    (acc, row) => {
      const actual = actualsByTime[activeTime]?.[row.key] ?? actualsByTime.Week[row.key] ?? 0;
      const budget = budgets[row.key] ?? 0;
      return {
        budget: acc.budget + budget,
        actual: acc.actual + actual,
      };
    },
    { budget: 0, actual: 0 },
  );
  const totalVariance = totals.actual - totals.budget;
  const formatVariance = (value: number) => {
    if (value === 0) {
      return formatCurrency(0);
    }
    const sign = value > 0 ? "+" : "−";
    return `${sign}${formatCurrency(Math.abs(value))}`;
  };
  const getVarianceClass = (value: number) => {
    if (value > 0) return "budget-variance--over";
    if (value < 0) return "budget-variance--under";
    return "budget-variance--even";
  };
  const getActualClass = (value: number) => {
    if (value > 0) return "budget-actual--over";
    if (value < 0) return "budget-actual--under";
    return "budget-actual--even";
  };
  const getSpendPercent = (actual: number, budget: number) => {
    if (budget === 0) return 0;
    return Math.round((actual / budget) * 100);
  };
  const getSpendClass = (percent: number) => {
    if (percent > 100) return "budget-spend--over";
    if (percent < 100) return "budget-spend--under";
    return "budget-spend--even";
  };

  return (
    <table className="budget-table">
      <thead>
        <tr>
          <th scope="col">Category</th>
          <th scope="col">Budget</th>
          <th scope="col">Actual</th>
          <th scope="col">Variance</th>
          <th scope="col">Spend</th>
        </tr>
      </thead>
      <tbody>
        {budgetRows.map((row) => {
          const actual = actualsByTime[activeTime]?.[row.key] ?? actualsByTime.Week[row.key] ?? 0;
          const budget = budgets[row.key] ?? 0;
          const variance = actual - budget;
          const spendPercent = getSpendPercent(actual, budget);
          const varianceClass = getVarianceClass(variance);
          const actualClass = getActualClass(variance);
          const spendClass = getSpendClass(spendPercent);
          return (
            <tr key={row.key}>
              <td>{row.label}</td>
              <td className="budget-table__number">{formatCurrency(budget)}</td>
              <td className={`budget-table__number ${actualClass}`}>
                {formatCurrency(actual)}
              </td>
              <td className={`budget-table__number ${varianceClass}`}>
                {formatVariance(variance)}
              </td>
              <td className={`budget-table__number ${spendClass}`}>{spendPercent}%</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr className="budget-table__total">
          <td>Total</td>
          <td className="budget-table__number">{formatCurrency(totals.budget)}</td>
          <td
            className={`budget-table__number ${getActualClass(
              totalVariance,
            )}`}
          >
            {formatCurrency(totals.actual)}
          </td>
          <td
            className={`budget-table__number ${getVarianceClass(
              totalVariance,
            )}`}
          >
            {formatVariance(totalVariance)}
          </td>
          <td
            className={`budget-table__number ${getSpendClass(
              getSpendPercent(totals.actual, totals.budget),
            )}`}
          >
            {getSpendPercent(totals.actual, totals.budget)}%
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ExpensesBudgets;
