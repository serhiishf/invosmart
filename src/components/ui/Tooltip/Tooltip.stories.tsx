import type { Meta, StoryObj } from '@storybook/react';
import { textExamples } from 'mocks/storybook/mockData';
import Tooltip from './Tooltip';
import { Button, IconButton } from 'components/ui';

const meta = {
  title: 'components/UI/Tooltip',
  component: Tooltip,
  args: {
    message: 'Tooltip',
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {};

const longText = textExamples.longText;

export const LongText: Story = {
  args: {
    message: longText,
  },

  render: (args) => (
    <Tooltip {...args}>
      <div></div>
    </Tooltip>
  ),
};

export const Buttons: Story = {
  args: {
    children: <Button isFullWidth={false}>Button</Button>,
    message: 'Tooltip message',
  },
};
