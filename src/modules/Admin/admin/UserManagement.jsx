
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';

export default function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Test User', role: 'user' },
    { id: 2, name: 'Admin User', role: 'admin' }
  ]);

  const toggleRole = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, role: u.role === 'user' ? 'admin' : 'user' } : u));
  };

  return (
    <Card>
      <CardHeader>User Management</CardHeader>
      <CardContent>
        <ul>
          {users.map(u => (
            <li key={u.id} className="flex justify-between items-center border-b py-2">
              <span>{u.name} - {u.role}</span>
              <Button onClick={() => toggleRole(u.id)}>Toggle Role</Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
