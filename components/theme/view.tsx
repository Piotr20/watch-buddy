import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { forwardRef } from 'react';

type Props = ViewProps & {};

export const ThemeView = forwardRef<View, Props>(function ThemeView(
  { style, ...rest }: Props,
  ref
) {
  const colors = useThemeColor();

  return <View ref={ref} style={[{ backgroundColor: colors.background.base }, style]} {...rest} />;
});
