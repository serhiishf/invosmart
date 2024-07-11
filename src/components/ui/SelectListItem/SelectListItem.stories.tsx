import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { textExamples, styleData } from 'constants/storybookData';
import { TextOverflow } from 'constants/theme';
import SelectListItem from './SelectListItem';

const meta = {
  title: 'components/UI/SelectListItem',
  component: SelectListItem,
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Option>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Tallinn',
    value: 'Tallinn',
  },
};

export const Selected: Story = {
  args: {
    label: 'Tallinn',
    value: 'Tallinn',
    isSelected: true,
  },
};

export const PseudoStates = {
  parameters: {
    controls: {
      disable: true,
    },
    pseudo: {
      hover: ['#onLightBackground1', '#onGreyBackground1'],
      active: ['#onLightBackground2', '#onGreyBackground2'],
    },
  },
  render: () => (
    <div style={styleData.flexColumn}>
      <div style={styleData.flexColumn}>
        <h4>onLightBackgorund</h4>
        <div style={styleData.flexColumn}>
          <SelectListItem
            id="onLightBackground1"
            value="hover"
            label="hover"
            backgroundPalette="onLightBackground"
          />
          <SelectListItem
            id="onLightBackground2"
            value="active"
            label="active"
            backgroundPalette="onLightBackground"
          />
          <SelectListItem
            isFocused={true}
            value="isFocused: true"
            label="isFocused: true"
            backgroundPalette="onLightBackground"
            textOverflow={TextOverflow.Truncate}
          />
        </div>
      </div>
      <div style={{ ...styleData.flexColumn, background: 'lightgrey', paddingBottom: '1rem' }}>
        <h4>onGreyBackground</h4>
        <SelectListItem
          id="onGreyBackground1"
          value="hover"
          label="hover"
          backgroundPalette="onGreyBackground"
          textOverflow={TextOverflow.Truncate}
        />
        <SelectListItem
          id="onGreyBackground2"
          value="active"
          label="active"
          backgroundPalette="onGreyBackground"
          textOverflow={TextOverflow.Truncate}
        />
        <SelectListItem
          isFocused={true}
          value="isFocused: true"
          label="isFocused: true"
          backgroundPalette="onGreyBackground"
          textOverflow={TextOverflow.Truncate}
        />
      </div>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    label: 'With icon',
    value: 'with icon',
    textOverflow: TextOverflow.Truncate,
  },
};

export const LongText: Story = {
  args: {
    label: textExamples.longText,
    value: 'LongText',
  },
  parameters: {
    controls: {
      disable: true,
    },
  },

  render: (args) => (
    <div style={styleData.flexColumn}>
      <div style={styleData.flexColumn}>
        <h4>textOferflow: truncate</h4>
        <SelectListItem textOverflow={TextOverflow.Truncate} {...args} />
      </div>
      <div style={styleData.flexColumn}>
        <h4>textOferflow: default/wrap</h4>
        <SelectListItem {...args} />
      </div>
    </div>
  ),
};
