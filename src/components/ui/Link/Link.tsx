import styles from './Link.module.scss';
import { LinkProps } from './types';

function Link({ label, href, ...rest }: LinkProps) {
  return (
    <a href={href} className={styles.link} {...rest}>
      {label}
    </a>
  );
}

export default Link;
