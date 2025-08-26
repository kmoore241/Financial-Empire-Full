
import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody } from './ui';

export default function Quiz({ questions = [] }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <Card>
        <CardHeader>Quiz Finished</CardHeader>
        <CardBody>Your score: {score} / {questions.length}</CardBody>
      </Card>
    );
  }

  const q = questions[index];

  return (
    <Card>
      <CardHeader>{q.prompt}</CardHeader>
      <CardBody>
        {q.options.map((opt, i) => (
          <Button key={i} onClick={() => handleAnswer(opt.correct)} className="block w-full mt-2">
            {opt.text}
          </Button>
        ))}
      </CardBody>
    </Card>
  );
}
