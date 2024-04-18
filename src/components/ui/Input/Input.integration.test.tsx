import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('Input', () => {
  describe('default Initialization', () => {
    it('should match the snapshot with default props', () => {
      const { asFragment } = render(<Input />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('initialization with props', () => {
    it('default', () => {});
  });
});
