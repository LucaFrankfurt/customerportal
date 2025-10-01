# 🚨 Troubleshooting: VS Code Crashes & npm run dev Issues

## The Problem
After copying the frontend code, `npm run dev` is failing and crashing VS Code due to:

1. **Multiple node_modules directories** consuming too much memory
2. **Conflicting dependency versions** between frontend/backend
3. **VS Code indexing issues** with large file structures
4. **Concurrently process conflicts**

## 🛠️ Quick Fixes (Try in order)

### 1. Safe Backend-Only Start
```bash
# Start just the backend first (safest option)
npm run dev:backend
```

### 2. Use VS Code Tasks
- Open Command Palette (`Cmd+Shift+P`)
- Type "Tasks: Run Task"
- Select "Start Backend Only" or "Start Full Stack Dev (Stable)"

### 3. Clean Installation (if still having issues)
```bash
# Clean everything and reinstall
npm run clean:all
npm install
npm run install:all
```

### 4. Memory-Safe VS Code Restart
```bash
# Close VS Code completely
# Restart with increased memory
code --max-memory=4096 .
```

## 📊 Diagnostic Commands

```bash
# Check project health
npm run diagnostic

# Check what's running on ports
lsof -i :3000  # Frontend port
lsof -i :3001  # Backend port
```

## 🔧 Alternative Startup Methods

### Method 1: Individual Terminals
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend  
cd frontend && npm run dev
```

### Method 2: Sequential Start
```bash
# Start backend first
npm run dev:backend
# Wait for "Server running on port 3001"
# Then in another terminal:
npm run dev:frontend
```

### Method 3: Safe Concurrently (if fixed)
```bash
npm run dev
```

## 🏗️ Current Structure Status

✅ **Backend**: Moved to `backend/` directory, working independently
✅ **Frontend**: Copied to `frontend/` directory with dependencies
✅ **Root**: Monorepo management scripts
⚠️  **Issue**: Multiple node_modules causing memory pressure

## 🎯 Recommended Approach

1. **Start with backend only**: `npm run dev:backend`
2. **Verify backend works**: `curl http://localhost:3001/health`
3. **In separate terminal, start frontend**: `cd frontend && npm run dev`
4. **Once both work individually**, try: `npm run dev`

## 📝 VS Code Performance Tips

Add to VS Code settings.json:
```json
{
  "typescript.disableAutomaticTypeAcquisition": true,
  "search.exclude": {
    "**/node_modules": true,
    "**/package-lock.json": true
  },
  "files.watcherExclude": {
    "**/node_modules/**": true
  }
}
```

## ✅ Success Indicators

- Backend: `info: Server running on port 3001`
- Frontend: `Local: http://localhost:3000`
- Health check: `{"status":"OK"}`

The monorepo structure is correctly set up - the issue is just with the concurrent startup and VS Code memory management.