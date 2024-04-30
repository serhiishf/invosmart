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
    helperText: 'Helper text',
  },
};

export const PasswordInteractions: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helperText: 'Helper text',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Input
        {...args}
        label="Hidden password"
        placeholder="Hidden password"
        data-testid="hidden-password"
      />
      <Input
        {...args}
        label="Vissible password"
        placeholder="Vissible password"
        data-testid="vissible-password"
      />
      <Input
        {...args}
        label="Toggle button focused"
        placeholder="Toggle button focused"
        data-testid="toggle-button-focused"
      />
    </div>
  ),

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const hiddenPasword = canvas.getByTestId('hidden-password');
    const vissiblePassword = canvas.getByTestId('vissible-password');
    const toggleBtnFocused = canvas.getByTestId('toggle-button-focused');
    await userEvent.type(hiddenPasword, 'hidden password');
    await vissiblePassword.focus();
    await userEvent.type(vissiblePassword, 'Vissible password 123');
    await userEvent.tab();
    await userEvent.keyboard('[Enter]');
    await userEvent.type(toggleBtnFocused, 'some password');
    await userEvent.tab();
  },
};

export const Error: Story = {
  args: {
    label: 'Error state',
    placeholder: 'Placeholder',
    isError: true,
    helperText: 'Helper text',
  },
};

export const ErrorInteraction: Story = {
  args: {
    label: 'Error interaction',
    placeholder: 'Placeholder',
    isError: true,
    helperText: 'Helper text',
  },

  render: (args) => (
    <Input {...args} isError={true} placeholder="Error state" data-testid="emailError-input" />
  ),

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputEmailError = canvas.getByTestId('emailError-input');
    await inputEmailError.focus();
    await userEvent.type(inputEmailError, 'Typed with error state');
    expect(inputEmailError).toHaveValue('Typed with error state');
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

export const ReadonlyModeInteraction: Story = {
  args: {
    label: 'Readonly mode interaction',
    value: 'Try to type something',
    placeholder: 'Placeholder',
    readOnly: true,
  },

  render: (args) => <Input {...args} data-testid="readOnly-input" />,

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const readonlyInput = canvas.getByTestId('readOnly-input');
    await userEvent.type(readonlyInput, 'Typed text');
    expect(readonlyInput).toHaveValue('Try to type something');
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

export const DisabledInteraction: Story = {
  args: {
    label: 'Disabled no change, no focus',
    value: 'Disabled value',
    placeholder: 'Placeholder',
    disabled: true,
  },

  render: (args) => <Input {...args} data-testid="dissabled-input" />,

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dissabledInput = canvas.getByTestId('dissabled-input');
    await dissabledInput.focus();
    await userEvent.type(dissabledInput, 'Some text');
    expect(dissabledInput).toHaveValue('Disabled value');
  },
};

export const PrefixIcon: Story = {
  args: {
    label: 'Prefix Icon',
    placeholder: 'Placeholder',
    PrefixIcon: IconSearch,
  },
};

export const PrefixIconInteraction: Story = {
  args: {
    label: 'Prefix Icon focus',
    placeholder: 'Placeholder',
    PrefixIcon: IconSearch,
  },

  render: (args) => <Input {...args} data-testid="prefixIcon-input" />,

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const prefixIconInput = canvas.getByTestId('prefixIcon-input');
    await prefixIconInput.focus();
  },
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
