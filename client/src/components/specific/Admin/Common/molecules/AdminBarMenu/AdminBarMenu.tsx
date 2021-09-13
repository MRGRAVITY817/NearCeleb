import { LinkText } from "../../../../../common/atoms/LinkText/LinkText";

interface AdminBarMenuProps {
  category: string;
  menu: string[];
}

export const AdminBarMenu: React.FC<AdminBarMenuProps> = ({
  category,
  menu,
}) => {
  return (
    <div className="grid gap-3 grid-flow-row">
      <h1 className="text-xl">{category.toUpperCase()}</h1>
      {menu.map((item) => (
        <LinkText
          text={item.toUpperCase()}
          url={`/admin/${item}-${category}`}
          selected={false}
        />
      ))}
    </div>
  );
};
