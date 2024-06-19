import type { Meta, StoryObj } from '@storybook/react';
import { fn, within, expect, userEvent } from '@storybook/test';
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

export const PlaceholderInteractions: Story = {
  args: {
    placeholder: 'Interactions',
  },

  render: (args) => <InputBase {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputBase = canvas.getByRole('textbox');
    await inputBase.focus();
    await userEvent.type(inputBase, 'Typing');
    await expect(inputBase).toHaveValue('Typing');
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

export const LongTextValue: Story = {
  args: {
    value:
      'A very long text value that exceeds the typical length to test the input handling and see how it manages overflow and performance. This should be long enough to trigger any potential issues with long input values.',
  },
};
