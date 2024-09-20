import { Text, type TextProps, StyleSheet, StyleProp, TextStyle } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = TextProps & {
  bold?: boolean;
  size?: "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  underline?: false;
};

export function ThemeTitle({ style, size = "lg", bold = true, ...rest }: Props) {
  const colors = useThemeColor();

  const styles = StyleSheet.create({
    "5xl": {
      fontSize: 32,
      lineHeight: 38,
      fontWeight: bold ? "700" : "400",
    },
    "4xl": {
      fontSize: 29,
      lineHeight: 35,
      fontWeight: bold ? "600" : "400",
    },
    "3xl": {
      fontSize: 26,
      lineHeight: 31,
      fontWeight: bold ? "600" : "400",
    },
    "2xl": {
      fontSize: 23,
      lineHeight: 28,
      fontWeight: bold ? "600" : "400",
    },
    xl: {
      fontSize: 20,
      lineHeight: 24,
      fontWeight: bold ? "600" : "400",
    },
    lg: {
      fontSize: 18,
      lineHeight: 22,
      fontWeight: bold ? "500" : "400",
    },
  });

  return (
    <Text
      style={{
        fontFamily: "Rubik",
        color: colors.text.heading,
        ...styles[size],
        ...(style as TextStyle),
      }}
      {...rest}
    />
  );
}
