import styles from './FieldWrapper.module.scss';
import classNames from 'classnames';
import { FieldWrapperProps } from './types';

function FieldWrapper(props: FieldWrapperProps) {
  const { label, children, error, focus, disabled, readonly } = props;
  return (
    <div className={styles.fieldWrapper}>
      {label && (
        <div
          className={classNames(
            styles.fieldWrapper__label,
            error && styles['fieldWrapper__label--error'],
            focus && styles['fieldWrapper__label--focus'],
            disabled && styles['fieldWrapper__label--disabled'],
            readonly && styles['fieldWrapper__label--readonly']
          )}
        >
          {label}
        </div>
      )}
      <div
        className={classNames(
          styles.fieldWrapper__border,
          error && styles['fieldWrapper__border--error'],
          focus && styles['fieldWrapper__border--focus'],
          disabled && styles['fieldWrapper__border--disabled'],
          readonly && styles['fieldWrapper__border--readonly']
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default FieldWrapper;
