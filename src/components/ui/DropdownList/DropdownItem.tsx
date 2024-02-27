import classNames from 'classnames';
import styles from './DropdownItem.module.scss';
import { DropdownItemProps } from './types';
import IconCheckmark from '../../../assets/icons/checkmark.svg?react';

function DropdownItem(props: DropdownItemProps) {
  const {
    label,
    value,
    icon,
    isSelected,
    color,
    backgroundPalette = 'onGrayBackground',
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
      data-value={value}
      onClick={() => console.log('li click')}
      {...rest}
    >
      <div className={styles.dropdownItem__checkmarkContainer}>
        {isSelected && <IconCheckmark />}
      </div>
      <div className={styles.dropdownItem__contentContainer}>
        {icon}
        <span>{label}</span>
      </div>
    </li>
  );
}

export default DropdownItem;
