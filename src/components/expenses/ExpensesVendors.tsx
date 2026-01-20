import type { KeyboardEvent } from "react";

type Vendor = {
  id: string;
  name: string;
  accountsPayable: string;
  email: string;
  phone: string;
  paymentTerms: string;
  accountNumber: string;
  deliveryDays: string;
  deliveryMinimum: string;
  orderGuide: string[];
};

type ExpensesVendorsProps = {
  sortedVendors: Vendor[];
  openVendorId: string | null;
  openOrderGuideId: string | null;
  handleVendorToggle: (id: string) => void;
  handleVendorKeyDown: (event: KeyboardEvent<HTMLDivElement>, id: string) => void;
  handleOrderGuideToggle: (id: string) => void;
  handleOrderGuideKeyDown: (
    event: KeyboardEvent<HTMLDivElement>,
    id: string,
  ) => void;
};

const ExpensesVendors = ({
  sortedVendors,
  openVendorId,
  openOrderGuideId,
  handleVendorToggle,
  handleVendorKeyDown,
  handleOrderGuideToggle,
  handleOrderGuideKeyDown,
}: ExpensesVendorsProps) => {
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
                onKeyDown={(event) => handleVendorKeyDown(event, vendor.id)}
              >
                <span className="breakdown-row__label">{vendor.name}</span>
                <span className="breakdown-row__value">
                  {vendor.accountsPayable}
                </span>
              </div>
              <div
                className={`vendor-details${isOpen ? " vendor-details--open" : ""}`}
                aria-hidden={!isOpen}
              >
                <div className="vendor-details__grid">
                  <div className="vendor-section vendor-section--tight">
                    <span className="metric__label">Identity / Contact</span>
                    <span className="vendor-title">{vendor.name}</span>
                    <span className="breakdown-row__label">{vendor.email}</span>
                    <span className="breakdown-row__label">{vendor.phone}</span>
                  </div>
                  <div className="vendor-section">
                    <span className="metric__label">Payment</span>
                    <div className="vendor-row__detail">
                      <span className="breakdown-row__label">Accounts payable</span>
                      <span className="breakdown-row__value">
                        {vendor.accountsPayable}
                      </span>
                    </div>
                    <div className="vendor-row__detail">
                      <span className="breakdown-row__label">Payment terms</span>
                      <span className="breakdown-row__value">
                        {vendor.paymentTerms}
                      </span>
                    </div>
                    <div className="vendor-row__detail">
                      <span className="breakdown-row__label">Account number</span>
                      <span className="breakdown-row__value">
                        {vendor.accountNumber}
                      </span>
                    </div>
                  </div>
                  <div className="vendor-section">
                    <span className="metric__label">Operations</span>
                    <div className="vendor-row__detail">
                      <span className="breakdown-row__label">Delivery days</span>
                      <span className="breakdown-row__value">
                        {vendor.deliveryDays}
                      </span>
                    </div>
                    <div className="vendor-row__detail">
                      <span className="breakdown-row__label">Delivery minimum</span>
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
                        isOrderGuideOpen ? " vendor-order-details--open" : ""
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
};

export default ExpensesVendors;
