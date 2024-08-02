import clsx from 'clsx';
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
      isError,
      className,
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
        className={clsx(
          styles.inputBase,
          styles[`inputBase--paddingLeft-${paddingLeft}`],
          styles[`inputBase--paddingRight-${paddingRight}`],
          isReadOnlyMode && styles['inputBase--readOnlyMode'],
          className
        )}
        onChange={handleChangeIfAllowed}
        ref={ref}
        value={inputValue}
        aria-invalid={isError}
        aria-readonly={isReadOnlyMode}
        {...rest}
      />
    );
  }
);

export default InputBase;
