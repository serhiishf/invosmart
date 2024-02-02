import { useState, ChangeEvent } from 'react';
import classNames from 'classnames';
import styles from './InputBase.module.scss';
import { InputBaseProps, PaddingSizeInputBase } from './types';

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
    paddingLeft = PaddingSizeInputBase.default,
    paddingRight = PaddingSizeInputBase.default,
  } = props;

  const [currentValue, setCurrentValue] = useState(value);

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setCurrentValue(e.target.value);
    onChange(currentValue);
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
