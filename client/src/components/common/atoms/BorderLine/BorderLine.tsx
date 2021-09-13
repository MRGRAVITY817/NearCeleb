interface BorderLineProps {
  color?: string;
  width?: number;
  horizontal?: boolean;
}

export const BorderLine: React.FC<BorderLineProps> = ({
  color = "black",
  width = 1,
  horizontal = true,
}) => {
  const borderLineOption = ({ color, width, horizontal }: BorderLineProps) => {
    const lineDirection = horizontal ? "w-full border-b" : "h-full border-l";
    const lineDirWidth = `${lineDirection}-${width}`;
    let lineColor = "white";
    switch (color) {
      case "white":
        lineColor = "border-white";
        break;
      case "black":
        lineColor = "border-black";
        break;
      default:
        lineColor = `border-${color}-500`;
    }
    return `${lineDirWidth} ${lineColor}`;
  };
  return (
    <>
      <h1
        className={borderLineOption({
          color,
          width,
          horizontal,
        })}
      />
    </>
  );
};
