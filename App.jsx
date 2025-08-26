import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/ui/theme-provider';
import Dashboard from './components/Dashboard.jsx';
import SafeBot from './components/SafeBot.jsx';
import AggressiveBot from './components/AggressiveBot.jsx';
import ManualBot from './components/ManualBot.jsx';
import RevenueCharts from './components/RevenueCharts.jsx';
import ConfidenceScore from './components/ConfidenceScore.jsx';
import QuizPage from './components/QuizPage.jsx';
import CertificatePage from './components/CertificatePage.jsx';
import SettingsPage from './components/SettingsPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import WalletPage from './components/WalletPage.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import MaintenancePage from './components/MaintenancePage.jsx';
import AuthProvider from './components/AuthProvider.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import NotFound from './components/NotFound.jsx';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/safe-bot" element={<SafeBot />} />
            <Route path="/aggressive-bot" element={<AggressiveBot />} />
            <Route path="/manual-bot" element={<ManualBot />} />
            <Route path="/revenue" element={<RevenueCharts />} />
            <Route path="/confidence" element={<ConfidenceScore />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/certificate" element={<CertificatePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/maintenance" element={<MaintenancePage />} />
            <Route path="/admin" element={<RequireAuth><AdminPanel /></RequireAuth>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
