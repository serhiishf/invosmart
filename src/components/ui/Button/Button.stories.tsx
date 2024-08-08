import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from './Button';
import { textExamples, styleData } from 'mocks/storybook/mockData';
import { Settings as IconPlaceholder } from 'assets/icons';
import * as icons from 'assets/icons';
import { TextOverflow } from 'constants/theme';

const meta = {
  title: 'components/UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      options: ['None', ...Object.keys(icons)],
      mapping: { None: undefined, ...icons },
    },
  },
  args: {
    onClick: fn(),
    label: 'Button',
    isFullWidth: false,
    isBordered: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    label: 'Button',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Button',
    isFullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Button',
  },
};

export const LabelAndIcon: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  args: {
    icon: IconPlaceholder,
  },

  render: (args) => (
    <div style={styleData.flexColumn}>
      <Button {...args} />
      <Button {...args} label="Full width button" isFullWidth />
    </div>
  ),
};

export const Shape: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },

  render: () => (
    <div style={styleData.flexColumn}>
      <Button label="Shape: regular / default" shape="regular" />
      <Button label="Shape: rounded" shape="rounded" />
    </div>
  ),
};

export const LongLabel: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  args: {
    label: textExamples.longText,
  },

  render: (args) => {
    return (
      <div style={styleData.flexColumn}>
        <div style={styleData.flexColumn}>
          <h4>TextOverflow.Truncate</h4>
          <Button {...args} textOverflow={TextOverflow.Truncate}></Button>
        </div>
        <div style={styleData.flexColumn}>
          <h4>TextOverflow.Wrap / Default</h4>
          <Button {...args}></Button>
        </div>
        <div style={styleData.flexColumn}>
          <h4>TextOverflow.Wrap and Icon</h4>
          <Button {...args} textOverflow={TextOverflow.Wrap} icon={IconPlaceholder}></Button>
        </div>
        <div style={styleData.flexColumn}>
          <h4>TextOverflow.Wrap and Shape: rounded</h4>
          <Button {...args} textOverflow={TextOverflow.Wrap} shape="rounded"></Button>
        </div>
      </div>
    );
  },
};

export const OnlyIconAndTooltip: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    pseudo: {
      hover: '#hover',
      focus: '#focus',
    },
  },
  args: {
    icon: IconPlaceholder,
    label: '',
    tooltip: 'Settings',
  },

  render: (args) => (
    <div style={styleData.flexColumn}>
      <div style={styleData.flexColumn}>
        <h4>Default</h4>
        <Button {...args} />
      </div>
      <div style={styleData.flexColumn}>
        <h4>Hover</h4>
        <Button {...args} id="hover" />
      </div>
      <div style={styleData.flexColumn}>
        <h4>Focus</h4>
        <Button {...args} id="focus" />
      </div>
    </div>
  ),
};
