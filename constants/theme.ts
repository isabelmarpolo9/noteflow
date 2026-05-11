import { useColorScheme } from 'react-native';

// Paleta de colores
export const colors = {
  primary: '#6366f1',
  primaryDark: '#4f46e5',
  secondary: '#f59e0b',
  success: '#10b981',
  danger: '#ef4444',

  // Notas
  noteColor: '#6366f1',
  checklistColor: '#10b981',
  ideaColor: '#f59e0b',

  // Modo claro
  light: {
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#0f172a',
    textSecondary: '#64748b',
    border: '#e2e8f0',
  },

  // Modo oscuro
  dark: {
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f8fafc',
    textSecondary: '#94a3b8',
    border: '#334155',
  },
};

// Escala tipográfica
export const typography = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Espaciados base
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Hook para obtener los colores según el tema activo
export function useTheme() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return {
    isDark,
    colors: isDark ? colors.dark : colors.light,
    typography,
    spacing,
  };
}