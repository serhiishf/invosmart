import { forwardRef, memo } from 'react';
import classNames from 'classnames';
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
      className={classNames(
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
        {icon && <div className={styles.selectListItem__iconContainer}>{icon}</div>}
        <div
          className={classNames(
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
