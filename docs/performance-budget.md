# Performance Budget

## Core Web Vitals Targets

### Desktop
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms  
- **CLS (Cumulative Layout Shift)**: < 0.1
- **TTI (Time to Interactive)**: < 3.5s
- **TBT (Total Blocking Time)**: < 200ms

### Mobile
- **LCP**: < 4s
- **FID**: < 100ms
- **CLS**: < 0.1
- **TTI**: < 5s
- **TBT**: < 300ms

## Bundle Size Limits

- **Initial JS Bundle**: < 200KB gzipped
- **Initial CSS**: < 50KB gzipped
- **Critical Path Resources**: < 250KB total
- **Image Assets**: Use WebP/AVIF, < 1MB per image

## Optimization Strategies

1. **Code Splitting**: Dynamic imports for heavy components
2. **Tree Shaking**: Remove unused code
3. **Image Optimization**: Next.js Image component with proper sizing
4. **Font Loading**: Preload critical fonts, fallback fonts
5. **Resource Hints**: Preconnect to external domains
6. **Service Worker**: Cache static assets and API responses

## Monitoring

- Lighthouse CI in GitHub Actions
- Real User Monitoring (RUM) in production
- Bundle analyzer reports on builds