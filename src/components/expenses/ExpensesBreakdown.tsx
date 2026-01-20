import { useState } from "react";

type BreakdownItem = {
  id: string;
  label: string;
  amount: string;
  percent: string;
};

type BreakdownCategory = BreakdownItem & {
  items: BreakdownItem[];
};

const totalRow: BreakdownItem = {
  id: "total",
  label: "Total Expenses",
  amount: "$1,184,200",
  percent: "100%",
};

const categories: BreakdownCategory[] = [
  {
    id: "labor",
    label: "Labor",
    amount: "$356,400",
    percent: "30%",
    items: [
      { id: "labor-foh", label: "FOH Labor", amount: "$142,600", percent: "12%" },
      { id: "labor-boh", label: "BOH Labor", amount: "$164,800", percent: "14%" },
      { id: "labor-mgmt", label: "Management", amount: "$49,000", percent: "4%" },
    ],
  },
  {
    id: "cogs",
    label: "COGS",
    amount: "$320,600",
    percent: "27%",
    items: [
      { id: "cogs-food", label: "Food", amount: "$214,100", percent: "18%" },
      { id: "cogs-bev", label: "Beverage", amount: "$106,500", percent: "9%" },
    ],
  },
  {
    id: "fixed-costs",
    label: "Fixed Costs",
    amount: "$186,900",
    percent: "16%",
    items: [
      { id: "fixed-rent", label: "Rent", amount: "$124,200", percent: "10%" },
      { id: "fixed-insurance", label: "Insurance", amount: "$62,700", percent: "5%" },
    ],
  },
  {
    id: "utilities",
    label: "Utilities",
    amount: "$92,300",
    percent: "8%",
    items: [
      { id: "utilities-electric", label: "Electric", amount: "$41,800", percent: "4%" },
      { id: "utilities-gas", label: "Gas", amount: "$29,900", percent: "3%" },
      { id: "utilities-water", label: "Water", amount: "$20,600", percent: "2%" },
    ],
  },
  {
    id: "chemicals",
    label: "Chemicals",
    amount: "$48,500",
    percent: "4%",
    items: [
      { id: "chemicals-cleaning", label: "Cleaning", amount: "$29,100", percent: "2%" },
      { id: "chemicals-paper", label: "Paper", amount: "$19,400", percent: "2%" },
    ],
  },
  {
    id: "linen",
    label: "Linen",
    amount: "$36,200",
    percent: "3%",
    items: [
      { id: "linen-towels", label: "Towels", amount: "$20,100", percent: "2%" },
      { id: "linen-aprons", label: "Aprons", amount: "$16,100", percent: "1%" },
    ],
  },
];

const ExpensesBreakdown = () => {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const toggleCategory = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <section className="truth-section">
      <div className="truth-section__content">
        <div className="expenses-breakdown">
          <div className="expenses-breakdown__row expenses-breakdown__row--total">
            <span className="expenses-breakdown__label">{totalRow.label}</span>
            <span className="expenses-breakdown__amount">{totalRow.amount}</span>
            <span className="expenses-breakdown__percent">{totalRow.percent}</span>
          </div>

          {categories.map((category) => {
            const isExpanded = expandedIds.includes(category.id);

            return (
              <div key={category.id} className="expenses-breakdown__group">
                <button
                  type="button"
                  className="expenses-breakdown__row expenses-breakdown__row--parent"
                  onClick={() => toggleCategory(category.id)}
                >
                  <span className="expenses-breakdown__label">{category.label}</span>
                  <span className="expenses-breakdown__amount">{category.amount}</span>
                  <span className="expenses-breakdown__percent">{category.percent}</span>
                </button>
                {isExpanded ? (
                  <div className="expenses-breakdown__children">
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className="expenses-breakdown__row expenses-breakdown__row--child"
                      >
                        <span className="expenses-breakdown__label">
                          {item.label}
                        </span>
                        <span className="expenses-breakdown__amount">
                          {item.amount}
                        </span>
                        <span className="expenses-breakdown__percent">
                          {item.percent}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExpensesBreakdown;
