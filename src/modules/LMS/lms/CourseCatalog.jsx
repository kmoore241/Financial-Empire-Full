
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';

export default function CourseCatalog({ courses = [], onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {courses.map((course, idx) => (
        <Card key={idx}>
          <CardHeader>{course.title}</CardHeader>
          <CardContent>
            <p className="mb-2">{course.description}</p>
            <Button onClick={() => onSelect(course)}>View Course</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
