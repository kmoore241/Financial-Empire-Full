# Financial Empire — Onboarding Guide

Welcome to Financial Empire!  
This document will help you get up and running as a developer, admin, or contributor to the project.  
Please read this fully before starting development or managing any part of the platform.

---

## Table of Contents

1. Project Overview
2. Tech Stack & Architecture
3. Local Setup & Installation
4. Environment Variables
5. Running the App
6. Common Tasks
7. Contribution Guidelines
8. Contact & Support

---

### 1. Project Overview

Financial Empire is a next-generation financial education and trading platform combining:
- AI-powered trading bots
- Interactive LMS with quizzes/certificates
- Live market data, wallet, admin panel, and more

> **Mission:** Empower everyone to master trading and financial independence, not just the elite.

---

### 2. Tech Stack & Architecture

- **Frontend:** React (Next.js), TypeScript, TailwindCSS, Framer Motion, Shadcn/UI
- **Backend/DB:** Firebase/Firestore (with optional serverless hooks)
- **Payments:** Stripe (subscriptions)
- **Deployment:** Vercel/Netlify (CI/CD via GitHub Actions)
- **Authentication:** Firebase Auth (with 2FA and tiered access)
- **Charts & Analytics:** Recharts, custom hooks

---

### 3. Local Setup & Installation

**1. Clone the repo:**
```bash
git clone https://github.com/[your-org]/financial-empire.git
cd financial-empire
```

**2. Install dependencies:**
```bash
npm install
# or
yarn install
```

**3. Set up your environment variables:**  
Copy `.env.example` to `.env` and update with your Firebase/Stripe/API keys.

---

### 4. Environment Variables

Edit `.env` (never commit secrets!):

```
NEXT_PUBLIC_FIREBASE_API_KEY=xxxxxxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxxxxx
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=xxxxxxx
FIREBASE_ADMIN_KEY=xxxxxxx
# ...other keys as needed
```

---

### 5. Running the App

**Start local dev server:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
npm start
```

---

### 6. Common Tasks

- **Running tests:**
  ```bash
  npm test
  ```
- **Linting:**
  ```bash
  npm run lint
  ```
- **CI/CD:**  
  All pushes to `main` trigger CI and deploy previews.

---

### 7. Contribution Guidelines

- Follow PR templates and commit style
- Use feature branches for all new work
- Review code for security, performance, and accessibility
- See `/docs/CONTRIBUTING.md` for full rules

---

### 8. Contact & Support

- **Lead Dev:** [Your Name/Handle]
- **Admin Email:** [support@yourdomain.com]
- **Slack/Discord:** [Invite link]

For urgent help, ping @lead or open a GitHub issue.
