#!/usr/bin/env node
// Financial Empire Repo Auditor
// Usage: node scripts/audit-repo.mjs
import fs from "fs";
import path from "path";

const root = process.cwd();
const mustHave = [
  "docs/architecture.md",
  "docs/onboarding.md",
  "docs/api-contracts.md",
  "docs/SECURITY.md",
  "public/index.html",
  "public/manifest.json",
  "public/service-worker.js",
  "public/favicon.ico",
  "config/eslint.config.mjs",
  "config/prettier.config.cjs",
  "config/tailwind.config.cjs",
  "config/postcss.config.cjs",
  "config/vite.config.ts",
  "config/tsconfig.json",
  "infra/Dockerfile",
  "infra/docker-compose.yml",
  "infra/nginx.conf",
  ".github/workflows/ci.yml",
  ".github/workflows/build-deploy.yml",
  ".env.example",
  "package.json",
  "src/main.jsx",
  "src/App.jsx",
  "src/styles.css",
  "src/pwa/registerSW.js",
  "src/constants/symbols.js",
  "src/utils/http.ts",
  "src/services/featureFlags.ts",
  "src/services/telemetry.ts",
  "src/services/authClient.ts",
  "src/services/paymentsClient.ts",
  "src/contexts/AppContext.jsx",
  "src/contexts/AuthContext.jsx",
  "src/contexts/BotContext.jsx",
  "src/contexts/LMSContext.jsx",
  "src/contexts/MarketContext.jsx",
  "src/layout/AppShell.jsx",
  "src/pages/Home.jsx",
  "src/pages/Dashboard.jsx",
  "src/pages/Bots.jsx",
  "src/pages/Admin.jsx",
  "src/pages/Academy.jsx",
  "src/pages/CourseDetail.jsx",
  "src/pages/Wallet.jsx",
  "src/pages/TradeHistory.jsx",
  "src/pages/News.jsx",
  "src/pages/Settings.jsx",
  "src/pages/Login.jsx",
  "src/pages/Certificate.jsx",
  "src/pages/Pricing.jsx",
  "src/pages/Privacy.jsx",
  "src/pages/Terms.jsx",
  "src/pages/NotFound.jsx",
  "src/modules/auth",
  "src/modules/bots",
  "src/modules/lms",
  "src/modules/news",
  "src/modules/market",
  "src/modules/notifications",
  "src/modules/reporting",
  "src/modules/storage",
  "src/modules/monetization",
  "src/modules/pwa",
  "src/modules/security",
  "src/modules/ops-pack/bot-logic",
  "src/modules/ops-pack/bot-grading",
  "src/modules/ops-pack/exporting",
  "src/modules/ops-pack/growth-analytics",
  "src/modules/ops-pack/maintenance",
  "src/modules/ops-pack/market-data",
  "src/modules/ops-pack/performance-mode"
];

const pages = [
  "Home","Dashboard","Bots","Admin","Academy","CourseDetail","Wallet",
  "TradeHistory","News","Settings","Login","Certificate","Pricing","Privacy","Terms","NotFound"
];

const importRegex = /^\s*import\s+.*?from\s+['"]([^'"]+)['"];?/gm;
const exts = [".js",".jsx",".ts",".tsx",".mjs",".cjs"];

