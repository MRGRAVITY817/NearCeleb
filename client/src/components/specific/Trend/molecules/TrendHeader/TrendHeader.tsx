import { prettyDay, prettyMonth } from "../../../../../lib/dateUtils";
import { UseState } from "../../../../../lib/types/hooks";
import { TrendCategory } from "../../../../../__generated__/globalTypes";
import { SliderHeader } from "../../atoms";

interface TrendHeaderProps {
  stateHandler: UseState<TrendCategory | null>;
}

export const TrendHeader: React.FC<TrendHeaderProps> = ({ stateHandler }) => {
  return (
    <SliderHeader
      main="K-Media Trends"
      sub={`${prettyMonth(new Date())} ${prettyDay(new Date())}`}
    />
  );
};
