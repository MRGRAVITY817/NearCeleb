import { VoteSection } from "../../atoms";

export const Deleted = () => {
  return (
    <VoteSection
      title="Deleted this week"
      buttonText="Delete celeb"
      buttonUrl="/votes/delete-vote"
      celebs={<h1></h1>}
    />
  );
};
