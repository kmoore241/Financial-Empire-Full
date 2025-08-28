import React from 'react';
import Layout from '@/components/Layout';
import PwaSuite from '../modules/PwaSuite';

/**
 * PWA Page
 * Wraps the PWA offline support suite in the main Layout.
 */
export default function PwaPage() {
  return (
    <Layout>
      <PwaSuite />
    </Layout>
  );
}
