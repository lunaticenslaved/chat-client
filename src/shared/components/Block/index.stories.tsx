import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Block } from "./index";

export default {
  title: "Example/Block",
  component: Block,
} as ComponentMeta<typeof Block>;

const Template: ComponentStory<typeof Block> = (args) => (
  <Block {...args}>
    <h1>This is Block!</h1>
  </Block>
);

export const Sizes = Template.bind({});
Sizes.args = {
  size: "middle",
};
