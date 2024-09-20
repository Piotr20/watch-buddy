import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemeView } from "@/components/theme";
import { ThemeText, ThemeTitle } from "@/components/theme/typography";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemeView style={styles.container}>
        <ThemeTitle>This screen doesn't exist.</ThemeTitle>
        <Link href="/" style={styles.link}>
          <ThemeText>Go to home screen!</ThemeText>
        </Link>
      </ThemeView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
