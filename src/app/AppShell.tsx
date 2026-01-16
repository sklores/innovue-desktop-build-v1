import { useEffect, useMemo, useState } from "react";
import type { KeyboardEvent } from "react";

import PrimaryNav from "../navigation/PrimaryNav";
import SecondaryNav from "../navigation/SecondaryNav";
import { primaryTabs, secondaryTabsByPrimary } from "../navigation/navConfig";

/* -----------------------------
   CONSTANTS
------------------------------ */

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

const reportingTabs = [
  { id: "tab-a", label: "Tab A" },
  { id: "tab-b", label: "Tab B" },
];

/* -----------------------------
   MOCK DATA
------------------------------ */

const vendorRows = [
  {
    id: "sysco",
    name: "Sysco",
    accountsPayable: "$48,210",
    email: "rep@sysco.com",
    phone: "555-123-4567",
    paymentTerms: "Net 14",
    accountNumber: "•••• 4821",
    deliveryDays: "Mon / Wed / Fri",
    deliveryMinimum: "$250",
    orderGuide: ["Produce", "Dairy", "Dry goods"],
  },
  {
    id: "usfoods",
    name: "US Foods",
    accountsPayable: "$31,900",
    email: "rep@usfoods.com",
    phone: "555-987-6543",
    paymentTerms: "Net 21",
    accountNumber: "•••• 7714",
    deliveryDays: "Tue / Thu",
    deliveryMinimum: "$300",
    orderGuide: ["Frozen", "Proteins"],
  },
  {
    id: "pfg",
    name: "Performance Food Group",
    accountsPayable: "$19,400",
    email: "rep@pfg.com",
    phone: "555-456-8899",
    paymentTerms: "Net 30",
    accountNumber: "•••• 3091",
    deliveryDays: "Mon / Thu",
    deliveryMinimum: "$200",
    orderGuide: ["Dry goods", "Beverages"],
  },
];

/* -----------------------------
   HELPERS
------------------------------ */

const parseCurrency = (value: string) => {
  const numeric = Number(value.replace(/[^0-9.-]+/g, ""));
  return Number.isNaN(numeric) ? 0 : numeric;
};

/* -----------------------------
   COMPONENT
------------------------------ */

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
  const [activeTime, setActiveTime] = useState("Week");
  const [openVendorId, setOpenVendorId] = useState<string | null>(null);
  const [openOrderGuideId, setOpenOrderGuideId] = useState<string | null>(null);

  const secondaryTabs = useMemo(() => {
    if (activePrimaryId === "reporting") return reportingTabs;
    return secondaryTabsByPrimary[activePrimaryId] ?? secondaryTabsByPrimary.sales;
  }, [activePrimaryId]);

  useEffect(() => {
    setActiveSecondaryId(secondaryTabs[0].id);
  }, [secondaryTabs]);

  const sortedVendors = useMemo(() => {
    return [...vendorRows].sort(
      (a, b) => parseCurrency(b.accountsPayable) - parseCurrency(a.accountsPayable),
    );
  }, []);

  const handleVendorToggle = (id: string) => {
    setOpenVendorId((prev) => (prev === id ? null : id));
    setOpenOrderGuideId(null);
  };

  const handleOrderGuideToggle = (id: string) => {
    setOpenOrderGuideId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-header__kicker">GCDC</p>
          <h1 className="app-header__title">InnoVue Desktop</h1>
        </div>
        <div className="app-header__meta">
          <span>Last updated · Just now</span>
          <span>09:41 AM</span>
          <span>Sunny · 72°</span>
        </div>
      </header>

      <div className="app-body">
        <PrimaryNav
          items={primaryNavItems}
          activeId={activePrimaryId}
          onChange={setActivePrimaryId}
        />

        <main className="app-content">
          <section className="truth-card truth-card--lead">
            <h2>{primaryNavItems.find(p => p.id === activePrimaryId)?.label}</h2>
            <SecondaryNav
              tabs={secondaryTabs}
              activeId={activeSecondaryId}
              onChange={setActiveSecondaryId}
            />
          </section>

          {activePrimaryId === "expenses" && activeSecondaryId === "vendors" && (
            <section className="truth-section">
              <div className="truth-section__content">
                {sortedVendors.map((vendor) => {
                  const isOpen = openVendorId === vendor.id;
                  const isGuideOpen = openOrderGuideId === vendor.id;

                  return (
                    <div key={vendor.id}>
                      <div
                        className="breakdown-row"
                        onClick={() => handleVendorToggle(vendor.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <span>{vendor.name}</span>
                        <span>{vendor.accountsPayable}</span>
                      </div>

                      {isOpen && (
                        <div style={{ padding: "16px", display: "grid", gap: "12px" }}>
                          <div>
                            <strong>{vendor.name}</strong>
                            <div>{vendor.email}</div>
                            <div>{vendor.phone}</div>
                          </div>

                          <div>
                            <div>Accounts payable: {vendor.accountsPayable}</div>
                            <div>Payment terms: {vendor.paymentTerms}</div>
                            <div>Account #: {vendor.accountNumber}</div>
                          </div>

                          <div>
                            <div>Delivery days: {vendor.deliveryDays}</div>
                            <div>Delivery minimum: {vendor.deliveryMinimum}</div>
                          </div>

                          <div>
                            <span
                              style={{ cursor: "pointer", fontWeight: 500 }}
                              onClick={() => handleOrderGuideToggle(vendor.id)}
                            >
                              Order guide
                            </span>

                            {isGuideOpen && (
                              <ul style={{ marginTop: "8px" }}>
                                {vendor.orderGuide.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default AppShell;