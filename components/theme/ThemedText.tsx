import { Text, type TextProps, StyleSheet, StyleProp, TextStyle } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  type?: "base" | "title" | "label" | "link";
  bold?: boolean;
  underline?: boolean;
};

export function ThemedText({ style, type = "base", bold = false, underline, ...rest }: ThemedTextProps) {
  const colors = useThemeColor();

  const styles = StyleSheet.create({
    base: {
      fontSize: 16,
      lineHeight: 19.2,
      color: colors.text.base,
    },
    title: {
      fontSize: 32,
      fontWeight: 700,
      lineHeight: 38.4,
      color: colors.text.heading,
    },
    label: {
      fontSize: 14,
      lineHeight: 16.8,
      color: colors.text.base,
    },
    link: {
      fontSize: 16,
      lineHeight: 19.2,
      color: colors.text.link,
      textDecorationLine: underline ? "underline" : "none",
    },
  });

  return <Text style={{ fontFamily: "Rubik-Regular", ...styles[type], ...(style as TextStyle) }} {...rest} />;
}
