import { SvgIcon } from "@/components/svg-icon";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemePressable } from "@/components/theme/ThemePressable";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native";

export default function Home() {
  return (
    <ThemedView>
      <SafeAreaView>
        <ThemedText type="title">Title test</ThemedText>
        <ThemedText>Default test</ThemedText>
        <ThemePressable>Pressable test</ThemePressable>

        <SvgIcon svg="arc3d" stroke="red" />
      </SafeAreaView>
    </ThemedView>
  );
}
