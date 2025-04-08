import { ReactNode } from 'react';
import { FC } from 'react';
import NextLink from 'next/link';

const Link: FC<{ href: string; children: ReactNode }> = ({ href, children }) => {
  const classes = 'flex size-full flex-col items-start p-4';
  const isExternal = href.startsWith('http');
  return isExternal ? (
    <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <NextLink href={href} className={classes}>
      {children}
    </NextLink>
  );
};

export const Card: FC<{
  title: string;
  href: string;
  subtitle?: string;
}> = ({ title, href, subtitle }) => {
  return (
    <div className="rounded border border-neutral-200 bg-neutral-50 transition-colors hover:bg-neutral-100/25 dark:border-neutral-800 dark:bg-neutral-900 hover:dark:bg-neutral-900/50">
      <Link href={href}>
        <span className="font-semibold">{title}</span>
        {subtitle && <span className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</span>}
      </Link>
    </div>
  );
};
