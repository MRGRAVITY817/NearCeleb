import { useEffect, useState } from "react";
import { pageVar } from "../../organisms/SearchCeleb/SearchCeleb";

interface FilterProps {
  useAll?: boolean;
  items: string[];
  setList: (result: string[]) => void;
}

export const Filter: React.FC<FilterProps> = ({
  useAll = false,
  items,
  setList,
}) => {
  const [all, setAll] = useState<boolean>(useAll);
  const [filter, setFilter] = useState<string[]>([]);

  const addItem = (item: string) => {
    setFilter([...filter, item]);
  };
  const removeItem = (item: string) => {
    setFilter(filter.filter((filterItem) => filterItem !== item));
    if (filter.length === 1) setAll(true);
  };
  const toggleItem = (item: string) => {
    if (filter.length === 0) setAll(false);
    filter.includes(item) ? removeItem(item) : addItem(item);
  };

  useEffect(() => {
    setList(filter);
  }, [filter, all]);

  const gridCols = `desktop:grid-cols-8 grid-cols-4`;
  return (
    <div
      className={`grid gap-2 ${gridCols} laptop:text-xl text-lg text-center`}
    >
      {useAll && (
        <button
          onClick={() => {
            setAll(true);
            setFilter([]);
            pageVar(1);
          }}
          className={`${
            all ? `text-strong` : `text-white`
          } font-bold focus:outline-none`}
        >
          All
        </button>
      )}
      {items.map((item) => (
        <button
          type="button"
          key={item}
          onClick={() => {
            toggleItem(item);
            setList(filter);
            pageVar(1);
          }}
          className={`${
            filter.includes(item) && !all ? `text-strong` : `text-white`
          } focus:outline-none px-1`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
