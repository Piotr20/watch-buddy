import { Image, ImageProps, ImageStyle } from 'expo-image';
import { useColorScheme, View, ViewProps, ViewStyle } from 'react-native';
type Props = ImageProps & {
  type?: 'icon' | 'horizontal' | 'horizontal-sm' | 'vertical';
};

export function Logo({ type = 'icon', ...rest }: Props) {
  const theme = useColorScheme() ?? 'light';

  switch (type) {
    case 'icon': {
      const path_light = require('@/assets/images/logos/wb-logo-icon-light.png');
      const path_dark = require('@/assets/images/logos/wb-logo-icon-dark.png');
      return (
        <Image
          source={theme === 'light' ? path_light : path_dark}
          alt={`Watch buddy logo icon ${theme}mode`}
          resizeMode="contain"
          {...rest}
        />
      );
    }

    case 'vertical': {
      const path_light = require('@/assets/images/logos/wb-logo-lg-vertical-light.png');
      const path_dark = require('@/assets/images/logos/wb-logo-lg-vertical-dark.png');
      return (
        <Image
          source={theme === 'light' ? path_light : path_dark}
          alt={`Watch buddy logo icon ${theme}mode`}
          resizeMode="contain"
          {...rest}
        />
      );
    }
    case 'horizontal': {
      const path_light = require('@/assets/images/logos/wb-logo-horizontal-light.png');
      const path_dark = require('@/assets/images/logos/wb-logo-horizontal-dark.png');
      return (
        <Image
          source={theme === 'light' ? path_light : path_dark}
          alt={`Watch buddy logo icon ${theme}mode`}
          resizeMode="contain"
          {...rest}
        />
      );
    }
    case 'horizontal-sm': {
      const path_light = require('@/assets/images/logos/wb-logo-sm-horizontal-light.png');
      const path_dark = require('@/assets/images/logos/wb-logo-sm-horizontal-dark.png');
      return (
        <Image
          source={theme === 'light' ? path_light : path_dark}
          alt={`Watch buddy logo icon ${theme}mode`}
          resizeMode="contain"
          {...rest}
        />
      );
    }
  }
}
