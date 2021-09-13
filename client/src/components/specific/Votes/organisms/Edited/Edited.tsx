import { VoteSection } from "../../atoms";

export const Edited = () => {
  return (
    <VoteSection
      title="Edited this week"
      buttonText="Edit celeb info"
      buttonUrl="/votes/edit-vote"
      celebs={<h1></h1>}
    />
  );
};
