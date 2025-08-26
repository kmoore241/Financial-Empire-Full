
import React from 'react';
export function Tabs({ children }){
  const [active, setActive] = React.useState(0);
  return (
    <div>
      {React.Children.map(children, (child, idx) =>
        React.cloneElement(child, { active, setActive, idx })
      )}
    </div>
  );
}
export function TabList({ children, active, setActive }){
  return (
    <div className="flex border-b border-gray-200 dark:border-gray-800">
      {React.Children.map(children, (child, idx) =>
        React.cloneElement(child, { active, setActive, idx })
      )}
    </div>
  );
}
export function Tab({ children, idx, active, setActive }){
  return (
    <button onClick={()=>setActive(idx)} className={`px-4 py-2 -mb-px ${active===idx?'border-b-2 border-gray-900 dark:border-white':''}`}>
      {children}
    </button>
  );
}
export function TabPanel({ children, idx, active }){
  if(idx!==active) return null;
  return <div className="p-4">{children}</div>;
}
export default Tabs;
