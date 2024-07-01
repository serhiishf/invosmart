import styles from './Link.module.scss';
import { LinkProps } from './types';
import classNames from 'classnames';

const Link = ({ label, href, target, isInternalLink = false, className, ...rest }: LinkProps) => {
  return (
    <a
      href={href}
      className={classNames(styles.link, className)}
      target={target}
      rel={target === '_blank' && !isInternalLink ? 'noopener noreferrer' : undefined}
      {...rest}
    >
      {label}
    </a>
  );
};

export default Link;
