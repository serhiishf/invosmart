import styles from './FieldWrapper.module.scss';
import classNames from 'classnames';
import { FieldWrapperProps } from './types';

function FieldWrapper({
  label,
  children,
  isError,
  isFocused,
  disabled,
  isHoverable,
  labelTargetId,
  helperText,
  helperTextPosition = 'left',
}: FieldWrapperProps) {
  return (
    <>
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
        <div
          className={classNames(
            styles.fieldWrapper__border,
            isError && styles['fieldWrapper__border--isError'],
            isFocused && styles['fieldWrapper__border--isFocused'],
            disabled && styles['fieldWrapper__border--disabled'],
            isHoverable && styles['fieldWrapper__border--isHoverable']
          )}
        >
          {children}
        </div>
      </div>
      {helperText && (
        <p
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
    </>
  );
}

export default FieldWrapper;
