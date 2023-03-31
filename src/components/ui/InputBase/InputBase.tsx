import styles from './InputBase.module.scss';
import { InputBaseProps } from './types';

function InputBase(props: InputBaseProps) {
  const {
    id,
    type = 'text',
    name,
    value,
    placeholder,
    onChange,
    onBlur,
    onFocus,
    required = false,
    disabled = false,
    readonly = false,
  } = props;
  return (
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      className={styles.baseInput}
      required={required}
      disabled={disabled}
      readOnly={readonly}
    />
  );
}

export default InputBase;
