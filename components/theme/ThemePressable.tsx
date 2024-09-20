import { useThemeColor } from "@/hooks/useThemeColor";
import { Pressable, PressableProps, Animated, StyleSheet } from "react-native";
import { SvgIcon } from "../svg-icon";
import { ReactNode } from "react";
import { ThemeText } from "./typography";

export type ThemedButtonProps = PressableProps & {
  type?: "default" | "secondary" | "icon";
  state?: "default" | "pressed" | "disabled";
  children: ReactNode;
};

export function ThemePressable({ onPress, style, children, type = "default", state = "default", ...rest }: ThemedButtonProps) {
  const colors = useThemeColor();

   // Base styles that are common to all buttons
  const baseStyle = {
    paddingVertical: type == "icon" ? 10 : 14,
    paddingHorizontal: type == "icon" ? 10 : 20,
    borderRadius: type == "icon" ? 12 : 16,
    width: type == "icon" ? 'fit-content' : '100%',
    height: 'auto',
  };

  // Styles specific to each type of button
  const typeStyles = {
    default: {
      backgroundColor: colors.background.inverse,
      color: colors.text.warning,
    },
    secondary: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: colors.border.inverse,
      borderStyle: 'solid',
    },
    icon: {
      backgroundColor: 'transparent',
      color: colors.text.base,
      textAlign: 'center',
      justifyContent: 'center',
    },
  };

  //State styles
  const stateStyles = {
    pressed: {
      default: {
        backgroundColor: colors.background["inverse-pressed"],
      },
      secondary: {
        backgroundColor: colors.background["secondary-pressed"],
      },
      icon: {
        backgroundColor: colors.background["secondary-pressed"],
      },
    },
    disabled: {
        backgroundColor: colors.background.disabled,
        color: colors.text.disabled,
    },
  };

  const buttonStyles = StyleSheet.create({
    button: {
      ...baseStyle,
      ...(typeStyles[type] || {}),

      // Handle pressed state
      ...(state === "pressed" && type === "default" ? stateStyles.pressed.default : {}),
      ...(state === "pressed" && type === "secondary" ? stateStyles.pressed.secondary : {}),
      ...(state === "pressed" && type === "icon" ? stateStyles.pressed.icon : {}),

      // Handle disabled state
      ...(state === "disabled" ? stateStyles.disabled : {}),
    },
    text: {
      textAlign: 'center',
    }
  });

  return (
    <Pressable 
      style={{ ...buttonStyles.button, ...(style as PressableProps) }} 
      {...rest}
      onPress={onPress}
    >
      <ThemeText style={buttonStyles.text}>{children}</ThemeText>
    </Pressable>
  );
}
