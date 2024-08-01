import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, within } from '@storybook/test';
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

export const WithOptionsKeyboardInteractions: Story = {
  args: {
    placeholder: 'Select city',
    label: 'City',
    options: longListOptions,
  },

  play: async () => {
    await userEvent.keyboard('{Tab}');
    await userEvent.keyboard('{Enter}');
  },
};

export const WithoutOptionsClickInteractions: Story = {
  args: {
    placeholder: 'Select city',
    label: 'City',
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');
    await userEvent.click(select);
  },
};

export const SuggestedOptionsToggleButtonInteractions: Story = {
  args: {
    placeholder: 'Select city',
    label: 'City',
    suggestedOptions: shortListOptions,
    options: longListOptions,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole('button');
    await userEvent.click(toggleButton);
  },
};

export const ClearableSelectInteractions: Story = {
  args: {
    placeholder: 'Select city',
    label: 'City',
    options: longListOptions,
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');
    await userEvent.click(select);
    await userEvent.type(select, 'kuress');
  },
};

export const WithoutOptions: Story = {
  args: {
    placeholder: 'Select city',
    label: 'City',
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
