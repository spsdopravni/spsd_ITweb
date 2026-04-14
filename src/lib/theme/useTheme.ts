// Theme system has been removed — site uses a single classic-light theme.
// This hook is kept for backward compatibility with existing components.

type ThemeType = 'modern' | 'classic';
type ClassicModeType = 'light' | 'dark';

interface UseThemeReturnType {
  theme: ThemeType;
  classicMode: ClassicModeType;
  currentThemeConfig: null;
  currentVariant: null;
  switchTheme: (newTheme?: ThemeType, variantId?: string) => void;
  switchClassicMode: (mode?: ClassicModeType) => void;
  getThemeClasses: () => {
    background: string;
    text: string;
    cardBg: string;
    border: string;
    accent: string;
  };
  isCurrentTheme: (themeType: string, variantId?: string) => boolean;
  getBackgroundClass: () => string;
  getTextClass: () => string;
  getCardClass: () => string;
  getBorderClass: () => string;
  getAccentClass: () => string;
}

export const useTheme = (): UseThemeReturnType => {
  return {
    theme: 'classic',
    classicMode: 'light',
    currentThemeConfig: null,
    currentVariant: null,
    switchTheme: () => {},
    switchClassicMode: () => {},
    getThemeClasses: () => ({
      background: '',
      text: '',
      cardBg: '',
      border: '',
      accent: '',
    }),
    isCurrentTheme: (themeType: string, variantId?: string) => {
      if (themeType !== 'classic') return false;
      if (variantId && variantId !== 'light') return false;
      return true;
    },
    getBackgroundClass: () => '',
    getTextClass: () => '',
    getCardClass: () => '',
    getBorderClass: () => '',
    getAccentClass: () => '',
  };
};

export type UseThemeReturn = UseThemeReturnType;
