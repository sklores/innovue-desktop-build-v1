type SecondaryTab = {
  id: string;
  label: string;
};

type SecondaryNavProps = {
  tabs: SecondaryTab[];
  activeId: string;
  onChange: (id: string) => void;
};

const SecondaryNav = ({ tabs, activeId, onChange }: SecondaryNavProps) => {
  return (
    <div className="secondary-nav" role="tablist" aria-label="Secondary tabs">
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
  );
};

export default SecondaryNav;
