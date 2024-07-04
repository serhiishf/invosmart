import type { Meta, StoryObj } from '@storybook/react';
import { CSSProperties } from 'react';
import FieldWrapper from './FieldWrapper';

const longText =
  "A very long text value that exceeds the typical length to test the input handling and see how it manages overflow and performance. This should be long enough to trigger any potential issues with long input values. Furthermore, adding additional sentences helps to better evaluate the system's capability to process and manage extensive text input without compromising performance or causing any unexpected behavior. By doing so, we can ensure that the system remains robust and reliable, even when faced with unusually large amounts of data. This also allows us to identify any potential bottlenecks or inefficiencies in the handling of extensive text inputs. Consequently, it's essential to extend this text further to cover a wide range of scenarios and edge cases that might arise during real-world usage. Moreover, this extended text serves as a valuable test case for developers to refine and optimize their systems, ensuring seamless user experiences regardless of input size. The goal is to create a highly efficient and scalable system that can gracefully manage and process long text inputs without degradation in performance. Testing with such comprehensive and lengthy text inputs is a crucial step in achieving this objective. By thoroughly evaluating the system's response to this extended text, we gain insights into its capacity to handle large-scale inputs, thereby reinforcing its reliability and robustness in diverse use cases. This approach ensures that all potential issues are addressed, paving the way for a more resilient and effective system that meets users needs and expectations in various demanding scenarios.";

const childrenBackgroundStyle = {
  backgroundColor: 'pink',
  backgroundImage:
    'linear-gradient(45deg, #3ff 25%, transparent 25%, transparent 50%, #3ff 50%, #3ff 75%, transparent 75%, #fff)',
};

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

export const Default: Story = {
  render: (args) => (
    <div style={stylesFlexColumn}>
      <FieldWrapper {...args}></FieldWrapper>
      <FieldWrapper>
        <div style={{ padding: '40px', ...childrenBackgroundStyle }}>
          Highlighted content inside
        </div>
      </FieldWrapper>
    </div>
  ),
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
