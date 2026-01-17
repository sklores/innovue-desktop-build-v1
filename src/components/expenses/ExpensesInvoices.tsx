const invoices = [
  {
    date: "2025-02-18",
    vendor: "Harvest Produce",
    number: "INV-4821",
    category: "COGS",
    amount: "$4,320.00",
    status: "Paid",
  },
  {
    date: "2025-02-16",
    vendor: "River City Linen",
    number: "INV-9174",
    category: "Linen",
    amount: "$860.00",
    status: "Unpaid",
  },
  {
    date: "2025-02-15",
    vendor: "Metro Utilities",
    number: "INV-7732",
    category: "Utilities",
    amount: "$1,420.00",
    status: "Overdue",
  },
  {
    date: "2025-02-12",
    vendor: "Frontline Staffing",
    number: "INV-2650",
    category: "Labor",
    amount: "$6,780.00",
    status: "Paid",
  },
  {
    date: "2025-02-10",
    vendor: "PureClean Supplies",
    number: "INV-3908",
    category: "Chemicals",
    amount: "$540.00",
    status: "Paid",
  },
  {
    date: "2025-02-08",
    vendor: "Coastal Seafood",
    number: "INV-5589",
    category: "COGS",
    amount: "$3,910.00",
    status: "Unpaid",
  },
  {
    date: "2025-02-05",
    vendor: "Steel City Meats",
    number: "INV-3412",
    category: "COGS",
    amount: "$5,260.00",
    status: "Paid",
  },
  {
    date: "2025-02-03",
    vendor: "BrightPath Services",
    number: "INV-2297",
    category: "Fixed costs",
    amount: "$1,150.00",
    status: "Paid",
  },
  {
    date: "2025-02-01",
    vendor: "Greenway Disposal",
    number: "INV-1185",
    category: "Utilities",
    amount: "$680.00",
    status: "Overdue",
  },
] as const;

const statusClassMap: Record<string, string> = {
  Paid: "expense-invoices__status--paid",
  Unpaid: "expense-invoices__status--unpaid",
  Overdue: "expense-invoices__status--overdue",
};

const ExpensesInvoices = () => {
  return (
    <section className="truth-section">
      <div className="expense-invoices">
        <div className="expense-invoices__table" role="table">
          <div className="expense-invoices__row expense-invoices__row--header" role="row">
            <span className="expense-invoices__cell" role="columnheader">
              Invoice Date
            </span>
            <span className="expense-invoices__cell" role="columnheader">
              Vendor
            </span>
            <span className="expense-invoices__cell" role="columnheader">
              Invoice #
            </span>
            <span className="expense-invoices__cell" role="columnheader">
              Category
            </span>
            <span
              className="expense-invoices__cell expense-invoices__amount"
              role="columnheader"
            >
              Amount
            </span>
            <span className="expense-invoices__cell" role="columnheader">
              Status
            </span>
          </div>
          {invoices.map((invoice) => (
            <div key={invoice.number} className="expense-invoices__row" role="row">
              <span className="expense-invoices__cell" role="cell">
                {invoice.date}
              </span>
              <span className="expense-invoices__cell" role="cell">
                {invoice.vendor}
              </span>
              <span className="expense-invoices__cell" role="cell">
                {invoice.number}
              </span>
              <span className="expense-invoices__cell" role="cell">
                {invoice.category}
              </span>
              <span
                className="expense-invoices__cell expense-invoices__amount"
                role="cell"
              >
                {invoice.amount}
              </span>
              <span
                className={`expense-invoices__cell expense-invoices__status ${
                  statusClassMap[invoice.status]
                }`}
                role="cell"
              >
                {invoice.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpensesInvoices;
