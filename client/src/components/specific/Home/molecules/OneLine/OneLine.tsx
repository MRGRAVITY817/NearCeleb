interface OneLineProps {
  content: string;
}

export const OneLine: React.FC<OneLineProps> = ({ content }) => {
  return (
    <h1 className="px-4 py-2 text-center text-main text-lg laptop:text-xl bg-white rounded-md">
      {content}
    </h1>
  );
};
