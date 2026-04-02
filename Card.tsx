import * as React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl bg-white p-6 shadow-sm border border-slate-100 transition-all',
          hover && 'hover:shadow-md hover:-translate-y-1',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export { Card };
