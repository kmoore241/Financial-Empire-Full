#!/bin/bash
set -e

echo "🔨 Installing dependencies..."
npm install

echo "🏗️ Building the project..."
npm run build

echo "✅ Build complete!"
