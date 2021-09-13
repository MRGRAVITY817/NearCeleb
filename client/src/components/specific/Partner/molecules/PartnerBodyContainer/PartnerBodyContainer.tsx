import { Container } from "../../../../common/atoms";

interface PartnerBodyContainerProps {
  bgImage: string;
  title: string;
  logos: string[];
}

export const PartnerBodyContainer: React.FC<PartnerBodyContainerProps> = ({
  bgImage,
  title,
  logos,
}) => {
  const bgGradient =
    "linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7))";
  return (
    <div
      style={{ backgroundColor: `rgba(255, 255, 255, 1)` }}
      className={`rounded-lg shadow-md bg-cover overflow-hidden`}
    >
      <div className="flex items-center justify-between">
        <div
          style={{ backgroundImage: `${bgGradient} ,url(${bgImage})` }}
          className="flex items-center justify-center w-1/4 h-32 laptop:h-48 bg-cover"
        >
          <h1 className="text-white laptop:text-2xl text-xl font-semibold">
            {title}
          </h1>
        </div>
        <div className="grid gap-4 laptop:gap-8 grid-cols-3 items-center justify-center laptop:px-12 px-4 w-3/4">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={logo.slice(0, 12)}
              className="max-h-12 laptop:max-h-20 rounded-md object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
