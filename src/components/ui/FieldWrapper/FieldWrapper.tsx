import styles from './FieldWrapper.module.scss';
import classNames from 'classnames';
import { FieldWrapperProps } from './types';

function FieldWrapper(props: FieldWrapperProps) {
  const { label, children, error, focus, disabled } = props;
  return (
    <div className={styles.fieldWrapper}>
      {label && (
        <div
          className={classNames(
            styles.fieldLabel,
            error && styles.fieldLabel_error,
            focus && styles.fieldLabel_focus
          )}
        >
          {label}
        </div>
      )}
      <div
        className={classNames(
          styles.fieldBorderWrap,
          error && styles.fieldBorderWrap_error,
          focus && styles.fieldBorderWrap_focus,
          disabled && styles.fieldBorderWrap_disabled
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default FieldWrapper;
