# Financial Empire Runbook

## Quick Start

```bash
# Setup
nvm use                    # Use Node 20
npm ci                     # Install dependencies
cp .env.example .env.local # Configure environment

# Development
npm run dev               # Start development server
npm run typecheck        # Check TypeScript
npm run lint             # Run ESLint
npm run format           # Format code with Prettier

# Production
npm run build            # Build for production
npm run start            # Start production server
npm test                 # Run test suite
```

## Environment Setup

### Required Environment Variables
```bash
# App Configuration
NEXT_PUBLIC_SITE_NAME=Financial Empire
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_ALLOW_GUEST=true
NEXT_PUBLIC_ENABLE_PWA=true

# Auth (optional)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# External Services (optional)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

### Feature Flags
- `NEXT_PUBLIC_ALLOW_GUEST=true` - Enables guest mode (recommended)
- `NEXT_PUBLIC_ENABLE_PWA=true` - Enables PWA features
- `NODE_ENV=production` - Production optimizations

## Common Commands

### Development Workflow
```bash
# Start fresh development environment
npm run dev -- --port 3001  # Custom port
npm run dev -- --turbo      # Turbo mode (faster)

# Code quality checks
npm run lint:fix            # Auto-fix linting issues
npm run typecheck:watch     # Watch mode TypeScript
```

### Build & Deploy
```bash
# Local production testing
npm run build && npm run start
open http://localhost:3000

# Health check
curl -sS http://localhost:3000/api/health

# Bundle analysis
npx @next/bundle-analyzer
```

### Troubleshooting

#### Build Issues
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules
rm -rf node_modules && npm ci

# Check for TypeScript errors
npm run typecheck
```

#### Runtime Issues
```bash
# Check logs
npm run dev 2>&1 | tee debug.log

# Disable strict mode temporarily
# In next.config.js: reactStrictMode: false

# Check environment variables
env | grep NEXT_PUBLIC
```

#### Performance Issues
```bash
# Bundle analysis
ANALYZE=true npm run build

# Lighthouse audit
npx lighthouse http://localhost:3000 --view

# Performance profiling
npm run dev -- --experimental-profiling
```

## Monitoring & Health Checks

### Health Endpoints
- `GET /api/health` - Application health status
- `GET /_next/static/chunks/webpack-*.js` - Asset availability

### Key Metrics
- **Load Time**: < 3s first load
- **Bundle Size**: < 200KB initial JS
- **Lighthouse**: 95+ across all categories
- **Error Rate**: < 0.1% client errors

### Alerts to Monitor
- Build failures in CI/CD
- 5xx errors from health endpoint
- High client-side error rates
- Performance degradation trends

## Security

### Headers Validation
```bash
# Check security headers
curl -I https://your-domain.com | grep -E "(X-Frame|X-Content|Strict-Transport)"
```

### Content Security Policy
- Default: `default-src 'self'`
- Scripts: `script-src 'self' 'unsafe-eval' 'unsafe-inline'`
- Styles: `style-src 'self' 'unsafe-inline'`

### Authentication
- Guest mode enabled by default
- Protected routes use `GuestGuard` component
- No blocking auth overlays

## Performance Optimization

### Bundle Optimization
```bash
# Analyze bundle
npm run build:analyze

# Check unused dependencies
npx depcheck

# Update dependencies
npm run deps:update
```

### Caching Strategy
- Static assets: 1 year cache
- API responses: 5 minutes cache
- Service worker: Network-first for pages

## Common Issues

### "Module not found" Errors
1. Check import paths use `@/` alias
2. Verify file extensions (.tsx, .ts)
3. Check case sensitivity on imports

### PWA Not Installing
1. Verify `NEXT_PUBLIC_ENABLE_PWA=true`
2. Check manifest.json validity
3. Ensure HTTPS in production
4. Check service worker registration

### Performance Issues
1. Check bundle size with analyzer
2. Verify dynamic imports for heavy components
3. Optimize images with Next.js Image component
4. Review Core Web Vitals in DevTools

### Build Failures
1. Run `npm run typecheck` for TypeScript errors
2. Check `npm run lint` for code quality issues
3. Verify environment variables are set
4. Clear `.next` cache and rebuild

## Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Environment variables
vercel env add NEXT_PUBLIC_SITE_NAME
```

### Environment-Specific Configs
- **Development**: Hot reload, source maps, verbose errors
- **Staging**: Production build, development analytics
- **Production**: Minified, optimized, error tracking

## Support

### Debug Mode
```bash
# Enable debug logs
DEBUG=* npm run dev

# TypeScript compiler options
npx tsc --showConfig
```

### Getting Help
1. Check console for error messages
2. Review error boundary logs
3. Check network tab for failed requests
4. Verify environment configuration

For additional support, review the codebase documentation and error logs.