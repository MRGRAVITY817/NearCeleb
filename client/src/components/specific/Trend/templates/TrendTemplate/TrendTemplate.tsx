import { ReactNode } from "react";

interface TrendTemplateProps {
  trendSlider: ReactNode;
  birthdaySlider: ReactNode;
}
export const TrendTemplate: React.FC<TrendTemplateProps> = ({
  trendSlider,
  birthdaySlider,
}) => {
  return (
    <div className="p-4 laptop:pb-12 laptop:pr-72 bg-main">
      <div className="laptop:mb-12 mb-8">{trendSlider}</div>
      <div>{birthdaySlider}</div>
    </div>
  );
};
