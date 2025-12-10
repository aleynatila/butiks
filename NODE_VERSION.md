# ⚠️ Node.js Version Requirement

## Current Issue
The project requires **Node.js v20 or higher** to run properly.

Dependencies requiring Node v20+:
- **Vite 7.2.7**: Requires Node ^20.19.0 || >=22.12.0
- **React Router 7.10.1**: Requires Node >=20.0.0
- **@vitejs/plugin-react 5.1.2**: Requires Node ^20.19.0 || >=22.12.0

## Solution

### Option 1: Update to Node.js 20+ (Recommended)
```bash
# Using nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install Node 20 LTS
nvm install 20
nvm use 20
nvm alias default 20

# Verify
node --version  # Should show v20.x.x
```

### Option 2: Use older dependencies
Downgrade to compatible versions (not recommended as you'll miss new features):
```bash
npm install vite@4.5.0 react@18.2.0 react-dom@18.2.0
```

## Recommended Node.js Version
- **Node.js 20 LTS** (Long Term Support) - **REQUIRED**
- Or Node.js 22+ (Latest)

## After Upgrading Node.js
```bash
cd /butiks
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Development Requirements
- **Node.js**: 20+ (v20.19.0 or higher **REQUIRED**)
- **npm**: 10+ (comes with Node.js 20)

## Production Requirements
Same as development - ensure your hosting environment supports Node.js 20+

Popular hosting platforms with Node.js 20+ support:
- ✅ Vercel (auto-detects, supports 20+)
- ✅ Netlify (specify Node 20 in build settings)
- ✅ Railway (specify Node 20 in service settings)
- ✅ Heroku (use `node: 20.x` in package.json engines)
- ✅ AWS (update runtime to Node 20)
- ✅ DigitalOcean (manual install Node 20)

## package.json Engine Specification
Already configured in `package.json`:
```json
{
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=10.0.0"
  }
}
```

This will prevent installation issues and provide clear error messages.

## Quick Fix Commands

```bash
# 1. Install/switch to Node 20
nvm install 20
nvm use 20

# 2. Clean and reinstall
cd /butiks
rm -rf node_modules package-lock.json
npm install

# 3. Run dev server
npm run dev
```
