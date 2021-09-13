import { CelebCardItems } from "../../../../common/molecules/CelebCard/CelebCard";

export interface CastSectionProps {
  casts: CelebCardItems[];
}
export const CastSection: React.FC<CastSectionProps> = ({ casts }) => {
  const itemsBgColor =
    "bg-gradient-to-r from-rose-300 to-rose-300 via-rose-100";
  return (
    <div>
      <h1 className="mb-4 text-2xl laptop:text-5xl">Casts</h1>
      <div className="grid gap-2 grid-cols-3">
        {casts.map((cast) => (
          <div className="flex">
            <img
              key={cast.engName}
              src={cast.profileImage!}
              alt={cast.engName}
              className={`rounded-md shadow-md object-cover
                       ${itemsBgColor}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
