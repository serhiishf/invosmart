import type { Meta, StoryObj } from '@storybook/react';
import { CSSProperties } from 'react';
import FieldWrapper from './FieldWrapper';
import { textExamples } from 'constants/storybookData';

const longText = textExamples.longText;

const meta = {
  title: 'components/UI/FieldWrapper',
  component: FieldWrapper,
  args: {
    children: (
      <div
        style={{
          padding: '40px',
        }}
      >
        Content inside
      </div>
    ),
  },
} satisfies Meta<typeof FieldWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

const stylesFlexColumn: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

export const Default: Story = {};

export const WithLabelAndHelperText: Story = {
  args: {
    label: 'Label',
    helperText: 'Helper text',
  },
};

export const HelperTextPosition: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: (args) => (
    <div style={stylesFlexColumn}>
      <FieldWrapper
        label="Label"
        helperText="Helper text position: default/left"
        {...args}
      ></FieldWrapper>
      <FieldWrapper
        label="Label"
        helperText="Helper text position: right"
        helperTextPosition="right"
        {...args}
      ></FieldWrapper>
    </div>
  ),
};

export const ComponentStates: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    pseudo: {
      hover: '#hoverFieldWrapper1',
    },
  },
  render: (args) => (
    <div style={stylesFlexColumn}>
      <FieldWrapper
        label="isFocused"
        helperText="isFocused: true"
        isFocused={true}
        {...args}
      ></FieldWrapper>
      <FieldWrapper
        label="isError"
        helperText="isError: true"
        isError={true}
        {...args}
      ></FieldWrapper>
      <FieldWrapper
        label="isFocused, isError"
        helperText="isFocused: true, isError: true"
        isFocused={true}
        isError={true}
        {...args}
      ></FieldWrapper>
      <FieldWrapper
        label="disabled"
        helperText="disabled: true, isError: true"
        isError={true}
        disabled
        {...args}
      ></FieldWrapper>
    </div>
  ),
};

export const LongText: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: (args) => (
    <div style={stylesFlexColumn}>
      <FieldWrapper label={longText} {...args}></FieldWrapper>
      <FieldWrapper label="Label" helperText={longText} {...args}></FieldWrapper>
    </div>
  ),
};
