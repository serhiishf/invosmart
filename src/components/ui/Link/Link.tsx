import styles from './Link.module.scss';
import { LinkProps } from './types';
import clsx from 'clsx';
import IconExternalLink from 'assets/icons/externalLink.svg?react';

const Link = ({
  href,
  target,
  isInternalLink = false,
  className,
  children,
  underline = 'hover',
  ...rest
}: LinkProps) => {
  return (
    <a
      href={href}
      className={clsx(styles.link, styles[`link--underline-${underline}`], className)}
      target={target}
      rel={target === '_blank' && !isInternalLink ? 'noopener noreferrer' : undefined}
      {...rest}
    >
      {children}
      {target === '_blank' && <span>{<IconExternalLink />}</span>}
    </a>
  );
};

export default Link;
