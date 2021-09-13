interface BusinessIconProps {
  image: string;
  title: string;
}
export const BusinessIcon: React.FC<BusinessIconProps> = ({ image, title }) => {
  return (
    <div className="flex flex-col items-center justify-center w-24 laptop:w-36">
      <img
        src={`/business/${image}.svg`}
        alt={image}
        className="h-12 laptop:h-24 object-cover"
      />
      <h2 className="mt-2 text-center text-white text-lg laptop:text-xl">
        {title}
      </h2>
    </div>
  );
};
