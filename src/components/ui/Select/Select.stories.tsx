import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { optionExamples } from 'mocks/storybook/mockData';
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
const optionsWithIcons = optionExamples.withIcon.allCountries;
const suggestedOptionsWithIcons = optionExamples.withIcon.suggestedCountries;
const oneOptionWithIcon = optionExamples.withIcon.oneCountry;

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

export const SuggestedOptions: Story = {
  args: {
    placeholder: 'Select city',
    label: 'City',
    suggestedOptions: [
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
    initialOption: oneOptionFromLongList,
    suggestedOptions: shortListOptions,
    options: longListOptions,
  },
};

export const OptionsWithIcons: Story = {
  args: {
    placeholder: 'Select country',
    label: 'Country',
    initialOption: oneOptionWithIcon,
    suggestedOptions: suggestedOptionsWithIcons,
    options: optionsWithIcons,
  },
};
