import type { Meta, StoryObj } from '@storybook/react';
import { textExamples } from 'constants/storybookData';
import Tooltip from './Tooltip';

const meta = {
  title: 'components/UI/Tooltip',
  component: Tooltip,
  args: {
    tooltipMessage: 'Tooltip',
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {};

const longText = textExamples.longText;

export const LongText: Story = {
  args: {
    tooltipMessage: longText,
  },
};
