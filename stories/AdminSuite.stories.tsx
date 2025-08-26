import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import AdminSuite from '@/modules/AdminSuite';

const meta: Meta<typeof AdminSuite> = {
  title: 'Suites/AdminSuite',
  component: AdminSuite,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AdminSuite>;
export const Default: Story = {};
