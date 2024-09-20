import { SafeAreaView, View, type ViewProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SafeAreaViewProps } from "react-native-safe-area-context";

type Props = SafeAreaViewProps & {};

export function ThemeSafeAreaView({ style, ...rest }: Props) {
  const colors = useThemeColor();

  return <SafeAreaView style={[{ backgroundColor: colors.background.base }, style]} {...rest} />;
}
