import { useState } from "react";

type ReportingViewProps = {
  activeSecondaryId: string | null;
  notificationPreferences: {
    id: string;
    label: string;
    enabled: boolean;
    sensitivity: string;
  }[];
  handleNotificationToggle: (id: string) => void;
  handleNotificationChange: (id: string, value: string) => void;
};

const ReportingView = ({
  activeSecondaryId,
  notificationPreferences,
  handleNotificationToggle,
  handleNotificationChange,
}: ReportingViewProps) => {
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

  const isReportingEmailReports = activeSecondaryId === "email-reports";
  const isReportingNotifications = activeSecondaryId === "notifications";

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

  return isReportingEmailReports ? (
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
  ) : null;
};

export default ReportingView;
