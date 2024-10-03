import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

type Props = ViewProps & {};

export function ThemeView({ style, ...rest }: Props) {
  const colors = useThemeColor();

  return <View style={[{ backgroundColor: colors.background.base }, style]} {...rest} />;
}
