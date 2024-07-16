import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, within } from '@storybook/test';
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

export const NavigationInteractions: Story = {
  args: {
    isFocusable: true,
    selectedOption: oneOptionFromShortList,
    topOptions: shortListOptions,
  },

  render: (args) => <SelectList {...args} data-testid="select-list" />,

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectList = canvas.getByTestId('select-list');
    await userEvent.click(selectList);
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}');
    await userEvent.keyboard('{ArrowUp}');
  },
};

export const NavigationInteractionsWithChild: Story = {
  args: {
    isFocusable: true,
    selectedOption: oneOptionFromShortList,
    topOptions: shortListOptions,
    children: <button style={styleData.button}>Some children - button</button>,
  },

  render: (args) => <SelectList {...args} data-testid="select-list" />,

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectList = canvas.getByTestId('select-list');
    await userEvent.click(selectList);
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}');
    await userEvent.keyboard('{ArrowUp}');
  },
};

export const NavigationThroughProps: Story = {
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
