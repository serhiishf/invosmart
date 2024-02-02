import styles from './FieldWrapper.module.scss';
import classNames from 'classnames';
import { FieldWrapperProps } from './types';

function FieldWrapper(props: FieldWrapperProps) {
  const { label, children, error, focus, disabled, readonly } = props;
  console.log(error);
  return (
    <div className={styles.fieldWrapper}>
      {label && (
        <div
          className={classNames(
            styles.fieldLabel,
            error && styles.fieldLabel_error,
            focus && styles.fieldLabel_focus,
            disabled && styles.fieldLabel_disabled,
            readonly && styles.fieldLabel_readOnly
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
          disabled && styles.fieldBorderWrap_disabled,
          readonly && styles.fieldBorderWrap_readOnly
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default FieldWrapper;
