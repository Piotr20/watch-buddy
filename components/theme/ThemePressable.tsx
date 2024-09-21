import { useThemeColor } from '@/hooks/useThemeColor';
import { ReactNode, useState, useCallback } from 'react';
import { Pressable, PressableProps, StyleSheet, ViewStyle } from 'react-native';
import { ThemeText } from './typography';

type Props = PressableProps & {
  type?: 'base' | 'secondary' | 'icon';
  children: ReactNode;
};

export function ThemePressable({ type = 'base', children, disabled, style, ...rest }: Props) {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const colors = useThemeColor();

  const buttonStyles = StyleSheet.create({
    common: {
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 16,
      width: '100%',
    },
    base: {
      backgroundColor: !isPressed
        ? colors.background.inverse
        : colors.background['inverse-pressed'],
    },
    secondary: {
      backgroundColor: !isPressed ? 'transparent' : colors.background['secondary-pressed'],
      borderWidth: 1,
      borderColor: !isPressed ? colors.border.inverse : colors.border.base,
      borderStyle: 'solid',
    },
    icon: {
      backgroundColor: !isPressed ? 'transparent' : colors.background['secondary-pressed'],
      color: colors.text.base,
      padding: 10,
      textAlign: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      width: 'auto',
      height: 'auto',
      alignSelf: 'flex-start',
    },
    disabled: {
      backgroundColor: colors.background.disabled,
      color: colors.text.disabled,
    },
  });

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[
        (type === 'base' || type === 'secondary') && buttonStyles.common,
        buttonStyles[type],
        disabled && buttonStyles.disabled,
        style as ViewStyle,
      ]}
      {...rest}
    >
      {type === 'icon' ? (
        children
      ) : (
        <ThemeText
          style={{
            textAlign: 'center',
            color: type === 'secondary' ? colors.text.base : colors.text.inverse,
          }}
        >
          {children}
        </ThemeText>
      )}
    </Pressable>
  );
}
