import { CelebCardParts } from "../../../../__generated__/CelebCardParts";
import { CelebCard } from "../../molecules/CelebCard/CelebCard";

interface CardGridProps {
  // FIXME: Should be changed to other than any
  celebList: any;
  gridCols?: number;
}

export const CardGrid: React.FC<CardGridProps> = ({ celebList, gridCols }) => {
  const numberOfColumns = (gridCols?: number) => {
    if (gridCols === undefined) {
      return "grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4";
    } else {
      return `grid-cols-${gridCols}`;
    }
  };
  return (
    <div
      className={`grid gap-6 items-end laptop:gap-12 ${numberOfColumns(
        gridCols
      )}`}
    >
      {celebList?.map((celeb: CelebCardParts) => (
        <CelebCard
          key={celeb.profileImage}
          celebId={celeb.id}
          engName={celeb.engName}
          profileImage={celeb.profileImage}
          birthDate={celeb.birthDate}
          gender={celeb.gender}
        />
      ))}
    </div>
  );
};
