import {
  LayoutAnimation,
  Platform,
  SafeAreaView,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  type ViewProps,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SafeAreaViewProps } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { ThemeView } from "../view";
import { ThemeText } from "../typography";
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from "react-native-reanimated";

type Props = TextInputProps & {
  label: string;
  error?: string;
  info?: string;
};

export function ThemeTextInput({ label, error, info, style, ...rest }: Props) {
  const colors = useThemeColor();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [value, setValue] = useState<string>();

  const config = {
    duration: 300,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const animStyles = useAnimatedStyle(() => {
    return {
      top: isFocused || value ? withTiming(10, config) : withTiming("50%", config),
      paddingHorizontal: isFocused || value ? 0 : 4,
    };
  });

  return (
    <ThemeView>
      <ThemeView
        style={{
          paddingVertical: 10,
          position: "relative",
        }}
      >
        <Animated.View
          style={[
            {
              position: "absolute",
              zIndex: 1,
              left: 16,
              transform: [{ translateY: "-50%" }],
              backgroundColor: colors.background.base,
              pointerEvents: "none",
            },
            animStyles,
          ]}
        >
          <ThemeText style={{}}>{label}</ThemeText>
        </Animated.View>
        <TextInput
          style={{
            ...(Platform.OS === "web" && ({ outlineStyle: "none" } as any)),
            fontFamily: "Rubik",

            backgroundColor: colors.background.base,
            color: colors.text.base,
            borderColor: isFocused ? colors.border.info : error ? colors.border.danger : colors.border.base,
            borderWidth: 1,
            padding: 16,
            textAlign: "left",
            lineHeight: 22,
            letterSpacing: 0,
            fontSize: 16,
            fontWeight: "500",
            borderRadius: 10,
            borderStyle: "solid",
            ...(style as TextStyle),
          }}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setValue(e.nativeEvent.text)}
          {...rest}
        />
      </ThemeView>
      {error ||
        (info && (
          <ThemeText
            size="sm"
            style={{
              color: error ? colors.text.danger : colors.text.base,
            }}
          >
            {error || info}
          </ThemeText>
        ))}
    </ThemeView>
  );
}
