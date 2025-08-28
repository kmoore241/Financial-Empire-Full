import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Layout from '@/components/Layout';
// Only if Layout touches routing:
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof Layout> = {
  title: 'Layout/Layout',
  component: Layout,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  render: () => (
    <MemoryRouter>
      <Layout>
        <div style={{ padding: 24 }}>
          <h1>Layout Preview</h1>
          <p>This is what typical content looks like inside the app layout.</p>
        </div>
      </Layout>
    </MemoryRouter>
  ),
};
