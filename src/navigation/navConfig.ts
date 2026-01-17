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
    { id: "product", label: "Product" },
  ],
  expenses: [
    { id: "overview", label: "Overview" },
    { id: "categories", label: "Categories" },
    { id: "vendors", label: "Vendors" },
    { id: "budgets", label: "Budgets" },
  ],
  financials: [
    { id: "profit-loss", label: "Profit & Loss" },
    { id: "cashflow", label: "Cashflow" },
    { id: "pro-forma", label: "Pro Forma" },
    { id: "kpis", label: "KPIs" },
  ],
  presence: [
    { id: "reviews", label: "Reviews" },
    { id: "traffic", label: "Traffic" },
    { id: "social", label: "Social" },
    { id: "seo", label: "SEO" },
  ],
  settings: [
    { id: "business", label: "Business" },
    { id: "operations", label: "Operations" },
    { id: "financial-assumptions", label: "Financial Assumptions" },
    { id: "alerts", label: "Alerts" },
    { id: "display", label: "Display" },
  ],
  reporting: [
    { id: "email-reports", label: "Email Reports" },
    { id: "notifications", label: "Notifications" },
  ],
};
