interface SliderHeaderProps {
  main: string;
  sub: string;
}
export const SliderHeader: React.FC<SliderHeaderProps> = ({ main, sub }) => {
  return (
    <h1 className="mb-4 laptop:mb-8 laptop:text-3xl text-xl">
      <span className="font-semibold">{main}</span>
      <span className="ml-4 p-1 font-light">{sub}</span>
    </h1>
  );
};
