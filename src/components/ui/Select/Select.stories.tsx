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

const {
  withoutIcon: {
    citiesLongList: longListOptions,
    citiesShortList: shortListOptions,
    oneCityFromLongList: oneOptionFromLongList,
    personsWithDetails: OptionsWithDetails,
  },
  withIcon: {
    allCountries: optionsWithIcons,
    suggestedCountries: suggestedOptionsWithIcons,
    oneCountry: oneOptionWithIcon,
  },
} = optionExamples;

export const Default: Story = {
  args: {
    placeholder: 'Select city',
    label: 'City',
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

export const DetailedOptionsInteractions: Story = {
  args: {
    label: 'Customer',
    placeholder: 'Select customer',
    options: OptionsWithDetails,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');
    await userEvent.click(select);
  },
};

export const PreselectedInteractions: Story = {
  args: {
    placeholder: 'Select city',
    label: 'City',
    initialOption: oneOptionFromLongList,
    suggestedOptions: shortListOptions,
    options: longListOptions,
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');
    await userEvent.click(select);
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
    await userEvent.keyboard('{Tab}');
    await userEvent.keyboard('{Enter}');
    await userEvent.type(select, 'kehr');
  },
};

export const IsLoadingWithoutOptions: Story = {
  args: {
    placeholder: 'Select city',
    label: 'City',
    isLoading: true,
  },
};

export const IsLoadingWithOptions: Story = {
  args: {
    placeholder: 'Select city',
    label: 'City',
    options: longListOptions,
    isLoading: true,
  },
};

export const IsLoadingWithOptionsPreselected: Story = {
  args: {
    placeholder: 'Select city',
    label: 'City',
    options: longListOptions,
    isLoading: true,
    initialOption: oneOptionFromLongList,
  },
};

export const IsLoadingWithOptionsInteractions: Story = {
  args: {
    placeholder: 'Select city',
    label: 'City',
    options: longListOptions,
    isLoading: true,
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');
    await userEvent.type(select, 'random text');
  },
};

export const ClickOutsideInteractions: Story = {
  args: {
    placeholder: 'Select city',
    label: 'City',
    options: longListOptions,
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');
    await userEvent.type(select, 'Kehr');
    await userEvent.click(document.body);
  },
};

export const ClickOutsidePreselectedInteractions: Story = {
  args: {
    placeholder: 'Select city',
    label: 'City',
    options: longListOptions,
    initialOption: oneOptionFromLongList,
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');
    await userEvent.type(select, 'Kehr');
    await userEvent.click(document.body);
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

export const OptionsWithIconsInteractions: Story = {
  args: {
    placeholder: 'Select country',
    label: 'Country',
    initialOption: oneOptionWithIcon,
    suggestedOptions: suggestedOptionsWithIcons,
    options: optionsWithIcons,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');
    await userEvent.click(select);
  },
};

export const ToggleButtonKeyboardInteractions: Story = {
  args: {
    placeholder: 'Select country',
    label: 'Country',
    initialOption: oneOptionWithIcon,
    suggestedOptions: suggestedOptionsWithIcons,
    options: optionsWithIcons,
  },
  play: async () => {
    await userEvent.keyboard('{Tab}');
    await userEvent.keyboard('{Tab}');
    await userEvent.keyboard('{Enter}');
  },
};
