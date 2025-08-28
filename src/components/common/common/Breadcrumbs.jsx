
import React from 'react';
export default function Breadcrumbs({ items }){
  return (
    <nav className="text-sm">
      {items.map((it, idx) => (
        <span key={idx}>
          {idx>0 && ' / '}
          {it.href ? <a href={it.href} className="text-blue-600">{it.label}</a> : it.label}
        </span>
      ))}
    </nav>
  );
}
