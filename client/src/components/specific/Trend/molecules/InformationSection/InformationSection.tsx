export interface InformationSectionProps {
  korTitle: string;
  engTitle: string;
  description: string;
}

export const InformationSection: React.FC<InformationSectionProps> = ({
  korTitle,
  engTitle,
  description,
}) => {
  return (
    <div>
      <h1 className="laptop:text-2xl text-xl">
        {korTitle} {engTitle}
      </h1>
      <p className="text-md mt-4 laptop:mt-8 laptop:text-lg font-light">
        {description}
      </p>
    </div>
  );
};
