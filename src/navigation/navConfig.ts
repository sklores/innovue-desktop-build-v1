export const primaryTabs = [
  { id: "sales", label: "Sales" },
  { id: "expenses", label: "Expenses" },
  { id: "financials", label: "Financials" },
  { id: "presence", label: "Presence" },
  { id: "settings", label: "Settings" },
];

export const secondaryTabsByPrimary = {
  sales: [
    { id: "overview", label: "Overview" },
    { id: "breakdown", label: "Breakdown" },
    { id: "forecast", label: "Forecast" },
  ],
  expenses: [
    { id: "overview", label: "Overview" },
    { id: "categories", label: "Categories" },
    { id: "vendors", label: "Vendors" },
  ],
  financials: [
    { id: "profit-loss", label: "Profit & Loss" },
    { id: "cashflow", label: "Cashflow" },
    { id: "pro-forma", label: "Pro Forma" },
  ],
  presence: [
    { id: "reviews", label: "Reviews" },
    { id: "traffic", label: "Traffic" },
    { id: "social", label: "Social" },
  ],
  settings: [
    { id: "tab-a", label: "Tab A" },
    { id: "tab-b", label: "Tab B" },
  ],
};
