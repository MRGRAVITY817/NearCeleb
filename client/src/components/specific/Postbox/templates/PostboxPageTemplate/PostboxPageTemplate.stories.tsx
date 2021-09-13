import { storiesOf } from "@storybook/react";
import { MailList } from "../../organisms";
import { PostboxPageTemplate } from "./PostboxPageTemplate";

storiesOf("Postbox Page Template", module).add("Default", () => (
  <PostboxPageTemplate mailList={<MailList />} />
));
