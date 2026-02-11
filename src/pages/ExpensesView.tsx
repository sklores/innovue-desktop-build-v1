import { useState } from "react";
import type { KeyboardEvent } from "react";

import ExpensesBreakdown from "../components/expenses/ExpensesBreakdown";
import ExpensesInvoices from "../components/expenses/ExpensesInvoices";

type ExpensesViewProps = {
  activeSecondaryId: string;
  activeTime: string;
};

const expensesOverviewTotals: Record<string, string> = {
  Mon: "$42,380",
  Tue: "$44,910",
  Wed: "$46,220",
  Thu: "$45,670",
  Fri: "$49,830",
  Sat: "$31,540",
  Sun: "$28,960",
  Week: "$289,510",
  Month: "$1,184,200",
  Year: "$14,402,800",
};

const expensesCategoryMetrics: Record<string, Record<string, string>> = {
  Mon: {
    Labor: "$18,900",
    COGS: "$11,400",
    "Fixed costs": "$6,200",
    Utilities: "$2,300",
    Chemicals: "$1,100",
    Linen: "$480",
  },
  Tue: {
    Labor: "$19,700",
    COGS: "$12,100",
    "Fixed costs": "$6,300",
    Utilities: "$2,260",
    Chemicals: "$1,140",
    Linen: "$490",
  },
  Wed: {
    Labor: "$20,200",
    COGS: "$12,700",
    "Fixed costs": "$6,400",
    Utilities: "$2,280",
    Chemicals: "$1,160",
    Linen: "$520",
  },
  Thu: {
    Labor: "$19,900",
    COGS: "$12,300",
    "Fixed costs": "$6,350",
    Utilities: "$2,240",
    Chemicals: "$1,120",
    Linen: "$510",
  },
  Fri: {
    Labor: "$21,600",
    COGS: "$13,500",
    "Fixed costs": "$6,600",
    Utilities: "$2,460",
    Chemicals: "$1,180",
    Linen: "$520",
  },
  Sat: {
    Labor: "$14,200",
    COGS: "$9,100",
    "Fixed costs": "$5,100",
    Utilities: "$1,760",
    Chemicals: "$840",
    Linen: "$360",
  },
  Sun: {
    Labor: "$13,400",
    COGS: "$8,600",
    "Fixed costs": "$4,900",
    Utilities: "$1,640",
    Chemicals: "$810",
    Linen: "$330",
  },
  Week: {
    Labor: "$128,900",
    COGS: "$79,700",
    "Fixed costs": "$41,800",
    Utilities: "$13,940",
    Chemicals: "$6,350",
    Linen: "$2,760",
  },
  Month: {
    Labor: "$528,400",
    COGS: "$326,300",
    "Fixed costs": "$171,200",
    Utilities: "$56,900",
    Chemicals: "$26,100",
    Linen: "$11,300",
  },
  Year: {
    Labor: "$6,410,000",
    COGS: "$3,946,000",
    "Fixed costs": "$2,080,000",
    Utilities: "$676,000",
    Chemicals: "$312,000",
    Linen: "$136,000",
  },
};

const expensesCategoryPercentages: Record<string, Record<string, string>> = {
  Mon: {
    Labor: "45%",
    COGS: "27%",
    "Fixed costs": "15%",
    Utilities: "5%",
    Chemicals: "3%",
    Linen: "1%",
  },
  Tue: {
    Labor: "44%",
    COGS: "27%",
    "Fixed costs": "14%",
    Utilities: "5%",
    Chemicals: "3%",
    Linen: "1%",
  },
  Wed: {
    Labor: "44%",
    COGS: "28%",
    "Fixed costs": "14%",
    Utilities: "5%",
    Chemicals: "3%",
    Linen: "1%",
  },
  Thu: {
    Labor: "44%",
    COGS: "27%",
    "Fixed costs": "14%",
    Utilities: "5%",
    Chemicals: "3%",
    Linen: "1%",
  },
  Fri: {
    Labor: "43%",
    COGS: "27%",
    "Fixed costs": "13%",
    Utilities: "5%",
    Chemicals: "2%",
    Linen: "1%",
  },
  Sat: {
    Labor: "45%",
    COGS: "29%",
    "Fixed costs": "16%",
    Utilities: "6%",
    Chemicals: "3%",
    Linen: "1%",
  },
  Sun: {
    Labor: "46%",
    COGS: "30%",
    "Fixed costs": "15%",
    Utilities: "6%",
    Chemicals: "3%",
    Linen: "1%",
  },
  Week: {
    Labor: "45%",
    COGS: "28%",
    "Fixed costs": "14%",
    Utilities: "5%",
    Chemicals: "2%",
    Linen: "1%",
  },
  Month: {
    Labor: "45%",
    COGS: "28%",
    "Fixed costs": "14%",
    Utilities: "5%",
    Chemicals: "2%",
    Linen: "1%",
  },
  Year: {
    Labor: "44%",
    COGS: "28%",
    "Fixed costs": "14%",
    Utilities: "5%",
    Chemicals: "2%",
    Linen: "1%",
  },
};

