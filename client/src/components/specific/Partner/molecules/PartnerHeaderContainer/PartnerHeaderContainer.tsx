import { ReactChild } from "react";
import { Container } from "../../../../common/atoms";

interface PartnerHeaderContainerProps {
  bgCover: string;
  content: ReactChild;
}

export const PartnerHeaderContainer: React.FC<PartnerHeaderContainerProps> = ({
  bgCover,
  content,
}) => {
  return (
    <Container bgCover={bgCover} gradient>
      <div className="flex items-center justify-center p-4 laptop:p-8 h-32 laptop:h-48 text-lg laptop:text-xl">
        {content}
      </div>
    </Container>
  );
};
