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
}: FieldWrapperProps) {
  return (
    <div className={styles.fieldWrapper}>
      {label && (
        <div
          className={classNames(
            styles.fieldWrapper__label,
            isError && styles['fieldWrapper__label--isError'],
            isFocused && styles['fieldWrapper__label--isFocused'],
            disabled && styles['fieldWrapper__label--disabled']
          )}
        >
          {label}
        </div>
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
  );
}

export default FieldWrapper;
