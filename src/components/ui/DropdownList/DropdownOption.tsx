import classNames from 'classnames';
import styles from './DropdownOption.module.scss';
import { DropdownOptionProps } from './types';
import IconCheckmark from '../../../assets/icons/checkmark.svg?react';

function DropdownOption(props: DropdownOptionProps) {
  const {
    label,
    icon,
    isSelected = false,
    color = 'greyBlue',
    backgroundPalette = 'onLightBackground',
    textOverflow = 'wrap',
    ...rest
  } = props;
  return (
    <li
      tabIndex={-1}
      className={classNames(
        styles.dropdownOption,
        isSelected && styles['dropdownOption--isSelected'],
        styles[`dropdownOption--color-${color}`],
        styles[`dropdownOption--backgroundPalette-${backgroundPalette}`]
      )}
      onClick={() => console.log('li click')}
      {...rest}
    >
      <div className={styles.dropdownOption__checkmarkContainer}>
        {isSelected && <IconCheckmark />}
      </div>
      <div className={styles.dropdownOption__contentContainer}>
        {icon && <div className={styles.dropdownOption__iconContainer}>{icon}</div>}
        <div
          className={classNames(
            styles.dropdownOption__label,
            styles[`dropdownOption__label--${textOverflow}`]
          )}
        >
          {label}
        </div>
      </div>
    </li>
  );
}

export default DropdownOption;
