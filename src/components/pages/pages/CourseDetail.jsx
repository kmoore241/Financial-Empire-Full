
import React from 'react';
import { useRouter } from 'next/router';
import { SupportResistanceDrill, MACrossoverDrill, RSIMACDDrill, VolumeBreakoutDrill, SmartMoneyDrill } from '@/components/drills/drills';

export default function CourseDetail(){
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Course: {id}</h2>
        <div className="text-sm text-gray-500">Lesson demo</div>
      </div>

      {id==='drills' ? (
        <div className="space-y-6">
          <SupportResistanceDrill />
          <MACrossoverDrill />
          <RSIMACDDrill />
          <VolumeBreakoutDrill />
          <SmartMoneyDrill />
        </div>
      ) : (
        <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800">
          <div className="h-64 rounded-lg bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-sm text-gray-500">
            Placeholder content for "{id}" — plug in your video + quiz.
          </div>
        </div>
      )}
    </div>
  );
}
