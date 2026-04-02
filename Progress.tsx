import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: 'primary' | 'secondary' | 'accent';
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, variant = 'primary', ...props }, ref) => {
    const percentage = Math.min(Math.max(0, (value / max) * 100), 100);

    const variants = {
      primary: 'bg-[#4A90E2]',
      secondary: 'bg-[#F5A623]',
      accent: 'bg-[#7ED321]',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative h-3 w-full overflow-hidden rounded-full bg-slate-100',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'h-full w-full flex-1 transition-all duration-500 ease-in-out',
            variants[variant]
          )}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export { Progress };
