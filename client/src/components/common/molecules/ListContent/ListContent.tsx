interface ListContentProps {
  title: string;
  contents: string[];
}
export const ListContent: React.FC<ListContentProps> = ({
  title,
  contents,
}) => {
  return (
    <div>
      <h2 className="text-lg laptop:text-xl font-medium">{title}</h2>
      <ul className="text-md mt-1 laptop:mt-2 laptop:text-lg">
        {contents.map((content, index) => (
          <li key={index}>- {content}</li>
        ))}
      </ul>
    </div>
  );
};
