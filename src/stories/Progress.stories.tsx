import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Progress } from '@/components/ui/progress';

const meta: Meta<typeof Progress> = {
  title: 'UI/Progress',
  component: Progress,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { value: 40 },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress percentage (0–100)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const FortyPercent: Story = { args: { value: 40 } };
export const NinetyPercent: Story = { args: { value: 90 } };
