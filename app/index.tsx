import { SvgIcon } from "@/components/svg-icon";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemeText, ThemeTitle } from "@/components/theme/typography";
import { ThemeSafeAreaView, ThemeTextInput } from "@/components/theme";
import { SafeAreaView } from "react-native";
import { ThemePressable } from "@/components/theme/ThemePressable";

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

      <ThemePressable type="default" state="default">Default Button</ThemePressable>
      <ThemePressable type="secondary" state="default">Secondary Button</ThemePressable>
      <ThemePressable type="icon" state="default" >
        <SvgIcon svg='close24' size={24} color={colors.text.base}></SvgIcon>
      </ThemePressable>

      {/* <SvgIcon svg="arc3d" stroke="red" /> */}
      <SvgIcon svg="arc3d" stroke="red" />
      <ThemeTextInput label="Email" />
    </ThemeSafeAreaView>
  );
}
