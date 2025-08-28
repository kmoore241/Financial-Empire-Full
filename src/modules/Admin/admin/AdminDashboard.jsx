
import React from 'react';
import UserManagement from './UserManagement';
import SystemBroadcast from './SystemBroadcast';
import AnalyticsOverview from './AnalyticsOverview';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function AdminDashboard() {
  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>Admin Dashboard</CardHeader>
        <CardContent>
          <AnalyticsOverview />
        </CardContent>
      </Card>
      <UserManagement />
      <SystemBroadcast />
    </div>
  );
}
