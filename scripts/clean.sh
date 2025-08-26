#!/bin/bash
set -e

echo "🧹 Cleaning build artifacts..."

rm -rf .next dist out coverage

echo "✅ Clean complete!"
