#!/bin/bash
# Node Version Helper for mercer-portfolio
# Run: source ./node-version.sh

echo "Checking Node.js version..."

NODE_VERSION=$(node -v 2>/dev/null)
REQUIRED_MAJOR=20

if [ -z "$NODE_VERSION" ]; then
    echo "❌ Node.js is not installed."
    echo "   Install from: https://nodejs.org/ (LTS recommended)"
    return 1
fi

CURRENT_MAJOR=$(echo $NODE_VERSION | cut -d'v' -f2 | cut -d'.' -f1)

if [ "$CURRENT_MAJOR" -lt "$REQUIRED_MAJOR" ]; then
    echo "⚠️  Node.js $NODE_VERSION is too old."
    echo "   This project requires Node.js 20+"
    echo ""
    echo "Options:"
    echo "  1. Install nvm:     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash"
    echo "  2. Install Node 20: nvm install 20"
    echo "  3. Use Node 20:     nvm use 20"
    echo ""
    echo "Or download directly: https://nodejs.org/dist/v20.11.0/"
    return 1
else
    echo "✅ Node.js $NODE_VERSION is compatible."
    return 0
fi
