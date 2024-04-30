import type { Preview } from '@storybook/react';
import React from 'react';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ fontFamily: 'sans-serif', color: '#333333' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
