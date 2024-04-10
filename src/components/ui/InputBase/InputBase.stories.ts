import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import InputBase from './InputBase';

const meta = {
  title: 'components/UI/InputBase',
  component: InputBase,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof InputBase>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    placeholder: 'Placeholder',
    value: 'Value',
    isReadOnlyMode: false,
  },
};
