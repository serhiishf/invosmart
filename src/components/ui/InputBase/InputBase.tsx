import { InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './InputBase.module.scss';

function InputBase(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props;

  return <input className={classNames(styles.inputBase, className)} {...rest} />;
}

export default InputBase;
