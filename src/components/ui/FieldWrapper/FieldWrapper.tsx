import styles from './FieldWrapper.module.scss';
import classNames from 'classnames';
import { FieldWrapperProps } from './types';

const FieldWrapper = ({
  label,
  children,
  isError,
  isFocused,
  disabled,
  isHoverable,
  labelTargetId,
  helperText,
  helperTextPosition = 'left',
  helperTextId,
  className,
}: FieldWrapperProps) => {
  return (
    <div className={classNames(className)}>
      <div className={styles.fieldWrapper}>
        {label && (
          <label
            htmlFor={labelTargetId}
            className={classNames(
              styles.fieldWrapper__label,
              isError && styles['fieldWrapper__label--isError'],
              isFocused && styles['fieldWrapper__label--isFocused'],
              disabled && styles['fieldWrapper__label--disabled']
            )}
          >
            {label}
          </label>
        )}
        <div className={styles.fieldWrapper__main}>{children}</div>
        <fieldset
          className={classNames(
            styles.fieldWrapper__fieldset,
            isError && styles['fieldWrapper__fieldset--isError'],
            isFocused && styles['fieldWrapper__fieldset--isFocused'],
            disabled && styles['fieldWrapper__fieldset--disabled'],
            isHoverable && styles['fieldWrapper__fieldset--isHoverable']
          )}
        >
          <legend
            className={classNames(
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
          className={classNames(
            styles.helperText,
            isError && styles['helperText--isError'],
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
