import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent } from '@storybook/test';
import { styleData, optionExamples } from 'constants/storybookData';
import { useState } from 'react';
import SelectList from './SelectList';

const longListOptions = optionExamples.withoutIcon.citiesLongList;
const shortListOptions = optionExamples.withoutIcon.citiesShortList;
const oneOptionFromLongList = optionExamples.withoutIcon.oneCityFromLongList;
const oneOptionFromShortList = optionExamples.withoutIcon.oneCityFromShortList;

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

export const Preselected: Story = {
  args: {
    topOptions: shortListOptions,
    selectedOption: oneOptionFromLongList,
  },
};

export const PreselectedWithTopOptions: Story = {
  args: {
    selectedOption: oneOptionFromShortList,
    topOptions: shortListOptions,
  },
};

export const WithChildren: Story = {
  args: {
    selectedOption: oneOptionFromShortList,
    topOptions: shortListOptions,
    children: <button style={styleData.button}>Some children - button</button>,
  },
};

export const NavigationThroughProps: Story = {
  args: {
    selectedOption: oneOptionFromShortList,
    topOptions: shortListOptions,
    children: <button style={styleData.button}>Some children - button</button>,
  },
  render: function NavigationThroughPropsComponent(args) {
    const [keyEvent, setKeyEvent] = useState({ key: '', timeStamp: 0 });

    const handleKeyEvent = (key: string) => {
      setKeyEvent({
        key,
        timeStamp: Date.now(),
      });
    };

    return (
      <div style={styleData.flexColumn}>
        <button style={styleData.button} onClick={() => handleKeyEvent('ArrowUp')}>
          ArrowUp
        </button>
        <button style={styleData.button} onClick={() => handleKeyEvent('ArrowDown')}>
          ArrowDown
        </button>
        <h4>Props passed - keyEvent:</h4>
        <div>
          {keyEvent ? `key: ${keyEvent.key}, timeStamp: ${keyEvent.timeStamp}` : 'undefined'}
        </div>
        <SelectList {...args} keyEvent={keyEvent} />
      </div>
    );
  },
};

export const NavigationThroughPropsInput: Story = {
  args: {
    selectedOption: oneOptionFromShortList,
    topOptions: shortListOptions,
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
          placeholder="Type here or press keys..."
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
