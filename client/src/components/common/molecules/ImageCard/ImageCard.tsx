export interface ImageCardProps {
  cardImage: string;
  description: string;
}
export const ImageCard: React.FC<ImageCardProps> = ({
  cardImage,
  description,
}) => {
  const size = "laptop:h-72 tablet:h-60 h-52";
  return (
    <div className={`flex flex-col shadow-lg ${size} overflow-y-hidden`}>
      <img
        src={cardImage}
        alt={description.slice(0, 12)}
        className="h-2/3 rounded-t-lg object-cover"
      />
      <div className="px-2 h-1/3 bg-container rounded-b-lg">
        <p className="text-light align-text-top p-2 text-white text-sm">
          {description.slice(0, 140)}...
        </p>
      </div>
    </div>
  );
};
