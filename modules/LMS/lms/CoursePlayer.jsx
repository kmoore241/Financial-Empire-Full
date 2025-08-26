
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function CoursePlayer({ course }) {
  if (!course) {
    return <p>Select a course to start learning.</p>;
  }

  return (
    <Card>
      <CardHeader>{course.title}</CardHeader>
      <CardContent>
        <p>{course.content}</p>
        {/* In production, embed videos, charts, and interactive modules */}
      </CardContent>
    </Card>
  );
}
