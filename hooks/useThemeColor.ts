/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { ThemeColors } from '@/util/themeColors';
import { useColorScheme } from 'react-native';

export function useThemeColor() {
  const theme = useColorScheme() ?? 'light';

  return ThemeColors[theme];
}
