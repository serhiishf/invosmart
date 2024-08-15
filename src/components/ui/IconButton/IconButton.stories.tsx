import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, expect } from '@storybook/test';
import IconButton from './IconButton';
import * as Icons from 'mocks/shared/icons';
import { IconButtonProps } from './types';
import { styleData } from 'mocks/storybook/mockData';

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

const IconClose = Icons.Close;

export const Default: Story = {
  render: (args) => (
    <IconButton aria-label="Close" tooltip="Close" {...args}>
      <IconClose />
    </IconButton>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <IconButton aria-label="Close" disabled {...args}>
      <IconClose />
    </IconButton>
  ),
};

export const TooltipFocusInteractions: Story = {
  render: (args) => (
    <IconButton aria-label="Close" tooltip="Close" {...args}>
      <IconClose />
    </IconButton>
  ),

  play: async ({ canvas }) => {
    const button = canvas.getByRole('button');
    await userEvent.keyboard('{Tab}');

    expect(button).toHaveFocus();
  },
};

export const TooltipHoverInteractions: Story = {
  // This story tests the tooltip behavior when hovering over the button.
  // Due to the use of `@media (pointer: fine)` in the component's styles,
  // the hover-related background changes are not reflected in this test environment.
  // The visual hover effect will only be visible when using a real mouse in a browser.
  render: (args) => (
    <IconButton aria-label="Close" tooltip="Close" {...args}>
      <IconClose />
    </IconButton>
  ),

  play: async ({ canvas }) => {
    const button = canvas.getByRole('button');
    await userEvent.hover(button);
  },
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
    <div style={styleData.flexRow}>
      <div style={styleData.flexColumn}>
        <h4>Hover</h4>
        <IconButton aria-label="Close" id="hoverClose1" {...args}>
          <IconClose />
        </IconButton>
      </div>
      <div style={styleData.flexColumn}>
        <h4>Active</h4>
        <IconButton aria-label="Close" id="activeClose2" {...args}>
          <IconClose />
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
    pseudo: {
      hover: '#hoverClose1',
      active: '#activeClose2',
    },
  },
  render: (args) => (
    <div style={styleData.flexColumn}>
      <h3>Sizes and Shapes</h3>
      <div style={styleData.flexColumn}>
        <h4>Circle</h4>
        <div style={styleData.flexColumn}>
          <div style={styleData.flexRow}>
            {sizes.map((size) => (
              <div key={size} style={{ border: '1px dashed pink' }}>
                <IconButton
                  id="#hoverClose1"
                  aria-label="Close"
                  size={size}
                  shape="circle"
                  tooltip={size}
                  {...args}
                >
                  <IconClose />
                </IconButton>
              </div>
            ))}
          </div>
          <div style={styleData.flexRow}>
            {sizes.map((size) => (
              <div key={size}>
                <IconButton aria-label="Close" size={size} shape="circle" tooltip={size} {...args}>
                  <IconClose />
                </IconButton>
              </div>
            ))}
          </div>
        </div>
        <h4>Square</h4>
        <div style={styleData.flexColumn}>
          <div style={styleData.flexRow}>
            {sizes.map((size) => (
              <div key={size} style={{ border: '1px dashed pink' }}>
                <IconButton aria-label="Close" size={size} shape="square" tooltip={size} {...args}>
                  <IconClose />
                </IconButton>
              </div>
            ))}
          </div>
          <div style={styleData.flexRow}>
            {sizes.map((size) => (
              <div key={size}>
                <IconButton aria-label="Close" size={size} shape="square" tooltip={size} {...args}>
                  <IconClose />
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
        <IconClose />
      </IconButton>
    </div>
  ),
};
