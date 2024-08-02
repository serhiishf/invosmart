import { forwardRef, memo } from 'react';
import clsx from 'clsx';
import { TextOverflow } from 'constants/theme';
import IconCheckmark from 'assets/icons/checkmark.svg?react';
import styles from './SelectListItem.module.scss';
import { SelectListItemProps } from './types';

const SelectListItem = forwardRef((props: SelectListItemProps, ref: React.Ref<HTMLLIElement>) => {
  const {
    label,
    icon,
    isFocused = false,
    isSelected = false,
    disabled = false,
    backgroundPalette = 'onGreyBackground',
    textOverflow = TextOverflow.Wrap,
    onClick,
    ...rest
  }: SelectListItemProps = props;

  const handleOnClick = (event: React.MouseEvent<HTMLLIElement>) => {
    if (disabled || !onClick) return;
    onClick(event);
  };

  return (
    <li
      tabIndex={-1}
      className={clsx(
        styles.selectListItem,
        isSelected && styles['selectListItem--isSelected'],
        styles[`selectListItem--backgroundPalette-${backgroundPalette}`],
        isFocused && styles[`selectListItem--isFocused`],
        disabled && styles[`selectListItem--disabled`]
      )}
      onClick={handleOnClick}
      ref={ref}
      {...rest}
    >
      <div className={styles.selectListItem__checkmarkContainer}>
        {isSelected && <IconCheckmark />}
      </div>
      <div className={styles.selectListItem__contentContainer}>
        {icon}
        <div
          className={clsx(
            styles.selectListItem__label,
            styles[`selectListItem__label--${textOverflow}`]
          )}
        >
          {label}
        </div>
      </div>
    </li>
  );
});

export default memo(SelectListItem);
