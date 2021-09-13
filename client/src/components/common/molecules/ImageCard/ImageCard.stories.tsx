import { storiesOf } from "@storybook/react";
import { ImageCard, ImageCardProps } from "./ImageCard";

const mockedImageCardProps: ImageCardProps = {
  cardImage:
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
};

storiesOf("Image Card", module).add("Default", () => (
  <ImageCard {...mockedImageCardProps} />
));
