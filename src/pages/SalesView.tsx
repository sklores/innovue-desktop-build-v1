import { useState } from "react";

import SalesTrends from "../components/sales/SalesTrends";
import SalesProductTrends from "../components/sales/SalesProductTrends";

const salesBreakdownMetrics: Record<string, Record<string, string>> = {
  Mon: {
    "In-store": "$48,200",
    Takeout: "$31,400",
    Delivery: "$28,100",
    "3rd-party sales": "$12,400",
    Tips: "$3,600",
    "Check average": "$42.10",
    Covers: "1,142",
  },
  Tue: {
    "In-store": "$52,900",
    Takeout: "$34,200",
    Delivery: "$29,500",
    "3rd-party sales": "$13,200",
    Tips: "$3,900",
    "Check average": "$41.80",
    Covers: "1,208",
  },
  Wed: {
    "In-store": "$56,300",
    Takeout: "$36,900",
    Delivery: "$31,400",
    "3rd-party sales": "$14,100",
    Tips: "$4,100",
    "Check average": "$43.20",
    Covers: "1,274",
  },
  Thu: {
    "In-store": "$54,100",
    Takeout: "$35,400",
    Delivery: "$30,600",
    "3rd-party sales": "$13,600",
    Tips: "$3,800",
    "Check average": "$42.60",
    Covers: "1,236",
  },
  Fri: {
    "In-store": "$62,800",
    Takeout: "$40,200",
    Delivery: "$34,900",
    "3rd-party sales": "$16,200",
    Tips: "$4,700",
    "Check average": "$45.10",
    Covers: "1,412",
  },
  Sat: {
    "In-store": "$38,900",
    Takeout: "$27,100",
    Delivery: "$24,200",
    "3rd-party sales": "$10,400",
    Tips: "$2,400",
    "Check average": "$39.70",
    Covers: "986",
  },
  Sun: {
    "In-store": "$34,500",
    Takeout: "$24,800",
    Delivery: "$22,600",
    "3rd-party sales": "$9,200",
    Tips: "$2,100",
    "Check average": "$38.90",
    Covers: "912",
  },
  Week: {
    "In-store": "$347,700",
    Takeout: "$229,900",
    Delivery: "$201,300",
    "3rd-party sales": "$95,800",
    Tips: "$24,600",
    "Check average": "$42.20",
    Covers: "8,170",
  },
  Month: {
    "In-store": "$1,362,400",
    Takeout: "$936,800",
    Delivery: "$799,300",
    "3rd-party sales": "$372,600",
    Tips: "$95,700",
    "Check average": "$42.70",
    Covers: "32,580",
  },
  Year: {
    "In-store": "$16,204,000",
    Takeout: "$11,402,000",
    Delivery: "$9,286,000",
    "3rd-party sales": "$4,512,000",
    Tips: "$1,192,000",
    "Check average": "$43.10",
    Covers: "382,400",
  },
};

const salesForecastBase: Record<string, number> = {
  Mon: 124000,
  Tue: 132500,
  Wed: 138800,
  Thu: 134200,
  Fri: 152400,
  Sat: 98000,
  Sun: 90500,
  Week: 870000,
  Month: 3360000,
  Year: 40850000,
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
  "Total Sales",
  "In-store",
  "Takeout",
  "Delivery",
  "3rd-party sales",
  "Tips",
  "Check average",
  "Covers",
];

type SalesViewProps = {
  activeSecondaryId: string;
  activeTime: string;
};

