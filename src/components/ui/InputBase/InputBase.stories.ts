import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import InputBase from './InputBase';
import { PaddingInput } from 'constants/theme';

const meta = {
  title: 'components/UI/InputBase',
  component: InputBase,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    paddingLeft: { control: 'radio', options: PaddingInput },
    paddingRight: { control: 'radio', options: PaddingInput },
  },
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
