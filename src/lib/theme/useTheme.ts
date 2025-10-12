import { usePreferences } from '@/contexts/PreferencesContext';
import { getThemeConfig, getThemeVariant, getDefaultVariant, THEME_CLASSES, ThemeClassName } from './ThemeConfig';
import type { ThemeType, ClassicModeType } from './ThemeConfig';

export const useTheme = () => {
  const { theme, classicMode, setTheme, setClassicMode } = usePreferences();

  const currentThemeConfig = getThemeConfig(theme);
  const currentVariantId = theme === 'classic' ? classicMode : 'default';
  const currentVariant = getThemeVariant(theme, currentVariantId) || getDefaultVariant(theme);

  const getThemeClasses = () => {
    const className = currentVariant.cssClass as ThemeClassName;
    return THEME_CLASSES[className] || THEME_CLASSES['classic-light'];
  };

  const switchTheme = (newTheme: ThemeType, variantId?: string) => {
    setTheme(newTheme);
    
    if (newTheme === 'classic' && variantId) {
      setClassicMode(variantId as ClassicModeType);
    } else if (newTheme === 'classic' && !variantId) {
      // Keep current classic mode or use default
      setClassicMode(classicMode || 'light');
    }
  };

  const switchClassicMode = (mode: ClassicModeType) => {
    if (theme === 'classic') {
      setClassicMode(mode);
    }
  };

  const isCurrentTheme = (themeType: ThemeType, variantId?: string) => {
    if (theme !== themeType) return false;
    if (themeType === 'classic' && variantId) {
      return classicMode === variantId;
    }
    return true;
  };

  return {
    // Current state
    theme,
    classicMode,
    currentThemeConfig,
    currentVariant,
    
    // Actions
    switchTheme,
    switchClassicMode,
    
    // Utilities
    getThemeClasses,
    isCurrentTheme,
    
    // CSS helpers
    getBackgroundClass: () => currentVariant.backgroundGradient || '',
    getTextClass: () => getThemeClasses().text,
    getCardClass: () => getThemeClasses().cardBg,
    getBorderClass: () => getThemeClasses().border,
    getAccentClass: () => getThemeClasses().accent
  };
};

export type UseThemeReturn = ReturnType<typeof useTheme>;