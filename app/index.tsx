import { SvgIcon } from "@/components/svg-icon";
import { ThemeText, ThemeTitle } from "@/components/theme/typography";
import { ThemeSafeAreaView, ThemeTextInput } from "@/components/theme";
import { SafeAreaView } from "react-native";

export default function Home() {
  return (
    <ThemeSafeAreaView
      style={{
        paddingHorizontal: 20,
        paddingBottom: 20,
      }}
    >
      <ThemeTitle size="5xl">Title test</ThemeTitle>
      <ThemeText size="base">Default test</ThemeText>

      <SvgIcon svg="arc3d" stroke="red" />
      <ThemeTextInput label="Email" />
    </ThemeSafeAreaView>
  );
}
