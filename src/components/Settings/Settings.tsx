import type { FC } from 'react';
import { useRef, useState } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import type { ThemeColors } from '../../types/settings';
import { availableLanguages, defaultThemes } from '../../types/settings';
import './Settings.css';

export const Settings: FC = () => {
  const { settings, updateLanguage, updateTheme, applyPresetTheme } =
    useSettings();
  const [customTheme, setCustomTheme] = useState<ThemeColors>(settings.theme);
  const colorPickerRefs = useRef<{ [key: string]: HTMLInputElement | null }>(
    {}
  );

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateLanguage(e.target.value);
  };

  const handlePresetTheme = (themeName: string) => {
    applyPresetTheme(themeName);
    setCustomTheme(defaultThemes[themeName]);
  };

  const handleColorChange = (colorKey: keyof ThemeColors, value: string) => {
    const newTheme = { ...customTheme, [colorKey]: value };
    setCustomTheme(newTheme);
  };

  const handleApplyCustomTheme = () => {
    updateTheme(customTheme);
  };

  const handleResetToDefaults = () => {
    const defaultTheme = defaultThemes.light;
    setCustomTheme(defaultTheme);
    updateTheme(defaultTheme);
    updateLanguage('en');
  };

  const getCurrentPresetName = (): string | null => {
    for (const [name, theme] of Object.entries(defaultThemes)) {
      if (JSON.stringify(theme) === JSON.stringify(settings.theme)) {
        return name;
      }
    }
    return null;
  };

  const currentPreset = getCurrentPresetName();

  const colorFields: { key: keyof ThemeColors; label: string }[] = [
    { key: 'primary', label: 'Primary Color' },
    { key: 'secondary', label: 'Secondary Color' },
    { key: 'background', label: 'Background' },
    { key: 'surface', label: 'Surface' },
    { key: 'text', label: 'Text' },
    { key: 'textSecondary', label: 'Secondary Text' },
    { key: 'border', label: 'Border' },
    { key: 'success', label: 'Success' },
    { key: 'warning', label: 'Warning' },
    { key: 'error', label: 'Error' },
  ];

  return (
    <div className="settings-container">
      <div className="settings-section">
        <h2 className="settings-section-title">Language Settings</h2>
        <div className="settings-field">
          <label htmlFor="language-select" className="settings-label">
            Language
          </label>
          <select
            id="language-select"
            className="settings-select"
            value={settings.language}
            onChange={handleLanguageChange}
          >
            {availableLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          <p className="settings-description">
            Language support is coming soon. Currently for display only.
          </p>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="settings-section-title">Theme Presets</h2>
        <div className="theme-presets">
          {Object.keys(defaultThemes).map((themeName) => (
            <button
              key={themeName}
              type="button"
              className={`theme-preset-button ${currentPreset === themeName ? 'active' : ''}`}
              onClick={() => handlePresetTheme(themeName)}
            >
              {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <h2 className="settings-section-title">Custom Theme Colors</h2>
        <div className="theme-colors">
          {colorFields.map(({ key, label }) => (
            <div key={key} className="color-field">
              <label htmlFor={`color-${key}`} className="settings-label">
                {label}
              </label>
              <div className="color-input-wrapper">
                <button
                  type="button"
                  className="color-preview"
                  style={{ backgroundColor: customTheme[key] }}
                  onClick={() => colorPickerRefs.current[key]?.click()}
                  aria-label={`Pick ${label} color`}
                />
                <input
                  type="text"
                  id={`color-${key}`}
                  className="color-input"
                  value={customTheme[key]}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  placeholder="#000000"
                />
                <input
                  ref={(el) => {
                    colorPickerRefs.current[key] = el;
                  }}
                  type="color"
                  className="color-picker-native"
                  value={
                    customTheme[key].startsWith('#')
                      ? customTheme[key]
                      : '#000000'
                  }
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  aria-label={`${label} color picker`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="settings-info">
          💡 Tip: Click the color preview to use the color picker, or type
          hex/rgb values directly.
        </div>

        <div className="settings-actions">
          <button
            type="button"
            className="settings-button settings-button-primary"
            onClick={handleApplyCustomTheme}
          >
            Apply Custom Theme
          </button>
          <button
            type="button"
            className="settings-button settings-button-secondary"
            onClick={handleResetToDefaults}
          >
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
};
