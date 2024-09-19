import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function Home() {
  return (
    <ThemedView>
      <ThemedText type="title">Title test</ThemedText>
      <ThemedText>Default test</ThemedText>
    </ThemedView>
  );
}
