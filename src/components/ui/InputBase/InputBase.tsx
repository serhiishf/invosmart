import classNames from 'classnames';
import styles from './InputBase.module.scss';
import { InputBaseProps } from './types';

function InputBase(props: InputBaseProps) {
  const { paddingLeft = 'primary', paddingRight = 'primary', ...rest } = props;

  return (
    <input
      className={classNames(
        styles.inputBase,
        styles[`inputBase--paddingLeft-${paddingLeft}`],
        styles[`inputBase--paddingRight-${paddingRight}`]
      )}
      {...rest}
    />
  );
}

export default InputBase;
