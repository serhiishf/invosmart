import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SelectListItem from './SelectListItem';

const meta = {
  title: 'components/UI/SelectListItem',
  component: SelectListItem,
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Option>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Tallinn',
    value: 'Tallinn',
  },
};
