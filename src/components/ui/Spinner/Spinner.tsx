import clsx from 'clsx';
import styles from './Spinner.module.scss';
import { SpinnerProps } from './types';

const Spinner = ({ variant = 'page', className }: SpinnerProps) => {
  return (
    <div className={clsx(styles.spinner, styles[`spinner--${variant}`], className)}>
      {variant === 'page' && (
        <>
          <div className={clsx(styles.arc, styles[`arc--big`])}></div>
          <div className={clsx(styles.arc, styles[`arc--middle`])}></div>
          <div className={clsx(styles.arc, styles[`arc--small`])}></div>
        </>
      )}
      {variant === 'inline' && <div className={clsx(styles.arc, styles[`arc--inline`])}></div>}
    </div>
  );
};

export default Spinner;
