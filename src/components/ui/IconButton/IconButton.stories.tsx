import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import IconButton from './IconButton';
import * as Icons from 'assets/icons';

const meta = {
  title: 'components/UI/IconButton',
  component: IconButton,
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <IconButton aria-label="Close" {...args}>
      <Icons.Close />
    </IconButton>
  ),
};

export const PseudoStates: Story = {
  parameters: {
    pseudo: {
      hover: '#hover',
      active: '#active',
    },
    controls: {
      disable: true, // This disables all controls for this story
    },
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div>
        <p>Hover</p>
        <IconButton aria-label="Close" id="hover" {...args}>
          <Icons.Close />
        </IconButton>
      </div>

      <IconButton aria-label="Close" id="active" {...args}>
        <Icons.Close />
      </IconButton>
    </div>
  ),
};
