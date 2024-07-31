import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, within } from '@storybook/test';
import { styleData, optionExamples } from 'mocks/storybook/mockData';
import { useState } from 'react';
import SelectList from './SelectList';

const longListOptions = optionExamples.withoutIcon.citiesLongList;
const shortListOptions = optionExamples.withoutIcon.citiesShortList;
const oneOptionFromLongList = optionExamples.withoutIcon.oneCityFromLongList;
const oneOptionFromShortList = optionExamples.withoutIcon.oneCityFromShortList;
const optionsWithIcons = optionExamples.withIcon.allCountries;
const suggestedOptionsWithIcons = optionExamples.withIcon.suggestedCountries;
const oneOptionWithIcon = optionExamples.withIcon.oneCountry;

const meta = {
  title: 'components/UI/SelectList',
  component: SelectList,
  args: {
    onOptionSelect: fn(),
    options: longListOptions,
  },
} satisfies Meta<typeof SelectList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SuggestedOptions: Story = {
  args: {
    suggestedOptions: shortListOptions,
  },
};

export const Preselected: Story = {
  args: {
    suggestedOptions: shortListOptions,
    selectedOption: oneOptionFromLongList,
  },
};

export const WithChildren: Story = {
  args: {
    selectedOption: oneOptionFromShortList,
    suggestedOptions: shortListOptions,
    children: <button style={styleData.button}>Button - example children</button>,
  },
};

export const NoOptions: Story = {
  args: {
    options: undefined,
  },
};

export const NoOptionsCustomMessage: Story = {
  args: {
    options: undefined,
    noOptionsMessage: 'No options - message through props',
  },
};

export const OptionsWithIcon: Story = {
  args: {
    options: optionsWithIcons,
    suggestedOptions: suggestedOptionsWithIcons,
    selectedOption: oneOptionWithIcon,
  },
};

export const NavigationThroughProps: Story = {
  args: {
    selectedOption: oneOptionFromShortList,
    suggestedOptions: shortListOptions,
    children: <button style={styleData.button}>Some children - button</button>,
  },
  render: function NavigationThroughPropsComponent(args) {
    const [keyEvent, setKeyEvent] = useState<{ key: string; timeStamp: number }>({
      key: '',
      timeStamp: 0,
    });

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      setKeyEvent({
        key: event.key,
        timeStamp: event.timeStamp,
      });
    };

    return (
      <div style={styleData.flexColumn}>
        <input
          type="text"
          placeholder="Type or press arrow/enter keys here..."
          onKeyDown={handleKeyDown}
          style={{ marginBottom: '10px', padding: '5px', border: '1px solid #ccc' }}
        />
        <h4>Props passed - keyEvent:</h4>
        <div>
          {keyEvent ? `key: ${keyEvent.key}, timeStamp: ${keyEvent.timeStamp}` : 'undefined'}
        </div>
        <SelectList {...args} keyEvent={keyEvent} />
      </div>
    );
  },
};

export const NavigationThroughPropsInteractions: Story = {
  args: {
    selectedOption: oneOptionFromShortList,
    suggestedOptions: shortListOptions,
    children: <button style={styleData.button}>Some children - button</button>,
  },
  render: function NavigationThroughPropsComponent(args) {
    const [keyEvent, setKeyEvent] = useState<{ key: string; timeStamp: number }>({
      key: '',
      timeStamp: 0,
    });

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      setKeyEvent({
        key: event.key,
        timeStamp: event.timeStamp,
      });
    };

    return (
      <div style={styleData.flexColumn}>
        <input
          type="text"
          placeholder="Type or press arrow/enter keys here..."
          onKeyDown={handleKeyDown}
          style={{ marginBottom: '10px', padding: '5px', border: '1px solid #ccc' }}
          data-testid="input-props-keyEvent"
        />
        <h4>Props passed - keyEvent:</h4>
        <div>
          {keyEvent ? `key: ${keyEvent.key}, timeStamp: ${keyEvent.timeStamp}` : 'undefined'}
        </div>
        <SelectList {...args} keyEvent={keyEvent} />
      </div>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputPropsKeyEvent = canvas.getByTestId('input-props-keyEvent');
    await userEvent.click(inputPropsKeyEvent);
    await userEvent.type(inputPropsKeyEvent, 'kuress');
    await userEvent.keyboard('{ArrowDown}');
    await new Promise((resolve) => setTimeout(resolve, 1100));
    await userEvent.type(inputPropsKeyEvent, 'elv');
    await userEvent.keyboard('{ArrowUp}');
  },
};
