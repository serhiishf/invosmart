import React from 'react';
import styles from './FieldWrapper.module.scss';
import classNames from 'classnames';
import { FieldWrapperProps } from './types';

function FieldWrapper(props: FieldWrapperProps) {
  const { label, children, error, active, onFocus, onBlur, setError } = props;
  return (
    <div className={styles.fieldWrapper}>
      {label && (
        <div
          className={classNames(
            styles.fieldLabel,
            error && styles.fieldLabel_error,
            active && styles.fieldLabel_focus
          )}
        >
          {label}
        </div>
      )}
      <div
        className={classNames(
          styles.fieldBorder,
          error && styles.fieldBorder_error,
          active && styles.fieldBorder_focus
        )}
      >
        {children && React.cloneElement(children, { onFocus, onBlur, setError })}
      </div>
    </div>
  );
}

export default FieldWrapper;
