import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import IconButton from './IconButton';
import * as Icons from 'assets/icons';
import { CSSProperties } from 'react';
import { IconButtonProps } from './types';

const meta = {
  title: 'components/UI/IconButton',
  component: IconButton,
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

type ButtonSize = IconButtonProps['size'];

const sizes: ButtonSize[] = ['xs', 's', 'm', 'l', 'xl', 'auto'];
const stylesFlex: CSSProperties = {
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
};
const stylesFlexColumn: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

export const Default: Story = {
  render: (args) => (
    <IconButton aria-label="Close" tooltip="Close" {...args}>
      <Icons.Close />
    </IconButton>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <IconButton aria-label="Close" disabled {...args}>
      <Icons.Close />
    </IconButton>
  ),
};

export const PseudoStates: Story = {
  parameters: {
    pseudo: {
      hover: '#hoverClose1',
      active: '#activeClose2',
    },
    controls: {
      disable: true,
    },
  },
  render: (args) => (
    <div style={stylesFlex}>
      <div style={stylesFlexColumn}>
        <h4>Hover</h4>
        <IconButton aria-label="Close" id="hoverClose1" {...args}>
          <Icons.Close />
        </IconButton>
      </div>
      <div style={stylesFlexColumn}>
        <h4>Active</h4>
        <IconButton aria-label="Close" id="activeClose2" {...args}>
          <Icons.Close />
        </IconButton>
      </div>
    </div>
  ),
};

export const SizesAndShapes: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: (args) => (
    <div style={stylesFlexColumn}>
      <h3>Sizes and Shapes</h3>
      <div style={stylesFlexColumn}>
        <h4>Circle</h4>
        <div style={stylesFlexColumn}>
          <div style={stylesFlex}>
            {sizes.map((size) => (
              <div key={size} style={{ border: '1px dashed pink' }}>
                <IconButton aria-label="Close" size={size} shape="circle" tooltip={size} {...args}>
                  <Icons.Close />
                </IconButton>
              </div>
            ))}
          </div>
          <div style={stylesFlex}>
            {sizes.map((size) => (
              <div key={size}>
                <IconButton aria-label="Close" size={size} shape="circle" tooltip={size} {...args}>
                  <Icons.Close />
                </IconButton>
              </div>
            ))}
          </div>
        </div>
        <h4>Square</h4>
        <div style={stylesFlexColumn}>
          <div style={stylesFlex}>
            {sizes.map((size) => (
              <div key={size} style={{ border: '1px dashed pink' }}>
                <IconButton aria-label="Close" size={size} shape="square" tooltip={size} {...args}>
                  <Icons.Close />
                </IconButton>
              </div>
            ))}
          </div>
          <div style={stylesFlex}>
            {sizes.map((size) => (
              <div key={size}>
                <IconButton aria-label="Close" size={size} shape="square" tooltip={size} {...args}>
                  <Icons.Close />
                </IconButton>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};

interface CustomArgs extends IconButtonProps {
  parentWidth: string;
  parentHeight: string;
}

export const SizeAutoBehavior: StoryObj<Meta<CustomArgs>> = {
  argTypes: {
    parentWidth: {
      control: { type: 'text' },
      defaultValue: '40px',
      description: 'Width of the parent container',
    },
    parentHeight: {
      control: { type: 'text' },
      defaultValue: '40px',
      description: 'Height of the parent container',
    },
  },
  args: {
    parentWidth: '100px',
    parentHeight: '100px',
  },
  parameters: {},
  render: (args) => (
    <div
      style={{
        width: args.parentWidth,
        height: args.parentHeight,
        border: '1px dashed pink',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px',
      }}
    >
      <IconButton aria-label="Close" size="auto" shape="circle" tooltip="auto" {...args}>
        <Icons.Close />
      </IconButton>
    </div>
  ),
};
