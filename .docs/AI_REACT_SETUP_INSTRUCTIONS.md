# AI Agent Instructions: React App Initialization & Project Setup (Vite + TypeScript)

## Overview

This document provides step-by-step instructions for AI agents to initialize a React application using Vite with TypeScript and create a minimal, well-structured foundation for new projects. Follow these instructions in sequence to ensure a consistent setup.

## Prerequisites Check

Before starting, verify the following tools are available:

- asdf (for version management)
- Git (for version control)

### Install asdf and Node.js

If asdf is not installed, follow the installation guide in the project README.md. Once asdf is installed:

```bash
# Install Node.js plugin for asdf
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git

# Install Node.js 24 (LTS)
asdf install nodejs 24.9.0

# Set Node.js 24 as the version for this project
asdf local nodejs 24.9.0
```

This will create a `.tool-versions` file in your project root to ensure consistent Node.js version across all environments.

## Step 1: Version Management Setup

### Create .tool-versions file

Create a `.tool-versions` file in the project root:

```
nodejs 24.9.0
```

This ensures all developers use the same Node.js version managed by asdf.

## Step 2: Project Initialization

Initialize a new React project with Vite and TypeScript:

```bash
npm create vite@latest project-name -- --template react-ts
cd project-name
npm install --save-exact
```

## Step 3: Minimal Dependencies Setup

Install only essential development tools (TypeScript types are already included with Vite template):

```bash
# Code quality and formatting with Biome.js
npm install --save-dev --save-exact @biomejs/biome

# Git hooks for pre-commit checks
npm install --save-dev --save-exact husky

# Conventional commits validation
npm install --save-dev --save-exact @commitlint/cli @commitlint/config-conventional

# Node.js test runner setup
npm install --save-dev --save-exact @types/node tsx
```

**Note**: No additional production dependencies are installed by default. Add only what your project specifically needs. Always use `--save-exact` flag to ensure exact version numbers without `^` or `~` prefixes.

## Step 4: Project Structure Setup

Create the following minimal directory structure:

```
src/
├── components/          # React components
│   ├── ComponentName/   # Component directories (for complex components)
│   │   ├── ComponentName.tsx
│   │   ├── ComponentName.css
│   │   └── index.ts     # Barrel export
│   └── SimpleComponent.tsx  # Simple components (single file)
├── contexts/            # React contexts (providers)
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── assets/              # Static assets (images, etc.)

tests/                   # Test files (root level)
├── components/          # Component tests (mirror src/components structure)
│   └── ComponentName/
│       └── ComponentName.test.tsx
└── test-utils/          # Testing utilities (createDOM, css-loader)
```

### Create Base Directory Structure

```bash
mkdir -p src/components src/contexts src/types src/utils src/assets
mkdir -p tests/components tests/test-utils
```

## Step 5: Configuration Files Setup

### 1. Biome Configuration (biome.json)

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "ignoreUnknown": false,
    "ignore": ["dist/", "node_modules/", "*.min.js"]
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 80,
    "lineEnding": "lf"
  },
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "style": {
        "noUnusedTemplateLiteral": "error",
        "useConst": "error"
      },
      "suspicious": {
        "noDebugger": "error",
        "noConsoleLog": "warn"
      },
      "correctness": {
        "useExhaustiveDependencies": "warn"
      }
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "always",
      "trailingCommas": "es5"
    }
  },
  "json": {
    "formatter": {
      "enabled": true
    }
  }
}
```

### 2. TypeScript Configuration (tsconfig.json)

The Vite template already includes a good TypeScript configuration. Update it if needed:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 3. Test Configuration (test.config.ts)

Create a configuration for Node.js test runner:

```typescript
// test.config.ts
export default {
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  testTimeout: 5000,
};
```

### 4. Commitlint Configuration (commitlint.config.js)

Create commitlint configuration for conventional commits:

```javascript
// commitlint.config.js
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation only changes
        'style', // Code style changes (formatting, semicolons, etc.)
        'refactor', // Code refactoring
        'perf', // Performance improvements
        'test', // Adding or updating tests
        'build', // Build system or external dependencies
        'ci', // CI configuration changes
        'chore', // Other changes that don't modify src or test files
        'revert', // Revert a previous commit
      ],
    ],
    'subject-case': [0], // Allow any case for subject
  },
};
```

### 5. Setup Git Hooks with Husky

Initialize Husky and create pre-commit and commit-msg hooks:

```bash
# Initialize Husky
npx husky init

