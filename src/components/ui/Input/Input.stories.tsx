import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, within, expect } from '@storybook/test';
import Input from './Input';
import { Search as IconSearch } from 'assets/icons/';
import * as icons from 'assets/icons';

const meta = {
  title: 'components/UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    PrefixIcon: {
      options: ['None', ...Object.keys(icons)],
      mapping: { None: undefined, ...icons },
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
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <Input {...args} />
      <Input {...args} isError={true} placeholder="Error state" />
      <Input {...args} placeholder="Dissabled" disabled />
    </div>
  ),
};

export const InputPropsDemonstration: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Various configurations of the Input component demonstrating different props.**',
      },
    },
    a11y: {
      disable: true,
    },
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <h4>Label</h4>
      <Input label="Label" />
      <h4>Placeholder</h4>
      <Input placeholder="Placeholder" />
      <h4>Helper text</h4>
      <Input helperText="Helper text" />
      <h4>Filled value</h4>
      <Input value="Filled value" />
      <h4>Password</h4>
      <Input type="password" />
      <h4>Error state</h4>
      <Input isError={true} />
      <h4>ReadOnly state - prefilled</h4>
      <Input readOnly value="Prefilled readonly" />
      <h4>Dissabled state - prefilled</h4>
      <Input disabled value="Prefilled disabled" />
      <h4>PrefixIcon</h4>
      <Input PrefixIcon={IconSearch} />
    </div>
  ),
};

export const Interaction: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    helperText: 'Helper text',
  },

  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Input {...args} helperText="" placeholder="Enter email" data-testid="email-input" />
      <Input {...args} placeholder="Another Placeholder" data-testid="emailError-input" />
      <Input {...args} helperText="Different helper text" />
    </div>
  ),

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const inputEmail = canvas.getByTestId('email-input');
    const inputEmailError = canvas.getByTestId('emailError-input');
    await userEvent.type(inputEmail, 'Typed text');
    await inputEmailError.focus();
    expect(inputEmail).toHaveValue('Typed text');
  },
};
