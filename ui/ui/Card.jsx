
import React from 'react';

export function Card({ children, className }) {
  return <div className={\`bg-white dark:bg-gray-800 rounded-lg shadow p-4 \${className || ''}\`}>{children}</div>;
}
export function CardHeader({ children, className }) {
  return <div className={\`mb-2 font-bold text-lg \${className || ''}\`}>{children}</div>;
}
export function CardBody({ children, className }) {
  return <div className={className}>{children}</div>;
}
export function CardFooter({ children, className }) {
  return <div className={\`mt-4 border-t pt-2 text-sm text-gray-500 \${className || ''}\`}>{children}</div>;
}
