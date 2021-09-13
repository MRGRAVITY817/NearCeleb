import { storiesOf } from "@storybook/react";
import { useState } from "react";
import { TrendCategory } from "../../../../../__generated__/globalTypes";
import { TrendHeader } from "./TrendHeader";

storiesOf("Trend Header", module).add("Default", () => {
  const [mockedTrend, setMockedTrend] = useState<TrendCategory | null>(null);
  return (
    <div className="p-4 bg-main">
      <TrendHeader stateHandler={[mockedTrend, setMockedTrend]} />
    </div>
  );
});
