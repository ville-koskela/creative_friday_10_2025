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
npm install
```

## Step 3: Minimal Dependencies Setup

Install only essential development tools (TypeScript types are already included with Vite template):

```bash
# Code quality and formatting with Biome.js
npm install --save-dev @biomejs/biome

# Node.js test runner setup
npm install --save-dev @types/node tsx
```

**Note**: No additional production dependencies are installed by default. Add only what your project specifically needs.

## Step 4: Project Structure Setup

Create the following minimal directory structure:

```
src/
├── components/          # React components
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── tests/               # Test files (Node.js test runner)
```

### Create Base Directory Structure

```bash
mkdir -p src/components src/types src/utils src/tests
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

### 3. Create Sample Test (src/tests/App.test.ts)

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
    "test": "node --test src/tests/**/*.test.ts",
    "test:watch": "node --test --watch src/tests/**/*.test.ts",
    "lint": "biome lint .",
    "lint:fix": "biome lint --write .",
    "format": "biome format --write .",
    "check": "biome check .",
    "check:fix": "biome check --write .",
    "type-check": "tsc --noEmit"
  }
}
```

## Step 9: Git Repository Setup

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: React app setup with base structure"

# Add remote origin (replace with your repository URL)
git remote add origin https://github.com/username/repository-name.git

# Push to remote
git push -u origin main
```

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
- [ ] Configuration files are in place (Biome, TypeScript)
- [ ] `.tool-versions` file created with Node.js 24.9.0
- [ ] asdf correctly manages Node.js version
- [ ] Git repository is initialized and committed
- [ ] Environment variables are configured (using VITE\_ prefix)

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

---

**Note**: This instruction file focuses on a minimal, TypeScript-first setup with Vite and Node.js test runner. Add dependencies incrementally based on actual project requirements. Always refer to the latest React and Vite documentation for the most current information.
