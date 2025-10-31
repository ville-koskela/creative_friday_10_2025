import { strict as assert } from 'node:assert';
import { describe, test } from 'node:test';
import { fireEvent, render, screen } from '@testing-library/react';
import { Settings } from '../../../src/components/Settings/Settings';
import { SettingsProvider } from '../../../src/contexts/SettingsContext';

describe('Settings Component', () => {
  test('renders without crashing', () => {
    render(
      <SettingsProvider>
        <Settings />
      </SettingsProvider>
    );
    assert.ok(screen.getByText('Language Settings'));
    assert.ok(screen.getByText('Theme Presets'));
  });

  test('displays language selector', () => {
    render(
      <SettingsProvider>
        <Settings />
      </SettingsProvider>
    );
    const languageSelect = screen.getByLabelText('Language');
    assert.ok(languageSelect);
  });

  test('displays theme preset buttons', () => {
    render(
      <SettingsProvider>
        <Settings />
      </SettingsProvider>
    );
    assert.ok(screen.getByText('Light'));
    assert.ok(screen.getByText('Dark'));
    assert.ok(screen.getByText('Ocean'));
    assert.ok(screen.getByText('Sunset'));
    assert.ok(screen.getByText('Forest'));
  });

  test('changes language when selected', () => {
    render(
      <SettingsProvider>
        <Settings />
      </SettingsProvider>
    );
    const languageSelect = screen.getByLabelText(
      'Language'
    ) as HTMLSelectElement;
    fireEvent.change(languageSelect, { target: { value: 'fi' } });
    assert.equal(languageSelect.value, 'fi');
  });

  test('displays custom theme color fields', () => {
    render(
      <SettingsProvider>
        <Settings />
      </SettingsProvider>
    );
    assert.ok(screen.getByText('Primary Color'));
    assert.ok(screen.getByText('Secondary Color'));
    assert.ok(screen.getByText('Background'));
  });

  test('displays action buttons', () => {
    render(
      <SettingsProvider>
        <Settings />
      </SettingsProvider>
    );
    assert.ok(screen.getByText('Apply Custom Theme'));
    assert.ok(screen.getByText('Reset to Defaults'));
  });
});
