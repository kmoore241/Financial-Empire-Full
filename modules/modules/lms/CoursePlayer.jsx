
import React from 'react';
import AdaptiveQuiz from './AdaptiveQuiz';

/**
 * Basic player: lesson video placeholder + embedded adaptive quiz slot.
 */
export default function CoursePlayer({ courseId='drills', questions=[] }){
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800">
        <div className="h-60 rounded-lg bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-sm text-gray-500">
          Video placeholder for course "{courseId}"
        </div>
      </div>
      {questions.length>0 && (
        <AdaptiveQuiz questions={questions} />
      )}
    </div>
  );
}
