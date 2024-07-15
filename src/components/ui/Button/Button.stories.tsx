import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from './Button';
import { Placeholder as IconPlaceholder } from 'assets/icons';
import * as icons from 'assets/icons';

const meta = {
  title: 'components/UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    Icon: {
      options: ['None', ...Object.keys(icons)],
      mapping: { None: undefined, ...icons },
    },
  },
  args: {
    onClick: fn(),
    label: 'Button',
    isFullWidth: false,
    isBordered: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    label: 'Button',
    isFullWidth: false,
    isBordered: false,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Button',
  },
};

export const LabelAndIcon: Story = {
  args: {
    Icon: IconPlaceholder,
  },
};

export const LongLabel: Story = {
  args: {
    label: 'Interdum et malesuada fames ac ante ipsum primis in faucibus',
  },
};

export const LongLabelAndIcon: Story = {
  args: {
    Icon: IconPlaceholder,
    label: 'Interdum et malesuada fames ac ante ipsum primis in faucibus',
  },
};

export const OnlyIcon: Story = {
  args: {
    Icon: IconPlaceholder,
    label: '',
  },
};
