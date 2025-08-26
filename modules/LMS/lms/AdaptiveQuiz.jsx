
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';

export default function AdaptiveQuiz({ questions = [] }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (correct) => {
    if (correct) setScore(score + 1);
    setIndex(index + 1);
  };

  if (index >= questions.length) {
    return <p>Quiz complete. Score: {score} / {questions.length}</p>;
  }

  const q = questions[index];
  return (
    <Card>
      <CardHeader>{q.prompt}</CardHeader>
      <CardContent>
        {q.options.map((opt, i) => (
          <Button key={i} onClick={() => handleAnswer(opt.correct)} className="block w-full mb-2">
            {opt.text}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
