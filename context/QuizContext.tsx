import React, { createContext, useContext, useState, ReactNode } from 'react';

type Question = {
  id: string;
  text: string;
  options: string[];
  answer: number; // index of correct option
};

type QuizState = {
  current: number;
  answers: number[];
  questions: Question[];
};

type QuizContextProps = {
  quiz: QuizState;
  selectAnswer: (option: number) => void;
  resetQuiz: () => void;
};

const defaultQuestions: Question[] = [
  {
    id: "q1",
    text: "What is an API?",
    options: ["A trading signal", "A data interface", "A crypto exchange", "A bot feature"],
    answer: 1,
  }
];

const initialQuiz: QuizState = {
  current: 0,
  answers: [],
  questions: defaultQuestions,
};

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quiz, setQuiz] = useState<QuizState>(initialQuiz);

  const selectAnswer = (option: number) => {
    setQuiz((prev) => ({
      ...prev,
      answers: [...prev.answers, option],
      current: prev.current + 1,
    }));
  };

  const resetQuiz = () => setQuiz(initialQuiz);

  return (
    <QuizContext.Provider value={{ quiz, selectAnswer, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) throw new Error("useQuiz must be used within a QuizProvider");
  return context;
};