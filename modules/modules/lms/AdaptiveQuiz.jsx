
import React from 'react';
import Quiz from '../../Quiz';

/**
 * Minimal wrapper for the root-level Quiz component that can adapt difficulty
 * by reordering or filtering the questions array (placeholder).
 */
export default function AdaptiveQuiz({ questions=[] }){
  const [qs] = React.useState(questions);
  return <Quiz questions={qs} />;
}
