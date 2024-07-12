import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, within } from '@storybook/test';
import { styleData } from 'constants/storybookData';
import { useState } from 'react';
import SelectList from './SelectList';

const estonianCitiesOptions = [
  { label: 'Tallinn', value: 'Tallinn' },
  { label: 'Tartu', value: 'Tartu' },
  { label: 'Narva', value: 'Narva' },
  { label: 'Pärnu', value: 'Pärnu' },
  { label: 'Kohtla-Järve', value: 'Kohtla-Järve' },
  { label: 'Viljandi', value: 'Viljandi' },
  { label: 'Rakvere', value: 'Rakvere' },
  { label: 'Sillamäe', value: 'Sillamäe' },
  { label: 'Maardu', value: 'Maardu' },
  { label: 'Kuressaare', value: 'Kuressaare' },
  { label: 'Võru', value: 'Võru' },
  { label: 'Valga', value: 'Valga' },
  { label: 'Jõhvi', value: 'Jõhvi' },
  { label: 'Haapsalu', value: 'Haapsalu' },
  { label: 'Paide', value: 'Paide' },
  { label: 'Keila', value: 'Keila' },
  { label: 'Kiviõli', value: 'Kiviõli' },
  { label: 'Türi', value: 'Türi' },
  { label: 'Elva', value: 'Elva' },
  { label: 'Saue', value: 'Saue' },
  { label: 'Põlva', value: 'Põlva' },
  { label: 'Tõrva', value: 'Tõrva' },
  { label: 'Paldiski', value: 'Paldiski' },
  { label: 'Laagri', value: 'Laagri' },
  { label: 'Rapla', value: 'Rapla' },
  { label: 'Jõgeva', value: 'Jõgeva' },
  { label: 'Saku', value: 'Saku' },
  { label: 'Mustvee', value: 'Mustvee' },
  { label: 'Otepää', value: 'Otepää' },
  { label: 'Kehra', value: 'Kehra' },
];

const meta = {
  title: 'components/UI/SelectList',
  component: SelectList,
  args: {
    onOptionSelect: fn(),
    options: estonianCitiesOptions,
  },
} satisfies Meta<typeof SelectList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NavigationInteractions: Story = {
  args: {
    isFocusable: true,
  },

  render: (args) => <SelectList {...args} data-testid="select-list" />,

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectList = canvas.getByTestId('select-list');
    await userEvent.click(selectList);
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}');
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
