import { useColorScheme } from 'react-native';
import { ColorSchemeName } from 'react-native';

// Colores para modo claro (light)
export const lightColors = {
  background: '#F0F8FA',          // Celeste pálido (casi blanco azulado)
  headerBackground: '#D2ECF3',    // Celeste suave
  text: '#1A1A1A',                // Gris oscuro
  textSecondary: '#4A6C82',       // Azul grisáceo suave
  border: '#C3DDE4',              // Borde celeste muy claro
  buttonBackground: '#A7D8F0',    // Celeste más fuerte
  buttonText: '#003049',          // Azul profundo
  accent: '#00A6ED',              // Azul celeste vivo (color principal)
  inputBackground: '#FFFFFF',     // Blanco para inputs
  divider: '#000000',             // linea divisoria negro
};

// Colores para modo oscuro (dark)
export const darkColors = {
  background: '#0B1C2C',          // Azul marino profundo
  headerBackground: '#132A40',    // Azul marino intermedio
  text: '#E5F6FF',                // Blanco con tinte celeste
  textSecondary: '#9FBBCF',       // Azul gris claro
  border: '#26475E',              // Azul grisáceo oscuro
  buttonBackground: '#1E3A56',    // Azul marino más claro
  buttonText: '#E5F6FF',          // Celeste claro
  accent: '#00BFFF',              // Azul celeste vibrante (color principal)
  inputBackground: '#1A2E42',     // Azul gris para inputs
  divider: '#FFFFFF',             // linea divisoria blanco
};

export const useThemeColors = (forcedTheme?: 'light' | 'dark') => {
  const systemTheme = useColorScheme();
  const theme: ColorSchemeName = forcedTheme ?? systemTheme ?? 'light';

  const colors = theme === 'dark' ? darkColors : lightColors;

  return { theme, colors };
};
