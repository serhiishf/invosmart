import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from './Button';
import IconPlaceholder from 'assets/icons/placeholder.svg?react';
import IconSettings from 'assets/icons/settings.svg?react';

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

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Button',
  },
};

export const WithIcon: Story = {
  args: {
    Icon: IconPlaceholder,
  },
};

export const LongTextLabel: Story = {
  args: {
    label: 'Interdum et malesuada fames ac ante ipsum primis in faucibus',
  },
};

export const LongTextLabelWithIcon: Story = {
  args: {
    Icon: IconPlaceholder,
    label: 'Interdum et malesuada fames ac ante ipsum primis in faucibus',
  },
};
