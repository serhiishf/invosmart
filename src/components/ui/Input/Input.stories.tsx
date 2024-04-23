import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Input from './Input';
import { iconSelectConfig } from 'config/storybookIconConfig';
import IconSearch from 'assets/icons/search.svg?react';

const meta = {
  title: 'components/UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    PrefixIcon: {
      ...iconSelectConfig,
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {};

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
    placeholder: 'Placeholder',
    isError: true,
  },
};

export const ReadonlyMode: Story = {
  args: {
    label: 'Readonly mode',
    value: 'Readonly mode value',
    placeholder: 'Placeholder',
    readOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    value: 'Disabled value',
    placeholder: 'Placeholder',
    disabled: true,
  },
};

export const PrefixIcon: Story = {
  args: {
    label: 'Prefix Icon',
    placeholder: 'Placeholder',
    PrefixIcon: IconSearch,
  },
};

export const HelperText: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    helperText: 'Helper text',
  },
};

export const ThemeBackground: Story = {
  decorators: [
    (Story) => (
      <div style={{ background: '#f5f6fa', padding: '50px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'Theme bg',
    placeholder: 'Placeholder',
    helperText: 'Helper text',
  },
};
