import styles from './Link.module.scss';
import { LinkProps } from './types';

function Link(props: LinkProps) {
  const { children, href, ...rest }: LinkProps = props;
  return (
    <a href={href} className={styles.link} {...rest}>
      {children}
    </a>
  );
}

export default Link;
