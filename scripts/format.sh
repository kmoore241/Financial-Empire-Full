#!/bin/bash
set -e

echo "🎨 Formatting code with Prettier and ESLint..."
npx prettier --write .
npx eslint --fix .

echo "✅ Formatting complete!"
