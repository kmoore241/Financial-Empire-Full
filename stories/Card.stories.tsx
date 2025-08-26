import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// If you have these available in your Card export, you can also import:
// import { CardDescription, CardFooter } from '@/components/ui/card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: () => (
    <Card style={{ maxWidth: 420 }}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
    </Card>
  ),
};

// Uncomment if your Card exports these helpers
// export const WithDescription: Story = {
//   render: () => (
//     <Card style={{ maxWidth: 420 }}>
//       <CardHeader>
//         <CardTitle>Card Title</CardTitle>
//         <CardDescription>Optional description text.</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <p>Card with description.</p>
//       </CardContent>
//       <CardFooter>Footer actions</CardFooter>
//     </Card>
//   ),
// };
