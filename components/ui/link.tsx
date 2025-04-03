import { cn } from '@lib/utils';
import NextLink from 'next/link';
import { ReactNode } from 'react';

export const Link = ({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) => {
  const isExternal = href.startsWith('http');

  const styles = 'font-semibold underline hover:no-underline';

  return isExternal ? (
    <a href={href} target="_blank" className={cn(styles, className)}>
      {children}
    </a>
  ) : (
    <NextLink href={href} className={cn(styles, className)}>
      {children}
    </NextLink>
  );
};
