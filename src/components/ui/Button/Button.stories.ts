import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from './Button';
import IconPlaceholder from 'assets/icons/placeholder.svg?react';

const meta = {
  title: 'components/UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    onClick: fn(),
    label: 'Button',
    isFullWidth: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    Icon: IconPlaceholder,
  },
};
