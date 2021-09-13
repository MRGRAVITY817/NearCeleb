interface ServiceProps {
  title: string;
  first: string;
  second: string;
}
export const Service: React.FC<ServiceProps> = ({ title, first, second }) => {
  return (
    <div className="flex flex-col items-center justify-center border-1 laptop:border-2 border-strong rounded-md overflow-hidden">
      <div className="flex items-center justify-center py-2 w-full h-1/4 laptop:text-2xl text-xl bg-strong">
        {title}
      </div>
      <div className="flex items-center justify-center py-4 h-3/4 text-lg laptop:text-xl font-light">
        <ul className="grid gap-2 grid-flow-row text-center">
          <li className="hover:text-strong hover:font-normal transition-all">
            {first}
          </li>
          <li className="hover:text-strong hover:font-normal transition-all">
            {second}
          </li>
        </ul>
      </div>
    </div>
  );
};
