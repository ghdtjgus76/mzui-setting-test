import type { Meta, StoryObj } from "@storybook/react";
import Box from "@/base-ui/Box";

const meta = {
  title: "Base-UI/Box",
  component: Box,
  tags: ["autodocs"],
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "박스",
  },
};
