import type { Meta, StoryObj } from '@storybook/react';
import { textExamples } from 'mocks/storybook/mockData';
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

const longText = textExamples.longText;

export const LongText: Story = {
  args: {
    label: longText,
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
      <Link {...args} id="unvisited" label="Default link" href="https://some-random-address.com" />
      <Link {...args} id="visited" label="Visited link" />
      <Link {...args} id="hover" label="Hovered link" />
      <Link {...args} id="active" label="Active link" />
    </div>
  ),

  parameters: {
    pseudo: {
      unvisited: '#unvisited',
      visited: '#visited',
      hover: '#hover',
      active: '#active',
    },
    controls: {
      disable: true,
    },
  },
};