# Create pre-commit hook to run Biome checks
echo 'npm run check' > .husky/pre-commit

# Create commit-msg hook to validate conventional commits
echo 'npx --no -- commitlint --edit $1' > .husky/commit-msg

# Make hooks executable
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
```

## Step 6: Base Component Templates

### 1. Update App Component (src/App.tsx)

```typescript
import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React + TypeScript + Vite</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
```

### 2. Create Basic Component Type (src/types/index.ts)

```typescript
import { ReactNode } from 'react';

export interface BaseComponentProps {
  children?: ReactNode;
  className?: string;
}

export interface AppState {
  isLoading: boolean;
  error: string | null;
}
```

### 3. Create Sample Test (tests/components/App.test.ts)

```typescript
import { test, describe } from 'node:test';
import assert from 'node:assert';

describe('App Component', () => {
  test('should have correct title', () => {
    // Example test - adapt based on your testing needs
    const appTitle = 'React + TypeScript + Vite';
    assert.strictEqual(appTitle, 'React + TypeScript + Vite');
  });
});
```

## Step 7: Environment Configuration

### 1. Create Environment Files

Create `.env` files for different environments (Vite uses VITE\_ prefix):

**.env.local** (for local development):

```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Your App Name
VITE_VERSION=1.0.0
```

**.env.production**:

```env
VITE_API_URL=https://api.yourapp.com
VITE_APP_NAME=Your App Name
VITE_VERSION=1.0.0
```

### 2. Add to .gitignore

```gitignore
# Environment variables
.env.local
.env.development.local
.env.test.local
.env.production.local

# Dependencies
node_modules/

# Build outputs
build/
dist/

# IDE files
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db
```

## Step 8: Package.json Scripts Enhancement

Update package.json scripts section (Vite already includes dev, build, preview):

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "node --import tsx --experimental-loader ./tests/test-utils/css-loader.js --test tests/**/*.test.{ts,tsx}",
    "test:watch": "node --import tsx --experimental-loader ./tests/test-utils/css-loader.js --test --watch tests/**/*.test.{ts,tsx}",
    "lint": "biome lint .",
    "lint:fix": "biome lint --write .",
    "format": "biome format --write .",
    "check": "biome check .",
    "check:fix": "biome check --write .",
    "type-check": "tsc --noEmit",
    "prepare": "husky"
  }
}
```

**Note**: The `prepare` script ensures Husky hooks are installed automatically when someone runs `npm install`.

## Step 9: Git Repository Setup

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Initial commit (using conventional commit format)
git commit -m "chore: initial project setup with vite, typescript, and biome"

# Add remote origin (replace with your repository URL)
git remote add origin https://github.com/username/repository-name.git

# Push to remote
git push -u origin main
```

### Conventional Commit Format

All commits must follow the conventional commit format. The pre-commit hook will validate this:

```
<type>(<optional scope>): <subject>

<optional body>

<optional footer>
```

**Examples:**

```bash
git commit -m "feat: add user authentication component"
git commit -m "fix: resolve navigation menu overflow issue"
git commit -m "docs: update README with installation steps"
git commit -m "refactor: simplify data fetching logic"
git commit -m "test: add unit tests for Button component"
```

**Valid types:**

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style/formatting changes
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `build` - Build system changes
- `ci` - CI configuration changes
- `chore` - Other maintenance tasks
- `revert` - Revert a previous commit

## Step 10: Development Best Practices

### TypeScript Best Practices

1. **Strict Type Checking**: Keep TypeScript strict mode enabled
2. **Type Definitions**: Create proper interfaces and types in `src/types/`
3. **Component Props**: Always type your component props

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
}) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};
```

### Testing with Node.js Test Runner

1. **Simple Unit Tests**: Use Node.js built-in test runner
2. **No Additional Dependencies**: Leverage native testing capabilities
3. **Test Organization**: Keep tests in `src/tests/` directory

