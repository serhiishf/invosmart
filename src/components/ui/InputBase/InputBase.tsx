import classNames from 'classnames';
import { forwardRef, useState, useEffect } from 'react';
import styles from './InputBase.module.scss';
import { InputBaseProps } from './types';

const InputBase = forwardRef<HTMLInputElement, InputBaseProps>(
  (
    {
      paddingLeft = 'default',
      paddingRight = 'default',
      isReadOnlyMode = false,
      value,
      onChange,
      ...rest
    }: InputBaseProps,
    ref
  ) => {
    const [inputValue, setInputValue] = useState(value ?? '');

    useEffect(() => {
      setInputValue(value ?? '');
    }, [value]);

    const handleChangeIfAllowed = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isReadOnlyMode) return;
      setInputValue(event.target.value);
      if (!onChange) return;
      onChange(event);
    };

    return (
      <input
        className={classNames(
          styles.inputBase,
          styles[`inputBase--paddingLeft-${paddingLeft}`],
          styles[`inputBase--paddingRight-${paddingRight}`],
          isReadOnlyMode && styles['inputBase--readOnlyMode']
        )}
        onChange={handleChangeIfAllowed}
        ref={ref}
        value={inputValue}
        {...rest}
      />
    );
  }
);

export default InputBase;
