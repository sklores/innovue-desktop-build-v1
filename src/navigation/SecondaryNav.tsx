type SecondaryTab = {
  id: string;
  label: string;
};

type SecondaryNavProps = {
  label: string;
  tabs: SecondaryTab[];
  activeId: string;
  onChange: (id: string) => void;
  contextTitle: string;
  contextBody: string;
};

const SecondaryNav = ({
  label,
  tabs,
  activeId,
  onChange,
  contextTitle,
  contextBody,
}: SecondaryNavProps) => {
  return (
    <aside className="secondary-nav" aria-label="Context">
      <div className="secondary-nav__header">
        <p className="secondary-nav__label">{label}</p>
      </div>
      <div className="secondary-nav__tabs" role="tablist" aria-label="Context views">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`secondary-nav__tab${
              activeId === tab.id ? " secondary-nav__tab--active" : ""
            }`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="secondary-nav__panel">
        <p className="secondary-nav__panel-title">{contextTitle}</p>
        <p className="secondary-nav__panel-body">{contextBody}</p>
      </div>
    </aside>
  );
};

export default SecondaryNav;
