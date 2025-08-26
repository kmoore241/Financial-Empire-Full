
# Pages (Financial Empire)

Drop the `pages` folder into `src/pages` and wire up routes with React Router v6.

## Included Pages
- `Home.jsx` — marketing-style landing
- `Dashboard.jsx` — user dashboard overview
- `Bots.jsx` — tabs for SafeBot / AggressiveBot / ManualBot
- `Admin.jsx` — wraps AdminLayout + AdminDashboard
- `Academy.jsx` — course catalog (cards) + progress
- `CourseDetail.jsx` — lesson view with placeholder video + AdaptiveQuiz slot
- `Wallet.jsx` — paper wallet balance + quick actions
- `TradeHistory.jsx` — pulls from bots localStorage trades
- `News.jsx` — placeholder list + search (plug real API later)
- `Settings.jsx` — theme + account preferences
- `Login.jsx` — mock login (AuthContext)
- `Certificate.jsx` — placeholder certificate preview
- `Pricing.jsx`, `Privacy.jsx`, `Terms.jsx`
- `NotFound.jsx`

## Example Router (App.jsx)
```jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Bots from "./pages/Bots";
import Admin from "./pages/Admin";
import Academy from "./pages/Academy";
import CourseDetail from "./pages/CourseDetail";
import Wallet from "./pages/Wallet";
import TradeHistory from "./pages/TradeHistory";
import News from "./pages/News";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Certificate from "./pages/Certificate";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```
