
import React from 'react';

export default function ThemeProvider({ children, defaultTheme='light' }){
  React.useEffect(()=>{
    const root = document.documentElement;
    if(defaultTheme==='dark') root.classList.add('dark');
  },[defaultTheme]);
  return <>{children}</>;
}
