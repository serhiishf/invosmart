import classNames from 'classnames';
import { forwardRef, useState, useEffect } from 'react';
import styles from './InputBase.module.scss';
import { InputBaseProps } from './types';
import { PaddingInput } from 'constants/theme';

const InputBase = (props: InputBaseProps, ref: React.Ref<HTMLInputElement>) => {
  const {
    paddingLeft = PaddingInput.Default,
    paddingRight = PaddingInput.Default,
    isReadOnlyMode,
    value = '',
    onChange,
    ...rest
  } = props;

  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChangeIfAllowed = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange || isReadOnlyMode) return;
    setInputValue(event.target.value);
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
};

export default forwardRef(InputBase);
