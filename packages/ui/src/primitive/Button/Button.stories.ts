import type { Meta, StoryObj } from "@storybook/react";

import Button from "@/primitive/Button";

const meta = {
  title: "Primitive-UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "버튼 컴포넌트",
    docs: {
      description: {
        component: `- children으로 텍스트 값을 지정하면 됩니다.\n- onClick은 클릭 함수입니다.\n- size는 버튼 크기로 "xs" | "s" | "m" | "l" | "xl" 중 하나를 선택하면 됩니다.\n- loading은 로딩 여부로 false | true 중 하나를 선택하면 됩니다.
        `,
      },
    },
  },
  argTypes: {
    children: {
      description: "버튼에 들어갈 자식 요소",
      control: {
        type: "text",
      },
      type: { name: "string", required: true },
    },
    onClick: {
      description: "클릭 함수",
      type: { name: "function", required: false },
    },
    size: {
      description: "버튼 크기",
      defaultValue: "xs",
      control: {
        type: "radio",
        options: ["xs", "s", "m", "l", "xl"],
      },
    },
    isLoading: {
      description: "로딩 여부",
      defaultValue: false,
      control: {
        type: "boolean",
      },
      type: { name: "boolean", required: false },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * primary 버튼
 */
export const Primary: Story = {
  args: {
    children: "버튼",
  },
};

/**
 * secondary 버튼
 */
export const Secondary: Story = {
  args: {
    children: "버튼",
  },
};
