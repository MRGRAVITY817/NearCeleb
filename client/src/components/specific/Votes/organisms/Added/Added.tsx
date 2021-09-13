import { VoteSection } from "../../atoms";

export const Added = () => {
  return (
    <VoteSection
      title="Added this week"
      buttonText="Add new celeb"
      buttonUrl="/votes/add-vote"
      celebs={<h1>Added Section</h1>}
    />
  );
};
