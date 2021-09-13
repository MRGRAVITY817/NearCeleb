import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { TrendCategory } from "../../../../../__generated__/globalTypes";
import { ImageCard } from "../../../../common/molecules/ImageCard/ImageCard";
import { mockedTrendImageList } from "../../mockedProps";
import { TrendHeader } from "../../molecules/TrendHeader/TrendHeader";

export const TrendSlider = () => {
  const [trend, setTrend] = useState<TrendCategory | null>(null);
  return (
    <div>
      <TrendHeader stateHandler={[trend, setTrend]} />
      <Swiper
        spaceBetween={20}
        breakpoints={{
          "@1.5": {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          "@1.0": {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          "@0.75": {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          "@0.5": {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        }}
        onSlideChange={() => console.log("slide change")}
      >
        {mockedTrendImageList.map((trend) => (
          <SwiperSlide key={trend.cardImage.slice(0, 12) + trend.category}>
            <ImageCard
              cardImage={trend.cardImage}
              description={trend.description}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
