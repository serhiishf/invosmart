import classNames from 'classnames';
import { forwardRef } from 'react';
import styles from './InputBase.module.scss';
import { InputBaseProps } from './types';

const InputBase = (props: InputBaseProps, ref: React.Ref<HTMLInputElement>) => {
  const {
    paddingLeft = 'primary',
    paddingRight = 'primary',
    isReadOnlyMode,
    onChange,
    ...rest
  } = props;

  const handleChangeIfAllowed = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange || isReadOnlyMode) return;
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
      {...rest}
    />
  );
};

export default forwardRef(InputBase);
