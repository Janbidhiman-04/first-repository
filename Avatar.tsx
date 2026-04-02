import * as React from 'react';
import { cn } from '../../lib/utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = 'md', ...props }, ref) => {
    const [error, setError] = React.useState(false);

    const sizes = {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-16 w-16 text-xl',
      xl: 'h-24 w-24 text-2xl',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex shrink-0 overflow-hidden rounded-full bg-slate-100 border-2 border-white shadow-sm',
          sizes[size],
          className
        )}
        {...props}
      >
        {src && !error ? (
          <img
            src={src}
            alt={alt}
            onError={() => setError(true)}
            referrerPolicy="no-referrer"
            className="aspect-square h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-bold text-slate-500 uppercase">
            {fallback || alt?.charAt(0) || '?'}
          </div>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };
