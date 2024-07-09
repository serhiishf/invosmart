import { forwardRef, memo } from 'react';
import classNames from 'classnames';
import { TextOverflow } from 'constants/theme';
import IconCheckmark from 'assets/icons/checkmark.svg?react';
import styles from './ListItem.module.scss';
import { ListItemProps, ListItemTheme } from '../types';

const ListItem = forwardRef((props: ListItemProps, ref: React.Ref<HTMLLIElement>) => {
  const {
    label,
    icon,
    isFocused = false,
    isSelected = false,
    disabled = false,
    backgroundPalette = ListItemTheme.OnGreyBackground,
    textOverflow = TextOverflow.Wrap,
    onClick,
    ...rest
  }: ListItemProps = props;

  const handleOnClick = (event: React.MouseEvent<HTMLLIElement>) => {
    if (disabled || !onClick) return;
    onClick(event);
  };

  return (
    <li
      tabIndex={-1}
      className={classNames(
        styles.listItem,
        isSelected && styles['listItem--isSelected'],
        styles[`listItem--backgroundPalette-${backgroundPalette}`],
        isFocused && styles[`listItem--isFocused`],
        disabled && styles[`listItem--disabled`]
      )}
      onClick={handleOnClick}
      ref={ref}
      {...rest}
    >
      <div className={styles.listItem__checkmarkContainer}>{isSelected && <IconCheckmark />}</div>
      <div className={styles.listItem__contentContainer}>
        {icon && <div className={styles.listItem__iconContainer}>{icon}</div>}
        <div
          className={classNames(styles.listItem__label, styles[`listItem__label--${textOverflow}`])}
        >
          {label}
        </div>
      </div>
    </li>
  );
});

export default memo(ListItem);
