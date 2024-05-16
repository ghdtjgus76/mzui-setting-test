import type { Meta, StoryObj } from "@storybook/react";

import Button from "@/designed-ui/Button";

const meta = {
  title: "Designed-UI/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "버튼",
  },
};
