import { useMemo, useState } from "react";

type BreakdownItem = {
  id: string;
  label: string;
  amount: string;
  percent: string;
};

type BreakdownCategory = BreakdownItem & {
  items: BreakdownItem[];
};

type BreakdownItemValue = {
  id: string;
  label: string;
  amount: number;
};

type BreakdownCategoryValue = BreakdownItemValue & {
  items: BreakdownItemValue[];
};

type BreakdownSlice = {
  totalExpenses: number;
  categories: BreakdownCategoryValue[];
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

const breakdownByTime: Record<TimeKey, BreakdownSlice> = {
  Mon: {
    totalExpenses: 42380,
    categories: [
      {
        id: "labor",
        label: "Labor",
        amount: 12720,
        items: [
          { id: "labor-foh", label: "FOH Labor", amount: 5100 },
          { id: "labor-boh", label: "BOH Labor", amount: 5900 },
          { id: "labor-mgmt", label: "Management", amount: 1720 },
        ],
      },
      {
        id: "cogs",
        label: "COGS",
        amount: 11860,
        items: [
          { id: "cogs-food", label: "Food", amount: 7900 },
          { id: "cogs-bev", label: "Beverage", amount: 3960 },
        ],
      },
      {
        id: "fixed-costs",
        label: "Fixed Costs",
        amount: 6740,
        items: [
          { id: "fixed-rent", label: "Rent", amount: 4580 },
          { id: "fixed-insurance", label: "Insurance", amount: 2160 },
        ],
      },
      {
        id: "utilities",
        label: "Utilities",
        amount: 3320,
        items: [
          { id: "utilities-electric", label: "Electric", amount: 1500 },
          { id: "utilities-gas", label: "Gas", amount: 1070 },
          { id: "utilities-water", label: "Water", amount: 750 },
        ],
      },
      {
        id: "chemicals",
        label: "Chemicals",
        amount: 1760,
        items: [
          { id: "chemicals-cleaning", label: "Cleaning", amount: 1050 },
          { id: "chemicals-paper", label: "Paper", amount: 710 },
        ],
      },
      {
        id: "linen",
        label: "Linen",
        amount: 1980,
        items: [
          { id: "linen-towels", label: "Towels", amount: 1100 },
          { id: "linen-aprons", label: "Aprons", amount: 880 },
        ],
      },
    ],
  },
  Tue: {
    totalExpenses: 44910,
    categories: [
      {
        id: "labor",
        label: "Labor",
        amount: 13240,
        items: [
          { id: "labor-foh", label: "FOH Labor", amount: 5320 },
          { id: "labor-boh", label: "BOH Labor", amount: 6180 },
          { id: "labor-mgmt", label: "Management", amount: 1740 },
        ],
      },
      {
        id: "cogs",
        label: "COGS",
        amount: 12460,
        items: [
          { id: "cogs-food", label: "Food", amount: 8300 },
          { id: "cogs-bev", label: "Beverage", amount: 4160 },
        ],
      },
      {
        id: "fixed-costs",
        label: "Fixed Costs",
        amount: 6900,
        items: [
          { id: "fixed-rent", label: "Rent", amount: 4680 },
          { id: "fixed-insurance", label: "Insurance", amount: 2220 },
        ],
      },
      {
        id: "utilities",
        label: "Utilities",
        amount: 3520,
        items: [
          { id: "utilities-electric", label: "Electric", amount: 1590 },
          { id: "utilities-gas", label: "Gas", amount: 1120 },
          { id: "utilities-water", label: "Water", amount: 810 },
        ],
      },
      {
        id: "chemicals",
        label: "Chemicals",
        amount: 1820,
        items: [
          { id: "chemicals-cleaning", label: "Cleaning", amount: 1090 },
          { id: "chemicals-paper", label: "Paper", amount: 730 },
        ],
      },
      {
        id: "linen",
        label: "Linen",
        amount: 1970,
        items: [
          { id: "linen-towels", label: "Towels", amount: 1080 },
          { id: "linen-aprons", label: "Aprons", amount: 890 },
        ],
      },
    ],
  },
  Wed: {
    totalExpenses: 46220,
    categories: [
      {
        id: "labor",
        label: "Labor",
        amount: 13610,
        items: [
          { id: "labor-foh", label: "FOH Labor", amount: 5460 },
          { id: "labor-boh", label: "BOH Labor", amount: 6340 },
          { id: "labor-mgmt", label: "Management", amount: 1810 },
        ],
      },
      {
        id: "cogs",
        label: "COGS",
        amount: 12840,
        items: [
          { id: "cogs-food", label: "Food", amount: 8560 },
          { id: "cogs-bev", label: "Beverage", amount: 4280 },
        ],
      },
      {
        id: "fixed-costs",
        label: "Fixed Costs",
        amount: 7050,
        items: [
          { id: "fixed-rent", label: "Rent", amount: 4780 },
          { id: "fixed-insurance", label: "Insurance", amount: 2270 },
        ],
      },
      {
        id: "utilities",
        label: "Utilities",
        amount: 3600,
        items: [
          { id: "utilities-electric", label: "Electric", amount: 1630 },
          { id: "utilities-gas", label: "Gas", amount: 1150 },
          { id: "utilities-water", label: "Water", amount: 820 },
        ],
      },
      {
        id: "chemicals",
        label: "Chemicals",
        amount: 1900,
        items: [
          { id: "chemicals-cleaning", label: "Cleaning", amount: 1130 },
          { id: "chemicals-paper", label: "Paper", amount: 770 },
        ],
      },
      {
        id: "linen",
        label: "Linen",
        amount: 2020,
        items: [
          { id: "linen-towels", label: "Towels", amount: 1120 },
          { id: "linen-aprons", label: "Aprons", amount: 900 },
        ],
      },
    ],
  },
  Thu: {
    totalExpenses: 45670,
    categories: [
      {
        id: "labor",
        label: "Labor",
        amount: 13420,
        items: [
          { id: "labor-foh", label: "FOH Labor", amount: 5400 },
          { id: "labor-boh", label: "BOH Labor", amount: 6200 },
          { id: "labor-mgmt", label: "Management", amount: 1820 },
        ],
      },
      {
        id: "cogs",
        label: "COGS",
        amount: 12690,
        items: [
          { id: "cogs-food", label: "Food", amount: 8460 },
          { id: "cogs-bev", label: "Beverage", amount: 4230 },
        ],
      },
      {
        id: "fixed-costs",
        label: "Fixed Costs",
        amount: 6980,
        items: [
          { id: "fixed-rent", label: "Rent", amount: 4720 },
          { id: "fixed-insurance", label: "Insurance", amount: 2260 },
        ],
      },
      {
        id: "utilities",
        label: "Utilities",
        amount: 3540,
        items: [
          { id: "utilities-electric", label: "Electric", amount: 1600 },
          { id: "utilities-gas", label: "Gas", amount: 1130 },
          { id: "utilities-water", label: "Water", amount: 810 },
        ],
      },
      {
        id: "chemicals",
        label: "Chemicals",
        amount: 1860,
        items: [
          { id: "chemicals-cleaning", label: "Cleaning", amount: 1110 },
          { id: "chemicals-paper", label: "Paper", amount: 750 },
        ],
      },
      {
        id: "linen",
        label: "Linen",
        amount: 2180,
        items: [
          { id: "linen-towels", label: "Towels", amount: 1210 },
          { id: "linen-aprons", label: "Aprons", amount: 970 },
        ],
      },
    ],
  },
  Fri: {
    totalExpenses: 49830,
    categories: [
      {
        id: "labor",
        label: "Labor",
        amount: 14950,
        items: [
          { id: "labor-foh", label: "FOH Labor", amount: 5980 },
          { id: "labor-boh", label: "BOH Labor", amount: 6960 },
          { id: "labor-mgmt", label: "Management", amount: 2010 },
        ],
      },
      {
        id: "cogs",
        label: "COGS",
        amount: 13920,
        items: [
          { id: "cogs-food", label: "Food", amount: 9280 },
          { id: "cogs-bev", label: "Beverage", amount: 4640 },
        ],
      },
      {
        id: "fixed-costs",
        label: "Fixed Costs",
        amount: 7540,
        items: [
          { id: "fixed-rent", label: "Rent", amount: 5060 },
          { id: "fixed-insurance", label: "Insurance", amount: 2480 },
        ],
      },
      {
        id: "utilities",
        label: "Utilities",
        amount: 3780,
        items: [
          { id: "utilities-electric", label: "Electric", amount: 1700 },
          { id: "utilities-gas", label: "Gas", amount: 1200 },
          { id: "utilities-water", label: "Water", amount: 880 },
        ],
      },
      {
        id: "chemicals",
        label: "Chemicals",
        amount: 2080,
        items: [
          { id: "chemicals-cleaning", label: "Cleaning", amount: 1240 },
          { id: "chemicals-paper", label: "Paper", amount: 840 },
        ],
      },
      {
        id: "linen",
        label: "Linen",
        amount: 2560,
        items: [
          { id: "linen-towels", label: "Towels", amount: 1420 },
          { id: "linen-aprons", label: "Aprons", amount: 1140 },
        ],
      },
    ],
  },
  Sat: {
    totalExpenses: 31540,
    categories: [
      {
        id: "labor",
        label: "Labor",
        amount: 9380,
        items: [
          { id: "labor-foh", label: "FOH Labor", amount: 3750 },
          { id: "labor-boh", label: "BOH Labor", amount: 4410 },
          { id: "labor-mgmt", label: "Management", amount: 1220 },
        ],
      },
      {
        id: "cogs",
        label: "COGS",
        amount: 8780,
        items: [
          { id: "cogs-food", label: "Food", amount: 5860 },
          { id: "cogs-bev", label: "Beverage", amount: 2920 },
        ],
      },
      {
        id: "fixed-costs",
        label: "Fixed Costs",
        amount: 4940,
        items: [
          { id: "fixed-rent", label: "Rent", amount: 3300 },
          { id: "fixed-insurance", label: "Insurance", amount: 1640 },
        ],
      },
      {
        id: "utilities",
        label: "Utilities",
        amount: 2380,
        items: [
          { id: "utilities-electric", label: "Electric", amount: 1080 },
          { id: "utilities-gas", label: "Gas", amount: 760 },
          { id: "utilities-water", label: "Water", amount: 540 },
        ],
      },
      {
        id: "chemicals",
        label: "Chemicals",
        amount: 1420,
        items: [
          { id: "chemicals-cleaning", label: "Cleaning", amount: 850 },
          { id: "chemicals-paper", label: "Paper", amount: 570 },
        ],
      },
      {
        id: "linen",
        label: "Linen",
        amount: 640,
        items: [
          { id: "linen-towels", label: "Towels", amount: 360 },
          { id: "linen-aprons", label: "Aprons", amount: 280 },
        ],
      },
    ],
  },
  Sun: {
    totalExpenses: 28960,
    categories: [
      {
        id: "labor",
        label: "Labor",
        amount: 8620,
        items: [
          { id: "labor-foh", label: "FOH Labor", amount: 3450 },
          { id: "labor-boh", label: "BOH Labor", amount: 4020 },
          { id: "labor-mgmt", label: "Management", amount: 1150 },
        ],
      },
      {
        id: "cogs",
        label: "COGS",
        amount: 8020,
        items: [
          { id: "cogs-food", label: "Food", amount: 5340 },
          { id: "cogs-bev", label: "Beverage", amount: 2680 },
        ],
      },
      {
        id: "fixed-costs",
        label: "Fixed Costs",
        amount: 4580,
        items: [
          { id: "fixed-rent", label: "Rent", amount: 3060 },
          { id: "fixed-insurance", label: "Insurance", amount: 1520 },
        ],
      },
      {
        id: "utilities",
        label: "Utilities",
        amount: 2180,
        items: [
          { id: "utilities-electric", label: "Electric", amount: 980 },
          { id: "utilities-gas", label: "Gas", amount: 710 },
          { id: "utilities-water", label: "Water", amount: 490 },
        ],
      },
      {
        id: "chemicals",
        label: "Chemicals",
        amount: 1240,
        items: [
          { id: "chemicals-cleaning", label: "Cleaning", amount: 740 },
          { id: "chemicals-paper", label: "Paper", amount: 500 },
        ],
      },
      {
        id: "linen",
        label: "Linen",
        amount: 1320,
        items: [
          { id: "linen-towels", label: "Towels", amount: 740 },
          { id: "linen-aprons", label: "Aprons", amount: 580 },
        ],
      },
    ],
  },
  Week: {
    totalExpenses: 289510,
    categories: [
      {
        id: "labor",
        label: "Labor",
        amount: 86520,
        items: [
          { id: "labor-foh", label: "FOH Labor", amount: 34780 },
          { id: "labor-boh", label: "BOH Labor", amount: 40190 },
          { id: "labor-mgmt", label: "Management", amount: 11550 },
        ],
      },
      {
        id: "cogs",
        label: "COGS",
        amount: 80450,
        items: [
          { id: "cogs-food", label: "Food", amount: 53660 },
          { id: "cogs-bev", label: "Beverage", amount: 26790 },
        ],
      },
      {
        id: "fixed-costs",
        label: "Fixed Costs",
        amount: 44980,
        items: [
          { id: "fixed-rent", label: "Rent", amount: 30010 },
          { id: "fixed-insurance", label: "Insurance", amount: 14970 },
        ],
      },
      {
        id: "utilities",
        label: "Utilities",
        amount: 21820,
        items: [
          { id: "utilities-electric", label: "Electric", amount: 9800 },
          { id: "utilities-gas", label: "Gas", amount: 7230 },
          { id: "utilities-water", label: "Water", amount: 4790 },
        ],
      },
      {
        id: "chemicals",
        label: "Chemicals",
        amount: 11820,
        items: [
          { id: "chemicals-cleaning", label: "Cleaning", amount: 7060 },
          { id: "chemicals-paper", label: "Paper", amount: 4760 },
        ],
      },
      {
        id: "linen",
        label: "Linen",
        amount: 13920,
        items: [
          { id: "linen-towels", label: "Towels", amount: 7740 },
          { id: "linen-aprons", label: "Aprons", amount: 6180 },
        ],
      },
    ],
  },
  Month: {
    totalExpenses: 1184200,
    categories: [
      {
        id: "labor",
        label: "Labor",
        amount: 356400,
        items: [
          { id: "labor-foh", label: "FOH Labor", amount: 142600 },
          { id: "labor-boh", label: "BOH Labor", amount: 164800 },
          { id: "labor-mgmt", label: "Management", amount: 49000 },
        ],
      },
      {
        id: "cogs",
        label: "COGS",
        amount: 320600,
        items: [
          { id: "cogs-food", label: "Food", amount: 214100 },
          { id: "cogs-bev", label: "Beverage", amount: 106500 },
        ],
      },
      {
        id: "fixed-costs",
        label: "Fixed Costs",
        amount: 186900,
        items: [
          { id: "fixed-rent", label: "Rent", amount: 124200 },
          { id: "fixed-insurance", label: "Insurance", amount: 62700 },
        ],
      },
      {
        id: "utilities",
        label: "Utilities",
        amount: 92300,
        items: [
          { id: "utilities-electric", label: "Electric", amount: 41800 },
          { id: "utilities-gas", label: "Gas", amount: 29900 },
          { id: "utilities-water", label: "Water", amount: 20600 },
        ],
      },
      {
        id: "chemicals",
        label: "Chemicals",
        amount: 48500,
        items: [
          { id: "chemicals-cleaning", label: "Cleaning", amount: 29100 },
          { id: "chemicals-paper", label: "Paper", amount: 19400 },
        ],
      },
      {
        id: "linen",
        label: "Linen",
        amount: 36200,
        items: [
          { id: "linen-towels", label: "Towels", amount: 20100 },
          { id: "linen-aprons", label: "Aprons", amount: 16100 },
        ],
      },
    ],
  },
  Quarter: {
    totalExpenses: 3552600,
    categories: [
      {
        id: "labor",
        label: "Labor",
        amount: 1069200,
        items: [
          { id: "labor-foh", label: "FOH Labor", amount: 427800 },
          { id: "labor-boh", label: "BOH Labor", amount: 494400 },
          { id: "labor-mgmt", label: "Management", amount: 147000 },
        ],
      },
      {
        id: "cogs",
        label: "COGS",
        amount: 961800,
        items: [
          { id: "cogs-food", label: "Food", amount: 642300 },
          { id: "cogs-bev", label: "Beverage", amount: 319500 },
        ],
      },
      {
        id: "fixed-costs",
        label: "Fixed Costs",
        amount: 560700,
        items: [
          { id: "fixed-rent", label: "Rent", amount: 372600 },
          { id: "fixed-insurance", label: "Insurance", amount: 188100 },
        ],
      },
      {
        id: "utilities",
        label: "Utilities",
        amount: 276900,
        items: [
          { id: "utilities-electric", label: "Electric", amount: 125400 },
          { id: "utilities-gas", label: "Gas", amount: 89700 },
          { id: "utilities-water", label: "Water", amount: 61800 },
        ],
      },
      {
        id: "chemicals",
        label: "Chemicals",
        amount: 145500,
        items: [
          { id: "chemicals-cleaning", label: "Cleaning", amount: 87300 },
          { id: "chemicals-paper", label: "Paper", amount: 58200 },
        ],
      },
      {
        id: "linen",
        label: "Linen",
        amount: 108500,
        items: [
          { id: "linen-towels", label: "Towels", amount: 60300 },
          { id: "linen-aprons", label: "Aprons", amount: 48200 },
        ],
      },
    ],
  },
  Year: {
    totalExpenses: 14402800,
    categories: [
      {
        id: "labor",
        label: "Labor",
        amount: 4348800,
        items: [
          { id: "labor-foh", label: "FOH Labor", amount: 1739200 },
          { id: "labor-boh", label: "BOH Labor", amount: 1996800 },
          { id: "labor-mgmt", label: "Management", amount: 612800 },
        ],
      },
      {
        id: "cogs",
        label: "COGS",
        amount: 3902800,
        items: [
          { id: "cogs-food", label: "Food", amount: 2609600 },
          { id: "cogs-bev", label: "Beverage", amount: 1293200 },
        ],
      },
      {
        id: "fixed-costs",
        label: "Fixed Costs",
        amount: 2276400,
        items: [
          { id: "fixed-rent", label: "Rent", amount: 1510800 },
          { id: "fixed-insurance", label: "Insurance", amount: 765600 },
        ],
      },
      {
        id: "utilities",
        label: "Utilities",
        amount: 1107600,
        items: [
          { id: "utilities-electric", label: "Electric", amount: 501600 },
          { id: "utilities-gas", label: "Gas", amount: 358800 },
          { id: "utilities-water", label: "Water", amount: 247200 },
        ],
      },
      {
        id: "chemicals",
        label: "Chemicals",
        amount: 582000,
        items: [
          { id: "chemicals-cleaning", label: "Cleaning", amount: 349200 },
          { id: "chemicals-paper", label: "Paper", amount: 232800 },
        ],
      },
      {
        id: "linen",
        label: "Linen",
        amount: 385200,
        items: [
          { id: "linen-towels", label: "Towels", amount: 214200 },
          { id: "linen-aprons", label: "Aprons", amount: 171000 },
        ],
      },
    ],
  },
};

const formatCurrency = (value: number) => `$${Math.round(value).toLocaleString()}`;

const formatPercent = (value: number, total: number) => {
  if (!total) return "0%";
  return `${Math.round((value / total) * 100)}%`;
};

interface ExpensesBreakdownProps {
  total: string;
  categories: Record<string, string>;
  percents: Record<string, string>;
}

const ExpensesBreakdown = ({
  activeTime = "Week",
}: ExpensesBreakdownProps & { activeTime?: string }) => {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const timeKey = (activeTime as TimeKey) in breakdownByTime ? (activeTime as TimeKey) : "Week";

  const { totalRow, categories } = useMemo(() => {
    const slice = breakdownByTime[timeKey];
    const totalExpenses = slice.totalExpenses;
    const totalRow: BreakdownItem = {
      id: "total",
      label: "Total Expenses",
      amount: formatCurrency(totalExpenses),
      percent: "100%",
    };
    const categories: BreakdownCategory[] = slice.categories.map((category) => {
      const categoryPercent = formatPercent(category.amount, totalExpenses);
      return {
        id: category.id,
        label: category.label,
        amount: formatCurrency(category.amount),
        percent: categoryPercent,
        items: category.items.map((item) => ({
          id: item.id,
          label: item.label,
          amount: formatCurrency(item.amount),
          percent: formatPercent(item.amount, totalExpenses),
        })),
      };
    });
    return { totalRow, categories };
  }, [timeKey]);

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
