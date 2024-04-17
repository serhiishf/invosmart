import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Input from './Input';


const meta = {
  title: 'components/UI/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const WithLabelAndPlaceholder: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
  },
};

export const Error: Story = {
  args: {
    label: 'Error state',
    placeholder: 'Error state',
    isError: true,
  },
};

export const ReadOnlyMode: Story = {
  args: {
    label: 'Readonly mode',
    placeholder: 'readOnly',
    readOnly: true,
  },
};
