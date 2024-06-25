import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import IconButton from './IconButton';
import * as Icons from 'assets/icons';

const meta = {
  title: 'components/UI/IconButton',
  component: IconButton,
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const sizes = ['xs', 's', 'm', 'l', 'xl', 'auto'];
/* const blockStylesFlexColumn = { display: 'flex', flexDirection: 'column', gap: '20px' } */
//TODO - set padding style and flex column for all blocks

export const Default: Story = {
  render: (args) => (
    <IconButton aria-label="Close" {...args}>
      <Icons.Close />
    </IconButton>
  ),
};

export const PseudoStates: Story = {
  parameters: {
    pseudo: {
      hover: '#hover',
      active: '#active',
    },
    controls: {
      disable: true,
    },
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div>
        <h4>Hover</h4>
        <IconButton aria-label="Close" id="hover" {...args}>
          <Icons.Close />
        </IconButton>
      </div>
      <div>
        <h4>Active</h4>
        <IconButton aria-label="Close" id="active" {...args}>
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
    <div>
      <h2>Sizes and Shapes</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h4>Circle</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {sizes.map((size) => (
              <div key={size} style={{ border: '1px dashed pink' }}>
                <IconButton aria-label="Close" size={size} shape="circle" tooltip={size} {...args}>
                  <Icons.Close />
                </IconButton>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
        <div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {sizes.map((size) => (
              <div key={size} style={{ border: '1px dashed pink' }}>
                <IconButton aria-label="Close" size={size} shape="square" tooltip={size} {...args}>
                  <Icons.Close />
                </IconButton>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
