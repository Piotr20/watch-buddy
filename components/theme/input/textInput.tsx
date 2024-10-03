import { useThemeColor } from '@/hooks/useThemeColor';
import { useState } from 'react';
import {
  Platform,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
  type ViewProps,
} from 'react-native';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { ThemeText } from '../typography';

type Props = TextInputProps & {
  label: string;
  error?: string;
  info?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export function ThemeTextInput({ label, error, info, containerStyle, style, ...rest }: Props) {
  const colors = useThemeColor();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [value, setValue] = useState<string>();

  const config = {
    duration: 300,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const animStyles = useAnimatedStyle(() => {
    return {
      top: isFocused || value ? withTiming(5, config) : withTiming(33, config),
      paddingHorizontal: isFocused || value ? 4 : 0,
    };
  });

  return (
    <View>
      <View
        style={{
          paddingTop: 5,
          position: 'relative',
          ...(containerStyle as ViewProps),
        }}
      >
        <Animated.View
          style={[
            {
              position: 'absolute',
              zIndex: 1,
              left: 16,
              transform: [{ translateY: -9.5 }],
              pointerEvents: 'none',
              backgroundColor: colors.background.base,
            },
            animStyles,
          ]}
        >
          <ThemeText>{label}</ThemeText>
        </Animated.View>
        <TextInput
          style={{
            ...(Platform.OS === 'web' && ({ outlineStyle: 'none' } as any)),
            fontFamily: 'Rubik',
            backgroundColor: colors.background.inner,
            color: colors.text.details,
            borderColor: isFocused
              ? colors.border.info
              : error
              ? colors.border.danger
              : colors.border.base,
            borderWidth: 1,
            padding: 16,
            textAlign: 'left',
            lineHeight: 22,
            letterSpacing: 0,
            fontSize: 16,
            fontWeight: '500',
            borderRadius: 10,
            borderStyle: 'solid',
            ...(style as TextStyle),
          }}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setValue(e.nativeEvent.text)}
          {...rest}
        />
      </View>
      {(error || info) && (
        <ThemeText
          size="sm"
          style={{
            color: error ? colors.text.danger : colors.text.base,
          }}
        >
          {error || info}
        </ThemeText>
      )}
    </View>
  );
}
