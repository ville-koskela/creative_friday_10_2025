# AI Guide: Testing React Components

## Quick Reference for Component Testing

This guide provides the essential patterns and standards for testing React components in this project. Use this as a reference when generating tests for components.

**Key Principles:**
- ✅ **Always use `createDOM()` in `beforeEach()`**
- ✅ **Use strict assertions** from `node:assert`
- ✅ **Access elements directly from render** (don't use `screen`)
- ✅ **Import components using named imports**

---

## Test File Template

### Basic Test Structure

```tsx
import { strict as assert } from 'node:assert';
import { beforeEach, describe, test } from 'node:test';
import { render } from '@testing-library/react';
import { createDOM } from '../test-utils/create-dom';
import { ComponentName } from '../../src/components/ComponentName';

describe('ComponentName', () => {
  // Always set up DOM environment before tests
  beforeEach(() => {
    createDOM();
  });

  test('renders with required props', () => {
    // Don't use screen - access directly from render
    const { getByText } = render(<ComponentName requiredProp="value" />);
    const element = getByText('Expected Text');
    
    assert.equal(element.textContent, 'Expected Text');
  });

  test('handles optional props correctly', () => {
    const { getByText } = render(
      <ComponentName requiredProp="value" optionalProp={42} />
    );
    
    const element = getByText('42');
    assert.ok(element);
  });

  test('applies default values', () => {
    const { container } = render(<ComponentName requiredProp="test" />);
    
    assert.ok(container.querySelector('.component-name'));
  });
});
```

### File Location & Naming Conventions

- **Test files**: `tests/components/ComponentName/ComponentName.test.tsx`
- **Test utilities**: `tests/test-utils/` (e.g., `create-dom.ts`, `css-loader.js`)
- **Naming**: Match the component name with `.test.tsx` suffix
- **Imports**: Always use named imports for components
- **Test structure**: Mirror component directory structure in `tests/components/`

---

## Testing Standards

### 1. Always Use `createDOM()` in `beforeEach()`

```tsx
import { beforeEach, describe, test } from 'node:test';
import { createDOM } from './test-utils/create-dom';

describe('MyComponent', () => {
  beforeEach(() => {
    createDOM(); // Required for React rendering
  });

  // Your tests here
});
```

**Why?** Sets up the jsdom environment required for React component rendering.

### 2. Use Strict Assertions

```tsx
import { strict as assert } from 'node:assert';

// ✅ Good - strict assertions
assert.equal(actual, expected);
assert.ok(value);
assert.strictEqual(actual, expected);
assert.notEqual(actual, expected);

// ❌ Avoid - non-strict
const assert = require('assert');
```

### 3. Don't Use `screen` from Testing Library

```tsx
// ✅ Good - use render's return values with named import
import { Component } from '../../src/components/Component';
const { getByText, container, getByRole } = render(<Component />);

// ❌ Avoid - don't use screen
import { screen } from '@testing-library/react';
screen.getByText('...');
```

### 4. Import Components with Named Imports

```tsx
// ✅ Good - named import
import { Button } from '../../src/components/Button';

// ❌ Avoid - default import
import Button from '../../src/components/Button';
```

---

## Common Testing Patterns

### 1. Testing Rendering with Props

```tsx
test('renders with custom text', () => {
  const { getByText } = render(<Greeting name="Alice" />);
  const greeting = getByText('Hello, Alice!');
  
  assert.equal(greeting.textContent, 'Hello, Alice!');
});
```

### 2. Testing Default Values

```tsx
test('uses default name when not provided', () => {
  const { getByText } = render(<Greeting />);
  const greeting = getByText('Hello, World!');
  
  assert.ok(greeting);
});
```

### 3. Testing Conditional Rendering

```tsx
test('shows loading state', () => {
  const { getByText } = render(<UserProfile isLoading={true} />);
  const loading = getByText('Loading...');
  
  assert.ok(loading);
});

test('shows user data when loaded', () => {
  const user = { name: 'Alice', email: 'alice@example.com' };
  const { getByText } = render(<UserProfile user={user} isLoading={false} />);
  
  assert.ok(getByText('Alice'));
  assert.ok(getByText('alice@example.com'));
});
```

### 4. Testing CSS Classes

```tsx
test('applies correct variant class', () => {
  const { container } = render(
    <Button label="Click" onClick={() => {}} variant="secondary" />
  );
  
  const button = container.querySelector('.button--secondary');
  assert.ok(button);
});
```

### 5. Testing Disabled State

```tsx
test('disables button when disabled prop is true', () => {
  const { getByText } = render(
    <Button label="Click me" onClick={() => {}} disabled={true} />
  );
  
  const button = getByText('Click me') as HTMLButtonElement;
  assert.equal(button.disabled, true);
});
```

### 6. Testing Event Handlers

```tsx
import { test } from 'node:test';

test('calls onClick when button is clicked', () => {
  let clicked = false;
  const handleClick = () => { clicked = true; };
  
  const { getByText } = render(
    <Button label="Click me" onClick={handleClick} />
  );
  
  const button = getByText('Click me');
  button.click();
  
  assert.equal(clicked, true);
});
```

### 7. Testing Children

```tsx
test('renders children correctly', () => {
  const { getByText } = render(
    <Container>
      <p>Child content</p>
    </Container>
  );
  
  assert.ok(getByText('Child content'));
});
```

### 8. Testing Multiple Elements

```tsx
test('renders all list items', () => {
  const items = ['Apple', 'Banana', 'Cherry'];
  const { getByText } = render(<List items={items} />);
  
  for (const item of items) {
    assert.ok(getByText(item));
  }
});
```

---

## Query Methods

### Common Query Methods from `render()`

```tsx
const {
  getByText,        // Find by text content
  getByRole,        // Find by ARIA role
  container,        // Access container for querySelector
  queryByText,      // Returns null if not found (instead of throwing)
  getAllByText,     // Get multiple elements
} = render(<Component />);
```

### Using Different Queries

```tsx
// By text content
const heading = getByText('Welcome');

// By role
const button = getByRole('button', { name: 'Submit' });

// By CSS selector (via container)
const element = container.querySelector('.my-class');

// Query that doesn't throw (returns null)
const missing = queryByText('Not here');
assert.equal(missing, null);

// Multiple elements
const items = getAllByText(/Item \d+/);
assert.equal(items.length, 3);
```

---

## Assertion Patterns

### Basic Assertions

```tsx
// Equality
assert.equal(actual, expected);
assert.strictEqual(actual, expected); // Stricter

// Truthy/Falsy
assert.ok(value);
assert.ok(!value);

// Not equal
assert.notEqual(actual, unexpected);

// Deep equality (for objects/arrays)
assert.deepStrictEqual(actualObj, expectedObj);
```

### Element Assertions

```tsx
// Element exists
const element = getByText('Hello');
assert.ok(element);

// Element content
assert.equal(element.textContent, 'Hello');

// Element attribute
assert.equal(button.disabled, true);

// CSS class
assert.ok(element.classList.contains('active'));

// Element in document
assert.ok(container.querySelector('.my-class'));
```

---

## Testing Best Practices

### 1. Test Important Behaviors

Focus on testing:
- ✅ Rendering with default props
- ✅ Rendering with custom props
- ✅ Conditional rendering logic
- ✅ User interactions (clicks, input changes)
- ✅ CSS classes and styling behavior
- ✅ Disabled/enabled states

Avoid testing:
- ❌ Implementation details
- ❌ Exact JSX structure
- ❌ Internal state (test behavior instead)

### 2. Use Descriptive Test Names

```tsx
// ✅ Good - describes what is being tested
test('renders loading state when isLoading is true', () => {
  // ...
});

test('calls onSubmit with form data when form is submitted', () => {
  // ...
});

// ❌ Avoid - vague or unclear
test('it works', () => {
  // ...
});

test('test 1', () => {
  // ...
});
```

### 3. Arrange-Act-Assert Pattern

```tsx
test('increments counter when button is clicked', () => {
  // Arrange - set up the test
  const { getByText, getByRole } = render(<Counter initialCount={0} />);
  
  // Act - perform the action
  const button = getByRole('button', { name: 'Increment' });
  button.click();
  
  // Assert - verify the result
  const count = getByText('Count: 1');
  assert.ok(count);
});
```

### 4. Keep Tests Isolated

```tsx
// Each test should be independent
describe('Counter', () => {
  beforeEach(() => {
    createDOM(); // Fresh DOM for each test
  });

  test('starts at 0 by default', () => {
    const { getByText } = render(<Counter />);
    assert.ok(getByText('Count: 0'));
  });

  test('starts at initial count when provided', () => {
    const { getByText } = render(<Counter initialCount={5} />);
    assert.ok(getByText('Count: 5'));
  });
});
```

---

## Running Tests

### Run All Tests

```bash
npm run test
```

### Run Specific Test File

```bash
npm run test -- tests/components/Button/Button.test.tsx
```

### Run Tests in Watch Mode

The project doesn't have a built-in watch mode, but you can run tests after each change:

```bash
npm run test
```

---

## Complete Test Example

### Component (`src/components/Button.tsx`)

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

### Test File (`tests/components/Button/Button.test.tsx`)

```tsx
import { strict as assert } from 'node:assert';
import { beforeEach, describe, test } from 'node:test';
import { render } from '@testing-library/react';
import { createDOM } from '../../test-utils/create-dom';
import { Button } from '../../../src/components/Button';

describe('Button', () => {
  beforeEach(() => {
    createDOM();
  });

  test('renders with required props', () => {
    const { getByText } = render(
      <Button label="Click me" onClick={() => {}} />
    );
    
    const button = getByText('Click me');
    assert.equal(button.textContent, 'Click me');
  });

  test('applies primary variant by default', () => {
    const { container } = render(
      <Button label="Click me" onClick={() => {}} />
    );
    
    const button = container.querySelector('.button--primary');
    assert.ok(button);
  });

  test('applies secondary variant when specified', () => {
    const { container } = render(
      <Button label="Click me" onClick={() => {}} variant="secondary" />
    );
    
    const button = container.querySelector('.button--secondary');
    assert.ok(button);
  });

  test('disables button when disabled prop is true', () => {
    const { getByText } = render(
      <Button label="Click me" onClick={() => {}} disabled={true} />
    );
    
    const button = getByText('Click me') as HTMLButtonElement;
    assert.equal(button.disabled, true);
  });

  test('calls onClick when clicked', () => {
    let clicked = false;
    const handleClick = () => { clicked = true; };
    
    const { getByText } = render(
      <Button label="Click me" onClick={handleClick} />
    );
    
    const button = getByText('Click me');
    button.click();
    
    assert.equal(clicked, true);
  });
});
```

### Run the Tests

```bash
npm run test
```

---

## Git Commit Conventions for Tests

```bash
# Adding tests for a new component
git commit -m "test: add tests for Button component"

# Updating existing tests
git commit -m "test: improve Button component test coverage"

# Fixing a test
git commit -m "fix(test): resolve Button test assertion issue"
```

---

## Testing Checklist

When creating tests for a component, follow this checklist:

1. **Create test file**
   - [ ] Place in `tests/components/ComponentName/ComponentName.test.tsx`
   - [ ] Import required dependencies (assert, test utilities)
   - [ ] Import component using named import from `../../src/components/ComponentName`
   - [ ] Add `beforeEach(() => createDOM())`

2. **Write test cases**
   - [ ] Test rendering with required props
   - [ ] Test rendering with optional props
   - [ ] Test default values
   - [ ] Test conditional rendering
   - [ ] Test event handlers
   - [ ] Test CSS classes/styling

3. **Use proper assertions**
   - [ ] Use strict assertions from `node:assert`
   - [ ] Don't use `screen` from testing-library
   - [ ] Access elements from render's return values

4. **Run and verify**
   - [ ] Run `npm run test`
   - [ ] All tests pass
   - [ ] Run `npm run check:fix` to ensure code quality

5. **Commit changes**
   - [ ] Use conventional commit format with `test:` prefix
   - [ ] Pre-commit hooks will run automatically

---

## Additional Resources

- **Implementation Guide**: See `.docs/COMPONENT_IMPLEMENTATION_GUIDE.md`
- **Project Setup**: See `.docs/AI_REACT_SETUP_INSTRUCTIONS.md`
- **Main README**: See `README.md` in project root
- **Testing Library Docs**: https://testing-library.com/docs/react-testing-library/intro

---

**Remember**: Good tests give you confidence. Test behavior, not implementation details, and keep tests simple and focused.
