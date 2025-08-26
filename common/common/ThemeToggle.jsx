
import React from 'react';
export default function ThemeToggle(){
  const [dark, setDark] = React.useState(() => document.documentElement.classList.contains('dark'));
  const toggle = () => {
    const root = document.documentElement;
    if(root.classList.contains('dark')){ root.classList.remove('dark'); setDark(false); }
    else { root.classList.add('dark'); setDark(true); }
  };
  return (
    <button onClick={toggle} className="p-2 border rounded-lg">{dark?'🌞':'🌙'}</button>
  );
}
