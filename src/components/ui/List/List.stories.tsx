import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import List from './List';

const meta = {
  title: 'components/UI/List',
  component: List,
  args: {
    onOptionSelect: fn(),
  },
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

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

export const Default: Story = {
  args: {
    options: estonianCitiesOptions,
  },
};
