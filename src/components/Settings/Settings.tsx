import type { FC } from 'react';
import { useRef, useState } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import translations from '../../data/translations-en.json';
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

  const t = translations.settings;

  const colorFields: { key: keyof ThemeColors; label: string }[] = [
    { key: 'primary', label: t.customTheme.colors.primary },
    { key: 'secondary', label: t.customTheme.colors.secondary },
    { key: 'background', label: t.customTheme.colors.background },
    { key: 'surface', label: t.customTheme.colors.surface },
    { key: 'text', label: t.customTheme.colors.text },
    { key: 'textSecondary', label: t.customTheme.colors.textSecondary },
    { key: 'border', label: t.customTheme.colors.border },
    { key: 'success', label: t.customTheme.colors.success },
    { key: 'warning', label: t.customTheme.colors.warning },
    { key: 'error', label: t.customTheme.colors.error },
  ];

  return (
    <div className="settings-container">
      <div className="settings-section">
        <h2 className="settings-section-title">{t.languageSettings.title}</h2>
        <div className="settings-field">
          <label htmlFor="language-select" className="settings-label">
            {t.languageSettings.label}
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
            {t.languageSettings.description}
          </p>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="settings-section-title">{t.themePresets.title}</h2>
        <div className="theme-presets">
          {Object.keys(defaultThemes).map((themeName) => (
            <button
              key={themeName}
              type="button"
              className={`theme-preset-button ${currentPreset === themeName ? 'active' : ''}`}
              onClick={() => handlePresetTheme(themeName)}
            >
              {t.themePresets[themeName as keyof typeof t.themePresets] ||
                themeName.charAt(0).toUpperCase() + themeName.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <h2 className="settings-section-title">{t.customTheme.title}</h2>
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
                  aria-label={t.customTheme.aria.pickColor.replace(
                    '{label}',
                    label
                  )}
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
                  aria-label={t.customTheme.aria.colorPicker.replace(
                    '{label}',
                    label
                  )}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="settings-info">{t.customTheme.tip}</div>

        <div className="settings-actions">
          <button
            type="button"
            className="settings-button settings-button-primary"
            onClick={handleApplyCustomTheme}
          >
            {t.customTheme.actions.apply}
          </button>
          <button
            type="button"
            className="settings-button settings-button-secondary"
            onClick={handleResetToDefaults}
          >
            {t.customTheme.actions.reset}
          </button>
        </div>
      </div>
    </div>
  );
};
