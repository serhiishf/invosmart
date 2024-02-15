import styles from './FieldWrapper.module.scss';
import classNames from 'classnames';
import { FieldWrapperProps } from './types';

function FieldWrapper(props: FieldWrapperProps) {
  const { label, children, error, focus, disabled, readOnly } = props;
  return (
    <div className={styles.fieldWrapper}>
      {label && (
        <div
          className={classNames(
            styles.fieldWrapper__label,
            error && styles['fieldWrapper__label--error'],
            focus && styles['fieldWrapper__label--focus'],
            disabled && styles['fieldWrapper__label--disabled'],
            readOnly && styles['fieldWrapper__label--readOnly']
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
          readOnly && styles['fieldWrapper__border--readOnly']
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default FieldWrapper;
