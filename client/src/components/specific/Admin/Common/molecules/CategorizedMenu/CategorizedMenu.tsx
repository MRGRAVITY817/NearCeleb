import { useRouter } from "next/dist/client/router";
import { Button } from "../../../../../common/atoms/Button/Button";

interface CategorizedMenuProps {
  categoryName: string;
  methodList: string[];
  bgImage?: string;
}

export const CategorizedMenu: React.FC<CategorizedMenuProps> = ({
  categoryName,
  methodList,
  bgImage = "",
}) => {
  const route = useRouter();
  return (
    <div className="flex flex-col mb-2">
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="flex items-center justify-center h-12 laptop:h-24 bg-cover bg-center rounded-lg"
      >
        <h1 className="px-2 py-1 text-white laptop:text-2xl text-xl font-medium bg-rose-300 rounded-lg shadow-md transition-all">
          {categoryName.toUpperCase()}
        </h1>
      </div>
      <div className="grid gap-1 tablet:gap-2 grid-flow-col my-1 tablet:my-2">
        {methodList.map((menuItem) => (
          <Button
            key={categoryName + menuItem}
            onClick={() => {
              route.push(`/admin/${menuItem}-${categoryName}`);
            }}
          >
            {menuItem.toUpperCase()}
          </Button>
        ))}
      </div>
    </div>
  );
};
