export interface SlideProps {
  first?: boolean;
  sliderName?: string;
}
export const Slide: React.FC<SlideProps> = ({
  first = false,
  sliderName = "",
  ...props
}) => {
  const xTranslate = first ? "translate-x-0" : "translate-x-full";
  return (
    <span
      id={sliderName}
      className={`${xTranslate} slide ease-in-out duration-700 
                  transition-all inline-block transform w-full`}
    >
      {props.children}
    </span>
  );
};
