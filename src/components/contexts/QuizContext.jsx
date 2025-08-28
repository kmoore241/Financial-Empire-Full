// src/contexts/QuizContext.jsx
import React, { createContext, useState, useContext } from 'react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  return (
    <QuizContext.Provider value={{ score, setScore, completed, setCompleted }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
