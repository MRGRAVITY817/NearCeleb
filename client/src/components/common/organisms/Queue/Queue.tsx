import { React } from "@ungap/global-this";
import { useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { UseState } from "../../../../lib/types/hooks";
import { Button } from "../../atoms/Button/Button";
import { CelebCardItems } from "../../molecules/CelebCard/CelebCard";
import { QueueItem } from "../../molecules/QueueItem/QueueItem";

interface QueueProps {
  title?: string;
  cols?: number;
  items: CelebCardItems[];
  setItems: (items: CelebCardItems[]) => void;
}

export const Queue: React.FC<QueueProps> = ({
  title = "",
  cols = 1,
  items,
  setItems,
}) => {
  const [selected, setSelected] = useState<CelebCardItems[]>([]);
  const addItem = (item: CelebCardItems) => {
    setSelected([...selected, item]);
  };
  const removeItem = (item: CelebCardItems) => {
    setSelected(
      selected.filter((selectedItem) => selectedItem.celebId !== item.celebId)
    );
  };
  const toggleItem = (item: CelebCardItems) => {
    const checkArray = selected.map((item) => item.celebId);
    if (checkArray.includes(item.celebId)) removeItem(item);
    else addItem(item);
  };
  const removeSelected = (selected: CelebCardItems[]) => {
    const filterArray = selected.map((item) => item.celebId);
    setItems(items.filter((item) => !filterArray.includes(item.celebId)));
    setSelected([]);
  };
  const gridCols = `grid-cols-${cols}`;
  return (
    <div>
      <div className="flex items-center justify-between mb-2 laptop:mb-6">
        <h1 className="text-md">{title}</h1>
        <Button type="button" onClick={() => removeSelected(selected)}>
          <RiDeleteBin2Fill />
        </Button>
      </div>
      <div className={`grid gap-2 ${gridCols}`}>
        {items.map((item) => (
          <QueueItem toggle={toggleItem} key={item.engName} item={item} />
        ))}
      </div>
    </div>
  );
};
