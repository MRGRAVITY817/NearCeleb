import { ReactChild } from "react";
import { useMediaQuery } from "react-responsive";

interface ResponsiveGridProps {
  children: ReactChild;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({ children }) => {
  const isLaptop = useMediaQuery({ query: "(min-width: 1024px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  return (
    <>
      {isLaptop && (
        <div id="responsive-grid" className="grid gap-20 grid-flow-col">
          {children}
        </div>
      )}
      {isTablet && (
        <div id="responsive-grid" className="grid gap-12 grid-flow-col">
          {children}
        </div>
      )}
      {isMobile && <div></div>}
    </>
  );
};
