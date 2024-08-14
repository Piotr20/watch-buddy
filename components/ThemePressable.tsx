import { Button, type ButtonProps, Pressable, PressableProps, StyleSheet, Text } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";

export type ThemedButtonProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "primary" | "secondary" | "danger";
};

export function ThemedPressable({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "background");

  return (
    <Pressable
      style={{
        backgroundColor: backgroundColor,
        ...styles.base,
        ...(type === "default" && styles.default),
        ...(type === "primary" && styles.primary),
        ...(type === "secondary" && styles.secondary),
        ...(type === "danger" && styles.danger),
      }}
      {...rest}
    >
      <Text
        style={{
          color: color,
          textAlign: "center",
        }}
        children={rest.children as React.ReactNode}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 5,
  },
  default: {
    padding: 10,
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