### Git Workflow Best Practices

1. **Pre-commit Checks**: Husky runs `npm run check` before every commit

   - Lints all code with Biome
   - Formats all code with Biome
   - Fails commit if issues are found

2. **Commit Message Validation**: Commitlint validates conventional commit format

   - Must use valid type (feat, fix, docs, etc.)
   - Must have a subject
   - Example: `feat: add new feature`

3. **Bypass Hooks (Use Sparingly)**:
   ```bash
   git commit --no-verify -m "emergency fix"
   ```

### Performance Considerations

1. **Bundle Analysis**: Vite includes built-in bundle analysis

   ```bash
   npm run build -- --analyze
   ```

2. **Code Splitting**: Use dynamic imports when needed
   ```typescript
   const LazyComponent = lazy(() => import('./components/LazyComponent'));
   ```

## Step 11: Development Workflow

### Daily Development Commands

```bash
# Start development server
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Check code quality (lint only)
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Run all checks (lint + format)
npm run check

# Fix all issues (lint + format)
npm run check:fix

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

## Verification Checklist

After completing the setup, verify:

- [ ] App starts without errors (`npm run dev`)
- [ ] Tests pass (`npm test`)
- [ ] TypeScript compiles without errors (`npm run type-check`)
- [ ] Biome checks pass (`npm run check`)
- [ ] Build completes successfully (`npm run build`)
- [ ] Essential directories are created (components, types, utils, tests)
- [ ] Configuration files are in place (Biome, TypeScript, Commitlint)
- [ ] `.tool-versions` file created with Node.js 24.9.0
- [ ] asdf correctly manages Node.js version
- [ ] Husky hooks are installed and working (.husky/pre-commit, .husky/commit-msg)
- [ ] Pre-commit hook runs Biome checks
- [ ] Commit-msg hook validates conventional commits
- [ ] Git repository is initialized and committed
- [ ] Environment variables are configured (using VITE\_ prefix)

### Test Git Hooks

Verify hooks are working:

```bash
# Test pre-commit hook (should run Biome checks)
git add .
git commit -m "test: verify pre-commit hook"

# Test commit-msg hook with invalid format (should fail)
git commit --allow-empty -m "invalid commit message"

# Test commit-msg hook with valid format (should succeed)
git commit --allow-empty -m "test: verify commit message validation"
```

## Troubleshooting Common Issues

### asdf and Node.js Version Issues

- Ensure asdf is properly installed and added to your shell configuration
- Run `asdf install` in the project directory to install Node.js from `.tool-versions`
- Verify with `asdf current nodejs` to check the active version
- If asdf is not found, restart your terminal after installation
- Check README.md for detailed asdf installation instructions

### Port Conflicts

- Change default port in vite.config.ts or use --port flag
- Use `npm run dev -- --port 3001` for alternative port

### Dependency Conflicts

- Clear node_modules and package-lock.json, then reinstall
- Use `npm audit fix` for security vulnerabilities

## Next Steps After Setup

1. Define project requirements and features
2. Set up API integration (add dependencies only as needed)
3. Implement routing (install react-router-dom if needed)
4. Create component library with proper TypeScript types
5. Set up deployment pipeline (Vite builds are deployment-ready)
6. Add additional dependencies only when required

## Dependency Management Best Practices

### Using Exact Versions

This project uses exact version numbers (without `^` or `~` prefixes) for all dependencies to ensure:

- **Reproducible builds**: Everyone gets the exact same versions
- **Predictable behavior**: No surprise breaking changes from minor/patch updates
- **Easier debugging**: Issues can be traced to specific versions

When installing new packages, always use the `--save-exact` flag:

```bash
# For production dependencies
npm install --save-exact package-name

# For development dependencies
npm install --save-dev --save-exact package-name
```

You can also configure npm to always save exact versions:

```bash
npm config set save-exact true
```

---

**Note**: This instruction file focuses on a minimal, TypeScript-first setup with Vite and Node.js test runner. Add dependencies incrementally based on actual project requirements. Always use exact version numbers for reproducible builds. Always refer to the latest React and Vite documentation for the most current information.
