import { ThemedText } from "@/components/theme/ThemedText";
import { ThemePressable } from "@/components/theme/ThemePressable";
import { ThemedView } from "@/components/ThemedView";

export default function Home() {
  return (
    <ThemedView>
      <ThemedText type="title">Title test</ThemedText>
      <ThemedText>Default test</ThemedText>
      <ThemePressable>Click</ThemePressable>
    </ThemedView>
  );
}
