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
      top: isFocused || value ? withTiming(8, config) : withTiming(18.5, config),
    };
  });

  return (
    <View>
      <View
        style={{
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
              pointerEvents: 'none',
            },
            animStyles,
          ]}
        >
          <ThemeText size={isFocused || value ? 'sm' : 'base'}>{label}</ThemeText>
        </Animated.View>
        <TextInput
          style={{
            ...(Platform.OS === 'web' && ({ outlineStyle: 'none' } as any)),
            fontFamily: 'Rubik',
            fontSize: 16,
            lineHeight: 19,
            backgroundColor: colors.background.inner,
            color: colors.text.details,
            borderColor: isFocused
              ? colors.border.info
              : error
              ? colors.border.danger
              : colors.border.inverse,
            borderWidth: 1,
            textAlign: 'left',
            letterSpacing: 0,
            fontWeight: '500',
            borderRadius: 10,
            borderStyle: 'solid',
            paddingHorizontal: 16,
            paddingTop: 29,
            paddingBottom: 8,
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
