interface ContainerProps {
  bgColor?: "white" | "container";
  bgCover?: string;
  bgDirection?: "right" | "left" | "top" | "center" | "bottom";
  gradient?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  bgColor = "container",
  bgDirection = "top",
  bgCover,
  gradient = false,
  ...props
}) => {
  const bgGradient = gradient
    ? "linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)),"
    : "";
  const colorScheme = `bg-${bgColor} text-${
    bgColor === "container" ? "white" : "container"
  }`;
  const bgPosition = `bg-${bgDirection}`;
  return (
    <div
      style={{ backgroundImage: `${bgGradient} url(${bgCover})` }}
      className={`rounded-lg shadow-md overflow-auto bg-cover ${colorScheme} ${bgPosition}`}
    >
      {props.children}
    </div>
  );
};
