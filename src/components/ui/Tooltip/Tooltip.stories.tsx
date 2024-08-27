import { useRef, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { textExamples } from 'mocks/storybook/mockData';
import Tooltip from './Tooltip';
import { Button, IconButton } from 'components/ui';

const meta = {
  title: 'components/UI/Tooltip',
  component: Tooltip,
  args: {
    title: 'Tooltip',
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {};

const longText = textExamples.longText;

export const LongText: Story = {
  args: {
    title: longText,
  },

  render: (args) => (
    <Tooltip {...args}>
      <div></div>
    </Tooltip>
  ),
};

export const Buttons: Story = {
  args: {
    children: <Button isFullWidth={false}>Button</Button>,
    title: 'Tooltip message',
  },

  render: function Anonimous(args) {
    const buttonRef = useRef(null);
    useEffect(() => {
      console.log(buttonRef);
    });
    return (
      <div>
        <Tooltip {...args}>
          <Button isFullWidth={false} ref={buttonRef} onFocus={() => console.log('FOCUSS')}>
            Button
          </Button>
        </Tooltip>
        <Tooltip {...args}>
          <Button isFullWidth={true}>Button</Button>
        </Tooltip>
        <Tooltip {...args}>
          <>tesd</>
        </Tooltip>
        <div title="title" style={{ width: '50px', height: '50px', background: 'red' }}></div>
      </div>
    );
  },
};
