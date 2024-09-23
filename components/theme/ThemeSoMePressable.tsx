import { useThemeColor } from '@/hooks/useThemeColor';
import { ReactNode, useState, useCallback, Provider } from 'react';
import { Pressable, PressableProps, StyleSheet, ViewStyle, useColorScheme, Image } from 'react-native';
import { ThemeText } from './typography';
import { SvgIcon } from '@/components/svg-icon';

type Props = PressableProps & {
  provider?: 'google' | 'facebook' | 'apple';
  //children: ReactNode;
};

export function ThemeSoMePressable({ provider = 'google', style, ...rest }: Props) {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const colors = useThemeColor();
  const currentTheme = useColorScheme() ?? 'light';

  const buttonProviderStyles = StyleSheet.create({
    common: {
      borderRadius: 15,
      width: 60,
      height: 60,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-start',
    },
    commonDarkMode: {
      backgroundColor: !isPressed ? '#ffffff' : '#E0E0E9',
      borderWidth: 1,
      borderColor: !isPressed ? '#E0E0E9' : colors.border.base,
      borderStyle: 'solid',
    },
    google: {
      backgroundColor: !isPressed ? '#ffffff' : '#E0E0E9',
      borderWidth: 1,
      borderColor: '#E0E0E9',
      borderStyle: 'solid',
    },
    apple: {
      backgroundColor: !isPressed ? '#000000' : '#1C1C1E',
    },
    facebook: {
      backgroundColor: !isPressed ? '#1877F2' : '#3A8BF4',
    },
    logo: {
      height: 24,
      width: 24,
    },
    appleLogo: {
      height: 24,
      width: 20.22,
    }
  });

  const getProviderLogo = () => {
    const logos = {
      apple: {
        light: require('@/assets/images/soMe-logo/apple-logo-light.png'),
        dark: require('@/assets/images/soMe-logo/apple-logo-dark.png'),
      },
      facebook: {
        light: require('@/assets/images/soMe-logo/facebook-logo-light.png'),
        dark: require('@/assets/images/soMe-logo/facebook-logo-dark.png'),
      },
      google: {
        light: require('@/assets/images/soMe-logo/google-logo.png'),
        dark: require('@/assets/images/soMe-logo/google-logo.png'),
      },
    }

    const logoSource = logos[provider][currentTheme];
    const logoStyle = provider === "apple" ? buttonProviderStyles.appleLogo : buttonProviderStyles.logo;

    return (
      <Image 
        style={logoStyle}
        source={logoSource}
        alt={`Sign in with ${provider.charAt(0).toUpperCase() + provider.slice(1)} - ${currentTheme} mode`}
      />
    )
  };

  const providerLogo = getProviderLogo();
    

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[
        buttonProviderStyles.common,
        currentTheme === 'dark' ? buttonProviderStyles.commonDarkMode : buttonProviderStyles[provider],
        style as ViewStyle,
      ]}
      {...rest}
    >
      {providerLogo}
    </Pressable>
  );
}
