import clsx from 'clsx';
import styles from './Spinner.module.scss';
import { SpinnerProps } from './types';

const Spinner = ({ variant = 'page' }: SpinnerProps) => {
  return (
    <div className={clsx(styles[`spinner`])}>
      <div className={clsx(styles.arc, styles.arc__big)}></div>
      <div className={clsx(styles.arc, styles.arc__middle)}></div>
      <div className={clsx(styles.arc, styles.arc__small)}></div>
    </div>
  );
};

export default Spinner;
