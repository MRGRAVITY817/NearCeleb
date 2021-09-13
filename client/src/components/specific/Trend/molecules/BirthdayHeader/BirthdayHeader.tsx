import { prettyMonth } from "../../../../../lib/dateUtils";
import { SliderHeader } from "../../atoms";

export const BirthdayHeader = () => {
  return (
    <SliderHeader
      main="Monthly Birthday Celebs"
      sub={`${prettyMonth(new Date())}`}
    />
  );
};
