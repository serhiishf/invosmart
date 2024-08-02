import styles from './FieldWrapper.module.scss';
import clsx from 'clsx';
import { FieldWrapperProps } from './types';

const FieldWrapper = ({
  label,
  children,
  isError,
  isFocused,
  disabled,
  labelTargetId,
  helperText,
  helperTextPosition = 'left',
  helperTextId,
  className,
}: FieldWrapperProps) => {
  return (
    <div className={clsx(className)}>
      <div className={styles.fieldWrapper}>
        {label && (
          <label
            htmlFor={labelTargetId}
            className={clsx(
              styles.fieldWrapper__label,
              isError && styles['fieldWrapper__label--isError'],
              isFocused && styles['fieldWrapper__label--isFocused'],
              disabled && styles['fieldWrapper__label--disabled']
            )}
          >
            {label}
          </label>
        )}
        <div
          className={clsx(
            styles.fieldWrapper__main,
            disabled && styles['fieldWrapper__main--disabled']
          )}
        >
          {children}
        </div>
        <fieldset
          className={clsx(
            styles.fieldWrapper__fieldset,
            isError && !disabled && styles['fieldWrapper__fieldset--isError'],
            isFocused && !disabled && styles['fieldWrapper__fieldset--isFocused'],
            disabled && styles['fieldWrapper__fieldset--disabled']
          )}
        >
          <legend
            className={clsx(
              styles.fieldWrapper__legend,
              !label && styles['fieldWrapper__legend--hidden']
            )}
          >
            <span className={styles['fieldWrapper__legend-span']}>{label}</span>
          </legend>
        </fieldset>
      </div>
      {helperText && (
        <p
          id={helperTextId}
          className={clsx(
            styles.helperText,
            isError && !disabled && styles['helperText--isError'],
            helperTextPosition === 'left' && styles['helperText--left'],
            helperTextPosition === 'right' && styles['helperText--right']
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default FieldWrapper;
