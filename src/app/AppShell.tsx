import { useEffect, useMemo, useState } from "react";
import type { KeyboardEvent } from "react";

import PrimaryNav from "../navigation/PrimaryNav";
import SecondaryNav from "../navigation/SecondaryNav";
import { primaryTabs, secondaryTabsByPrimary } from "../navigation/navConfig";

const timeOptions = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
  "Week",
  "Month",
  "Year",
];

const financialsTimeOptions = ["Week", "Month", "Quarter", "Year"];

const salesOverviewMetrics: Record<string, { gross: string; net: string }> = {
  Mon: { gross: "$128,400", net: "$121,050" },
  Tue: { gross: "$134,900", net: "$126,340" },
  Wed: { gross: "$142,250", net: "$133,880" },
  Thu: { gross: "$136,780", net: "$129,410" },
  Fri: { gross: "$158,900", net: "$149,520" },
  Sat: { gross: "$92,600", net: "$88,140" },
  Sun: { gross: "$84,200", net: "$80,780" },
  Week: { gross: "$877,030", net: "$829,120" },
  Month: { gross: "$3,421,900", net: "$3,228,400" },
  Year: { gross: "$41,882,000", net: "$39,304,500" },
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

const salesBreakdownMetrics: Record<string, Record<string, string>> = {
  Mon: {
    "In-store": "$48,200",
    Takeout: "$31,400",
    Delivery: "$28,100",
    "3rd-party tips": "$3,600",
    "Check average": "$42.10",
    Covers: "1,142",
  },
  Tue: {
    "In-store": "$52,900",
    Takeout: "$34,200",
    Delivery: "$29,500",
    "3rd-party tips": "$3,900",
    "Check average": "$41.80",
    Covers: "1,208",
  },
  Wed: {
    "In-store": "$56,300",
    Takeout: "$36,900",
    Delivery: "$31,400",
    "3rd-party tips": "$4,100",
    "Check average": "$43.20",
    Covers: "1,274",
  },
  Thu: {
    "In-store": "$54,100",
    Takeout: "$35,400",
    Delivery: "$30,600",
    "3rd-party tips": "$3,800",
    "Check average": "$42.60",
    Covers: "1,236",
  },
  Fri: {
    "In-store": "$62,800",
    Takeout: "$40,200",
    Delivery: "$34,900",
    "3rd-party tips": "$4,700",
    "Check average": "$45.10",
    Covers: "1,412",
  },
  Sat: {
    "In-store": "$38,900",
    Takeout: "$27,100",
    Delivery: "$24,200",
    "3rd-party tips": "$2,400",
    "Check average": "$39.70",
    Covers: "986",
  },
  Sun: {
    "In-store": "$34,500",
    Takeout: "$24,800",
    Delivery: "$22,600",
    "3rd-party tips": "$2,100",
    "Check average": "$38.90",
    Covers: "912",
  },
  Week: {
    "In-store": "$347,700",
    Takeout: "$229,900",
    Delivery: "$201,300",
    "3rd-party tips": "$24,600",
    "Check average": "$42.20",
    Covers: "8,170",
  },
  Month: {
    "In-store": "$1,362,400",
    Takeout: "$936,800",
    Delivery: "$799,300",
    "3rd-party tips": "$95,700",
    "Check average": "$42.70",
    Covers: "32,580",
  },
  Year: {
    "In-store": "$16,204,000",
    Takeout: "$11,402,000",
    Delivery: "$9,286,000",
    "3rd-party tips": "$1,192,000",
    "Check average": "$43.10",
    Covers: "382,400",
  },
};

const salesBreakdownPercentages: Record<string, Record<string, string>> = {
  Mon: {
    "In-store": "38%",
    Takeout: "25%",
    Delivery: "22%",
    "3rd-party tips": "3%",
  },
  Tue: {
    "In-store": "39%",
    Takeout: "25%",
    Delivery: "22%",
    "3rd-party tips": "3%",
  },
  Wed: {
    "In-store": "40%",
    Takeout: "26%",
    Delivery: "22%",
    "3rd-party tips": "3%",
  },
  Thu: {
    "In-store": "39%",
    Takeout: "26%",
    Delivery: "23%",
    "3rd-party tips": "3%",
  },
  Fri: {
    "In-store": "40%",
    Takeout: "25%",
    Delivery: "22%",
    "3rd-party tips": "3%",
  },
  Sat: {
    "In-store": "42%",
    Takeout: "29%",
    Delivery: "26%",
    "3rd-party tips": "3%",
  },
  Sun: {
    "In-store": "41%",
    Takeout: "29%",
    Delivery: "26%",
    "3rd-party tips": "2%",
  },
  Week: {
    "In-store": "40%",
    Takeout: "26%",
    Delivery: "23%",
    "3rd-party tips": "3%",
  },
  Month: {
    "In-store": "40%",
    Takeout: "27%",
    Delivery: "23%",
    "3rd-party tips": "3%",
  },
  Year: {
    "In-store": "41%",
    Takeout: "29%",
    Delivery: "24%",
    "3rd-party tips": "3%",
  },
};

const salesForecastSeries: Record<
  string,
  {
    today: number[];
    past: number[];
    projected: number[];
  }
> = {
  Mon: {
    today: [24, 32, 28, 36, 42, 38, 44],
    past: [18, 26, 24, 30, 36, 33, 37],
    projected: [24, 32, 30, 35, 40, 42, 45],
  },
  Tue: {
    today: [26, 34, 30, 38, 44, 40, 46],
    past: [20, 28, 26, 32, 38, 35, 39],
    projected: [26, 34, 32, 37, 42, 44, 47],
  },
  Wed: {
    today: [28, 36, 32, 40, 46, 42, 48],
    past: [22, 30, 28, 34, 40, 37, 41],
    projected: [28, 36, 34, 39, 44, 46, 49],
  },
  Thu: {
    today: [27, 35, 31, 39, 45, 41, 47],
    past: [21, 29, 27, 33, 39, 36, 40],
    projected: [27, 35, 33, 38, 43, 45, 48],
  },
  Fri: {
    today: [30, 40, 36, 45, 52, 48, 54],
    past: [24, 34, 31, 39, 45, 42, 47],
    projected: [30, 40, 38, 44, 50, 52, 56],
  },
  Sat: {
    today: [20, 28, 26, 32, 36, 34, 38],
    past: [16, 22, 21, 26, 30, 28, 32],
    projected: [20, 28, 27, 31, 35, 37, 39],
  },
  Sun: {
    today: [18, 24, 22, 28, 32, 30, 34],
    past: [14, 20, 19, 24, 28, 26, 30],
    projected: [18, 24, 23, 27, 31, 33, 35],
  },
  Week: {
    today: [24, 30, 28, 36, 42, 40, 46],
    past: [20, 26, 24, 31, 36, 34, 38],
    projected: [24, 30, 29, 35, 40, 42, 45],
  },
  Month: {
    today: [22, 26, 24, 28, 32, 30, 34],
    past: [18, 22, 20, 24, 28, 26, 30],
    projected: [22, 26, 25, 29, 33, 35, 37],
  },
  Year: {
    today: [18, 22, 20, 24, 28, 26, 30],
    past: [14, 18, 16, 20, 24, 22, 26],
    projected: [18, 22, 21, 25, 29, 31, 33],
  },
};

const salesProductMix: Record<string, { name: string; units: number }[]> = {
  Mon: [
    { name: "Signature Burger", units: 84 },
    { name: "Citrus Kale Salad", units: 66 },
    { name: "Smoked Brisket Plate", units: 58 },
    { name: "Truffle Fries", units: 52 },
    { name: "Roasted Chicken", units: 48 },
    { name: "Seasonal Veg Bowl", units: 44 },
    { name: "Shrimp Tacos", units: 41 },
    { name: "Mushroom Risotto", units: 36 },
    { name: "House Lemonade", units: 32 },
    { name: "Chocolate Tart", units: 28 },
  ],
  Tue: [
    { name: "Signature Burger", units: 78 },
    { name: "Citrus Kale Salad", units: 62 },
    { name: "Smoked Brisket Plate", units: 55 },
    { name: "Truffle Fries", units: 50 },
    { name: "Roasted Chicken", units: 46 },
    { name: "Seasonal Veg Bowl", units: 42 },
    { name: "Shrimp Tacos", units: 38 },
    { name: "Mushroom Risotto", units: 34 },
    { name: "House Lemonade", units: 30 },
    { name: "Chocolate Tart", units: 26 },
  ],
  Wed: [
    { name: "Signature Burger", units: 92 },
    { name: "Citrus Kale Salad", units: 70 },
    { name: "Smoked Brisket Plate", units: 63 },
    { name: "Truffle Fries", units: 58 },
    { name: "Roasted Chicken", units: 54 },
    { name: "Seasonal Veg Bowl", units: 49 },
    { name: "Shrimp Tacos", units: 45 },
    { name: "Mushroom Risotto", units: 40 },
    { name: "House Lemonade", units: 36 },
    { name: "Chocolate Tart", units: 31 },
  ],
  Thu: [
    { name: "Signature Burger", units: 88 },
    { name: "Citrus Kale Salad", units: 68 },
    { name: "Smoked Brisket Plate", units: 60 },
    { name: "Truffle Fries", units: 56 },
    { name: "Roasted Chicken", units: 52 },
    { name: "Seasonal Veg Bowl", units: 48 },
    { name: "Shrimp Tacos", units: 43 },
    { name: "Mushroom Risotto", units: 39 },
    { name: "House Lemonade", units: 34 },
    { name: "Chocolate Tart", units: 29 },
  ],
  Fri: [
    { name: "Signature Burger", units: 104 },
    { name: "Citrus Kale Salad", units: 82 },
    { name: "Smoked Brisket Plate", units: 74 },
    { name: "Truffle Fries", units: 69 },
    { name: "Roasted Chicken", units: 62 },
    { name: "Seasonal Veg Bowl", units: 57 },
    { name: "Shrimp Tacos", units: 53 },
    { name: "Mushroom Risotto", units: 47 },
    { name: "House Lemonade", units: 41 },
    { name: "Chocolate Tart", units: 35 },
  ],
  Sat: [
    { name: "Signature Burger", units: 96 },
    { name: "Citrus Kale Salad", units: 78 },
    { name: "Smoked Brisket Plate", units: 68 },
    { name: "Truffle Fries", units: 64 },
    { name: "Roasted Chicken", units: 58 },
    { name: "Seasonal Veg Bowl", units: 54 },
    { name: "Shrimp Tacos", units: 49 },
    { name: "Mushroom Risotto", units: 43 },
    { name: "House Lemonade", units: 38 },
    { name: "Chocolate Tart", units: 33 },
  ],
  Sun: [
    { name: "Signature Burger", units: 72 },
    { name: "Citrus Kale Salad", units: 58 },
    { name: "Smoked Brisket Plate", units: 52 },
    { name: "Truffle Fries", units: 48 },
    { name: "Roasted Chicken", units: 44 },
    { name: "Seasonal Veg Bowl", units: 40 },
    { name: "Shrimp Tacos", units: 36 },
    { name: "Mushroom Risotto", units: 32 },
    { name: "House Lemonade", units: 28 },
    { name: "Chocolate Tart", units: 24 },
  ],
  Week: [
    { name: "Signature Burger", units: 620 },
    { name: "Citrus Kale Salad", units: 480 },
    { name: "Smoked Brisket Plate", units: 420 },
    { name: "Truffle Fries", units: 390 },
    { name: "Roasted Chicken", units: 340 },
    { name: "Seasonal Veg Bowl", units: 310 },
    { name: "Shrimp Tacos", units: 285 },
    { name: "Mushroom Risotto", units: 240 },
    { name: "House Lemonade", units: 210 },
    { name: "Chocolate Tart", units: 180 },
  ],
  Month: [
    { name: "Signature Burger", units: 2480 },
    { name: "Citrus Kale Salad", units: 1940 },
    { name: "Smoked Brisket Plate", units: 1680 },
    { name: "Truffle Fries", units: 1540 },
    { name: "Roasted Chicken", units: 1380 },
    { name: "Seasonal Veg Bowl", units: 1280 },
    { name: "Shrimp Tacos", units: 1140 },
    { name: "Mushroom Risotto", units: 980 },
    { name: "House Lemonade", units: 860 },
    { name: "Chocolate Tart", units: 720 },
  ],
  Year: [
    { name: "Signature Burger", units: 29800 },
    { name: "Citrus Kale Salad", units: 23600 },
    { name: "Smoked Brisket Plate", units: 20400 },
    { name: "Truffle Fries", units: 18900 },
    { name: "Roasted Chicken", units: 17200 },
    { name: "Seasonal Veg Bowl", units: 16000 },
    { name: "Shrimp Tacos", units: 14600 },
    { name: "Mushroom Risotto", units: 12800 },
    { name: "House Lemonade", units: 11200 },
    { name: "Chocolate Tart", units: 9800 },
  ],
};

const breakdownRows = [
  "In-store",
  "Takeout",
  "Delivery",
  "3rd-party tips",
  "Check average",
  "Covers",
];

const expensesCategoryRows = [
  "Labor",
  "COGS",
  "Fixed costs",
  "Utilities",
  "Chemicals",
  "Linen",
];

const buildPath = (values: number[], width = 520, height = 180) => {
  if (values.length === 0) {
    return "";
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = width / (values.length - 1);
  const points = values.map((value, index) => {
    const x = index * step;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  });
  return `M ${points[0]} ${points.slice(1).map((point) => `L ${point}`).join(" ")}`;
};

const AppShell = () => {
  const primaryNavItems = useMemo(() => {
    const settingsTab = primaryTabs.find((tab) => tab.id === "settings");
    const baseTabs = primaryTabs.filter((tab) => tab.id !== "settings");
    return [
      ...baseTabs,
      { id: "reporting", label: "Reporting" },
      settingsTab ?? { id: "settings", label: "Settings" },
    ];
  }, []);

  const [activePrimaryId, setActivePrimaryId] = useState(primaryNavItems[0].id);
  const [activeSecondaryId, setActiveSecondaryId] = useState(
    secondaryTabsByPrimary[primaryNavItems[0].id][0].id,
  );
  const [activeTime, setActiveTime] = useState(timeOptions[7]);
  const [financialsTime, setFinancialsTime] = useState(
    financialsTimeOptions[1],
  );
  const [openVendorId, setOpenVendorId] = useState<string | null>(null);
  const [openOrderGuideId, setOpenOrderGuideId] = useState<string | null>(null);
  const [openTrafficId, setOpenTrafficId] = useState<string | null>(null);
  const [openExpenseCategoryId, setOpenExpenseCategoryId] = useState<string | null>(
    null,
  );
  const [cashflowView, setCashflowView] = useState<"Month" | "Week">("Month");
  const [cashflowDetail, setCashflowDetail] = useState<{
    label: string;
    sales: number;
    expenses: number;
  } | null>(null);
  const [proFormaSalesAdjustment, setProFormaSalesAdjustment] = useState(0);
  const [proFormaCogsPercent, setProFormaCogsPercent] = useState(34);
  const [proFormaLaborPercent, setProFormaLaborPercent] = useState(30);
  const [proFormaOperatingPercent, setProFormaOperatingPercent] = useState(26);
  const [reportPreferences, setReportPreferences] = useState([
    {
      id: "daily-sales-summary",
      label: "Daily Sales Summary",
      enabled: true,
      frequency: "Daily",
      recipient: "Owner",
      email: "",
    },
    {
      id: "weekly-financial-snapshot",
      label: "Weekly Financial Snapshot",
      enabled: true,
      frequency: "Weekly",
      recipient: "Managers",
      email: "",
    },
    {
      id: "monthly-pl",
      label: "Monthly P&L",
      enabled: false,
      frequency: "Monthly",
      recipient: "Owner",
      email: "",
    },
    {
      id: "weekly-reviews-digest",
      label: "Weekly Reviews Digest",
      enabled: true,
      frequency: "Weekly",
      recipient: "Managers",
      email: "",
    },
    {
      id: "weekly-traffic-summary",
      label: "Weekly Traffic Summary",
      enabled: false,
      frequency: "Weekly",
      recipient: "Custom email",
      email: "ops@gcdc.co",
    },
  ]);
  const [notificationPreferences, setNotificationPreferences] = useState([
    {
      id: "sales-low",
      label: "Sales unusually low for the day",
      enabled: true,
      sensitivity: "Medium",
    },
    {
      id: "expenses-spike",
      label: "Expenses spike vs typical",
      enabled: true,
      sensitivity: "High",
    },
    {
      id: "negative-review",
      label: "New negative review",
      enabled: true,
      sensitivity: "Low",
    },
    {
      id: "no-social-posts",
      label: "No social posts in X days",
      enabled: false,
      sensitivity: "Medium",
    },
    {
      id: "negative-cashflow",
      label: "Negative cashflow day",
      enabled: false,
      sensitivity: "Medium",
    },
  ]);

  const activePrimary = useMemo(() => {
    return primaryNavItems.find((tab) => tab.id === activePrimaryId) ?? primaryNavItems[0];
  }, [activePrimaryId, primaryNavItems]);

  const secondaryTabs = useMemo(() => {
    return secondaryTabsByPrimary[activePrimaryId] ?? secondaryTabsByPrimary.sales;
  }, [activePrimaryId]);

  const activeSecondary = useMemo(() => {
    return secondaryTabs.find((tab) => tab.id === activeSecondaryId) ?? secondaryTabs[0];
  }, [secondaryTabs, activeSecondaryId]);

  useEffect(() => {
    setActiveSecondaryId(secondaryTabs[0].id);
  }, [secondaryTabs]);

  useEffect(() => {
    setActiveTime(timeOptions[7]);
  }, [activePrimaryId, activeSecondaryId]);

  const isSalesOverview =
    activePrimaryId === "sales" && activeSecondaryId === "overview";
  const isSalesBreakdown =
    activePrimaryId === "sales" && activeSecondaryId === "breakdown";
  const isSalesForecast =
    activePrimaryId === "sales" && activeSecondaryId === "forecast";
  const isSalesProduct =
    activePrimaryId === "sales" && activeSecondaryId === "product";
  const isExpensesOverview =
    activePrimaryId === "expenses" && activeSecondaryId === "overview";
  const isExpensesCategories =
    activePrimaryId === "expenses" && activeSecondaryId === "categories";
  const isExpensesVendors =
    activePrimaryId === "expenses" && activeSecondaryId === "vendors";
  const isExpensesBudgets =
    activePrimaryId === "expenses" && activeSecondaryId === "budgets";
  const isFinancialsCashflow =
    activePrimaryId === "financials" && activeSecondaryId === "cashflow";
  const isFinancialsProForma =
    activePrimaryId === "financials" && activeSecondaryId === "pro-forma";
  const isFinancialsProfitLoss =
    activePrimaryId === "financials" && activeSecondaryId === "profit-loss";
  const isPresenceReviews =
    activePrimaryId === "presence" && activeSecondaryId === "reviews";
  const isPresenceTraffic =
    activePrimaryId === "presence" && activeSecondaryId === "traffic";
  const isPresenceSocial =
    activePrimaryId === "presence" && activeSecondaryId === "social";
  const isReporting = activePrimaryId === "reporting";
  const isReportingEmailReports =
    activePrimaryId === "reporting" && activeSecondaryId === "email-reports";
  const isReportingNotifications =
    activePrimaryId === "reporting" && activeSecondaryId === "notifications";
  const isSettingsBusiness =
    activePrimaryId === "settings" && activeSecondaryId === "business";
  const isSettingsOperations =
    activePrimaryId === "settings" && activeSecondaryId === "operations";
  const isSettingsFinancialAssumptions =
    activePrimaryId === "settings" &&
    activeSecondaryId === "financial-assumptions";
  const isSettingsAlerts =
    activePrimaryId === "settings" && activeSecondaryId === "alerts";
  const isSettingsDisplay =
    activePrimaryId === "settings" && activeSecondaryId === "display";

  const activeMetrics = salesOverviewMetrics[activeTime] ?? salesOverviewMetrics.Week;
  const activeBreakdown =
    salesBreakdownMetrics[activeTime] ?? salesBreakdownMetrics.Week;
  const activeBreakdownPercent =
    salesBreakdownPercentages[activeTime] ?? salesBreakdownPercentages.Week;
  const activeForecast =
    salesForecastSeries[activeTime] ?? salesForecastSeries.Week;
  const activeProductMix = salesProductMix[activeTime] ?? salesProductMix.Week;
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

  const handleExpenseCategoryToggle = (id: string) => {
    setOpenExpenseCategoryId((prev) => (prev === id ? null : id));
  };

  const handleExpenseCategoryKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    id: string,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleExpenseCategoryToggle(id);
    }
  };

  const handleTrafficToggle = (id: string) => {
    setOpenTrafficId((prev) => (prev === id ? null : id));
  };

  const handleTrafficKeyDown = (event: KeyboardEvent<HTMLDivElement>, id: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleTrafficToggle(id);
    }
  };

  const handleCashflowDetailOpen = (entry: {
    label: string;
    sales: number;
    expenses: number;
  }) => {
    setCashflowDetail(entry);
  };

  const handleCashflowDetailClose = () => {
    setCashflowDetail(null);
  };

  const handleReportToggle = (id: string) => {
    setReportPreferences((prev) =>
      prev.map((report) =>
        report.id === id ? { ...report, enabled: !report.enabled } : report,
      ),
    );
  };

  const handleReportChange = (
    id: string,
    field: "frequency" | "recipient" | "email",
    value: string,
  ) => {
    setReportPreferences((prev) =>
      prev.map((report) =>
        report.id === id ? { ...report, [field]: value } : report,
      ),
    );
  };

  const handleNotificationToggle = (id: string) => {
    setNotificationPreferences((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, enabled: !notification.enabled }
          : notification,
      ),
    );
  };

  const handleNotificationChange = (id: string, value: string) => {
    setNotificationPreferences((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, sensitivity: value } : notification,
      ),
    );
  };

  const isTimeBasedView =
    isSalesOverview ||
    isSalesBreakdown ||
    isSalesForecast ||
    isSalesProduct ||
    isExpensesOverview ||
    isExpensesCategories ||
    isExpensesBudgets;

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-header__kicker">GCDC</p>
          <h1 className="app-header__title">InnoVue Desktop</h1>
        </div>
        <div className="app-header__meta">
          <span className="app-header__meta-item">
            <span className="app-header__meta-label">Last updated</span>
            <span className="app-header__meta-value">Just now</span>
          </span>
          <span className="app-header__meta-item">
            <span className="app-header__meta-label">Current time</span>
            <span className="app-header__meta-value">09:41 AM</span>
          </span>
          <span className="app-header__meta-item">
            <span className="app-header__meta-label">Weather</span>
            <span className="app-header__meta-value">Sunny · 72°</span>
          </span>
        </div>
      </header>

      <div className="app-body">
        <PrimaryNav
          items={primaryNavItems}
          activeId={activePrimaryId}
          onChange={setActivePrimaryId}
        />

        <main className="app-content">
          <div className="app-content-inner">
            <section className="truth-card truth-card--lead">
              <div className="truth-card__header">
                <h2 className="truth-card__title">{activePrimary.label}</h2>
                <SecondaryNav
                  tabs={secondaryTabs}
                  activeId={activeSecondary.id}
                  onChange={setActiveSecondaryId}
                />
              </div>
            </section>

            {isFinancialsProForma ? (
              <>
                <section className="truth-section">
                  {(() => {
                    const formatCurrency = (value: number) =>
                      `$${Math.round(value).toLocaleString()}`;
                    const formatMargin = (value: number) =>
                      `${Math.round(value * 100)}%`;
                    const baseSales = 52000;
                    const adjustedSales =
                      baseSales * (1 + proFormaSalesAdjustment / 100);
                    const totalCostPercent =
                      proFormaCogsPercent +
                      proFormaLaborPercent +
                      proFormaOperatingPercent;
                    const buildScenario = (
                      id: string,
                      label: string,
                      multiplier: number,
                      tone: string,
                      bar: string,
                    ) => {
                      const sales = adjustedSales * multiplier;
                      const costs = sales * (totalCostPercent / 100);
                      const profit = sales - costs;
                      return {
                        id,
                        label,
                        monthly: formatCurrency(profit),
                        yearly: formatCurrency(profit * 12),
                        margin: formatMargin(sales ? profit / sales : 0),
                        tone,
                        bar,
                      };
                    };
                    const scenarios = [
                      buildScenario(
                        "high",
                        "High",
                        1.15,
                        "proforma-row--positive",
                        "proforma-bar--high",
                      ),
                      buildScenario(
                        "medium",
                        "Medium",
                        1,
                        "proforma-row--neutral",
                        "proforma-bar--medium",
                      ),
                      buildScenario(
                        "low",
                        "Low",
                        0.85,
                        "proforma-row--negative",
                        "proforma-bar--low",
                      ),
                    ];

                    return (
                      <div className="truth-section__content">
                        <div className="proforma-header">
                          <p className="proforma-subtitle">
                            Scenario-based profitability snapshot
                          </p>
                        </div>
                        <div className="proforma-table" role="table">
                          <div className="proforma-row proforma-row--header" role="row">
                            <span className="proforma-cell" role="columnheader">
                              Scenario
                            </span>
                            <span className="proforma-cell" role="columnheader">
                              Monthly Profit
                            </span>
                            <span className="proforma-cell" role="columnheader">
                              Yearly Profit
                            </span>
                            <span className="proforma-cell" role="columnheader">
                              Profit Margin
                            </span>
                          </div>
                          {scenarios.map((scenario) => (
                            <div
                              key={scenario.id}
                              className={`proforma-row ${scenario.tone}`}
                              role="row"
                            >
                              <span
                                className="proforma-cell proforma-cell--label"
                                role="cell"
                              >
                                {scenario.label}
                              </span>
                              <span className="proforma-cell" role="cell">
                                {scenario.monthly}
                              </span>
                              <span className="proforma-cell" role="cell">
                                {scenario.yearly}
                              </span>
                              <span className="proforma-cell" role="cell">
                                {scenario.margin}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="proforma-bars" role="presentation">
                          {scenarios.map((scenario) => (
                            <div key={scenario.id} className="proforma-bar-row">
                              <span className="proforma-bar-label">{scenario.label}</span>
                              <span className={`proforma-bar ${scenario.bar}`} />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </section>
                <section className="truth-section">
                  <div className="truth-section__content">
                    <div className="proforma-controls">
                      <div className="proforma-controls__header">
                        <p className="proforma-controls__title">Pro Forma Controls</p>
                        <p className="proforma-controls__subtitle">
                          Adjust assumptions to preview profitability.
                        </p>
                      </div>
                      <div className="proforma-controls__rows">
                        <label className="proforma-controls__row">
                          <span className="proforma-controls__label">
                            Sales (adjustment)
                          </span>
                          <input
                            className="proforma-controls__slider"
                            type="range"
                            min="-15"
                            max="15"
                            step="1"
                            value={proFormaSalesAdjustment}
                            onChange={(event) =>
                              setProFormaSalesAdjustment(Number(event.target.value))
                            }
                          />
                          <span className="proforma-controls__value">
                            {proFormaSalesAdjustment}%
                          </span>
                        </label>
                        <label className="proforma-controls__row">
                          <span className="proforma-controls__label">COGS %</span>
                          <input
                            className="proforma-controls__slider"
                            type="range"
                            min="20"
                            max="45"
                            step="1"
                            value={proFormaCogsPercent}
                            onChange={(event) =>
                              setProFormaCogsPercent(Number(event.target.value))
                            }
                          />
                          <span className="proforma-controls__value">
                            {proFormaCogsPercent}%
                          </span>
                        </label>
                        <label className="proforma-controls__row">
                          <span className="proforma-controls__label">Labor %</span>
                          <input
                            className="proforma-controls__slider"
                            type="range"
                            min="20"
                            max="45"
                            step="1"
                            value={proFormaLaborPercent}
                            onChange={(event) =>
                              setProFormaLaborPercent(Number(event.target.value))
                            }
                          />
                          <span className="proforma-controls__value">
                            {proFormaLaborPercent}%
                          </span>
                        </label>
                        <label className="proforma-controls__row">
                          <span className="proforma-controls__label">
                            Operating Expenses %
                          </span>
                          <input
                            className="proforma-controls__slider"
                            type="range"
                            min="10"
                            max="35"
                            step="1"
                            value={proFormaOperatingPercent}
                            onChange={(event) =>
                              setProFormaOperatingPercent(Number(event.target.value))
                            }
                          />
                          <span className="proforma-controls__value">
                            {proFormaOperatingPercent}%
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            ) : (
              <section className="truth-section">
                {isTimeBasedView ? (
                  <div className="truth-section__content">
                    <div
                      className="time-selector"
                      role="tablist"
                      aria-label="Time range"
                    >
                      {timeOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`time-pill${
                            activeTime === option ? " time-pill--active" : ""
                          }`}
                          onClick={() => setActiveTime(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>

                {isSalesOverview ? (
                  <div className="metrics">
                    <div className="metric">
                      <p className="metric__label">Gross Sales</p>
                      <p className="metric__value">{activeMetrics.gross}</p>
                    </div>
                    <div className="metric">
                      <p className="metric__label">Net Sales</p>
                      <p className="metric__value">{activeMetrics.net}</p>
                    </div>
                  </div>
                ) : null}

                {isSalesBreakdown ? (
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
                    {breakdownRows.map((label) => (
                      <div key={label} className="breakdown-row" role="row">
                        <span className="breakdown-row__label" role="cell">
                          {label}
                        </span>
                        <span className="breakdown-row__value" role="cell">
                          {activeBreakdown[label]}
                        </span>
                        <span className="breakdown-row__percent" role="cell">
                          {activeBreakdownPercent[label] ?? "—"}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}

                {isSalesForecast ? (
                  <div className="forecast-chart" role="img" aria-label="Sales forecast">
                    <svg viewBox="0 0 520 180" aria-hidden="true">
                      <path
                        className="forecast-line forecast-line--past"
                        d={buildPath(activeForecast.past)}
                      />
                      <path
                        className="forecast-line forecast-line--today"
                        d={buildPath(activeForecast.today)}
                      />
                      <path
                        className="forecast-line forecast-line--projected"
                        d={buildPath(activeForecast.projected)}
                      />
                    </svg>
                  </div>
                ) : null}

                {isSalesProduct ? (
                  (() => {
                    const totalUnits = activeProductMix.reduce(
                      (sum, item) => sum + item.units,
                      0,
                    );
                    const topSellers = [...activeProductMix]
                      .sort((a, b) => b.units - a.units)
                      .slice(0, 5);
                    const bottomSellers = [...activeProductMix]
                      .sort((a, b) => a.units - b.units)
                      .slice(0, 5);

                    return (
                      <div className="vendor-section">
                        <div className="vendor-section">
                          <p className="metric__label">Top 5 Products</p>
                          <div className="breakdown-table" role="table">
                            <div className="breakdown-row breakdown-row--header" role="row">
                              <span className="breakdown-row__label" role="columnheader">
                                Product
                              </span>
                              <span className="breakdown-row__value" role="columnheader">
                                Units
                              </span>
                              <span className="breakdown-row__percent" role="columnheader">
                                % of Total
                              </span>
                            </div>
                            {topSellers.map((item) => {
                              const percent = totalUnits
                                ? Math.round((item.units / totalUnits) * 100)
                                : 0;
                              return (
                                <div key={item.name} className="breakdown-row" role="row">
                                  <span className="breakdown-row__label" role="cell">
                                    {item.name}
                                  </span>
                                  <span className="breakdown-row__value" role="cell">
                                    {item.units}
                                  </span>
                                  <span className="breakdown-row__percent" role="cell">
                                    {percent}%
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="vendor-section">
                          <p className="metric__label">Bottom 5 Products</p>
                          <div className="breakdown-table" role="table">
                            <div className="breakdown-row breakdown-row--header" role="row">
                              <span className="breakdown-row__label" role="columnheader">
                                Product
                              </span>
                              <span className="breakdown-row__value" role="columnheader">
                                Units
                              </span>
                              <span className="breakdown-row__percent" role="columnheader">
                                % of Total
                              </span>
                            </div>
                            {bottomSellers.map((item) => {
                              const percent = totalUnits
                                ? Math.round((item.units / totalUnits) * 100)
                                : 0;
                              return (
                                <div key={item.name} className="breakdown-row" role="row">
                                  <span className="breakdown-row__label" role="cell">
                                    {item.name}
                                  </span>
                                  <span className="breakdown-row__value" role="cell">
                                    {item.units}
                                  </span>
                                  <span className="breakdown-row__percent" role="cell">
                                    {percent}%
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })()
                ) : null}

                {isExpensesOverview ? (
                  <div className="metrics">
                    <div className="metric">
                      <p className="metric__label">Total Expenses</p>
                      <p className="metric__value">{activeExpensesTotal}</p>
                    </div>
                  </div>
                ) : null}

                {isExpensesCategories ? (
                  (() => {
                    const parseCurrency = (value: string) => {
                      const numeric = Number(value.replace(/[^0-9.-]+/g, ""));
                      return Number.isNaN(numeric) ? 0 : numeric;
                    };

                    const formatCurrency = (value: number) =>
                      `$${Math.round(value).toLocaleString()}`;

                    const lineItemsByCategory: Record<
                      string,
                      { label: string; share: number }[]
                    > = {
                      Labor: [
                        { label: "Cook", share: 0.45 },
                        { label: "Manager", share: 0.35 },
                        { label: "Cashier", share: 0.2 },
                      ],
                      COGS: [
                        { label: "Food", share: 0.55 },
                        { label: "Beverage", share: 0.25 },
                        { label: "Alcohol", share: 0.2 },
                      ],
                      "Fixed costs": [
                        { label: "Rent", share: 0.5 },
                        { label: "Insurance", share: 0.2 },
                        { label: "Accounting", share: 0.2 },
                        { label: "Bookkeeping", share: 0.1 },
                      ],
                      Utilities: [
                        { label: "Electric", share: 0.35 },
                        { label: "Gas", share: 0.25 },
                        { label: "Water", share: 0.2 },
                        { label: "Internet", share: 0.2 },
                      ],
                      Chemicals: [
                        { label: "Cleaning supplies", share: 0.6 },
                        { label: "Sanitizer", share: 0.4 },
                      ],
                      Linen: [
                        { label: "Linen service", share: 0.65 },
                        { label: "Towels", share: 0.35 },
                      ],
                    };

                    return (
                      <div className="breakdown-table" role="table">
                        <div
                          className="breakdown-row breakdown-row--header budget-row"
                          role="row"
                        >
                          <span className="breakdown-row__label" role="columnheader">
                            Category
                          </span>
                          <span className="breakdown-row__value" role="columnheader">
                            Amount
                          </span>
                          <span className="breakdown-row__percent" role="columnheader">
                            % of Total
                          </span>
                          <span
                            className="breakdown-row__percent"
                            role="columnheader"
                          />
                        </div>
                        {expensesCategoryRows.map((label) => {
                          const isOpen = openExpenseCategoryId === label;
                          const total = parseCurrency(activeExpensesCategories[label]);
                          const items = lineItemsByCategory[label] ?? [];
                          return (
                            <div key={label} className="expense-accordion__item">
                              <div
                                className="breakdown-row expense-accordion__row"
                                role="button"
                                tabIndex={0}
                                aria-expanded={isOpen}
                                onClick={() => handleExpenseCategoryToggle(label)}
                                onKeyDown={(event) =>
                                  handleExpenseCategoryKeyDown(event, label)
                                }
                              >
                                <span className="breakdown-row__label" role="cell">
                                  {label}
                                </span>
                                <span className="breakdown-row__value" role="cell">
                                  {activeExpensesCategories[label]}
                                </span>
                                <span className="breakdown-row__percent" role="cell">
                                  {activeExpensesPercents[label]}
                                </span>
                                <span className="expense-accordion__chevron" aria-hidden>
                                  {isOpen ? "−" : "+"}
                                </span>
                              </div>
                              <div
                                className={`expense-accordion__panel${
                                  isOpen ? " expense-accordion__panel--open" : ""
                                }`}
                              >
                                <div className="expense-accordion__details">
                                  {items.map((item) => {
                                    const amount = total * item.share;
                                    const percent = total
                                      ? Math.round((amount / total) * 100)
                                      : 0;
                                    return (
                                      <div
                                        key={item.label}
                                        className="expense-accordion__detail"
                                      >
                                        <span className="expense-accordion__detail-label">
                                          {item.label}
                                        </span>
                                        <span className="expense-accordion__detail-value">
                                          {formatCurrency(amount)}
                                        </span>
                                        <span className="expense-accordion__detail-percent">
                                          {percent}%
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()
                ) : null}

                {isExpensesBudgets ? (
                  (() => {
                    const parseCurrency = (value: string) => {
                      const numeric = Number(value.replace(/[^0-9.-]+/g, ""));
                      return Number.isNaN(numeric) ? 0 : numeric;
                    };
                    const formatCurrency = (value: number) =>
                      `$${Math.round(value).toLocaleString()}`;
                    const budgets: Record<string, number> = {
                      Labor: 52000,
                      COGS: 33000,
                      "Fixed costs": 18000,
                      Utilities: 7200,
                      Chemicals: 3200,
                      Linen: 2200,
                    };
                    const budgetRows = [
                      { key: "Labor", label: "Labor" },
                      { key: "COGS", label: "COGS" },
                      { key: "Fixed costs", label: "Fixed Costs" },
                      { key: "Utilities", label: "Utilities" },
                      { key: "Chemicals", label: "Chemicals" },
                      { key: "Linen", label: "Linen" },
                    ];

                    return (
                      <div className="breakdown-table" role="table">
                        <div className="breakdown-row breakdown-row--header" role="row">
                          <span className="breakdown-row__label" role="columnheader">
                            Category
                          </span>
                          <span className="breakdown-row__value" role="columnheader">
                            Budget
                          </span>
                          <span className="breakdown-row__value" role="columnheader">
                            Actual
                          </span>
                          <span className="breakdown-row__percent" role="columnheader">
                            Variance
                          </span>
                        </div>
                        {budgetRows.map((row) => {
                          const actual = parseCurrency(
                            activeExpensesCategories[row.key],
                          );
                          const budget = budgets[row.key] ?? 0;
                          const variance = actual - budget;
                          const varianceTone = variance > 0 ? "#c65d4e" : "#4b7a60";
                          return (
                            <div key={row.key} className="breakdown-row budget-row" role="row">
                              <span className="breakdown-row__label" role="cell">
                                {row.label}
                              </span>
                              <span className="breakdown-row__value" role="cell">
                                {formatCurrency(budget)}
                              </span>
                              <span className="breakdown-row__value" role="cell">
                                {activeExpensesCategories[row.key]}
                              </span>
                              <span
                                className="breakdown-row__percent"
                                role="cell"
                                style={{ color: varianceTone }}
                              >
                                {variance > 0 ? "+" : ""}
                                {formatCurrency(variance)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()
                ) : null}
              </div>
            ) : isExpensesVendors ? (
              (() => {
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
              })()
            ) : isFinancialsCashflow ? (
              (() => {
                const cashflowMonth = "September 2024";
                const cashflowDays = [
                  { day: 26, current: false, sales: 14200, expenses: 15680 },
                  { day: 27, current: false, sales: 16800, expenses: 15100 },
                  { day: 28, current: false, sales: 19200, expenses: 18350 },
                  { day: 29, current: false, sales: 15800, expenses: 17020 },
                  { day: 30, current: false, sales: 17600, expenses: 16240 },
                  { day: 31, current: false, sales: 18450, expenses: 17480 },
                  { day: 1, current: true, sales: 18200, expenses: 15600 },
                  { day: 2, current: true, sales: 16600, expenses: 14200 },
                  { day: 3, current: true, sales: 19200, expenses: 17100 },
                  { day: 4, current: true, sales: 17800, expenses: 16550 },
                  { day: 5, current: true, sales: 20400, expenses: 18800 },
                  { day: 6, current: true, sales: 21400, expenses: 19350 },
                  { day: 7, current: true, sales: 15600, expenses: 14900 },
                  { day: 8, current: true, sales: 16400, expenses: 17100 },
                  { day: 9, current: true, sales: 18900, expenses: 16250 },
                  { day: 10, current: true, sales: 20300, expenses: 18880 },
                  { day: 11, current: true, sales: 17600, expenses: 15400 },
                  { day: 12, current: true, sales: 19300, expenses: 16850 },
                  { day: 13, current: true, sales: 22100, expenses: 20100 },
                  { day: 14, current: true, sales: 14800, expenses: 14050 },
                  { day: 15, current: true, sales: 18200, expenses: 17650 },
                  { day: 16, current: true, sales: 19600, expenses: 18200 },
                  { day: 17, current: true, sales: 20500, expenses: 19100 },
                  { day: 18, current: true, sales: 18700, expenses: 17000 },
                  { day: 19, current: true, sales: 21000, expenses: 18950 },
                  { day: 20, current: true, sales: 23000, expenses: 21100 },
                  { day: 21, current: true, sales: 15200, expenses: 14800 },
                  { day: 22, current: true, sales: 16800, expenses: 15900 },
                  { day: 23, current: true, sales: 18900, expenses: 19600 },
                  { day: 24, current: true, sales: 20100, expenses: 18400 },
                  { day: 25, current: true, sales: 19400, expenses: 17350 },
                  { day: 26, current: true, sales: 20900, expenses: 20150 },
                  { day: 27, current: true, sales: 22200, expenses: 20600 },
                  { day: 28, current: true, sales: 16400, expenses: 15500 },
                  { day: 29, current: true, sales: 17500, expenses: 16800 },
                  { day: 30, current: true, sales: 18700, expenses: 19450 },
                  { day: 1, current: false, sales: 19800, expenses: 18200 },
                  { day: 2, current: false, sales: 17200, expenses: 16350 },
                  { day: 3, current: false, sales: 18900, expenses: 17700 },
                  { day: 4, current: false, sales: 20100, expenses: 19050 },
                  { day: 5, current: false, sales: 18200, expenses: 16800 },
                ];
                const cashflowWeek = [
                  { label: "Mon · 08", sales: 16400, expenses: 17100 },
                  { label: "Tue · 09", sales: 18900, expenses: 16250 },
                  { label: "Wed · 10", sales: 20300, expenses: 18880 },
                  { label: "Thu · 11", sales: 17600, expenses: 15400 },
                  { label: "Fri · 12", sales: 19300, expenses: 16850 },
                  { label: "Sat · 13", sales: 22100, expenses: 20100 },
                  { label: "Sun · 14", sales: 14800, expenses: 14050 },
                ];

                const formatCompact = (value: number) =>
                  `$${(value / 1000).toFixed(1)}k`;
                const formatCurrency = (value: number) =>
                  `$${Math.round(value).toLocaleString()}`;

                const getShadeClass = (net: number) => {
                  if (net <= -2000) return "cashflow-day--neg-strong";
                  if (net <= -500) return "cashflow-day--neg";
                  if (net < 500) return "cashflow-day--neutral";
                  if (net < 2000) return "cashflow-day--pos";
                  return "cashflow-day--pos-strong";
                };

                return (
                  <div className="truth-section__content">
                    <div className="cashflow-header">
                      <span className="metric__label">Cashflow view</span>
                      <h4 className="cashflow-title">{cashflowMonth}</h4>
                      <div
                        className="time-selector"
                        role="tablist"
                        aria-label="Cashflow view"
                      >
                        {["Month", "Week"].map((option) => (
                          <button
                            key={option}
                            type="button"
                            className={`time-pill${
                              cashflowView === option ? " time-pill--active" : ""
                            }`}
                            onClick={() =>
                              setCashflowView(option as "Month" | "Week")
                            }
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="cashflow-calendar" role="grid">
                      {(cashflowView === "Month"
                        ? cashflowDays
                        : cashflowWeek
                      ).map((entry, index) => {
                        const net = entry.sales - entry.expenses;
                        const netLabel = `${net >= 0 ? "+" : "-"} ${formatCompact(
                          Math.abs(net),
                        )}`;
                        const isMuted =
                          cashflowView === "Month" &&
                          "current" in entry &&
                          !entry.current;
                        const dayLabel =
                          cashflowView === "Month"
                            ? (() => {
                                const weekdays = [
                                  "Mon",
                                  "Tue",
                                  "Wed",
                                  "Thu",
                                  "Fri",
                                  "Sat",
                                  "Sun",
                                ];
                                const weekday = weekdays[index % weekdays.length];
                                return `${weekday}, Sep ${entry.day}`;
                              })()
                            : ` ${"label" in entry ? entry.label.replace(" · ", ", Sep ") : ""}`;
                        return (
                          <div
                            key={`${"day" in entry ? entry.day : entry.label}-${index}`}
                            className={`cashflow-day ${getShadeClass(net)}${
                              isMuted ? " cashflow-day--muted" : ""
                            }`}
                            role="gridcell"
                            tabIndex={0}
                            onClick={() =>
                              handleCashflowDetailOpen({
                                label: dayLabel.trim(),
                                sales: entry.sales,
                                expenses: entry.expenses,
                              })
                            }
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                handleCashflowDetailOpen({
                                  label: dayLabel.trim(),
                                  sales: entry.sales,
                                  expenses: entry.expenses,
                                });
                              }
                            }}
                          >
                            <span className="cashflow-day__date">
                              {"day" in entry ? entry.day : entry.label}
                            </span>
                            <span className="cashflow-day__net">{netLabel}</span>
                            <span className="cashflow-day__detail">
                              Sales: {formatCompact(entry.sales)}
                            </span>
                            <span className="cashflow-day__detail">
                              Exp: {formatCompact(entry.expenses)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    {cashflowDetail ? (
                      <div
                        className="modal-overlay"
                        role="presentation"
                        onClick={handleCashflowDetailClose}
                      >
                        <div
                          className="modal-sheet"
                          role="dialog"
                          aria-modal="true"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <div className="modal-header">
                            <div>
                              <p className="modal-title">{cashflowDetail.label}</p>
                              <p className="modal-subtitle">Cashflow detail</p>
                            </div>
                            <div className="modal-header__meta">
                              <span className="modal-net">
                                {formatCurrency(
                                  cashflowDetail.sales - cashflowDetail.expenses,
                                )}
                              </span>
                              <button
                                type="button"
                                className="modal-close"
                                onClick={handleCashflowDetailClose}
                              >
                                ×
                              </button>
                            </div>
                          </div>
                          {(() => {
                            const salesItems = [
                              { label: "Credit card sales", share: 0.55 },
                              { label: "Cash sales", share: 0.18 },
                              { label: "3rd-party delivery sales", share: 0.17 },
                              { label: "Sales tax collected", share: 0.06 },
                              { label: "Tips collected", share: 0.04 },
                            ];
                            const expenseItems = [
                              { label: "Northern Provisions", share: 0.4 },
                              { label: "Harbor Supply Co.", share: 0.25 },
                              { label: "Capital Farms", share: 0.2 },
                              { label: "District Utilities", share: 0.15 },
                            ];
                            const totalSales = cashflowDetail.sales;
                            const totalExpenses = cashflowDetail.expenses;
                            const netTotal = totalSales - totalExpenses;

                            return (
                              <div className="modal-body">
                                <div className="modal-section">
                                  <p className="metric__label">Sales In</p>
                                  <div className="modal-list">
                                    {salesItems.map((item) => (
                                      <div key={item.label} className="modal-row">
                                        <span className="modal-row__label">
                                          {item.label}
                                        </span>
                                        <span className="modal-row__value">
                                          {formatCurrency(totalSales * item.share)}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className="modal-section">
                                  <p className="metric__label">Expenses Out</p>
                                  <div className="modal-list">
                                    {expenseItems.map((item) => (
                                      <div key={item.label} className="modal-row">
                                        <span className="modal-row__label">
                                          {item.label}
                                        </span>
                                        <span className="modal-row__value">
                                          {formatCurrency(totalExpenses * item.share)}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className="modal-summary">
                                  <div className="modal-row">
                                    <span className="modal-row__label">Total Sales In</span>
                                    <span className="modal-row__value">
                                      {formatCurrency(totalSales)}
                                    </span>
                                  </div>
                                  <div className="modal-row">
                                    <span className="modal-row__label">
                                      Total Expenses Out
                                    </span>
                                    <span className="modal-row__value">
                                      {formatCurrency(totalExpenses)}
                                    </span>
                                  </div>
                                  <div className="modal-row modal-row--strong">
                                    <span className="modal-row__label">Net Profit</span>
                                    <span className="modal-row__value">
                                      {formatCurrency(netTotal)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })()
            ) : isFinancialsProfitLoss ? (
              (() => {
                const parseCurrency = (value: string) => {
                  const numeric = Number(value.replace(/[^0-9.-]+/g, ""));
                  return Number.isNaN(numeric) ? 0 : numeric;
                };

                const formatCurrency = (value: number) =>
                  `$${Math.round(value).toLocaleString()}`;

                const getSalesValue = (period: string) => {
                  if (period === "Quarter") {
                    const monthSales = parseCurrency(
                      salesOverviewMetrics.Month.gross,
                    );
                    return monthSales * 3;
                  }
                  return parseCurrency(
                    salesOverviewMetrics[period]?.gross ??
                      salesOverviewMetrics.Month.gross,
                  );
                };

                const getExpenseValue = (period: string) => {
                  if (period === "Quarter") {
                    const monthExpenses = parseCurrency(expensesOverviewTotals.Month);
                    return monthExpenses * 3;
                  }
                  return parseCurrency(
                    expensesOverviewTotals[period] ?? expensesOverviewTotals.Month,
                  );
                };

                const salesValue = getSalesValue(financialsTime);
                const expensesValue = getExpenseValue(financialsTime);
                const profitValue = salesValue - expensesValue;
                const expensePercent =
                  salesValue > 0
                    ? Math.round((expensesValue / salesValue) * 100)
                    : 0;
                const profitPercent =
                  salesValue > 0
                    ? Math.round((profitValue / salesValue) * 100)
                    : 0;

                return (
                  <div className="truth-section__content">
                    <div
                      className="time-selector"
                      role="tablist"
                      aria-label="Time range"
                    >
                      {financialsTimeOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`time-pill${
                            financialsTime === option ? " time-pill--active" : ""
                          }`}
                          onClick={() => setFinancialsTime(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    <div className="breakdown-table" role="table">
                      <div className="breakdown-row breakdown-row--header" role="row">
                        <span className="breakdown-row__label" role="columnheader">
                          Line item
                        </span>
                        <span className="breakdown-row__value" role="columnheader">
                          Amount
                        </span>
                        <span className="breakdown-row__percent" role="columnheader">
                          % of Sales
                        </span>
                      </div>
                      <div className="breakdown-row" role="row">
                        <span className="breakdown-row__label" role="cell">
                          Sales
                        </span>
                        <span className="breakdown-row__value" role="cell">
                          {formatCurrency(salesValue)}
                        </span>
                        <span className="breakdown-row__percent" role="cell">
                          100%
                        </span>
                      </div>
                      <div className="breakdown-row" role="row">
                        <span className="breakdown-row__label" role="cell">
                          Expenses
                        </span>
                        <span className="breakdown-row__value" role="cell">
                          {formatCurrency(expensesValue)}
                        </span>
                        <span className="breakdown-row__percent" role="cell">
                          {expensePercent}%
                        </span>
                      </div>
                      <div className="breakdown-row" role="row">
                        <span className="breakdown-row__label" role="cell">
                          Profit
                        </span>
                        <span className="breakdown-row__value" role="cell">
                          {formatCurrency(profitValue)}
                        </span>
                        <span className="breakdown-row__percent" role="cell">
                          {profitPercent}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()
            ) : isPresenceReviews ? (
              (() => {
                const reviews = [
                  {
                    id: "review-1",
                    source: "Yelp",
                    rating: "4.6",
                    date: "Sep 3, 2024",
                    reviewer: "Mia Torres",
                    text: "Warm service and a beautifully balanced menu. The roasted chicken was perfectly seasoned and the sides felt thoughtful without being fussy.",
                  },
                  {
                    id: "review-2",
                    source: "Google",
                    rating: "5.0",
                    date: "Aug 28, 2024",
                    reviewer: "Liam Chen",
                    text: "Stopped in after work and the staff made it effortless. Cocktails were sharp, food came quickly, and the dining room felt calm and polished.",
                  },
                  {
                    id: "review-3",
                    source: "TripAdvisor",
                    rating: "4.2",
                    date: "Aug 22, 2024",
                    reviewer: "Priya Patel",
                    text: "Everything tasted fresh and the pacing was just right. A great spot for a quiet dinner with friends when you want something consistent.",
                  },
                  {
                    id: "review-4",
                    source: "Uber Eats",
                    rating: "4.8",
                    date: "Aug 20, 2024",
                    reviewer: "Jamal Rivers",
                    text: "Delivery arrived early, packaging was tidy, and the portions were generous. The grain bowl held up perfectly and still tasted bright.",
                  },
                  {
                    id: "review-5",
                    source: "Google",
                    rating: "4.4",
                    date: "Aug 15, 2024",
                    reviewer: "Sofia Alvarez",
                    text: "Loved the atmosphere and the staff recommendations. Desserts were the highlight, especially the citrus tart with a crisp crust.",
                  },
                  {
                    id: "review-6",
                    source: "Yelp",
                    rating: "4.1",
                    date: "Aug 11, 2024",
                    reviewer: "Noah Bennett",
                    text: "Solid neighborhood staple. The seasonal salad was balanced and the service team checked in without interrupting conversation.",
                  },
                  {
                    id: "review-7",
                    source: "TripAdvisor",
                    rating: "4.7",
                    date: "Aug 5, 2024",
                    reviewer: "Harper Scott",
                    text: "We had a great lunch here. The menu was easy to navigate and everything felt thoughtfully prepared with a nice finish.",
                  },
                ];
                const reviewTintMap: Record<string, string> = {
                  google: "review-card--google",
                  "google maps": "review-card--google",
                  "google business profile": "review-card--google",
                  yelp: "review-card--yelp",
                  tripadvisor: "review-card--tripadvisor",
                  "uber eats": "review-card--uber",
                  "delivery apps": "review-card--delivery",
                };

                return (
                  <div className="truth-section__content">
                    <div className="reviews-feed" role="list">
                      {reviews.map((review) => {
                        const tintClass =
                          reviewTintMap[review.source.toLowerCase()] ??
                          "review-card--neutral";
                        return (
                        <article
                          key={review.id}
                          className={`review-card ${tintClass}`}
                          role="listitem"
                        >
                          <div className="review-card__meta">
                            <span className="review-card__source">
                              {review.source}
                            </span>
                            <span className="review-card__rating">
                              {review.rating}★
                            </span>
                          </div>
                          <div className="review-card__details">
                            <span className="review-card__date">{review.date}</span>
                            <span className="review-card__reviewer">
                              {review.reviewer}
                            </span>
                          </div>
                          <p className="review-card__text">{review.text}</p>
                        </article>
                      );
                      })}
                    </div>
                  </div>
                );
              })()
            ) : isPresenceTraffic ? (
              (() => {
                const sources = [
                  {
                    id: "google-search",
                    label: "Google Search",
                    metric: "1,420 views",
                    delta: "+6% WoW",
                    comparison: "1,420 → 1,338",
                    topAction: "Website visits",
                    narrative: "Discovery continues to build week over week.",
                  },
                  {
                    id: "google-maps",
                    label: "Google Maps",
                    metric: "980 views",
                    delta: "+2% WoW",
                    comparison: "980 → 962",
                    topAction: "Directions",
                    narrative: "Local intent remains steady with slight growth.",
                  },
                  {
                    id: "yelp",
                    label: "Yelp",
                    metric: "412 views",
                    delta: "−3% WoW",
                    comparison: "412 → 425",
                    topAction: "Calls",
                    narrative: "Softer demand this week but still engaged.",
                  },
                  {
                    id: "tripadvisor",
                    label: "TripAdvisor",
                    metric: "368 views",
                    delta: "+4% WoW",
                    comparison: "368 → 353",
                    topAction: "Menu views",
                    narrative: "Travel discovery is trending upward.",
                  },
                  {
                    id: "delivery-apps",
                    label: "Delivery Apps",
                    metric: "1,106 views",
                    delta: "−1% WoW",
                    comparison: "1,106 → 1,118",
                    topAction: "Add to cart",
                    narrative: "Digital ordering remains consistent overall.",
                  },
                ];

                return (
                  <div className="truth-section__content">
                    <div className="traffic-accordion" role="list">
                      {sources.map((source) => {
                        const isOpen = openTrafficId === source.id;
                        return (
                          <div key={source.id} className="traffic-accordion__item">
                            <div
                              className="traffic-accordion__row"
                              role="button"
                              tabIndex={0}
                              aria-expanded={isOpen}
                              onClick={() => handleTrafficToggle(source.id)}
                              onKeyDown={(event) =>
                                handleTrafficKeyDown(event, source.id)
                              }
                            >
                              <span className="traffic-accordion__label">
                                {source.label}
                              </span>
                              <span className="traffic-accordion__metric">
                                {source.metric}
                              </span>
                              <span className="traffic-accordion__delta">
                                {source.delta}
                              </span>
                              <span className="traffic-accordion__chevron" aria-hidden="true">
                                {isOpen ? "⌃" : "⌄"}
                              </span>
                            </div>
                            <div
                              className={`traffic-accordion__panel${
                                isOpen ? " traffic-accordion__panel--open" : ""
                              }`}
                              aria-hidden={!isOpen}
                            >
                              <div className="traffic-accordion__details">
                                <div className="traffic-accordion__detail">
                                  <span className="traffic-accordion__detail-label">
                                    Last 7 days vs prior 7 days
                                  </span>
                                  <span className="traffic-accordion__detail-value">
                                    {source.comparison}
                                  </span>
                                </div>
                                <div className="traffic-accordion__detail">
                                  <span className="traffic-accordion__detail-label">
                                    Top action
                                  </span>
                                  <span className="traffic-accordion__detail-value">
                                    {source.topAction}
                                  </span>
                                </div>
                                <p className="traffic-accordion__narrative">
                                  {source.narrative}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()
            ) : isPresenceSocial ? (
              (() => {
                const feedItems = [
                  {
                    id: "social-1",
                    platform: "Instagram",
                    type: "post",
                    timestamp: "Today · 9:40 AM",
                    postType: "Reel",
                    caption:
                      "Morning service highlight with the seasonal breakfast board and a quick chef walkthrough of the prep line.",
                    likes: 482,
                    comments: 36,
                    views: 4200,
                  },
                  {
                    id: "social-2",
                    platform: "TikTok",
                    type: "highlight",
                    timestamp: "Today · 8:10 AM",
                    message: "Reel performing above average for the week.",
                  },
                  {
                    id: "social-3",
                    platform: "Facebook",
                    type: "post",
                    timestamp: "Yesterday · 6:12 PM",
                    postType: "Photo",
                    caption:
                      "Golden hour on the patio. Thank you for another full-house evening and the warm reviews.",
                    likes: 214,
                    comments: 18,
                    views: 0,
                  },
                  {
                    id: "social-4",
                    platform: "Google Business Profile",
                    type: "signal",
                    timestamp: "Yesterday · 10:05 AM",
                    message: "Engagement down vs last month.",
                  },
                  {
                    id: "social-5",
                    platform: "X",
                    type: "post",
                    timestamp: "Sep 12 · 3:20 PM",
                    postType: "Text",
                    caption:
                      "Chef’s tasting menu returns this weekend. Limited bar seats available for walk-ins.",
                    likes: 96,
                    comments: 12,
                    views: 820,
                  },
                  {
                    id: "social-6",
                    platform: "TikTok",
                    type: "post",
                    timestamp: "Sep 11 · 5:04 PM",
                    postType: "Video",
                    caption:
                      "Behind-the-scenes of the pastry team plating tonight’s dessert trio.",
                    likes: 318,
                    comments: 22,
                    views: 3100,
                  },
                  {
                    id: "social-7",
                    platform: "Instagram",
                    type: "signal",
                    timestamp: "Sep 10 · 9:00 AM",
                    message: "New platform activity detected.",
                  },
                ];
                const socialTintMap: Record<string, string> = {
                  instagram: "social-card--instagram",
                  tiktok: "social-card--tiktok",
                  facebook: "social-card--facebook",
                  "google business profile": "social-card--google",
                  x: "social-card--x",
                };

                return (
                  <div className="truth-section__content">
                    <div className="social-feed" role="list">
                      {feedItems.map((item) => {
                        const tintClass =
                          socialTintMap[item.platform.toLowerCase()] ??
                          "social-card--neutral";
                        return (
                        <article
                          key={item.id}
                          className={`social-card ${tintClass}`}
                          role="listitem"
                        >
                          <div className="social-card__header">
                            <span className="social-card__platform">
                              {item.platform}
                            </span>
                            <span className="social-card__timestamp">
                              {item.timestamp}
                            </span>
                          </div>
                          {item.type === "post" ? (
                            <>
                              <span className="social-card__type">
                                {item.postType}
                              </span>
                              <p className="social-card__caption">{item.caption}</p>
                              <div className="social-card__engagement">
                                <span>Likes {item.likes}</span>
                                <span>Comments {item.comments}</span>
                                {item.views ? <span>Views {item.views}</span> : null}
                              </div>
                            </>
                          ) : (
                            <p className="social-card__message">{item.message}</p>
                          )}
                        </article>
                      );
                      })}
                    </div>
                  </div>
                );
              })()
            ) : isReportingEmailReports ? (
              <div className="truth-section__content">
                <div className="reporting-section">
                  <div className="reporting-section__header">
                    <p className="reporting-section__subtitle">
                      Configure delivery preferences for scheduled reporting.
                    </p>
                  </div>
                  <div className="reporting-list" role="list">
                    {reportPreferences.map((report) => (
                      <div key={report.id} className="reporting-row" role="listitem">
                        <div className="reporting-row__label">{report.label}</div>
                        <label className="toggle">
                          <input
                            type="checkbox"
                            checked={report.enabled}
                            onChange={() => handleReportToggle(report.id)}
                          />
                          <span className="toggle__track" />
                        </label>
                        <select
                          className="reporting-select"
                          value={report.frequency}
                          onChange={(event) =>
                            handleReportChange(report.id, "frequency", event.target.value)
                          }
                        >
                          <option value="Daily">Daily</option>
                          <option value="Weekly">Weekly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                        <select
                          className="reporting-select"
                          value={report.recipient}
                          onChange={(event) =>
                            handleReportChange(report.id, "recipient", event.target.value)
                          }
                        >
                          <option value="Owner">Owner</option>
                          <option value="Managers">Managers</option>
                          <option value="Custom email">Custom email</option>
                        </select>
                        <input
                          className="reporting-input"
                          type="text"
                          placeholder="custom@email.com"
                          value={report.email}
                          onChange={(event) =>
                            handleReportChange(report.id, "email", event.target.value)
                          }
                          disabled={report.recipient !== "Custom email"}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : isReportingNotifications ? (
              <div className="truth-section__content">
                <div className="reporting-section">
                  <div className="reporting-section__header">
                    <p className="reporting-section__subtitle">
                      Set alert sensitivity for key operating signals.
                    </p>
                  </div>
                  <div className="reporting-list" role="list">
                    {notificationPreferences.map((notification) => (
                      <div
                        key={notification.id}
                        className="reporting-row reporting-row--compact"
                        role="listitem"
                      >
                        <div className="reporting-row__label">{notification.label}</div>
                        <label className="toggle">
                          <input
                            type="checkbox"
                            checked={notification.enabled}
                            onChange={() => handleNotificationToggle(notification.id)}
                          />
                          <span className="toggle__track" />
                        </label>
                        <select
                          className="reporting-select"
                          value={notification.sensitivity}
                          onChange={(event) =>
                            handleNotificationChange(notification.id, event.target.value)
                          }
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : isSettingsBusiness ? (
              <div className="truth-section__content">
                <div className="settings-section">
                  <div className="settings-section__header">
                    <p className="settings-section__subtitle">
                      Core business details used across reporting and profiles.
                    </p>
                  </div>
                  <div className="settings-card">
                    <div className="settings-form">
                      <label className="settings-field">
                        <span className="settings-field__label">Business name</span>
                        <input
                          className="settings-input"
                          type="text"
                          placeholder="Business name"
                        />
                      </label>
                      <label className="settings-field">
                        <span className="settings-field__label">Address</span>
                        <input
                          className="settings-input"
                          type="text"
                          placeholder="Street address"
                        />
                      </label>
                      <div className="settings-grid">
                        <label className="settings-field">
                          <span className="settings-field__label">Zip code</span>
                          <input
                            className="settings-input"
                            type="text"
                            placeholder="Zip code"
                          />
                        </label>
                        <label className="settings-field">
                          <span className="settings-field__label">Website URL</span>
                          <input
                            className="settings-input"
                            type="text"
                            placeholder="https://example.com"
                          />
                        </label>
                      </div>
                      <label className="settings-field">
                        <span className="settings-field__label">Time zone</span>
                        <select className="settings-input">
                          <option>Eastern (ET)</option>
                          <option>Central (CT)</option>
                          <option>Mountain (MT)</option>
                          <option>Pacific (PT)</option>
                        </select>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ) : isSettingsOperations ? (
              <div className="truth-section__content">
                <div className="settings-section">
                  <div className="settings-section__header">
                    <p className="settings-section__subtitle">
                      Day-to-day defaults used by ordering and operations.
                    </p>
                  </div>
                  <div className="settings-card">
                    <div className="settings-form">
                      <label className="settings-field">
                        <span className="settings-field__label">
                          Default delivery days
                        </span>
                        <input
                          className="settings-input"
                          type="text"
                          placeholder="e.g. Mon / Wed / Fri"
                        />
                      </label>
                      <label className="settings-field">
                        <span className="settings-field__label">
                          Default delivery minimum
                        </span>
                        <input
                          className="settings-input"
                          type="text"
                          placeholder="$0.00"
                        />
                      </label>
                      <label className="settings-field">
                        <span className="settings-field__label">Cash deposit day(s)</span>
                        <input
                          className="settings-input"
                          type="text"
                          placeholder="e.g. Tue / Thu"
                        />
                      </label>
                      <div className="settings-toggle-row">
                        <span className="settings-field__label">Tax handling</span>
                        <label className="toggle">
                          <input type="checkbox" />
                          <span className="toggle__track" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : isSettingsFinancialAssumptions ? (
              <div className="truth-section__content">
                <div className="settings-section">
                  <div className="settings-section__header">
                    <p className="settings-section__subtitle">
                      Default assumptions applied to forecasts and summaries.
                    </p>
                  </div>
                  <div className="settings-card">
                    <div className="settings-form">
                      <label className="settings-field">
                        <span className="settings-field__label">Sales tax %</span>
                        <input
                          className="settings-input"
                          type="text"
                          placeholder="e.g. 8%"
                        />
                      </label>
                      <label className="settings-field">
                        <span className="settings-field__label">Tip %</span>
                        <input
                          className="settings-input"
                          type="text"
                          placeholder="e.g. 18%"
                        />
                      </label>
                      <label className="settings-field">
                        <span className="settings-field__label">Payroll burden %</span>
                        <input
                          className="settings-input"
                          type="text"
                          placeholder="e.g. 12%"
                        />
                      </label>
                      <label className="settings-field">
                        <span className="settings-field__label">Default labor %</span>
                        <input
                          className="settings-input"
                          type="text"
                          placeholder="e.g. 30%"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ) : isSettingsAlerts ? (
              <div className="truth-section__content">
                <div className="settings-section">
                  <div className="settings-section__header">
                    <p className="settings-section__subtitle">
                      Alert toggles and sensitivity levels for key signals.
                    </p>
                  </div>
                  <div className="settings-card">
                    <div className="settings-list" role="list">
                      {notificationPreferences.map((notification) => (
                        <div
                          key={notification.id}
                          className="settings-row"
                          role="listitem"
                        >
                          <span className="settings-row__label">
                            {notification.label}
                          </span>
                          <label className="toggle">
                            <input
                              type="checkbox"
                              checked={notification.enabled}
                              onChange={() => handleNotificationToggle(notification.id)}
                            />
                            <span className="toggle__track" />
                          </label>
                          <select
                            className="settings-input settings-input--compact"
                            value={notification.sensitivity}
                            onChange={(event) =>
                              handleNotificationChange(
                                notification.id,
                                event.target.value,
                              )
                            }
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : isSettingsDisplay ? (
              <div className="truth-section__content">
                <div className="settings-section">
                  <div className="settings-section__header">
                    <p className="settings-section__subtitle">
                      Display and formatting preferences for the desktop view.
                    </p>
                  </div>
                  <div className="settings-card">
                    <div className="settings-form">
                      <label className="settings-field">
                        <span className="settings-field__label">Currency format</span>
                        <select className="settings-input">
                          <option>USD ($)</option>
                          <option>EUR (€)</option>
                          <option>GBP (£)</option>
                        </select>
                      </label>
                      <label className="settings-field">
                        <span className="settings-field__label">Week start day</span>
                        <select className="settings-input">
                          <option>Mon</option>
                          <option>Sun</option>
                        </select>
                      </label>
                      <div className="settings-toggle-row">
                        <span className="settings-field__label">Light / dark mode</span>
                        <label className="toggle">
                          <input type="checkbox" />
                          <span className="toggle__track" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              ) : (
                <p className="truth-section__body">Placeholder summary</p>
              )}
            </section>
          )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppShell;
