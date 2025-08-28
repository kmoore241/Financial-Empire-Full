import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '@/components/ui/button';
// import { Plus } from 'lucide-react'; // optional icon demo

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { children: 'Click me' },
  argTypes: {
    variant: { control: 'select', options: ['default','secondary','destructive','ghost','link','outline'] },
    size: { control: 'select', options: ['default','sm','lg','icon'] },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const AsLink: Story = {
  render: () => (
    <Button asChild>
      <a href="#">Go</a>
    </Button>
  ),
};
// export const WithIcon: Story = {
//   render: () => (
//     <Button>
//       <Plus style={{ marginRight: 8 }} />
//       Add item
//     </Button>
//   ),
// };
