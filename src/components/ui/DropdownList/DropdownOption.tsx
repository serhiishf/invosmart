import { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './DropdownOption.module.scss';
import { DropdownOptionProps } from './types';
import IconCheckmark from '../../../assets/icons/checkmark.svg?react';

function DropdownOption(props: DropdownOptionProps, ref: React.Ref<HTMLLIElement>) {
  const {
    label,
    icon,
    isSelected = false,
    color = 'greyBlue',
    backgroundPalette = 'onLightBackground',
    textOverflow = 'wrap',
    isFocused = false,
    ...rest
  } = props;

  return (
    <li
      tabIndex={-1}
      className={classNames(
        styles.dropdownOption,
        isSelected && styles['dropdownOption--isSelected'],
        styles[`dropdownOption--color-${color}`],
        styles[`dropdownOption--backgroundPalette-${backgroundPalette}`],
        isFocused && styles[`dropdownOption--backgroundPalette-${backgroundPalette}-isFocused`]
      )}
      ref={ref}
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

export default forwardRef(DropdownOption);
