import React from 'react';
import clsx from 'clsx';

type Props = React.PropsWithChildren<{ className?: string }>;
export function Card({ className, children }: Props) {
  return <div className={clsx('rounded-2xl border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900', className)}>{children}</div>;
}
export function CardTitle({ children }: React.PropsWithChildren) {
  return <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">{children}</div>;
}
