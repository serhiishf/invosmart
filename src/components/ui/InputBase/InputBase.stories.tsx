import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import InputBase from './InputBase';

const meta = {
  title: 'components/UI/InputBase',
  component: InputBase,
  decorators: [
    (Story) => (
      <div style={{ border: '1px dashed pink' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof InputBase>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const InitialValue: Story = {
  args: {
    placeholder: 'Placeholder',
    value: 'Value',
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: 'Placeholder',
  },
};

export const ReadonlyMode: Story = {
  args: {
    value: 'Readonly mode',
    isReadOnlyMode: true,
  },
};

export const Disabled: Story = {
  args: {
    value: 'Disabled',
    disabled: true,
  },
};
