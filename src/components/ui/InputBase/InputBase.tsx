import { useState, ChangeEvent } from 'react';
import classNames from 'classnames';
import styles from './InputBase.module.scss';
import { InputBaseProps } from './types';

function InputBase(props: InputBaseProps) {
  const {
    id,
    type = 'text',
    name,
    value = '',
    placeholder,
    onChange,
    onBlur,
    onFocus,
    required = false,
    disabled = false,
    readonly = false,
    className,
  } = props;

  const [currentValue, setCurrentValue] = useState(value);

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setCurrentValue(e.target.value);
    if (onChange) {
      onChange(currentValue);
    }
  }

  return (
    <input
      type={type}
      name={name}
      id={id}
      value={currentValue}
      placeholder={placeholder}
      onChange={onChangeHandler}
      onBlur={onBlur}
      onFocus={onFocus}
      className={classNames(styles.inputBase, className)}
      required={required}
      disabled={disabled}
      readOnly={readonly}
    />
  );
}

export default InputBase;
