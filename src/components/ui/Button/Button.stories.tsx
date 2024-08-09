import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent } from '@storybook/test';
import Button from './Button';
import { ButtonProps } from './types';
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
      <Button {...args} label="!isFullWidth" />
      <Button {...args} label="isFullWidth" isFullWidth />
    </div>
  ),
};

export const FontWeight: Story = {
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
      <Button label="default" {...args} />
      <Button fontWeight="medium" label="medium" {...args} />
      <Button fontWeight="semiBold" label="semiBold" {...args} />
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
      <Button label="default" />
      <Button label="regular" shape="regular" />
      <Button label="rounded" shape="rounded" />
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
          <h4>Default</h4>
          <Button {...args}></Button>
        </div>
        <div style={styleData.flexColumn}>
          <h4>TextOverflow.Truncate</h4>
          <Button {...args} textOverflow={TextOverflow.Truncate}></Button>
        </div>
        <div style={styleData.flexColumn}>
          <h4>TextOverflow.Wrap</h4>
          <Button textOverflow={TextOverflow.Wrap} {...args}></Button>
        </div>
        <div style={styleData.flexColumn}>
          <h4>TextOverflow.Wrap and Icon</h4>
          <Button {...args} textOverflow={TextOverflow.Wrap} icon={IconPlaceholder}></Button>
        </div>
        <div style={styleData.flexColumn}>
          <h4>TextOverflow.Wrap and Shape: rounded</h4>
          <Button {...args} textOverflow={TextOverflow.Wrap} shape="rounded"></Button>
        </div>
        <div style={styleData.flexColumn}>
          <h4>TextOverflow.Wrap, Shape: rounded and Icon</h4>
          <Button
            {...args}
            textOverflow={TextOverflow.Wrap}
            shape="rounded"
            icon={IconPlaceholder}
          ></Button>
        </div>
      </div>
    );
  },
};

export const FocusInteractions: Story = {
  args: {
    icon: IconPlaceholder,
    label: 'Focus interaction',
    tooltip: 'Settings',
  },
  play: async () => {
    await userEvent.keyboard('{Tab}');
  },
};

export const OnlyIconAndTooltipHoverInteractions: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  args: {
    icon: IconPlaceholder,
    label: '',
    tooltip: 'Settings',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button');
    await userEvent.hover(button);
  },
};

export const Sizes: Story = {
  render: (args) => {
    return (
      <div style={styleData.flexColumn}>
        <h4>Shape - regular</h4>
        <div style={styleData.flexRow}>
          <Button shape="regular" size="xs" label="Button size - xs" {...args}></Button>
          <Button shape="regular" size="s" label="Button size - s" {...args}></Button>
          <Button shape="regular" size="m" label="Button size - m" {...args}></Button>
          <Button shape="regular" size="l" label="Button size - l" {...args}></Button>
          <Button shape="regular" size="xl" label="Button size - xl" {...args}></Button>
        </div>
        <h4>Shape - rounded</h4>
        <div style={styleData.flexRow}>
          <Button shape="rounded" size="xs" label="Button size - xs" {...args}></Button>
          <Button shape="rounded" size="s" label="Button size - s" {...args}></Button>
          <Button shape="rounded" size="m" label="Button size - m" {...args}></Button>
          <Button shape="rounded" size="l" label="Button size - l" {...args}></Button>
          <Button shape="rounded" size="xl" label="Button size - xl" {...args}></Button>
        </div>
      </div>
    );
  },
};

export const PaleteAndStates: Story = {
  parameters: {
    pseudo: {
      hover: [
        '#positiveHover',
        '#primaryHover',
        '#secondaryHover',
        '#transparentSecondaryHover',
        '#transparentPositiveHover',
        '#transparentNegativeHover',
        '#transparentNeutralHover',
      ],
      focusVisible: [
        '#positiveFocus',
        '#primaryFocus',
        '#secondaryFocus',
        '#transparentSecondaryFocus',
        '#transparentPositiveFocus',
        '#transparentNegativeFocus',
        '#transparentNeutralFocus',
      ],
      active: [
        '#positiveActive',
        '#primaryActive',
        '#secondaryActive',
        '#transparentSecondaryActive',
        '#transparentPositiveActive',
        '#transparentNegativeActive',
        '#transparentNeutralActive',
      ],
    },
    controls: {
      disable: true,
    },
  },
  render: (args) => {
    const palleteNames: ButtonProps['buttonPalette'][] = [
      'primary',
      'secondary',
      'transparentSecondary',
      'transparentPositive',
      'transparentNegative',
      'transparentNeutral',
      'positive',
    ];
    return (
      <div style={styleData.flexColumn}>
        <h3>No border</h3>
        <div style={styleData.flexColumn}>
          {palleteNames.map((value) => {
            return (
              <div style={styleData.flexColumn} key={value}>
                <h4>{value}</h4>
                <div style={styleData.flexRow}>
                  <Button buttonPalette={value} label={value} {...args}></Button>
                  <Button
                    buttonPalette={value}
                    label={`${value} and hover`}
                    id={`${value}Hover`}
                    {...args}
                  ></Button>
                  <Button
                    buttonPalette={value}
                    label={`${value} and focus-visible`}
                    id={`${value}Focus`}
                    {...args}
                  ></Button>
                  <Button
                    buttonPalette={value}
                    label={`${value} and active`}
                    id={`${value}Active`}
                    {...args}
                  ></Button>
                  <Button
                    buttonPalette={value}
                    label={`${value} and dissabled`}
                    disabled
                    {...args}
                  ></Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};
