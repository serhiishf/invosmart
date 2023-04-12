import classNames from 'classnames';
import styles from './InputBase.module.scss';
import { InputBaseProps, PaddingSizeInputBase } from './types';

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
    paddingLeft = PaddingSizeInputBase.default,
    paddingRight = PaddingSizeInputBase.default,
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
      className={classNames(
        styles.baseInput,
        styles[`paddingLeft_${paddingLeft}`],
        styles[`paddingRight_${paddingRight}`]
      )}
      required={required}
      disabled={disabled}
      readOnly={readonly}
    />
  );
}

export default InputBase;