// small utils
const exists = p => fs.existsSync(path.join(root, p));
const walk = (dir) => {
  const out = [];
  for (const ent of fs.readdirSync(dir, {withFileTypes:true})) {
    if (ent.name.startsWith(".")) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
};
const resolveImport = (fromFile, spec) => {
  if (spec.startsWith("http")) return { ok:true, file:"(url)"};
  if (spec.startsWith("@") || spec.startsWith("#")) return { ok:true, file:"(alias?)"}; // skip aliases
  if (!spec.startsWith(".") && !spec.startsWith("/")) return { ok:true, file:`(pkg:${spec})`}; // pkg import
  const base = spec.startsWith(".") ? path.resolve(path.dirname(fromFile), spec) : path.resolve(root, spec);
  const candidates = [
    base, ...exts.map(e=>base+e),
    path.join(base,"index.js"),
    ...exts.map(e=>path.join(base,"index"+e))
  ];
  for (const c of candidates) if (fs.existsSync(c)) return {ok:true, file:c};
  return {ok:false, file:spec};
};

// gather files
const srcDir = path.join(root, "src");
const allFiles = exists("src") ? walk(srcDir) : [];
const jsLike = allFiles.filter(f => exts.some(e=>f.endsWith(e)));

// scan imports
const importIssues = [];
for (const f of jsLike) {
  const code = fs.readFileSync(f, "utf8");
  let m;
  while ((m = importRegex.exec(code)) !== null) {
    const spec = m[1];
    const r = resolveImport(f, spec);
    if (!r.ok) importIssues.push({ from: path.relative(root,f), spec, note: "Unresolved import" });
  }
}

// check routes (do pages exist and export default component?)
const routeIssues = [];
for (const p of pages) {
  const file = path.join(root, "src/pages", `${p}.jsx`);
  if (!fs.existsSync(file)) {
    routeIssues.push({ page:p, issue:"missing file" });
    continue;
  }
  const code = fs.readFileSync(file, "utf8");
  if (!/export\s+default\s+/m.test(code)) {
    routeIssues.push({ page:p, issue:"no default export" });
  }
}

// env & firebase basics
const envExample = exists(".env.example");
const usesFirebase = jsLike.some(f => /firebase\/app|firebase\/auth|firebase\/firestore/.test(fs.readFileSync(f,"utf8")));
const firebaseInitFile = jsLike.find(f => /firebaseConfig|initializeApp\(/.test(fs.readFileSync(f,"utf8"))) || null;

// PWA bits
const hasManifest = exists("public/manifest.json");
const hasSW = exists("public/service-worker.js") || jsLike.some(f => /service\s*-?\s*worker/i.test(fs.readFileSync(f,"utf8")));
const swRegistered = jsLike.some(f => /register\(.*ServiceWorker|registerSW\(/.test(fs.readFileSync(f,"utf8")));

// CI files
const hasCI = exists(".github/workflows/ci.yml");
const hasDeploy = exists(".github/workflows/build-deploy.yml");

// compare intended vs actual
const missing = mustHave.filter(p => !exists(p));

// package scripts
let scripts = {};
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(root,"package.json"),"utf8"));
  scripts = pkg.scripts || {};
} catch {}

// produce report
const reportDir = path.join(root,"audit");
fs.mkdirSync(reportDir, {recursive:true});
const out = {
  timestamp: new Date().toISOString(),
  summary: {
    missingRequiredItems: missing.length,
    unresolvedImports: importIssues.length,
    routeIssues: routeIssues.length,
    hasEnvExample: envExample,
    usesFirebase,
    firebaseInitFile: firebaseInitFile ? path.relative(root,firebaseInitFile) : null,
    pwa: { hasManifest, hasServiceWorker: hasSW, serviceWorkerRegistered: swRegistered },
    ci: { hasCI, hasDeploy },
    scripts
  },
  missing,
  unresolvedImports: importIssues,
  routeIssues
};
fs.writeFileSync(path.join(reportDir,"report.json"), JSON.stringify(out,null,2), "utf8");

// pretty markdown
const md = `# Financial Empire Audit

**When:** ${out.timestamp}

## Summary
- Missing required items: **${out.summary.missingRequiredItems}**
- Unresolved imports: **${out.summary.unresolvedImports}**
- Route/page issues: **${out.summary.routeIssues}**
- .env.example present: **${out.summary.hasEnvExample ? "yes" : "no"}**
- Firebase used: **${out.summary.usesFirebase ? "yes" : "no"}**
- Firebase init file: **${out.summary.firebaseInitFile ?? "not found"}**
- PWA: manifest=${out.summary.pwa.hasManifest ? "yes":"no"}, SW file=${out.summary.pwa.hasServiceWorker ? "yes":"no"}, registered=${out.summary.pwa.serviceWorkerRegistered ? "yes":"no"}
- CI: ci.yml=${out.summary.ci.hasCI ? "yes":"no"}, build-deploy.yml=${out.summary.ci.hasDeploy ? "yes":"no"}

### package.json scripts
\`\`\`json
${JSON.stringify(out.summary.scripts,null,2)}
\`\`\`

## Missing Required Items
${out.missing.length ? out.missing.map(m=>`- ${m}`).join("\n") : "_None_"}
  
## Unresolved Imports
${out.unresolvedImports.length ? out.unresolvedImports.slice(0,200).map(i=>`- ${i.from} ⟶ \`${i.spec}\``).join("\n") : "_None_"}
  
## Route Issues
${out.routeIssues.length ? out.routeIssues.map(r=>`- ${r.page}: ${r.issue}`).join("\n") : "_None_"}
  
---
## Finish-First Checklist (auto-generated)
1) **Make build green**: fix unresolved imports (${out.unresolvedImports.length}).
2) **Create/repair missing files** (${out.missing.length}) starting with: public/manifest.json, public/service-worker.js, config/vite.config.ts, .env.example, Firebase init.
3) **Routes**: ensure all pages export default components (${out.routeIssues.length} issues).
4) **PWA**: ensure SW is registered in \`src/pwa/registerSW.js\`.
5) **Firebase**: central \`firebase.ts\` (init app, Auth, Firestore). Add Firestore rules file & emulator configs.
6) **CI/CD**: add/repair \`.github/workflows/ci.yml\` and \`build-deploy.yml\`; run \`pnpm build\` in CI.
7) **Security**: include \`infra/nginx.conf\` CSP & security headers; reference in docs/SECURITY.md.
`;
fs.writeFileSync(path.join(reportDir,"report.md"), md, "utf8");
console.log("✅ Audit complete → see audit/report.md and audit/report.json");
