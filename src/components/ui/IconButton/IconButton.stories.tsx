import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, expect } from '@storybook/test';
import IconButton from './IconButton';
import * as Icons from 'mocks/shared/icons';
import { IconButtonProps } from './types';
import { styleData, generatePseudoStateIds } from 'mocks/storybook/mockData';

const meta = {
  title: 'components/UI/IconButton',
  component: IconButton,
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

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

export const TextPseudoHover: Story = {
  parameters: {
    pseudo: {
      hover: '#hoverText1',
    },
  },
  render: (args) => (
    <IconButton aria-label="Close" tooltip="Close" id="hoverText1" {...args}>
      FK
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
  /*
   * This story tests the tooltip behavior when hovering over the button.
   * Due to the use of `@media (pointer: fine)` in the component's styles,
   * the hover-related background changes are not reflected in this test environment.
   * The visual hover effect will only be visible when using a real mouse in a browser.
   */
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

type ButtonSize = IconButtonProps['size'];

const sizes: ButtonSize[] = ['xs', 's', 'm', 'l', 'xl', undefined];

export const SizesAndShapes: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    pseudo: {
      hover: generatePseudoStateIds({
        baseId: sizes,
        prefix: ['CircleHover', 'SquareHover', 'CircleHoverAndLetter'],
      }),
    },
  },
  render: (args) => (
    <div style={styleData.flexColumn}>
      <h3>Sizes and Shapes</h3>
      <div style={styleData.flexColumn}>
        <h3>Circle</h3>
        <div style={styleData.flexColumnSmallGap}>
          <h4>Pseudo hover state</h4>
          <div style={styleData.flexRow}>
            {sizes.map((size) => (
              <div key={size} style={styleData.flexColumnSmallGap}>
                <h5>{size ? size : 'default'}</h5>
                <IconButton
                  id={`CircleHover${size}`}
                  aria-label="Close"
                  size={size}
                  shape="circle"
                  tooltip={size ? size : 'default'}
                  {...args}
                >
                  <IconClose />
                </IconButton>
              </div>
            ))}
          </div>
          <h4>Default state</h4>
          <div style={styleData.flexRow}>
            {sizes.map((size) => (
              <div key={size}>
                <IconButton
                  aria-label="Close"
                  size={size}
                  shape="circle"
                  tooltip={size ? size : 'default'}
                  {...args}
                >
                  <IconClose />
                </IconButton>
              </div>
            ))}
          </div>
          <h4>Pseudo hover state with letters</h4>
          <div style={styleData.flexRow}>
            {sizes.map((size) => (
              <div key={size} style={styleData.flexColumnSmallGap}>
                <h5>{size ? size : 'default'}</h5>
                <IconButton
                  id={`CircleHoverAndLetter${size}`}
                  aria-label="Close"
                  size={size}
                  shape="circle"
                  tooltip={size ? size : 'default'}
                  {...args}
                >
                  FL
                </IconButton>
              </div>
            ))}
          </div>
          <h4>Default state with letters</h4>
          <div style={styleData.flexRow}>
            {sizes.map((size) => (
              <div key={size} style={styleData.flexColumnSmallGap}>
                <h5>{size ? size : 'default'}</h5>
                <IconButton
                  aria-label="Close"
                  size={size}
                  shape="circle"
                  tooltip={size ? size : 'default'}
                  {...args}
                >
                  FL
                </IconButton>
              </div>
            ))}
          </div>
        </div>
        <h3>Square</h3>
        <div style={styleData.flexColumnSmallGap}>
          <h4>Pseudo hover state</h4>
          <div style={styleData.flexRow}>
            {sizes.map((size) => (
              <div key={size} style={styleData.flexColumnSmallGap}>
                <h5>{size ? size : 'default'}</h5>
                <IconButton
                  id={`SquareHover${size}`}
                  aria-label="Close"
                  size={size}
                  shape="square"
                  tooltip={size ? size : 'default'}
                  {...args}
                >
                  <IconClose />
                </IconButton>
              </div>
            ))}
          </div>
          <h4>Default state</h4>
          <div style={styleData.flexRow}>
            {sizes.map((size) => (
              <div key={size}>
                <IconButton
                  aria-label="Close"
                  size={size}
                  shape="square"
                  tooltip={size ? size : 'default'}
                  {...args}
                >
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

export const ResponsiveToParentSize: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    pseudo: {
      hover: ['#hoverDecreasing', '#hoverDefault'],
    },
  },
  render: (args) => (
    <div style={styleData.flexRow}>
      <div style={styleData.flexColumnSmallGap}>
        <h4>Parent Smaller than Component</h4>
        <div
          style={{ width: '24px', height: '24px', overflow: 'hidden', border: '1px solid orange' }}
        >
          <IconButton aria-label="Close" tooltip="Close" id="hoverDecreasing" {...args}>
            <IconClose />
          </IconButton>
        </div>
      </div>

      <div style={styleData.flexColumnSmallGap}>
        <h4>Parent Larger than Component</h4>
        <div style={{ width: '300px', height: '300px', border: '1px solid orange' }}>
          <IconButton aria-label="Close" tooltip="Close" id="hoverDefault" {...args}>
            <IconClose />
          </IconButton>
        </div>
      </div>

      <div style={styleData.flexColumnSmallGap}>
        <h4>Parent without fixed size</h4>
        <div style={{ border: '1px solid orange' }}>
          <IconButton aria-label="Close" tooltip="Close" id="hoverDefault" {...args}>
            <IconClose />
          </IconButton>
        </div>
      </div>
    </div>
  ),
};
