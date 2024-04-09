import styles from './FieldWrapper.module.scss';
import classNames from 'classnames';
import { FieldWrapperProps } from './types';

function FieldWrapper(props: FieldWrapperProps) {
  const {
    label,
    children,
    isError,
    isFocused,
    disabled,
    readOnly,
    isHoverable,
  }: FieldWrapperProps = props;
  return (
    <div className={styles.fieldWrapper}>
      {label && (
        <div
          className={classNames(
            styles.fieldWrapper__label,
            isError && styles['fieldWrapper__label--isError'],
            isFocused && styles['fieldWrapper__label--isFocused'],
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
          isError && styles['fieldWrapper__border--isError'],
          isFocused && styles['fieldWrapper__border--isFocused'],
          disabled && styles['fieldWrapper__border--disabled'],
          readOnly && styles['fieldWrapper__border--readOnly'],
          isHoverable && styles['fieldWrapper__border--isHoverable']
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default FieldWrapper;
