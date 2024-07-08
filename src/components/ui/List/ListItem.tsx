import { forwardRef, memo } from 'react';
import classNames from 'classnames';
import { TextOverflow } from 'constants/theme';
import IconCheckmark from '../../../assets/icons/checkmark.svg?react';
import styles from './ListItem.module.scss';
import { ListItemProps, ListItemTheme } from './types';

const ListItem = forwardRef((props: ListItemProps, ref: React.Ref<HTMLLIElement>) => {
  const {
    label,
    value,
    icon,
    isFocused = false,
    isSelected = false,
    backgroundPalette = ListItemTheme.OnGreyBackground,
    textOverflow = TextOverflow.Wrap,
    ...rest
  }: ListItemProps = props;

  const handleOnClick = () => {
    console.log('ListItem click');
  };

  return (
    <li
      tabIndex={-1}
      className={classNames(
        styles.listItem,
        isSelected && styles['listItem--isSelected'],
        styles[`listItem--backgroundPalette-${backgroundPalette}`],
        isFocused && styles[`listItem--backgroundPalette-${backgroundPalette}-isFocused`]
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
