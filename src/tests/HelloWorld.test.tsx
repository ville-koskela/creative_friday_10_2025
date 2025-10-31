import { strict as assert } from 'node:assert';
import { beforeEach, describe, test } from 'node:test';
import { render } from '@testing-library/react';
import HelloWorld from '../components/HelloWorld';
import { createDOM } from './test-utils/create-dom';

describe('HelloWorld', () => {
  // Set up DOM environment before tests
  beforeEach(() => {
    createDOM();
  });

  test('renders with default name', () => {
    // Don't use screen, render and access directly
    const { getByText } = render(<HelloWorld />);
    const heading = getByText('Hello, World!');

    assert.equal(heading.textContent, 'Hello, World!');
  });

  test('renders with custom name', () => {
    const { getByText } = render(<HelloWorld name="React Developer" />);
    const heading = getByText('Hello, React Developer!');

    assert.equal(heading.textContent, 'Hello, React Developer!');
  });

  test('has welcome message', () => {
    const { getByText } = render(<HelloWorld />);
    const welcomeMessage = getByText(
      'Welcome to your React + TypeScript + Vite project.'
    );

    assert.ok(welcomeMessage.textContent);
    assert.ok(welcomeMessage.textContent.includes('React'));
    assert.ok(welcomeMessage.textContent.includes('TypeScript'));
    assert.ok(welcomeMessage.textContent.includes('Vite'));
  });
});
