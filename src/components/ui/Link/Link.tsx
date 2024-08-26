import styles from './Link.module.scss';
import { LinkProps } from './types';
import clsx from 'clsx';
import IconExternalLink from 'assets/icons/externalLink.svg?react';

const Link = ({
  href,
  target,
  className,
  children,
  underline = 'hover',
  rel,
  ...rest
}: LinkProps) => {
  const safeRel = rel ? rel : 'noopener noreferrer';
  return (
    <a
      href={href}
      className={clsx(styles.link, styles[`link--underline-${underline}`], className)}
      target={target}
      rel={(target === '_blank' && safeRel) || rel}
      {...rest}
    >
      {children}
      {target === '_blank' && <IconExternalLink />}
    </a>
  );
};

export default Link;
