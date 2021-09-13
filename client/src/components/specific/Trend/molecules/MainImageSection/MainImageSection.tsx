export interface MainImageSectionProps {
  mainImage: string;
}
export const MainImageSection: React.FC<MainImageSectionProps> = ({
  mainImage,
}) => {
  return (
    <img
      src={mainImage}
      alt={mainImage.slice(0, 12)}
      className="h-80 object-contain"
    />
  );
};
