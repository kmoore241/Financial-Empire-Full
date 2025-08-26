#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# For Vercel:
npx vercel --prod

# For Netlify (uncomment if using Netlify instead):
# npx netlify deploy --prod --dir=out

echo "✅ Deployment complete!"