const SalesView = ({ activeSecondaryId, activeTime }: SalesViewProps) => {
  const [forecastGrowth, setForecastGrowth] = useState(4);
  const [forecastWeather, setForecastWeather] = useState(2);
  const [forecastEvents, setForecastEvents] = useState(3);
  const [forecastPricing, setForecastPricing] = useState(1);
  const [forecastMomentum, setForecastMomentum] = useState(2);

  const activeBreakdown =
    salesBreakdownMetrics[activeTime] ?? salesBreakdownMetrics.Week;
  const activeProductMix = salesProductMix[activeTime] ?? salesProductMix.Week;

  const isSalesBreakdown = activeSecondaryId === "breakdown";
  const isSalesForecast = activeSecondaryId === "forecast";
  const isSalesProduct = activeSecondaryId === "product";
  const isSalesTrends = activeSecondaryId === "trends";

  if (isSalesTrends) {
    return <SalesTrends />;
  }

  if (isSalesBreakdown) {
    return (
      <div className="breakdown-table" role="table">
        {(() => {
          const parseCurrency = (value: string) => {
            const numeric = Number(value.replace(/[^0-9.-]+/g, ""));
            return Number.isNaN(numeric) ? 0 : numeric;
          };
          const formatCurrency = (value: number) =>
            `$${Math.round(value).toLocaleString()}`;
          const salesKeys = [
            "In-store",
            "Takeout",
            "Delivery",
            "3rd-party sales",
          ];
          const tipValue = parseCurrency(activeBreakdown.Tips ?? "$0");
          const totalSales = salesKeys.reduce((sum, key) => {
            return sum + parseCurrency(activeBreakdown[key] ?? "$0");
          }, 0);
          const percentFor = (label: string) => {
            if (label === "Total Sales") return "100%";
            if (label === "Tips") {
              return totalSales
                ? `${Math.round((tipValue / totalSales) * 100)}%`
                : "0%";
            }
            if (salesKeys.includes(label)) {
              const value = parseCurrency(activeBreakdown[label] ?? "$0");
              return totalSales
                ? `${Math.round((value / totalSales) * 100)}%`
                : "0%";
            }
            return "—";
          };
          const valueFor = (label: string) => {
            if (label === "Total Sales") return formatCurrency(totalSales);
            return activeBreakdown[label];
          };

          return (
            <>
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
                    {valueFor(label)}
                  </span>
                  <span className="breakdown-row__percent" role="cell">
                    {percentFor(label)}
                  </span>
                </div>
              ))}
            </>
          );
        })()}
      </div>
    );
  }

  if (isSalesForecast) {
    return (
      <>
        {(() => {
          const baseValue =
            salesForecastBase[activeTime] ?? salesForecastBase.Week;
          const totalImpact =
            (forecastGrowth +
              forecastWeather +
              forecastEvents +
              forecastPricing +
              forecastMomentum) /
            100;
          const projected = Math.round(baseValue * (1 + totalImpact));
          const formatCurrency = (value: number) => `$${value.toLocaleString()}`;
          const signalDirection = (value: number) => {
            if (value > 1) return "signal--positive";
            if (value < -1) return "signal--negative";
            return "signal--neutral";
          };
          const signals = [
            {
              label: "Historical sales (WoW / YoY)",
              value: forecastGrowth,
            },
            { label: "Weather", value: forecastWeather },
            { label: "Local events", value: forecastEvents },
            { label: "Holidays", value: 0 },
            { label: "Price increases", value: forecastPricing },
            { label: "Recent trend momentum", value: forecastMomentum },
          ];

          return (
            <div className="forecast-panel">
              <div className="forecast-primary">
                <p className="metric__label">Projected Sales</p>
                <p className="forecast-primary__value">
                  {formatCurrency(projected)}
                </p>
              </div>
              <div className="forecast-signals">
                {signals.map((signal) => (
                  <div key={signal.label} className="forecast-signal">
                    <span className="forecast-signal__label">{signal.label}</span>
                    <span
                      className={`forecast-signal__status ${signalDirection(
                        signal.value,
                      )}`}
                    >
                      {signal.value > 1
                        ? "Positive"
                        : signal.value < -1
                          ? "Negative"
                          : "Neutral"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="forecast-controls">
                <label className="forecast-control">
                  <span className="forecast-control__label">
                    Historical growth factor
                  </span>
                  <input
                    type="range"
                    min="-8"
                    max="12"
                    step="1"
                    value={forecastGrowth}
                    onChange={(event) =>
                      setForecastGrowth(Number(event.target.value))
                    }
                  />
                  <span className="forecast-control__value">{forecastGrowth}%</span>
                </label>
                <label className="forecast-control">
                  <span className="forecast-control__label">Weather impact</span>
                  <input
                    type="range"
                    min="-6"
                    max="8"
                    step="1"
                    value={forecastWeather}
                    onChange={(event) =>
                      setForecastWeather(Number(event.target.value))
                    }
                  />
                  <span className="forecast-control__value">{forecastWeather}%</span>
                </label>
                <label className="forecast-control">
                  <span className="forecast-control__label">Event impact</span>
                  <input
                    type="range"
                    min="-5"
                    max="10"
                    step="1"
                    value={forecastEvents}
                    onChange={(event) =>
                      setForecastEvents(Number(event.target.value))
                    }
                  />
                  <span className="forecast-control__value">{forecastEvents}%</span>
                </label>
                <label className="forecast-control">
                  <span className="forecast-control__label">
                    Price increase impact
                  </span>
                  <input
                    type="range"
                    min="-4"
                    max="6"
                    step="1"
                    value={forecastPricing}
                    onChange={(event) =>
                      setForecastPricing(Number(event.target.value))
                    }
                  />
                  <span className="forecast-control__value">{forecastPricing}%</span>
                </label>
                <label className="forecast-control">
                  <span className="forecast-control__label">Momentum bias</span>
                  <input
                    type="range"
                    min="-6"
                    max="8"
                    step="1"
                    value={forecastMomentum}
                    onChange={(event) =>
                      setForecastMomentum(Number(event.target.value))
                    }
                  />
                  <span className="forecast-control__value">{forecastMomentum}%</span>
                </label>
              </div>
              <p className="forecast-disclaimer">
                Forecasts are directional estimates based on historical performance
                and external signals.
              </p>
            </div>
          );
        })()}
      </>
    );
  }

  if (isSalesProduct) {
    return (
      <>
        {(() => {
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
              <SalesProductTrends activeTime={activeTime} />
            </div>
          );
        })()}
      </>
    );
  }

  return null;
};

export default SalesView;