const ExpensesView = ({ activeSecondaryId, activeTime }: ExpensesViewProps) => {
  const [openVendorId, setOpenVendorId] = useState<string | null>(null);
  const [openOrderGuideId, setOpenOrderGuideId] = useState<string | null>(null);
  const isExpensesBreakdown = activeSecondaryId === "breakdown";
  const isExpensesVendors = activeSecondaryId === "vendors";
  const isExpensesInvoices = activeSecondaryId === "invoices";
  const isExpensesBudgets = activeSecondaryId === "budgets";

  const activeExpensesTotal =
    expensesOverviewTotals[activeTime] ?? expensesOverviewTotals.Week;
  const activeExpensesCategories =
    expensesCategoryMetrics[activeTime] ?? expensesCategoryMetrics.Week;
  const activeExpensesPercents =
    expensesCategoryPercentages[activeTime] ?? expensesCategoryPercentages.Week;

  const handleVendorToggle = (id: string) => {
    setOpenVendorId((prev) => (prev === id ? null : id));
    setOpenOrderGuideId(null);
  };

  const handleVendorKeyDown = (event: KeyboardEvent<HTMLDivElement>, id: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleVendorToggle(id);
    }
  };

  const handleOrderGuideToggle = (id: string) => {
    setOpenOrderGuideId((prev) => (prev === id ? null : id));
  };

  const handleOrderGuideKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    id: string,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOrderGuideToggle(id);
    }
  };

  if (isExpensesBreakdown) {
    return (
      <ExpensesBreakdown
        total={activeExpensesTotal}
        categories={activeExpensesCategories}
        percents={activeExpensesPercents}
      />
    );
  }

  if (isExpensesBudgets) {
    return (
      <>
        {(() => {
          const formatCurrency = (value: number) =>
            `$${Math.round(value).toLocaleString()}`;
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
          const totals = budgetRows.reduce(
            (acc, row) => {
              const actual =
                actualsByTime[activeTime]?.[row.key] ??
                actualsByTime.Week[row.key] ??
                0;
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
                  const actual =
                    actualsByTime[activeTime]?.[row.key] ??
                    actualsByTime.Week[row.key] ??
                    0;
                  const budget = budgets[row.key] ?? 0;
                  const variance = actual - budget;
                  const spendPercent = getSpendPercent(actual, budget);
                  const varianceClass = getVarianceClass(variance);
                  const actualClass = getActualClass(variance);
                  const spendClass = getSpendClass(spendPercent);
                  return (
                    <tr key={row.key}>
                      <td>{row.label}</td>
                      <td className="budget-table__number">
                        {formatCurrency(budget)}
                      </td>
                      <td className={`budget-table__number ${actualClass}`}>
                        {formatCurrency(actual)}
                      </td>
                      <td className={`budget-table__number ${varianceClass}`}>
                        {formatVariance(variance)}
                      </td>
                      <td className={`budget-table__number ${spendClass}`}>
                        {spendPercent}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="budget-table__total">
                  <td>Total</td>
                  <td className="budget-table__number">
                    {formatCurrency(totals.budget)}
                  </td>
                  <td
                    className={`budget-table__number ${getActualClass(totalVariance)}`}
                  >
                    {formatCurrency(totals.actual)}
                  </td>
                  <td
                    className={`budget-table__number ${getVarianceClass(totalVariance)}`}
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
        })()}
      </>
    );
  }

  if (isExpensesVendors) {
    return (
      <>
        {(() => {
          const vendorRows = [
            {
              id: "northern-provisions",
              name: "Northern Provisions",
              accountsPayable: "$48,900",
              email: "orders@northernprovisions.com",
              phone: "(202) 555-0132",
              paymentTerms: "Net 14",
              accountNumber: "•••• 4821",
              deliveryDays: "Mon / Wed / Fri",
              deliveryMinimum: "$250",
              orderGuide: ["Seasonal produce", "Protein cuts", "Dry goods"],
            },
            {
              id: "harbor-supply",
              name: "Harbor Supply Co.",
              accountsPayable: "$37,450",
              email: "billing@harborsupply.co",
              phone: "(202) 555-0194",
              paymentTerms: "Net 21",
              accountNumber: "•••• 7754",
              deliveryDays: "Tue / Thu",
              deliveryMinimum: "$300",
              orderGuide: ["Packaging", "Paper products", "Cleaning supplies"],
            },
            {
              id: "capital-farms",
              name: "Capital Farms",
              accountsPayable: "$29,120",
              email: "support@capitalfarms.com",
              phone: "(202) 555-0178",
              paymentTerms: "Net 30",
              accountNumber: "•••• 2146",
              deliveryDays: "Mon / Thu",
              deliveryMinimum: "$200",
              orderGuide: ["Dairy", "Eggs", "Specialty greens"],
            },
            {
              id: "district-utilities",
              name: "District Utilities",
              accountsPayable: "$18,760",
              email: "account@districtutilities.com",
              phone: "(202) 555-0109",
              paymentTerms: "Net 15",
              accountNumber: "•••• 0913",
              deliveryDays: "Monthly",
              deliveryMinimum: "$0",
              orderGuide: ["Electric", "Water", "Gas"],
            },
          ];


          const parseCurrency = (value: string) => {
            const numeric = Number(value.replace(/[^0-9.-]+/g, ""));
            return Number.isNaN(numeric) ? 0 : numeric;
          };

          const sortedVendors =
            vendorRows.length === 0
              ? []
              : [...vendorRows].sort(
                  (a, b) =>
                    parseCurrency(b.accountsPayable) -
                    parseCurrency(a.accountsPayable),
                );

          return (
            <div className="truth-section__content">
              <div className="breakdown-table vendor-list" role="list">
                {sortedVendors.map((vendor) => {
                  const isOpen = openVendorId === vendor.id;
                  const isOrderGuideOpen = openOrderGuideId === vendor.id;
                  return (
                    <div key={vendor.id} role="listitem">
                      <div
                        className={`breakdown-row vendor-row${
                          isOpen ? " vendor-row--open" : ""
                        }`}
                        role="button"
                        tabIndex={0}
                        aria-expanded={isOpen}
                        onClick={() => handleVendorToggle(vendor.id)}
                        onKeyDown={(event) =>
                          handleVendorKeyDown(event, vendor.id)
                        }
                      >
                        <span className="breakdown-row__label">{vendor.name}</span>
                        <span className="breakdown-row__value">
                          {vendor.accountsPayable}
                        </span>
                      </div>
                      <div
                        className={`vendor-details${
                          isOpen ? " vendor-details--open" : ""
                        }`}
                        aria-hidden={!isOpen}
                      >
                        <div className="vendor-details__grid">
                          <div className="vendor-section vendor-section--tight">
                            <span className="metric__label">Identity / Contact</span>
                            <span className="vendor-title">{vendor.name}</span>
                            <span className="breakdown-row__label">
                              {vendor.email}
                            </span>
                            <span className="breakdown-row__label">
                              {vendor.phone}
                            </span>
                          </div>
                          <div className="vendor-section">
                            <span className="metric__label">Payment</span>
                            <div className="vendor-row__detail">
                              <span className="breakdown-row__label">
                                Accounts payable
                              </span>
                              <span className="breakdown-row__value">
                                {vendor.accountsPayable}
                              </span>
                            </div>
                            <div className="vendor-row__detail">
                              <span className="breakdown-row__label">
                                Payment terms
                              </span>
                              <span className="breakdown-row__value">
                                {vendor.paymentTerms}
                              </span>
                            </div>
                            <div className="vendor-row__detail">
                              <span className="breakdown-row__label">
                                Account number
                              </span>
                              <span className="breakdown-row__value">
                                {vendor.accountNumber}
                              </span>
                            </div>
                          </div>
                          <div className="vendor-section">
                            <span className="metric__label">Operations</span>
                            <div className="vendor-row__detail">
                              <span className="breakdown-row__label">
                                Delivery days
                              </span>
                              <span className="breakdown-row__value">
                                {vendor.deliveryDays}
                              </span>
                            </div>
                            <div className="vendor-row__detail">
                              <span className="breakdown-row__label">
                                Delivery minimum
                              </span>
                              <span className="breakdown-row__value">
                                {vendor.deliveryMinimum}
                              </span>
                            </div>
                          </div>
                          <div className="vendor-section">
                            <div
                              role="button"
                              tabIndex={0}
                              aria-expanded={isOrderGuideOpen}
                              onClick={() => handleOrderGuideToggle(vendor.id)}
                              onKeyDown={(event) =>
                                handleOrderGuideKeyDown(event, vendor.id)
                              }
                              className="vendor-order-toggle"
                            >
                              <span className="metric__label">Order guide</span>
                            </div>
                            <div
                              className={`vendor-order-details${
                                isOrderGuideOpen
                                  ? " vendor-order-details--open"
                                  : ""
                              }`}
                              aria-hidden={!isOrderGuideOpen}
                            >
                              <ul className="vendor-order-list">
                                {vendor.orderGuide.map((item) => (
                                  <li key={item} className="breakdown-row__label">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </>
    );
  }

  if (isExpensesInvoices) {
    return <ExpensesInvoices />;
  }

  return null;
};

export default ExpensesView;
