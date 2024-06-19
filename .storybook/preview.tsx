import React from 'react';
import type { Preview } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <div style={{ fontFamily: 'sans-serif', color: '#0689c9' }}>
          <Story />
        </div>
      </I18nextProvider>
    ),
  ],
};

export default preview;
