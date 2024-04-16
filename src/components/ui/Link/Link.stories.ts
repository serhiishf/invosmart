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
