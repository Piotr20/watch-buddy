import { SvgIcon } from "@/components/svg-icon";
import { ThemePressable } from "@/components/theme/ThemePressable";
import { ThemeText, ThemeTitle } from "@/components/theme/typography";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native";

export default function Home() {
  return (
    <ThemedView>
      <SafeAreaView>
        <ThemeTitle size="5xl">Title test</ThemeTitle>
        <ThemeText size="base">Default test</ThemeText>
        <ThemePressable>Pressable test</ThemePressable>

        <SvgIcon svg="arc3d" stroke="red" />
      </SafeAreaView>
    </ThemedView>
  );
}
