import { useState } from "react";
import { Button } from "../../atoms/Button/Button";
import { CelebCardItems } from "../CelebCard/CelebCard";

interface QueueItemProps {
  item: CelebCardItems;
  toggle: (item: CelebCardItems) => void;
}

export const QueueItem: React.FC<QueueItemProps> = ({ item, toggle }) => {
  const { profileImage, engName } = item;
  const [selected, setSelected] = useState<boolean>(false);
  return (
    <Button
      selected={selected}
      onClick={() => {
        toggle(item);
        setSelected(!selected);
      }}
      type="button"
    >
      <div className="flex flex-wrap items-center justify-center">
        <img
          src={profileImage || ""}
          alt={engName}
          className="w-12 h-12 object-cover"
        />
        <h1 className="text-md mx-2 laptop:text-xl">{engName}</h1>
      </div>
    </Button>
  );
};
