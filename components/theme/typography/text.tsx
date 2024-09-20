import { Text, type TextProps, StyleSheet, StyleProp, TextStyle } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = TextProps & {
  bold?: boolean;
  size?: "xs" | "sm" | "base";
  underline?: false;
};

export function ThemeText({ style, size = "base", bold = true, underline, ...rest }: Props) {
  const colors = useThemeColor();

  const styles = StyleSheet.create({
    base: {
      fontSize: 16,
      lineHeight: 19,
      fontWeight: bold ? "600" : "400",
    },
    sm: {
      fontSize: 14,
      lineHeight: 17,
      fontWeight: bold ? "500" : "400",
    },
    xs: {
      fontSize: 13,
      letterSpacing: 0.5,
      lineHeight: 16,
      fontWeight: bold ? "500" : "400",
      textTransform: "uppercase",
    },
  });

  return (
    <Text
      style={{
        fontFamily: "Rubik",
        color: colors.text.heading,
        textDecorationLine: underline ? "underline" : "none",
        ...styles[size],
        ...(style as TextStyle),
      }}
      {...rest}
    />
  );
}
