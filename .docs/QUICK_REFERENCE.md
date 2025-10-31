# AI Agent React Setup - Quick Reference (Vite + TypeScript)

## 🚀 Quick Start Commands

### Vite + React + TypeScript (Only Option)

```bash
npm create vite@latest project-name -- --template react-ts
cd project-name && npm install
```

## 📁 Minimal Directory Structure

```bash
mkdir -p src/{components,types,utils,tests}
```

## 📦 Minimal Dependencies

```bash
# Development only
npm install --save-dev @biomejs/biome @types/node tsx
```

## ⚙️ Quick Config Files

### biome.json

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "vcs": { "enabled": true, "clientKind": "git", "useIgnoreFile": true },
  "files": { "ignore": ["dist/", "node_modules/", "*.min.js"] },
  "formatter": { "enabled": true, "indentWidth": 2, "lineWidth": 80 },
  "organizeImports": { "enabled": true },
  "linter": { "enabled": true, "rules": { "recommended": true } },
  "javascript": {
    "formatter": { "quoteStyle": "single", "semicolons": "always" }
  }
}
```

## 🔍 Verification Commands

```bash
npm run dev        # Should start without errors
npm test           # Should pass all tests (Node.js test runner)
npm run type-check # Should pass TypeScript check
npm run check      # Should pass Biome checks (lint + format)
npm run build      # Should build successfully
```

## 📋 Setup Checklist

- [ ] Node.js 24 LTS verified
- [ ] Vite project initialized with TypeScript
- [ ] Minimal directory structure created
- [ ] Essential dev dependencies installed (Biome.js)
- [ ] Biome configuration added
- [ ] TypeScript configuration verified
- [ ] Node.js test runner setup
- [ ] Git repository initialized
- [ ] Environment variables set (VITE\_ prefix)
- [ ] All verification commands pass

---

_Refer to AI_REACT_SETUP_INSTRUCTIONS.md for detailed instructions_
