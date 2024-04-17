import Placeholder from 'assets/icons/placeholder.svg?react';

const icons = {
  Placeholder,
};

export const iconSelectConfig = {
  options: ['none', ...Object.keys(icons)],
  mapping: {
    none: undefined,
    ...icons,
  },
  control: {
    type: 'select',
  },
};
