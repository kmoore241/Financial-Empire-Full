
# Admin Components (Financial Empire)

Drop this `components/admin` folder into your project's `src/components/admin` (or adjust imports).
All components are plain React with Tailwind classes (no external UI kit paths).

## What's inside
- `AdminLayout.jsx` — Frame (Sidebar + Topbar + Content)
- `AdminDashboard.jsx` — Tabbed dashboard composing all admin panels
- `AdminSidebar.jsx`, `AdminTopbar.jsx` — Navigation + actions
- `KpiCard.jsx` — Reusable metric card
- `BroadcastNotice.jsx` — System-wide banner/notices
- `ComplaintMonitor.jsx` — User complaint inbox
- `BugFeedbackTable.jsx` — Bug/feedback tracker with status
- `GrowthTracker.jsx` — Growth milestones + cost timeline
- `ScaleHeatmap.jsx` — Visual heatmap of module impact
- `AccessControl.jsx` — Roles, whitelist, tiered access
- `CouponCodes.jsx` — Placeholder coupon management
- `MaintenanceMode.jsx` — Toggle maintenance mode + schedule
- `SecuritySettings.jsx` — 2FA/Biometrics/Session settings (mock hooks)
- `SystemHealth.jsx` — Service pings + uptime panel
- `AuditLog.jsx` — Action log
- `storage.js` — Local storage helpers
- `index.js` — Barrel exports

## Assumptions
- TailwindCSS is configured.
- `lucide-react` and `framer-motion` are installed (icons + subtle animation).
  If not, install:
  ```bash
  npm i lucide-react framer-motion
  ```

## Quick use
```jsx
import { AdminLayout, AdminDashboard } from "./components/admin";

export default function AdminPage() {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
}
```

## Notes
- Data is persisted to `localStorage` keys under `fe:admin:*`.
- Replace mock data/API stubs when wiring to Firestore or your backend.
