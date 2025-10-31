# AI Agent React Setup - Quick Reference (Vite + TypeScript)

## 🚀 Quick Start Commands

### Prerequisites: Install asdf and Node.js

```bash
# Install Node.js plugin
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git

# Install Node.js 24 (LTS)
asdf install nodejs 24.9.0

# Set as local version (creates .tool-versions)
asdf local nodejs 24.9.0
```

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
npm install --save-dev @biomejs/biome @types/node tsx husky @commitlint/cli @commitlint/config-conventional
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

### commitlint.config.js

```javascript
export default {
  extends: ['@commitlint/config-conventional'],
};
```

## 🔧 Git Hooks Setup

```bash
# Initialize Husky
npx husky init

# Pre-commit: Run Biome checks
echo 'npm run check' > .husky/pre-commit

# Commit-msg: Validate conventional commits
echo 'npx --no -- commitlint --edit $1' > .husky/commit-msg

# Make executable
chmod +x .husky/pre-commit .husky/commit-msg
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

- [ ] asdf installed and configured
- [ ] Node.js plugin added to asdf
- [ ] Node.js 24.9.0 installed via asdf
- [ ] `.tool-versions` file created
- [ ] Vite project initialized with TypeScript
- [ ] Minimal directory structure created
- [ ] Essential dev dependencies installed (Biome.js, Husky, Commitlint)
- [ ] Biome configuration added
- [ ] Commitlint configuration added
- [ ] TypeScript configuration verified
- [ ] Node.js test runner setup
- [ ] Husky initialized with pre-commit and commit-msg hooks
- [ ] Git repository initialized
- [ ] Environment variables set (VITE\_ prefix)
- [ ] All verification commands pass
- [ ] Git hooks tested and working

## 💡 Conventional Commits

```bash
# Valid commit examples
git commit -m "feat: add user authentication"
git commit -m "fix: resolve navigation bug"
git commit -m "docs: update README"
git commit -m "refactor: simplify data fetching"
```

---

_Refer to AI_REACT_SETUP_INSTRUCTIONS.md for detailed instructions_
