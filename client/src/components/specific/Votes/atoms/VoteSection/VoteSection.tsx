import Link from "next/link";
import { ReactChild } from "react";
import { Button } from "../../../../common/atoms";

interface VoteSectionProps {
  title: string;
  buttonText: string;
  buttonUrl: string;
  celebs: ReactChild;
}
export const VoteSection: React.FC<VoteSectionProps> = ({
  title,
  buttonText,
  buttonUrl,
  celebs,
}) => {
  return (
    <div>
      <div className="tablet:mb-6npm run tailwind:build & npm run apollo:codegen & flex items-center justify-start mb-4 laptop:mb-8">
        <h1 className="mr-12 text-2xl tablet:text-3xl laptop:text-4xl">
          {title}
        </h1>
        <Button color="strong">
          <Link href={buttonUrl}>
            <a>{buttonText}</a>
          </Link>
        </Button>
      </div>
      {celebs}
    </div>
  );
};
