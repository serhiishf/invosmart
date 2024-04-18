import Placeholder from 'assets/icons/placeholder.svg?react';
import Settings from 'assets/icons/settings.svg?react';
import Search from 'assets/icons/search.svg?react';

const icons = {
  Placeholder,
  Settings,
  Search,
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
