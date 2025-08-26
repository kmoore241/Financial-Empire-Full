// Quiz.jsx
import React, { useState } from "react";

const questions = [
  {
    question: "What does a 'stop-loss' order do?",
    options: ["Buys more on dip", "Locks in gains", "Limits losses", "Triggers margin call"],
    answer: "Limits losses",
  },
  {
    question: "What does DCA stand for in trading?",
    options: ["Daily Capital Allocation", "Direct Coin Accumulation", "Dollar-Cost Averaging", "Data-Chart Analysis"],
    answer: "Dollar-Cost Averaging",
  },
  {
    question: "Which of these is considered a stablecoin?",
    options: ["Bitcoin", "Ethereum", "Solana", "USDC"],
    answer: "USDC",
  },
];

function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (option) => {
    setSelected(option);
    if (option === questions[current].answer) setScore(score + 1);
    setTimeout(() => {
      setSelected(null);
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        setCompleted(true);
      }
    }, 800);
  };

  return (
    <div className="p-4 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Financial Literacy Quiz</h1>
      {!completed ? (
        <div>
          <p className="mb-2 font-medium">Question {current + 1} of {questions.length}</p>
          <p className="mb-4">{questions[current].question}</p>
          <div className="grid gap-3">
            {questions[current].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt)}
                className={\`p-2 rounded border transition-all \${selected === opt ? (opt === questions[current].answer ? 'bg-green-300' : 'bg-red-300') : 'hover:bg-gray-100'}\`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Quiz Complete ✅</h2>
          <p className="mt-2">Your Score: {score} / {questions.length}</p>
        </div>
      )}
    </div>
  );
}

export default Quiz;
