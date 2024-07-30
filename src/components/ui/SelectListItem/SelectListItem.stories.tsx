import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { textExamples, styleData } from 'mocks/storybook/mockData';
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
    backgroundPalette: 'onLightBackground',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Estonia',
    value: 'Estonia',
    icon: (
      <img
        loading="lazy"
        srcSet={`https://flagcdn.com/w40/ee.png 2x`}
        src={`https://flagcdn.com/w20/ee.png`}
        alt=""
      />
    ),
    backgroundPalette: 'onLightBackground',
    textOverflow: TextOverflow.Truncate,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Estonia',
    value: 'Estonia',
    disabled: true,
    icon: (
      <img
        loading="lazy"
        srcSet={`https://flagcdn.com/w40/ee.png 2x`}
        src={`https://flagcdn.com/w20/ee.png`}
        alt=""
      />
    ),
    backgroundPalette: 'onLightBackground',
    textOverflow: TextOverflow.Truncate,
  },
};

export const PseudoStates = {
  parameters: {
    controls: {
      disable: true,
    },
    pseudo: {
      hover: [
        '#onLightBackground1',
        '#onGreyBackground1',
        '#onLightBackground3',
        '#onGreyBackground3',
      ],
      active: [
        '#onLightBackground2',
        '#onGreyBackground2',
        '#onLightBackground4',
        '#onGreyBackground4',
      ],
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
          <SelectListItem
            disabled={true}
            id="onLightBackground3"
            value="hover + disabled"
            label="hover + disabled"
            backgroundPalette="onLightBackground"
          />
          <SelectListItem
            disabled={true}
            id="onLightBackground4"
            value="active + disabled"
            label="active + disabled"
            backgroundPalette="onLightBackground"
          />
          <SelectListItem
            disabled={true}
            isFocused={true}
            value="isFocused: true + disabled"
            label="isFocused: true + disabled"
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
        <SelectListItem
          disabled={true}
          id="onGreyBackground3"
          value="hover + disabled"
          label="hover + disabled"
          backgroundPalette="onGreyBackground"
          textOverflow={TextOverflow.Truncate}
        />
        <SelectListItem
          disabled={true}
          id="onGreyBackground4"
          value="active + disabled"
          label="active + disabled"
          backgroundPalette="onGreyBackground"
          textOverflow={TextOverflow.Truncate}
        />
        <SelectListItem
          disabled={true}
          isFocused={true}
          value="isFocused: true + disabled"
          label="isFocused: true + disabled"
          backgroundPalette="onGreyBackground"
          textOverflow={TextOverflow.Truncate}
        />
      </div>
    </div>
  ),
};

export const LongText: Story = {
  args: {
    label: textExamples.longText,
    value: 'LongText',
    backgroundPalette: 'onLightBackground',
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
