import type { Meta, StoryObj } from "@storybook/react";

import Button from "@/base-ui/Button";

const meta = {
  title: "Base-UI/Button",
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
