import { CelebCardItems } from "../../../../common/molecules/CelebCard/CelebCard";
import { Slide, SlideProps } from "../../../../common/molecules/Slide/Slide";
import { InformationSection } from "../../molecules/InformationSection/InformationSection";
import { MainImageSection } from "../../molecules/MainImageSection/MainImageSection";

export interface TrendSlideProps extends SlideProps {
  casts: CelebCardItems[];
  korTitle: string;
  engTitle: string;
  description: string;
  mainImage: string;
  coverImage: string;
}

export const TrendSlide: React.FC<TrendSlideProps> = ({
  korTitle,
  engTitle,
  description,
  coverImage,
  mainImage,
  first,
}) => {
  const bgGradient =
    "linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8))";
  return (
    <Slide sliderName="trendSlider" first={first}>
      <div
        style={{
          backgroundImage: `${bgGradient}, url(${coverImage})`,
          minHeight: `50%`,
        }}
        className="p-6 laptop:p-8 text-white bg-cover"
      >
        <h1 className="mb-4 laptop:mb-8 laptop:text-3xl text-xl">
          Weekly Trend - Movies
        </h1>
        <div className="flex flex-col tablet:flex-row items-start justify-around">
          <div className="flex justify-center mr-0 laptop:mr-10 tablet:mr-6 laptop:p-0 p-4 laptop:w-1/2 w-full">
            <MainImageSection mainImage={mainImage} />
          </div>
          <div className="flex flex-col items-center justify-start laptop:w-1/2 w-full">
            <div className="laptop:mb-12 mb-4">
              <InformationSection
                korTitle={korTitle}
                engTitle={engTitle}
                description={description}
              />
            </div>
            <div>{/* <CastSection casts={casts} /> */}</div>
          </div>
        </div>
      </div>
    </Slide>
  );
};
