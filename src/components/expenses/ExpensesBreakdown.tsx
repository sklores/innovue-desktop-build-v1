import { useState } from "react";
import type { KeyboardEvent } from "react";

type ExpensesBreakdownProps = {
  total: string;
  categories: Record<string, string>;
  percents: Record<string, string>;
};

const breakdownRows = [
  {
    key: "Labor",
    label: "Labor",
    details: [
      { label: "Kitchen", value: "$62,400" },
      { label: "FOH", value: "$44,800" },
      { label: "Management", value: "$21,700" },
    ],
  },
  {
    key: "COGS",
    label: "COGS",
    details: [
      { label: "Food", value: "$41,600" },
      { label: "Beverage", value: "$24,300" },
      { label: "Alcohol", value: "$13,800" },
    ],
  },
  {
    key: "Fixed costs",
    label: "Fixed Costs",
    details: [
      { label: "Rent", value: "$23,100" },
      { label: "Insurance", value: "$9,800" },
      { label: "Accounting", value: "$8,900" },
    ],
  },
  {
    key: "Utilities",
    label: "Utilities",
    details: [
      { label: "Electric", value: "$5,200" },
      { label: "Gas", value: "$4,100" },
      { label: "Water", value: "$3,200" },
    ],
  },
  {
    key: "Chemicals",
    label: "Chemicals",
    details: [
      { label: "Cleaning supplies", value: "$3,700" },
      { label: "Sanitizer", value: "$2,650" },
    ],
  },
  {
    key: "Linen",
    label: "Linen",
    details: [
      { label: "Linen service", value: "$1,800" },
      { label: "Towels", value: "$960" },
    ],
  },
] as const;

const ExpensesBreakdown = ({ total, categories, percents }: ExpensesBreakdownProps) => {
  const [openRow, setOpenRow] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenRow((prev) => (prev === id ? null : id));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, id: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle(id);
    }
  };

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
      {breakdownRows.map((row) => {
        const isOpen = openRow === row.key;
        return (
          <div key={row.key}>
            <div
              className="breakdown-row"
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              onClick={() => handleToggle(row.key)}
              onKeyDown={(event) => handleKeyDown(event, row.key)}
            >
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
            <div
              style={{
                maxHeight: isOpen ? "160px" : "0px",
                opacity: isOpen ? 1 : 0,
                overflow: "hidden",
                transition: "max-height 0.25s ease, opacity 0.2s ease",
                paddingLeft: "24px",
              }}
              aria-hidden={!isOpen}
            >
              {row.details.map((detail) => (
                <div
                  key={detail.label}
                  className="breakdown-row"
                  style={{ paddingTop: "6px" }}
                  role="row"
                >
                  <span className="breakdown-row__label" role="cell">
                    {detail.label}
                  </span>
                  <span className="breakdown-row__value" role="cell">
                    {detail.value}
                  </span>
                  <span className="breakdown-row__percent" role="cell">
                    —
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExpensesBreakdown;
