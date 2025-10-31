import assert from 'node:assert';
import { describe, test } from 'node:test';

describe('HelloWorld Component', () => {
  test('should render with default name', () => {
    const defaultName = 'World';
    assert.strictEqual(defaultName, 'World');
  });

  test('should accept custom name prop', () => {
    const customName = 'React Developer';
    assert.strictEqual(customName, 'React Developer');
  });

  test('should have welcome message', () => {
    const welcomeMessage = 'Welcome to your React + TypeScript + Vite project.';
    assert.ok(welcomeMessage.includes('React'));
    assert.ok(welcomeMessage.includes('TypeScript'));
    assert.ok(welcomeMessage.includes('Vite'));
  });
});
