import React from 'react';
import Layout from '@/components/Layout';
import LmsSuite from '../modules/LmsSuite';

/**
 * LMS Page
 * Wraps the LMS suite in the main Layout.
 */
export default function LmsPage() {
  return (
    <Layout>
      <LmsSuite />
    </Layout>
  );
}
