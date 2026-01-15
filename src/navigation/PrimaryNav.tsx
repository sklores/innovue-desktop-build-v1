type PrimaryNavItem = {
  id: string;
  label: string;
};

type PrimaryNavProps = {
  items: PrimaryNavItem[];
  activeId: string;
  onChange: (id: string) => void;
};

const PrimaryNav = ({ items, activeId, onChange }: PrimaryNavProps) => {
  return (
    <nav className="primary-nav" aria-label="Primary">
      <p className="primary-nav__label">Primary</p>
      <ul className="primary-nav__list">
        {items.map((item) => (
          <li key={item.id}>
            <button
              className={`primary-nav__item${
                activeId === item.id ? " primary-nav__item--active" : ""
              }`}
              type="button"
              onClick={() => onChange(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PrimaryNav;
