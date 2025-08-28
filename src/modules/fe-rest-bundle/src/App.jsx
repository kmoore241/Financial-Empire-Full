
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './layout/AppShell';

// Pages (from your earlier pages pack)
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Bots from './pages/Bots';
import Admin from './pages/Admin';
import Academy from './pages/Academy';
import CourseDetail from './pages/CourseDetail';
import Wallet from './pages/Wallet';
import TradeHistory from './pages/TradeHistory';
import News from './pages/News';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Certificate from './pages/Certificate';
import Pricing from './pages/Pricing';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

// Demo
import DemoBotLab from './demo/DemoBotLab';

export default function AppRoutes(){
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="bots" element={<Bots />} />
          <Route path="admin" element={<Admin />} />
          <Route path="academy" element={<Academy />} />
          <Route path="academy/:id" element={<CourseDetail />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="trades" element={<TradeHistory />} />
          <Route path="news" element={<News />} />
          <Route path="settings" element={<Settings />} />
          <Route path="login" element={<Login />} />
          <Route path="certificate" element={<Certificate />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="demo/bot-lab" element={<DemoBotLab />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
