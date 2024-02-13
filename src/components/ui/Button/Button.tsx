import styles from './Button.module.scss';
import classNames from 'classnames';
import { ButtonProps } from './type';
import { MouseEvent } from 'react';
import { Tooltip } from '../index';

function Button(props: ButtonProps) {
  const {
    children,
    size = 'm',
    isFullWidth,
    isDisabled,
    onClick,
    tooltipMessage,
    borderColor,
    color = 'white',
    backgroundPalette = 'primary',
  } = props;

  const sizeClasses = {
    xs: 'buttonSizeXS',
    s: 'buttonSizeS',
    m: 'buttonSizeM',
    l: 'buttonSizeL',
    xl: 'buttonSizeXL',
  };
  const borderColorClasses = {
    primary: 'borderColorPrimary',
    positive: 'borderColorPositive',
    negative: 'borderColorNegative',
    neutral: 'borderColorNeutral',
  };
  const colorClasses = {
    primary: 'colorPrimary',
    white: 'colorWhite',
    dark: 'colorDark',
    positive: 'colorPositive',
    negative: 'colorNegative',
  };
  const backgroundPaletteClasses = {
    primary: 'backgroundColorPrimary',
    secondary: 'backgroundColorSecondary',
    transparentSecondary: 'backgroundColorTransparentSecondary',
    transparentPositive: 'backgroundColorTransparentPositive',
    transparentNegative: 'backgroundColorTransparentNegative',
    transparentNeutral: 'backgroundColorTransparentNeutral',
    positive: 'backgroundColorPositive',
    negative: 'backgroundColorNegative',
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
        styles[colorClasses[color]],
        styles[backgroundPaletteClasses[backgroundPalette]],
        borderColor && styles[borderColorClasses[borderColor]],
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
