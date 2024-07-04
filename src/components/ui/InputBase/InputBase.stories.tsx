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

const longText =
  "A very long text value that exceeds the typical length to test the input handling and see how it manages overflow and performance. This should be long enough to trigger any potential issues with long input values. Furthermore, adding additional sentences helps to better evaluate the system's capability to process and manage extensive text input without compromising performance or causing any unexpected behavior. By doing so, we can ensure that the system remains robust and reliable, even when faced with unusually large amounts of data. This also allows us to identify any potential bottlenecks or inefficiencies in the handling of extensive text inputs. Consequently, it's essential to extend this text further to cover a wide range of scenarios and edge cases that might arise during real-world usage. Moreover, this extended text serves as a valuable test case for developers to refine and optimize their systems, ensuring seamless user experiences regardless of input size. The goal is to create a highly efficient and scalable system that can gracefully manage and process long text inputs without degradation in performance. Testing with such comprehensive and lengthy text inputs is a crucial step in achieving this objective. By thoroughly evaluating the system's response to this extended text, we gain insights into its capacity to handle large-scale inputs, thereby reinforcing its reliability and robustness in diverse use cases. This approach ensures that all potential issues are addressed, paving the way for a more resilient and effective system that meets users needs and expectations in various demanding scenarios.";

export const LongTextValue: Story = {
  args: {
    value: longText,
  },
};
