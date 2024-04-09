import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import InputBase from './InputBase';

const meta = {
  title: 'components/ui/InputBase',
  component: InputBase,
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    placeholder: 'Placeholder',
    value: 'Value',
    onChange: fn(),
    isReadOnlyMode: false,
  },
};
