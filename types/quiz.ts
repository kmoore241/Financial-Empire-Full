// types/quiz.ts

export type QuizOption = string | number;

/** A single multiple-choice quiz question. */
export interface QuizQuestion {
  id: string;
  question: string;
  options: readonly QuizOption[];        // readonly avoids accidental mutation
  correctOption: QuizOption;             // compared by value
  explanation?: string;
  category?: string;                     // optional metadata
  difficulty?: 'easy' | 'medium' | 'hard';
}

/** A user's answer entry. */
export interface QuizAnswer {
  questionId: string;
  answer: QuizOption;
  correct: boolean;
}

/** Optional: aggregate result shape you might store/display */
export interface QuizResult {
  total: number;
  correct: number;
  answers: QuizAnswer[];
}
