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
    children: 'Example link',
    href: 'https://example.com',
    target: '_blank',
  },
};

const longText = textExamples.longText;

export const LongText: Story = {
  args: {
    children: longText,
    href: 'https://example.com',
    target: '_blank',
  },
};

const randomWebAddres = `https://some-random-address.com/${Math.random()}`;

export const PseudoStates: Story = {
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
  args: {
    children: 'Example link',
    href: 'https://example.com',
    target: '_blank',
  },

  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Link {...args} id="unvisited" href={randomWebAddres}>
        Unvisited link
      </Link>
      <Link {...args} id="visited">
        Visited link
      </Link>
      <Link {...args} id="hover">
        Hovered link
      </Link>
      <Link {...args} id="active">
        Active link
      </Link>
    </div>
  ),
};

export const Underline: Story = {
  parameters: {
    pseudo: {
      unvisited: '#unvisited',
      visited: '#visited',
      hover: ['#underlineHover', '#defaultHover', '#underlineNoneHover', '#underlineAlwaysHover'],
      active: '#active',
    },
    controls: {
      disable: true,
    },
  },
  args: {
    children: 'Example link',
    href: 'https://example.com',
    target: '_blank',
  },

  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h4>Underline default</h4>
      <Link {...args}>underline default</Link>
      <Link {...args} id="defaultHover">
        underline default, hover pseudo state
      </Link>
      <h4>Underline none</h4>
      <Link {...args} underline="none">
        underline=`none`
      </Link>
      <Link {...args} underline="none" id="underlineNoneHover">
        underline=`none`, hover pseudo state
      </Link>
      <h4>Underline hover</h4>
      <Link {...args} underline="hover">
        underline=`hover`
      </Link>
      <Link {...args} id="underlineHover" underline="hover">
        underline=`hover`, hover pseudo state
      </Link>
      <h4>Underline always</h4>
      <Link {...args} underline="always">
        underline=`always`
      </Link>
      <Link {...args} id="underlineAlwaysHover" underline="always">
        underline=`always`, hover pseudo state
      </Link>
    </div>
  ),
};
