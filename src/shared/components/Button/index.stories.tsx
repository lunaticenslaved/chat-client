import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "./index";

export default {
  title: "Example/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Button</Button>;

export const Sizes = Template.bind({});
Sizes.args = {
  size: "middle",
};
