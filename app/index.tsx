import { SvgIcon } from '@/components/svg-icon';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemeText, ThemeTitle } from '@/components/theme/typography';
import { ThemeSafeAreaView, ThemeTextInput } from '@/components/theme';
import { SafeAreaView } from 'react-native';
import { ThemePressable } from '@/components/theme/ThemePressable';
import { ThemeSoMePressable } from '@/components/theme/ThemeSoMePressable';

export default function Home() {
  const colors = useThemeColor();
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
      <ThemeSoMePressable provider='apple'></ThemeSoMePressable>
      <ThemeSoMePressable provider='google'></ThemeSoMePressable>
      <ThemeSoMePressable provider='facebook'></ThemeSoMePressable>

      {/* <SvgIcon svg="arc3d" stroke="red" /> */}
      <SvgIcon svg="arc3d" stroke="red" />
      <ThemeTextInput label="Email" />
    </ThemeSafeAreaView>
  );
}
