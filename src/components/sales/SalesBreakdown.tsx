import { useState } from "react";
import type { KeyboardEvent } from "react";

const breakdownRows = [
  {
    id: "in-store",
    label: "In-store",
    value: "$347,700",
    percent: "40%",
    details: [
      { label: "Lunch", value: "$198,400" },
      { label: "Dinner", value: "$149,300" },
    ],
  },
  {
    id: "takeout",
    label: "Takeout",
    value: "$229,900",
    percent: "26%",
    details: [
      { label: "Online orders", value: "$138,500" },
      { label: "Phone orders", value: "$91,400" },
    ],
  },
  {
    id: "delivery",
    label: "Delivery",
    value: "$201,300",
    percent: "23%",
    details: [
      { label: "Uber Eats", value: "$112,600" },
      { label: "DoorDash", value: "$88,700" },
    ],
  },
  {
    id: "third-party",
    label: "3rd-party sales",
    value: "$95,800",
    percent: "11%",
    details: [
      { label: "Catering partners", value: "$58,200" },
      { label: "Marketplace", value: "$37,600" },
    ],
  },
  {
    id: "tips",
    label: "Tips",
    value: "$24,600",
    percent: "3%",
    details: [
      { label: "Card tips", value: "$19,100" },
      { label: "Cash tips", value: "$5,500" },
    ],
  },
] as const;

const SalesBreakdown = () => {
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
      {breakdownRows.map((row) => {
        const isOpen = openRow === row.id;
        return (
          <div key={row.id}>
            <div
              className="breakdown-row"
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              onClick={() => handleToggle(row.id)}
              onKeyDown={(event) => handleKeyDown(event, row.id)}
            >
              <span className="breakdown-row__label" role="cell">
                {row.label}
              </span>
              <span className="breakdown-row__value" role="cell">
                {row.value}
              </span>
              <span className="breakdown-row__percent" role="cell">
                {row.percent}
              </span>
            </div>
            <div
              style={{
                maxHeight: isOpen ? "120px" : "0px",
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

export default SalesBreakdown;
