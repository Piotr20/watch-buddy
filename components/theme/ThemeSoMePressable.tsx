import { useThemeColor } from '@/hooks/useThemeColor';
import { useState } from 'react';
import { Pressable, PressableProps, StyleSheet, ViewStyle, useColorScheme } from 'react-native';
import { AppleIcon, FacebookIcon, GoogleIcon } from '../icons/';

type Props = PressableProps & {
  provider?: 'google' | 'facebook' | 'apple';
};

export function ThemeSoMePressable({ provider = 'google', style, ...rest }: Props) {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const colors = useThemeColor();
  const theme = useColorScheme() ?? 'light';

  const buttonProviderStyles = StyleSheet.create({
    common: {
      borderRadius: 15,
      width: 60,
      height: 60,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-start',
      ...(theme === 'dark' && { 
        backgroundColor: !isPressed ? colors.background.inverse : colors.background['inverse-pressed'],
        borderWidth: 1,
        borderColor: colors.border.inverse,
        borderStyle: 'solid',
      }),
    },
    google: {
      backgroundColor: !isPressed ? colors.background.base : colors.background['inverse-pressed'],
      borderWidth: 1,
      borderColor: colors.border.base,
      borderStyle: 'solid',
    },
    apple: {
      backgroundColor: !isPressed ? '#000000' : '#1C1C1E',
    },
    facebook: {
      backgroundColor: !isPressed ? '#1877F2' : '#3A8BF4',
    },
  });

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      aria-label={`Sign in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`}
      style={[
        buttonProviderStyles.common,
        theme === "light" && buttonProviderStyles[provider],
        style as ViewStyle,
      ]}
      {...rest}
    >
      {
        provider === "apple" ? (
          <AppleIcon theme={theme}/>
        ) : provider === "google" ? (
          <GoogleIcon theme={theme}/>
        ) : <FacebookIcon theme={theme}/>
      }
    </Pressable>
  );
}
