import { useThemeColor } from "@/hooks/useThemeColor";
import { Pressable, PressableProps, StyleSheet } from "react-native";

export type ThemedButtonProps = PressableProps & {
  type?: "base" | "primary" | "secondary" | "danger";
};

export function ThemePressable({ style, children, type = "base", ...rest }: ThemedButtonProps) {
  const colors = useThemeColor();

  const styles = StyleSheet.create({
    base: {
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 16,
      paddingRight: 16,
      borderRadius: 5,
    },
    primary: {
      padding: 10,
      borderRadius: 5,
      backgroundColor: "#007bff",
    },
    secondary: {
      padding: 10,
      borderRadius: 5,
      backgroundColor: "#6c757d",
    },
    danger: {
      padding: 10,
      borderRadius: 5,
      backgroundColor: "#dc3545",
    },
  });

  return (
    <Pressable style={{ ...styles[type], ...(style as PressableProps) }} {...rest}>
      {children}
    </Pressable>
  );
}
