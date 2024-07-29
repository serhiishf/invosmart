import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { styleData, optionExamples } from 'mocks/storybook/mockData';
import Select from './Select';

const meta = {
  title: 'components/UI/Select',
  component: Select,
  args: {
    isClearable: true,
    isSearchable: true,
    hasExpandCollapseButton: true,
    onChange: fn(),
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

const longListOptions = optionExamples.withoutIcon.citiesLongList;
const shortListOptions = optionExamples.withoutIcon.citiesShortList;
const oneOptionFromLongList = optionExamples.withoutIcon.oneCityFromLongList;
const oneOptionFromShortList = optionExamples.withoutIcon.oneCityFromShortList;

export const Default: Story = {
  args: {
    placeholder: 'Select city',
    label: 'City',
    options: longListOptions,
  },
};

export const WithoutOptions: Story = {
  args: {
    placeholder: 'Select city',
    label: 'City',
  },
};

export const WithPriorityOptions: Story = {
  args: {
    placeholder: 'Select city',
    label: 'City',
    topOptions: [
      { label: 'Otepää', value: 'Otepää' },
      { label: 'Tallinn', value: 'Tallinn' },
      { label: 'Kehra', value: 'Kehra' },
    ],
    options: longListOptions,
  },
};

export const Preselected: Story = {
  args: {
    placeholder: 'Select city',
    label: 'City',
    initialValue: oneOptionFromLongList,
    topOptions: shortListOptions,
    options: longListOptions,
  },
};
