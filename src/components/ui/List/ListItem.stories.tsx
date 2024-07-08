import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import ListItem from './ListItem';

const meta = {
  title: 'components/UI/List/ListItem',
  component: ListItem,
/*   args: {
    onClick: fn(),
  }, */
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
