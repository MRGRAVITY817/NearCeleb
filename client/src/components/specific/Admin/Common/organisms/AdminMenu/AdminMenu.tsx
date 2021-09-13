import { CategorizedMenu } from "../../molecules/CategorizedMenu/CategorizedMenu";

const methodMenu = ["add", "edit", "delete"];
const categories = ["celeb", "trend", "font"];

interface AdminMenuProps {
  direction?: "row" | "column";
}

export const AdminMenu: React.FC<AdminMenuProps> = ({ direction = "row" }) => {
  const gridFlow = direction === "column" ? `grid-flow-col` : `grid-flow-row`;
  return (
    <div className={`grid gap-1 tablet:gap-2 ${gridFlow}`}>
      {categories.map((category) => (
        <CategorizedMenu
          key={category}
          categoryName={category}
          methodList={methodMenu}
          bgImage={`/admin-menu/admin-${category}.jpg`}
        />
      ))}
    </div>
  );
};
