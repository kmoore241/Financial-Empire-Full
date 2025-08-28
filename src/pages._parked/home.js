import React from 'react';
import Layout from '@/components/Layout';
import HomeSuite from '../modules/HomeSuite';

/**
 * Home Page
 * Wraps the Home suite in the main Layout.
 */
export default function HomePage() {
  return (
    <Layout>
      <HomeSuite />
    </Layout>
  );
}
