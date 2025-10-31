# React + TypeScript + Vite

A minimal React application setup using Vite, TypeScript, and Biome for code quality.

## Tech Stack

- **React 19** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 7** - Build tool and dev server
- **Biome** - Linting and formatting (replaces ESLint and Prettier)
- **Node.js Test Runner** - Built-in testing with `@testing-library/react`
- **Husky** - Git hooks for pre-commit checks
- **Commitlint** - Conventional commit message validation

## Prerequisites

- Node.js 24.9.0 (managed via asdf)
- npm (comes with Node.js)

### asdf Setup

```bash
# Install Node.js plugin for asdf
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git

# Install Node.js version from .tool-versions
asdf install

# Verify installation
asdf current nodejs
```

## Getting Started

```bash
# Install dependencies (uses exact versions)
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

## Code Quality Commands

### Linting

```bash
# Check for linting issues
npm run lint

# Fix linting issues automatically
npm run lint:fix
```

### Formatting

```bash
# Format all files
npm run format
```

### All-in-One Check

```bash
# Run all checks (lint + format)
npm run check

# Fix all issues (lint + format)
npm run check:fix
```

## Testing

This project uses Node.js's built-in test runner with React Testing Library:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Test Structure

Tests are located in `tests/` (root level) and use:
- `node:test` - Built-in test runner
- `node:assert` (strict mode) - Assertions
- `@testing-library/react` - React component testing
- `jsdom` - DOM environment for Node.js

Example test:

```typescript
import { strict as assert } from 'node:assert';
import { beforeEach, describe, test } from 'node:test';
import { render } from '@testing-library/react';
import { createDOM } from '../test-utils/create-dom';
import { Component } from '../../src/components/Component';

describe('Component', () => {
  beforeEach(() => {
    createDOM();
  });

  test('renders correctly', () => {
    const { getByText } = render(<Component />);
    const element = getByText('Expected Text');
    assert.equal(element.textContent, 'Expected Text');
  });
});
```

## Git Workflow

### Conventional Commits

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<optional scope>): <subject>

<optional body>

<optional footer>
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

**Examples:**

```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve navigation overflow issue"
git commit -m "docs: update README with testing instructions"
git commit -m "test: add unit tests for Button component"
```

### Git Hooks

- **pre-commit**: Runs `npm run check` (Biome linting + formatting)
- **commit-msg**: Validates conventional commit format

To bypass hooks (use sparingly):

```bash
git commit --no-verify -m "emergency fix"
```

## Dependency Management

This project uses **exact version numbers** (no `^` or `~` prefixes) for reproducible builds.

When installing new packages, always use `--save-exact`:

```bash
# Production dependency
npm install --save-exact package-name

# Development dependency
npm install --save-dev --save-exact package-name
```

Or configure npm globally:

```bash
npm config set save-exact true
```

## Project Structure

```
.
├── src/
│   ├── components/      # React components
│   │   ├── FloatingWindow/      # Component with own directory
│   │   │   ├── FloatingWindow.tsx
│   │   │   ├── FloatingWindow.css
│   │   │   └── index.ts         # Barrel export
│   │   ├── WindowManager/
│   │   └── WindowTaskbar/
│   ├── contexts/        # React contexts (e.g., WindowContext)
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── assets/          # Static assets (images, etc.)
│   ├── App.tsx          # Main App component
│   ├── App.css          # App styles
│   └── main.tsx         # Application entry point
├── tests/               # Test files (root level)
│   ├── components/      # Component tests
│   │   ├── FloatingWindow/
│   │   ├── WindowManager/
│   │   └── WindowTaskbar/
│   └── test-utils/      # Testing utilities (e.g., createDOM)
├── public/              # Public static assets
├── .docs/               # Project documentation
├── .github/             # GitHub workflows and configurations
├── .husky/              # Git hooks
├── .vscode/             # VS Code settings
├── biome.json           # Biome configuration
├── commitlint.config.js # Commit message linting
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies and scripts
```

## VS Code Integration

The project includes `.vscode/settings.json` for automatic code formatting and import organization on save using Biome.

**Recommended VS Code Extension:**
- [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)

## Configuration Files

- **biome.json** - Code linting and formatting rules
- **tsconfig.json** - TypeScript compiler options
- **vite.config.ts** - Vite build configuration
- **commitlint.config.js** - Commit message validation rules
- **.tool-versions** - Node.js version for asdf

## Additional Documentation

For detailed guides for AI agents, see:
- `.docs/AI_REACT_SETUP_INSTRUCTIONS.md` - Complete setup instructions
- `.docs/AI_COMPONENT_CREATION_GUIDE.md` - Component creation guide
- `.docs/COMPONENT_IMPLEMENTATION_GUIDE.md` - Implementation patterns
- `.docs/COMPONENT_TESTING_GUIDE.md` - Testing guide
- `.docs/QUICK_REFERENCE.md` - Quick reference

## License

Private project - not licensed for public use.
