import classNames from 'classnames';
import { forwardRef } from 'react';
import styles from './InputBase.module.scss';
import { InputBaseProps } from './types';

function InputBase(props: InputBaseProps, ref: React.Ref<HTMLInputElement>) {
  const { paddingLeft = 'primary', paddingRight = 'primary', ...rest } = props;

  return (
    <input
      className={classNames(
        styles.inputBase,
        styles[`inputBase--paddingLeft-${paddingLeft}`],
        styles[`inputBase--paddingRight-${paddingRight}`]
      )}
      ref={ref}
      {...rest}
    />
  );
}

export default forwardRef(InputBase);
