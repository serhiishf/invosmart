import classNames from 'classnames';
import { forwardRef } from 'react';
import styles from './InputBase.module.scss';
import { InputBaseProps } from './types';

const InputBase = (props: InputBaseProps, ref: React.Ref<HTMLInputElement>) => {
  const { paddingLeft = 'primary', paddingRight = 'primary', isReadOnlyMode, ...rest } = props;

  return (
    <input
      className={classNames(
        styles.inputBase,
        styles[`inputBase--paddingLeft-${paddingLeft}`],
        styles[`inputBase--paddingRight-${paddingRight}`],
        isReadOnlyMode && styles['inputBase--readOnlyMode']
      )}
      onKeyDown={(event) => isReadOnlyMode && event.preventDefault()}
      ref={ref}
      {...rest}
    />
  );
};

export default forwardRef(InputBase);
