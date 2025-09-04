import * as React from 'react';
type Props = React.HTMLAttributes<HTMLDivElement>;
export function Card({ className = '', ...props }: Props) {
  return (
    <div
      className={
        'rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 ' +
        className
      }
      {...props}
    />
  );
}
