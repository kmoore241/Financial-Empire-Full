import React from 'react';
import Layout from '@/components/Layout';
import CommunitySuite from '../modules/CommunitySuite';

/**
 * Community Page
 * Renders the community suite wrapped in the main Layout.
 */
export default function CommunityPage() {
  return (
    <Layout>
      <CommunitySuite />
    </Layout>
  );
}
