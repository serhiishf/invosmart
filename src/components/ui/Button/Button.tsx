import styles from './Button.module.scss';
import classNames from 'classnames';
import { ButtonProps } from './type';

function Button(props: ButtonProps) {
  const { children, height = 'm', width = 'fixed', onClick } = props;

  const heightClasses = {
    xs: 'buttonHeightXS',
    s: 'buttonHeightS',
    m: 'nuttonHeightM',
    l: 'buttonHeightL',
    xl: 'buttonHeightXL',
  };

  return (
    <button
      className={classNames(styles.button, styles[height], heightClasses[height])}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
