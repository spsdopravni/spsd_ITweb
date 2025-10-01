// Theme System Module
// Centralized export for the modular theme system

export { useTheme } from './useTheme';
export { 
  THEME_CONFIGS, 
  THEME_CLASSES,
  getThemeConfig, 
  getThemeVariant, 
  getDefaultVariant 
} from './ThemeConfig';

export type { 
  ThemeType, 
  ClassicModeType, 
  ThemeVariant, 
  ThemeConfig, 
  ThemeClassName
} from './ThemeConfig';

export type { UseThemeReturn } from './useTheme';

// Re-export commonly used theme utilities
import { THEME_CONFIGS, THEME_CLASSES, getThemeConfig, getThemeVariant, getDefaultVariant } from './ThemeConfig';

export const themeSystem = {
  configs: THEME_CONFIGS,
  classes: THEME_CLASSES,
  utils: {
    getThemeConfig,
    getThemeVariant,
    getDefaultVariant
  }
} as const;