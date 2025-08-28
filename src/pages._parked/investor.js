import React from 'react';
import Layout from '@/components/Layout';
import InvestorSuite from '../modules/InvestorSuite';

/**
 * Investor Page
 * Wraps the Investor suite in the main Layout.
 */
export default function InvestorPage() {
  return (
    <Layout>
      <InvestorSuite />
    </Layout>
  );
}
