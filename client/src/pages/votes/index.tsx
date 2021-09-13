import {
  Added,
  Deleted,
  Edited,
} from "../../components/specific/Votes/organisms";
import { VotesPageTemplate } from "../../components/specific/Votes/templates";

const Votes = () => {
  return (
    <VotesPageTemplate
      added={<Added />}
      edited={<Edited />}
      deleted={<Deleted />}
    />
  );
};

export default Votes;
