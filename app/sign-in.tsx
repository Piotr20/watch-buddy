import { useSession } from "@/components/AuthProvider";
import { ThemePressable } from "@/components/theme/ThemePressable";
import { ThemeTitle } from "@/components/theme/typography";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { Button, Pressable, SafeAreaView, TextInput, TouchableHighlight } from "react-native";

export default function SignIn() {
  const { signIn } = useSession();

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView>
        <ThemeTitle
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 64,
          }}
        >
          Sign In
        </ThemeTitle>
        <ThemedView>
          <TextInput textContentType="emailAddress" />
        </ThemedView>
        <ThemePressable
          onPress={() => {
            signIn();
            // Navigate after signing in. You may want to tweak this to ensure sign-in is
            // successful before navigating.
            router.replace("/");
          }}
        >
          Sign In
        </ThemePressable>
      </SafeAreaView>
    </ThemedView>
  );
}
