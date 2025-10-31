# AI Guide: Implementing React Components

## Quick Reference for Component Implementation

This guide provides the essential patterns and standards for implementing React components in this project. Use this as a reference when generating new components.

**Key Principles:**
- ✅ **Always use named exports** (`export const Component`)
- ✅ **Never use default exports** (`export default Component`)
- ✅ Import `FC` type: `import type { FC } from 'react'`
- ✅ Use `FC<PropsType>` instead of `React.FC<PropsType>`

---

## Component Template

### Basic Component Structure

```tsx
import type { FC } from 'react';

interface ComponentNameProps {
  requiredProp: string;
  optionalProp?: number;
  children?: React.ReactNode;
}

export const ComponentName: FC<ComponentNameProps> = ({ 
  requiredProp, 
  optionalProp = defaultValue,
  children 
}) => {
  return (
    <div className="component-name">
      <h1>{requiredProp}</h1>
      {children}
    </div>
  );
};
```

### File Location & Naming Conventions

- **Component files**: `src/components/ComponentName.tsx`
- **Type definitions**: `src/types/` (for complex shared types)
- **Utilities**: `src/utils/` (for helper functions)
- **Naming**: Use PascalCase for component files and names
- **Exports**: Always use named exports, never default exports

---

## TypeScript Standards

### 1. Always Define Explicit Prop Interfaces

```tsx
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

// ❌ Avoid
const Button = ({ label, onClick }: any) => { ... }
```

### 2. Use FC with Type Parameter

```tsx
export const Button: FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
};
```

### 3. Import Types Properly

```tsx
import type { FC } from 'react';
import type { ReactNode } from 'react';
```

### 4. Provide Default Values Inline

```tsx
// ✅ Good - inline defaults with named export
export const Greeting: FC<GreetingProps> = ({ name = 'World' }) => {
  return <h1>Hello, {name}!</h1>;
};

// ❌ Avoid - setting defaults inside component
export const Greeting: FC<GreetingProps> = ({ name }) => {
  const displayName = name || 'World'; // Don't do this
  return <h1>Hello, {displayName}!</h1>;
};
```

---

## Component Patterns

### 1. Props Destructuring

```tsx
// ✅ Good - destructure in parameters with named export
export const Card: FC<CardProps> = ({ title, description, onClick }) => {
  return (
    <div onClick={onClick}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

// ❌ Avoid - accessing via props object
export const Card: FC<CardProps> = (props) => {
  return <div>{props.title}</div>;
};
```

### 2. Conditional Rendering

```tsx
export const UserProfile: FC<UserProfileProps> = ({ user, isLoading }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      {user.email && <p>{user.email}</p>}
    </div>
  );
};
```

### 3. Event Handlers

```tsx
interface FormProps {
  onSubmit: (data: FormData) => void;
}

export const Form: FC<FormProps> = ({ onSubmit }) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
};
```

### 4. State Management

```tsx
import { useState } from 'react';
import type { FC } from 'react';

interface CounterProps {
  initialCount?: number;
}

export const Counter: FC<CounterProps> = ({ initialCount = 0 }) => {
  const [count, setCount] = useState<number>(initialCount);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

---

## Common Component Types

### 1. Presentation Component (No State)

```tsx
import type { FC } from 'react';

interface CardProps {
  title: string;
  description: string;
  imageUrl?: string;
}

export const Card: FC<CardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="card">
      {imageUrl && <img src={imageUrl} alt={title} />}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};
```

### 2. Interactive Component (With State)

```tsx
import { useState } from 'react';
import type { FC } from 'react';

interface ToggleProps {
  initialState?: boolean;
  onToggle?: (state: boolean) => void;
}

export const Toggle: FC<ToggleProps> = ({ 
  initialState = false, 
  onToggle 
}) => {
  const [isOn, setIsOn] = useState(initialState);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    onToggle?.(newState);
  };

  return (
    <button onClick={handleToggle}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
};
```

### 3. Container Component (With Children)

```tsx
import type { FC, ReactNode } from 'react';

interface ContainerProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const Container: FC<ContainerProps> = ({ 
  title, 
  children, 
  className = '' 
}) => {
  return (
    <div className={`container ${className}`}>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
};
```

---

## Code Quality Standards

### Biome Configuration

This project uses Biome for linting and formatting. Key rules:

- **Quotes**: Single quotes (`'`)
- **Semicolons**: Always required (`;`)
- **Line width**: 80 characters
- **Indentation**: 2 spaces
- **Line ending**: LF (`\n`)
- **Trailing commas**: ES5 style

### Before Committing

```bash
# Check and fix all issues
npm run check:fix

# Or separately:
npm run lint:fix   # Fix linting issues
npm run format     # Format code
```

### Common Linting Rules

```tsx
// ✅ Good
const greeting = 'Hello';
const person = { name: 'Alice' };

// ❌ Avoid
console.log('Debug info');  // Warning: no console
var x = 5;                  // Error: use const/let
let y = 10;                 // Error: use const if not reassigning
debugger;                   // Error: no debugger
```

---

## Git Commit Conventions

When creating components, use conventional commit messages:

```bash
# Adding a new component
git commit -m "feat: add UserCard component"

# Updating existing component
git commit -m "refactor: improve UserCard prop types"

# Fixing a bug
git commit -m "fix: resolve UserCard rendering issue"
```

### Valid Commit Types

- `feat` - New feature or component
- `fix` - Bug fix
- `refactor` - Code refactoring
- `style` - Code style/formatting changes
- `docs` - Documentation changes
- `perf` - Performance improvements
- `chore` - Maintenance tasks

---

## Implementation Checklist

When implementing a new component, follow this checklist:

1. **Create component file**
   - [ ] Place in `src/components/ComponentName.tsx`
   - [ ] Define prop interface
   - [ ] Import FC: `import type { FC } from 'react'`
   - [ ] Implement component with FC
   - [ ] Use named export (export const ComponentName)

2. **Add TypeScript types**
   - [ ] Create explicit prop interface
   - [ ] Use proper TypeScript types
   - [ ] Provide default values for optional props
   - [ ] Import FC from 'react' with type import

3. **Run quality checks**
   - [ ] Run `npm run check:fix`
   - [ ] Run `npm run type-check`

4. **Commit changes**
   - [ ] Use conventional commit format
   - [ ] Pre-commit hooks will run automatically

---

## Complete Implementation Example

### Create Component (`src/components/Button.tsx`)

```tsx
import type { FC } from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary',
  disabled = false 
}) => {
  return (
    <button 
      className={`button button--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
```

### Run Checks

```bash
npm run check:fix
npm run type-check
```

### Commit

```bash
git add .
git commit -m "feat: add Button component with variants"
```

---

## Additional Resources

- **Testing Guide**: See `.docs/COMPONENT_TESTING_GUIDE.md`
- **Project Setup**: See `.docs/AI_REACT_SETUP_INSTRUCTIONS.md`
- **Main README**: See `README.md` in project root
- **Biome Configuration**: `biome.json`
- **TypeScript Configuration**: `tsconfig.app.json`

---

**Remember**: Quality over speed. Follow the patterns, write clean code, and let the tooling enforce standards.
