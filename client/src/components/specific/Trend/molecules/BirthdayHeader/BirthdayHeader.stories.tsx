import { storiesOf } from "@storybook/react";
import { useState } from "react";
import { CelebRole } from "../../organisms/BirthdaySlider/BirthdaySlider";
import { BirthdayHeader } from "./BirthdayHeader";

storiesOf("Birthday Header", module).add("Default", () => {
  const [mockedRole, setMockedRole] = useState<CelebRole>("actor");
  return (
    <div className="p-4 bg-main">
      <BirthdayHeader />
    </div>
  );
});
