import classNames from 'classnames';
import styles from './DropdownItem.module.scss';
import { DropdownItemProps } from './types';
import IconCheckmark from '../../../assets/icons/checkmark.svg?react';

function DropdownItem(props: DropdownItemProps) {
  const {
    label,
    icon,
    isSelected,
    color = 'greyBlue',
    backgroundPalette = 'onGrayBackground',
    textOverflow = 'truncate',
    ...rest
  } = props;
  return (
    <li
      tabIndex={-1}
      className={classNames(
        styles.dropdownItem,
        isSelected && styles['dropdownItem--isSelected'],
        styles[`dropdownItem--color-${color}`],
        styles[`dropdownItem--backgroundPalette-${backgroundPalette}`]
      )}
      onClick={() => console.log('li click')}
      {...rest}
    >
      <div className={styles.dropdownItem__checkmarkContainer}>
        {isSelected && <IconCheckmark />}
      </div>
      <div className={styles.dropdownItem__contentContainer}>
        <div className={styles.dropdownItem__iconContainer}>{icon}</div>
        <div
          className={classNames(
            styles.dropdownItem__label,
            styles[`dropdownItem__label--${textOverflow}`]
          )}
        >
          {label}
        </div>
      </div>
    </li>
  );
}

export default DropdownItem;
