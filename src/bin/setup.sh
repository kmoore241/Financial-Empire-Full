#!/bin/bash
set -e

echo "🔧 Bootstrapping local dev environment..."

echo "Installing Node.js dependencies..."
npm install

echo "Copying .env.example to .env (if missing)..."
if [ ! -f .env ]; then
  cp .env.example .env
  echo "✅ .env file created!"
else
  echo "⚠️  .env already exists, skipping."
fi

echo "Running database setup (if using Firebase/Firestore)..."
# Add any DB bootstrap commands here

echo "✅ Setup complete! Run 'npm run dev' to start your app."
