import { SliderButton } from "../../atoms/SliderButton/SliderButton";

interface SliderProps {
  sliderName: string;
}

export const Slider: React.FC<SliderProps> = ({ sliderName, ...props }) => {
  const next = () => {
    const activeSlide = document.querySelector(".slide.translate-x-0");
    if (activeSlide?.id !== sliderName) return;
    if (activeSlide?.nextElementSibling) {
      activeSlide?.classList.remove("translate-x-0");
      activeSlide?.classList.add("-translate-x-full");
      const nextSlide = activeSlide?.nextElementSibling;
      nextSlide?.classList.remove("translate-x-full");
      nextSlide?.classList.add("translate-x-0");
    }
  };
  const previous = () => {
    const activeSlide = document.querySelector(".slide.translate-x-0");
    if (activeSlide?.id !== sliderName) return;
    if (activeSlide?.previousElementSibling) {
      activeSlide?.classList.remove("translate-x-0");
      activeSlide?.classList.add("translate-x-full");
      const previousSlide = activeSlide?.previousElementSibling;
      previousSlide?.classList.remove("-translate-x-full");
      previousSlide?.classList.add("translate-x-0");
    }
  };
  return (
    <>
      <div className="relative">{props.children}</div>
      <div className="absolute flex justify-between text-white">
        <SliderButton onClick={() => previous()} direction="left" />
        <SliderButton onClick={() => next()} direction="right" />
      </div>
    </>
  );
};
