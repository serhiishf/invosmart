import styles from './Button.module.scss';
import classNames from 'classnames';
import { ButtonProps } from './type';
import { MouseEvent } from 'react';
import { Tooltip } from '../index';

function Button(props: ButtonProps) {
  const { children, size = 'l', isFullWidth = false, onClick, tooltipMessage } = props;

  const sizeClasses = {
    xs: 'buttonSizeXS',
    s: 'buttonSizeS',
    m: 'buttonSizeM',
    l: 'buttonSizeL',
    xl: 'buttonSizeXL',
  };

  const onClickHandler = (event: MouseEvent) => {
    event.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={classNames(
        styles.button,
        styles[sizeClasses[size]],
        isFullWidth && styles.fullWidthMode
      )}
      onClick={onClickHandler}
    >
      {children}
      <>{tooltipMessage && <Tooltip tooltipMessage={tooltipMessage} />}</>
    </button>
  );
}

export default Button;
