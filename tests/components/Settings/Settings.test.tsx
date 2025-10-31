import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Settings } from '../../../src/components/Settings/Settings';
import { SettingsProvider } from '../../../src/contexts/SettingsContext';

describe('Settings Component', () => {
  it('renders without crashing', () => {
    render(
      <SettingsProvider>
        <Settings />
      </SettingsProvider>
    );
    expect(screen.getByText('Language Settings')).toBeDefined();
    expect(screen.getByText('Theme Presets')).toBeDefined();
  });

  it('displays language selector', () => {
    render(
      <SettingsProvider>
        <Settings />
      </SettingsProvider>
    );
    const languageSelect = screen.getByLabelText('Language');
    expect(languageSelect).toBeDefined();
  });

  it('displays theme preset buttons', () => {
    render(
      <SettingsProvider>
        <Settings />
      </SettingsProvider>
    );
    expect(screen.getByText('Light')).toBeDefined();
    expect(screen.getByText('Dark')).toBeDefined();
    expect(screen.getByText('Ocean')).toBeDefined();
    expect(screen.getByText('Sunset')).toBeDefined();
    expect(screen.getByText('Forest')).toBeDefined();
  });

  it('changes language when selected', () => {
    render(
      <SettingsProvider>
        <Settings />
      </SettingsProvider>
    );
    const languageSelect = screen.getByLabelText(
      'Language'
    ) as HTMLSelectElement;
    fireEvent.change(languageSelect, { target: { value: 'fi' } });
    expect(languageSelect.value).toBe('fi');
  });

  it('displays custom theme color fields', () => {
    render(
      <SettingsProvider>
        <Settings />
      </SettingsProvider>
    );
    expect(screen.getByText('Primary Color')).toBeDefined();
    expect(screen.getByText('Secondary Color')).toBeDefined();
    expect(screen.getByText('Background')).toBeDefined();
  });

  it('displays action buttons', () => {
    render(
      <SettingsProvider>
        <Settings />
      </SettingsProvider>
    );
    expect(screen.getByText('Apply Custom Theme')).toBeDefined();
    expect(screen.getByText('Reset to Defaults')).toBeDefined();
  });
});
