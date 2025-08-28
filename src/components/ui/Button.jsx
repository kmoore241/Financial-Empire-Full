// src/components/ui/Button.jsx
import React from 'react';

const Button = ({ variant = 'default', children, ...props }) => (
  <button className={`btn btn-${variant}`} {...props}>
    {children}
  </button>
);

export default Button;
