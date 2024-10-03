import { SvgIcon } from '@/components/svg-icon';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemeText, ThemeTitle } from '@/components/theme/typography';
import { ThemeSafeAreaView, ThemeTextInput, ThemeView } from '@/components/theme';
import { SafeAreaView, useColorScheme } from 'react-native';
import { ThemePressable } from '@/components/theme/ThemePressable';
import { ThemeSoMePressable } from '@/components/theme/ThemeSoMePressable';
import { GoogleIcon } from '@/components/icons/google';
import { useSession } from '@/components/AuthProvider';

export default function Home() {
  const colors = useThemeColor();
  const theme = useColorScheme() ?? 'light';
  const { signOut, session } = useSession();
  return (
    <ThemeSafeAreaView
      style={{
        paddingHorizontal: 20,
        paddingBottom: 20,
      }}
    >
      <ThemeTitle size="5xl">Title test</ThemeTitle>
      <ThemeText size="base">Default test</ThemeText>

      <ThemePressable>Default Button</ThemePressable>
      <ThemePressable type="secondary">Secondary Button</ThemePressable>
      <ThemePressable type="icon">
        <SvgIcon svg="close" size={24} color={colors.text.warning}></SvgIcon>
      </ThemePressable>
      <ThemeSoMePressable provider="apple"></ThemeSoMePressable>
      <ThemeSoMePressable provider="google"></ThemeSoMePressable>
      <ThemeSoMePressable provider="facebook"></ThemeSoMePressable>

      {/* <SvgIcon svg="arc3d" stroke="red" /> */}
      <SvgIcon svg="arc3d" stroke={colors.background.base} />
      <ThemeTextInput label="Email" />

      <ThemePressable onPress={signOut}>Sign out</ThemePressable>
    </ThemeSafeAreaView>
  );
}
