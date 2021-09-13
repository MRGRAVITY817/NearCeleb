import { ReactChild } from "react";
import { Container } from "../../../../common/atoms";

interface DashboardContainerProps {
  header: string;
  loading?: boolean;
  contents: ReactChild;
}

export const DashboardContainer: React.FC<DashboardContainerProps> = ({
  header,
  loading = false,
  contents,
}) => {
  return (
    <Container bgColor="white">
      {loading ? (
        <h1 className="p-4 font-semibold">Loading ...</h1>
      ) : (
        <div className="p-4">
          <h1 className="pb-4 text-lg laptop:text-xl font-semibold border-b-1 border-container border-opacity-50">
            {header}
          </h1>
          <div className="pt-4 px-4">{contents}</div>
        </div>
      )}
    </Container>
  );
};
