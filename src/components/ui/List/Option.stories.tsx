import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Option from './Option';

const meta = {
  title: 'components/UI/List-Option',
  component: Option,
  args: {
    onClick: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ border: '1px dashed pink' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Option>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Short label',
    value: 'Short label',
  },
};
