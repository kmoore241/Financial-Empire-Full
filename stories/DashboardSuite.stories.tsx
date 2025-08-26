import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import DashboardSuite from '@/modules/DashboardSuite';

const meta: Meta<typeof DashboardSuite> = {
  title: 'Suites/DashboardSuite',
  component: DashboardSuite,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DashboardSuite>;

export const Default: Story = {};
