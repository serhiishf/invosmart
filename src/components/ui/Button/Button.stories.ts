import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from './Button';

const meta = {
  title: 'components/UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    onClick: fn(),
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;
export const XS: Story = {
  args: {
    size: 'xs',
  },
};
