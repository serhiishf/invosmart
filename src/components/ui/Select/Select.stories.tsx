import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, within, expect } from '@storybook/test';
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

export const OptionsKeyboardInteractions: Story = {
  args: {
    placeholder: 'Select city',
    label: 'City',
    options: longListOptions,
  },

  play: async () => {
    await userEvent.keyboard('{Tab}');
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');
  },
};

export const NoOptionsClickInteractions: Story = {
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

export const SuggestedOptionsAndToggleButtonInteractions: Story = {
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

export const IsLoadingAndNoOptions: Story = {
  args: {
    placeholder: 'Select city',
    label: 'City',
    isLoading: true,
  },
};

export const IsLoadingAndOptions: Story = {
  args: {
    placeholder: 'Select city',
    label: 'City',
    options: longListOptions,
    isLoading: true,
  },
};

export const IsLoadingAndOptionsPreselected: Story = {
  args: {
    placeholder: 'Select city',
    label: 'City',
    options: longListOptions,
    isLoading: true,
    initialOption: oneOptionFromLongList,
  },
};

export const IsLoadingAndOptionsInteractions: Story = {
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

export const OptionsWithIconsPreselected: Story = {
  args: {
    placeholder: 'Select country',
    label: 'Country',
    initialOption: oneOptionWithIcon,
    suggestedOptions: suggestedOptionsWithIcons,
    options: optionsWithIcons,
  },
};

export const OptionsWithIconsPreselectedInteractions: Story = {
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = await canvas.getByRole('combobox');

    await userEvent.keyboard('{Tab}');
    await userEvent.keyboard('{Tab}');
    await userEvent.keyboard('{Tab}');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    await userEvent.keyboard('{Enter}');
    expect(combobox).toHaveAttribute('aria-expanded', 'true');
  },
};
