import { storiesOf } from "@storybook/react";
import { Container } from "./Container";

storiesOf("Container", module)
  .add("Default", () => (
    <Container>
      <h1 className="m-12">Default</h1>
    </Container>
  ))
  .add("Bg Container", () => (
    <Container bgColor="container">
      <h1 className="m-12">Container</h1>
    </Container>
  ))
  .add("Bg White", () => (
    <Container bgColor="white">
      <h1 className="m-12">White</h1>
    </Container>
  ));
