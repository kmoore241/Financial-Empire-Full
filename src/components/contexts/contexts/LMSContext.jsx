
import React from 'react';

const LMSCtx = React.createContext();
export function LMSProvider({ children }){
  const [progress, setProgress] = React.useState({});
  const [quizScores, setQuizScores] = React.useState({});

  return <LMSCtx.Provider value={{ progress, setProgress, quizScores, setQuizScores }}>{children}</LMSCtx.Provider>;
}
export function useLMS(){ return React.useContext(LMSCtx); }
