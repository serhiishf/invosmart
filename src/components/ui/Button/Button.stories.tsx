import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, expect } from '@storybook/test';
import Button from './Button';
import { ButtonProps } from './types';
import { textExamples, styleData } from 'mocks/storybook/mockData';
import { Settings as IconPlaceholder } from 'mocks/shared/icons';
import * as icons from 'mocks/shared/icons';
import { TextOverflow } from 'constants/theme';

const meta = {
  title: 'components/UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    startIcon: {
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
    children: 'Button',
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Button',
    isFullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Button',
  },
};

export const StartIconAndText: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  args: {
    startIcon: IconPlaceholder,
  },

  render: (args) => (
    <div style={styleData.flexColumn}>
      <Button {...args}>!isFullWidth</Button>
      <Button {...args} isFullWidth>
        isFullWidth
      </Button>
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
    startIcon: IconPlaceholder,
  },

  render: (args) => (
    <div style={styleData.flexColumn}>
      <Button {...args}>default</Button>
      <Button fontWeight="medium" {...args}>
        medium
      </Button>
      <Button fontWeight="semiBold" {...args}>
        semiBold
      </Button>
    </div>
  ),
};

export const Shape: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },

  render: (args) => (
    <div style={styleData.flexColumn}>
      <Button {...args}>default</Button>
      <Button shape="regular" {...args}>
        regular
      </Button>
      <Button shape="rounded" {...args}>
        rounded
      </Button>
    </div>
  ),
};

export const LongText: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },

  render: (args) => {
    return (
      <div style={styleData.flexColumn}>
        <div style={styleData.flexColumn}>
          <h4>Default</h4>
          <Button {...args}>{textExamples.longText}</Button>
        </div>
        <div style={styleData.flexColumn}>
          <h4>TextOverflow.Truncate</h4>
          <Button textOverflow={TextOverflow.Truncate} {...args}>
            {textExamples.longText}
          </Button>
        </div>
        <div style={styleData.flexColumn}>
          <h4>TextOverflow.Wrap</h4>
          <Button textOverflow={TextOverflow.Wrap} {...args}>
            {textExamples.longText}
          </Button>
        </div>
        <div style={styleData.flexColumn}>
          <h4>TextOverflow.Wrap and Icon</h4>
          <Button textOverflow={TextOverflow.Wrap} startIcon={IconPlaceholder} {...args}>
            {textExamples.longText}
          </Button>
        </div>
        <div style={styleData.flexColumn}>
          <h4>TextOverflow.Wrap and Shape: rounded</h4>
          <Button textOverflow={TextOverflow.Wrap} shape="rounded" {...args}>
            {textExamples.longText}
          </Button>
        </div>
        <div style={styleData.flexColumn}>
          <h4>TextOverflow.Wrap, Shape: rounded and Icon</h4>
          <Button
            textOverflow={TextOverflow.Wrap}
            shape="rounded"
            startIcon={IconPlaceholder}
            {...args}
          >
            {textExamples.longText}
          </Button>
        </div>
      </div>
    );
  },
};

export const FocusInteractions: Story = {
  args: {
    startIcon: IconPlaceholder,
    children: 'Focus interaction',
    tooltip: 'Settings',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button');
    await userEvent.keyboard('{Tab}');

    expect(button).toHaveFocus();
  },
};

export const OnlyStartIconAndTooltipHoverInteractions: Story = {
  // This story tests the tooltip behavior when hovering over the button.
  // Due to the use of `@media (pointer: fine)` in the component's styles,
  // the hover-related background changes are not reflected in this test environment.
  // The visual hover effect will only be visible when using a real mouse in a browser.
  args: {
    startIcon: IconPlaceholder,
    children: '',
    tooltip: 'Settings',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button');
    await userEvent.hover(button);
  },
};

export const Sizes: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: (args) => {
    const sizes: ButtonProps['size'][] = ['xs', 's', 'm', 'l', 'xl'];
    return (
      <div style={styleData.flexColumn}>
        <h4>Shape - regular</h4>
        <div style={styleData.flexRow}>
          {sizes.map((size) => (
            <Button shape="regular" size={size} key={size} {...args}>
              Button size - {size}
            </Button>
          ))}
        </div>
        <h4>Shape - rounded</h4>
        <div style={styleData.flexRow}>
          {sizes.map((size) => (
            <Button shape="rounded" size={size} key={size} {...args}>
              Button size - {size}
            </Button>
          ))}
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
        <h3>!isBordered</h3>
        <div style={styleData.flexColumn}>
          {palleteNames.map((value) => {
            return (
              <div style={styleData.flexColumn} key={value}>
                <h4>{value}</h4>
                <div style={styleData.flexRow}>
                  <Button buttonPalette={value} {...args}>
                    {value}
                  </Button>
                  <Button
                    buttonPalette={value}
                    id={`${value}Hover`}
                    {...args}
                  >{`${value} and hover`}</Button>
                  <Button
                    buttonPalette={value}
                    id={`${value}Focus`}
                    {...args}
                  >{`${value} and focus-visible`}</Button>
                  <Button
                    buttonPalette={value}
                    id={`${value}Active`}
                    {...args}
                  >{`${value} and active`}</Button>
                  <Button
                    buttonPalette={value}
                    disabled
                    {...args}
                  >{`${value} and dissabled`}</Button>
                </div>
              </div>
            );
          })}
        </div>
        <h3>isBordered</h3>
        <div style={styleData.flexColumn}>
          {palleteNames.map((value) => {
            return (
              <div style={styleData.flexColumn} key={value}>
                <h4>{value}</h4>
                <div style={styleData.flexRow}>
                  <Button isBordered buttonPalette={value} {...args}>
                    {value}
                  </Button>
                  <Button
                    isBordered
                    buttonPalette={value}
                    id={`${value}Hover`}
                    {...args}
                  >{`${value} and hover`}</Button>
                  <Button
                    isBordered
                    buttonPalette={value}
                    id={`${value}Focus`}
                    {...args}
                  >{`${value} and focus-visible`}</Button>
                  <Button
                    isBordered
                    buttonPalette={value}
                    id={`${value}Active`}
                    {...args}
                  >{`${value} and active`}</Button>
                  <Button
                    isBordered
                    buttonPalette={value}
                    disabled
                    {...args}
                  >{`${value} and dissabled`}</Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};
