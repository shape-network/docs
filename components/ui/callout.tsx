import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { Info } from 'lucide-react';

type CalloutProps = {
  children: ReactNode;
  className?: string;
};

export function Callout({ children, className, ...props }: CalloutProps) {
  return (
    <div className={cn('my-6 p-4 border rounded-lg', className)} {...props}>
      <div className="flex gap-3 items-center">
        <Info className="w-4 h-4 " />
        <div>{children}</div>
      </div>
    </div>
  );
}
