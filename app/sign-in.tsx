import { useSession } from "@/components/AuthProvider";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedPressable } from "@/components/ThemePressable";
import { router } from "expo-router";
import { Button, Pressable, SafeAreaView, TextInput, TouchableHighlight } from "react-native";

export default function SignIn() {
  const { signIn } = useSession();

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView>
        <ThemedText
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 64,
          }}
          type="title"
        >
          Sign In
        </ThemedText>
        <ThemedView>
          <TextInput textContentType="emailAddress" />
        </ThemedView>
        <ThemedPressable
          onPress={() => {
            signIn();
            // Navigate after signing in. You may want to tweak this to ensure sign-in is
            // successful before navigating.
            router.replace("/");
          }}
        >
          Sign In
        </ThemedPressable>
      </SafeAreaView>
    </ThemedView>
  );
}
