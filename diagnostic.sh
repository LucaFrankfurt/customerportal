#!/bin/bash

echo "🔍 Customer Portal Monorepo Diagnostic"
echo "======================================"
echo ""

echo "📁 Directory Structure:"
echo "Root directory: $(pwd)"
ls -la
echo ""

echo "📦 Root Package.json status:"
if [ -f "package.json" ]; then
    echo "✅ Root package.json exists"
    echo "Name: $(node -p "require('./package.json').name")"
    echo "Scripts available: $(node -p "Object.keys(require('./package.json').scripts).join(', ')")"
else
    echo "❌ No root package.json found"
fi
echo ""

echo "🖥️  Backend status:"
if [ -d "backend" ]; then
    echo "✅ Backend directory exists"
    cd backend
    if [ -f "package.json" ]; then
        echo "✅ Backend package.json exists"
        echo "Name: $(node -p "require('./package.json').name")"
        if [ -d "node_modules" ]; then
            echo "✅ Backend node_modules exists"
        else
            echo "❌ Backend node_modules missing"
        fi
        if [ -d "src" ]; then
            echo "✅ Backend src directory exists"
        else
            echo "❌ Backend src directory missing"
        fi
    else
        echo "❌ Backend package.json missing"
    fi
    cd ..
else
    echo "❌ Backend directory missing"
fi
echo ""

echo "🌐 Frontend status:"
if [ -d "frontend" ]; then
    echo "✅ Frontend directory exists"
    cd frontend
    if [ -f "package.json" ]; then
        echo "✅ Frontend package.json exists"
        echo "Name: $(node -p "require('./package.json').name")"
        if [ -d "node_modules" ]; then
            echo "✅ Frontend node_modules exists"
            echo "Node modules size: $(du -sh node_modules | cut -f1)"
        else
            echo "❌ Frontend node_modules missing"
        fi
        if [ -f "vite.config.ts" ]; then
            echo "✅ Vite config exists"
        else
            echo "❌ Vite config missing"
        fi
    else
        echo "❌ Frontend package.json missing"
    fi
    cd ..
else
    echo "❌ Frontend directory missing"
fi
echo ""

echo "🔧 Recommended fixes:"
echo "1. If you see large node_modules: npm run clean:all && npm run install:all"
echo "2. If VS Code crashes: Close VS Code, restart, and use 'Start Backend Only' task first"
echo "3. If concurrently fails: Use individual tasks (Start Backend Only, Start Frontend Only)"
echo "4. For memory issues: Increase VS Code memory limit or use --max-old-space-size"
echo ""