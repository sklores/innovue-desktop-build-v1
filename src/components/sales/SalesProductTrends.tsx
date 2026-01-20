type TrendItem = {
  name: string;
  change: number;
};

type SalesProductTrendsProps = {
  activeTime: string;
};

type TimeKey = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun" | "Week" | "Month" | "Year";

const trendingByTime: Record<TimeKey, TrendItem[]> = {
  Mon: [
    { name: "Cheesesteak", change: 12 },
    { name: "Turkey Club", change: -9 },
    { name: "Iced Latte", change: 7 },
    { name: "Greek Salad", change: -5 },
    { name: "Vanilla Shake", change: 4 },
    { name: "Espresso", change: -2 },
  ],
  Tue: [
    { name: "Chicken Wrap", change: 14 },
    { name: "Lemonade", change: -11 },
    { name: "Veggie Bowl", change: 9 },
    { name: "Mango Smoothie", change: 6 },
    { name: "House Chips", change: -4 },
    { name: "Cold Brew", change: 2 },
  ],
  Wed: [
    { name: "Cheesesteak", change: 25 },
    { name: "Lemonade", change: -18 },
    { name: "Chicken Caesar", change: 13 },
    { name: "Sweet Potato Fries", change: 9 },
    { name: "Iced Matcha", change: -6 },
    { name: "Vanilla Shake", change: 2 },
  ],
  Thu: [
    { name: "BBQ Burger", change: 16 },
    { name: "Strawberry Lemonade", change: -12 },
    { name: "Cobb Salad", change: 11 },
    { name: "Truffle Fries", change: 8 },
    { name: "Iced Latte", change: -5 },
    { name: "Espresso", change: 1 },
  ],
  Fri: [
    { name: "Cheesesteak", change: 19 },
    { name: "Chicken Tacos", change: 15 },
    { name: "Lemonade", change: -14 },
    { name: "Loaded Nachos", change: 10 },
    { name: "Cold Brew", change: -6 },
    { name: "Garden Salad", change: 2 },
  ],
  Sat: [
    { name: "BBQ Burger", change: 22 },
    { name: "Fish Tacos", change: 13 },
    { name: "Lemonade", change: -9 },
    { name: "Pretzel Bites", change: 8 },
    { name: "Iced Matcha", change: -5 },
    { name: "Espresso", change: 1 },
  ],
  Sun: [
    { name: "Chicken Wrap", change: 17 },
    { name: "House Chips", change: -12 },
    { name: "Greek Salad", change: 9 },
    { name: "Lemonade", change: -7 },
    { name: "Cold Brew", change: 5 },
    { name: "Vanilla Shake", change: 2 },
  ],
  Week: [
    { name: "Cheesesteak", change: 18 },
    { name: "Chicken Wrap", change: 12 },
    { name: "Lemonade", change: -15 },
    { name: "Iced Latte", change: 9 },
    { name: "Greek Salad", change: -7 },
    { name: "Mango Smoothie", change: 5 },
  ],
  Month: [
    { name: "Cheesesteak", change: 21 },
    { name: "BBQ Burger", change: 14 },
    { name: "Lemonade", change: -16 },
    { name: "Chicken Caesar", change: 11 },
    { name: "Cold Brew", change: -8 },
    { name: "Truffle Fries", change: 6 },
  ],
  Year: [
    { name: "Cheesesteak", change: 28 },
    { name: "Chicken Tacos", change: 19 },
    { name: "Lemonade", change: -20 },
    { name: "Cobb Salad", change: 12 },
    { name: "Iced Latte", change: -9 },
    { name: "Mango Smoothie", change: 7 },
  ],
};

const formatChange = (value: number) => {
  if (value > 0) return `+${value}%`;
  if (value < 0) return `${value}%`;
  return "0%";
};

const SalesProductTrends = ({ activeTime }: SalesProductTrendsProps) => {
  const timeKey = (activeTime as TimeKey) in trendingByTime ? (activeTime as TimeKey) : "Week";
  const items = trendingByTime[timeKey]
    .filter((item) => Math.abs(item.change) >= 3)
    .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
    .slice(0, 5);

  return (
    <div className="vendor-section">
      <p className="metric__label">Top 5 Trending Items</p>
      <div className="breakdown-table" role="table">
        <div className="breakdown-row breakdown-row--header" role="row">
          <span className="breakdown-row__label" role="columnheader">
            Product
          </span>
          <span className="breakdown-row__value" role="columnheader">
            Change
          </span>
          <span className="breakdown-row__percent" role="columnheader">
            Direction
          </span>
        </div>
        {items.map((item) => {
          let directionLabel = "Flat";
          let directionClass = "sales-trends__value--flat";
          let indicator = "—";
          if (item.change > 0) {
            directionLabel = "Up";
            directionClass = "sales-trends__value--up";
            indicator = "▲";
          } else if (item.change < 0) {
            directionLabel = "Down";
            directionClass = "sales-trends__value--down";
            indicator = "▼";
          }

          return (
            <div key={item.name} className="breakdown-row" role="row">
              <span className="breakdown-row__label" role="cell">
                {item.name}
              </span>
              <span className={`breakdown-row__value ${directionClass}`} role="cell">
                {formatChange(item.change)}
              </span>
              <span className={`breakdown-row__percent ${directionClass}`} role="cell">
                {indicator} {directionLabel}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SalesProductTrends;
