import type { Meta, StoryObj } from '@storybook/react';
import Link from './Link';

const meta = {
  title: 'components/UI/Link',
  component: Link,
  tags: ['autodocs'],
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    label: 'Example link',
    href: 'https://example.com',
    target: '_blank',
  },
};

export const PseudoStates: Story = {
  args: {
    label: 'Example link',
    href: 'https://example.com',
    target: '_blank',
  },

  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Link {...args} id="one" label="Default link" href="https://some-random-address.com" />
      <Link {...args} id="two" label="Visited link" />
      <Link {...args} id="three" label="Hovered link" />
    </div>
  ),

  parameters: {
    pseudo: {
      unvisited: '#one',
      visited: '#two',
      hover: '#three',
    },
    controls: {
      disable: true, // This disables all controls for this story
    },
  },
};
