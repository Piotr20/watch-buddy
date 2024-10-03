import { useSession } from '@/components/AuthProvider';
import { ThemePressable } from '@/components/theme/ThemePressable';
import { ThemeText, ThemeTitle } from '@/components/theme/typography';
import { ThemeTextInput, ThemeView } from '@/components/theme';
import { router } from 'expo-router';
import { Button, Pressable, SafeAreaView, TextInput, TouchableHighlight } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function SignUp() {
  const colors = useThemeColor();

  return (
    <ThemeView style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          paddingHorizontal: 20,
        }}
      >
        <ThemeTitle
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 64,
          }}
        >
          Create Account
        </ThemeTitle>
        <ThemeView>
          <ThemeTextInput label="Full name" />
          <ThemeTextInput label="Email" />
          <ThemeTextInput label="Password" secureTextEntry info="Has to have 8 characters min" />
          <ThemePressable
            style={{
              marginTop: 8,
            }}
            onPress={() => {
              console.log('Sign up');
              // Navigate after signing in. You may want to tweak this to ensure sign-in is
              // successful before navigating.
              router.replace('/');
            }}
          >
            Create
          </ThemePressable>
        </ThemeView>
        <ThemeView
          style={{
            marginHorizontal: 'auto',
            marginTop: 64,
            display: 'flex',
            flexDirection: 'row',
            gap: 4,
          }}
        >
          <ThemeText>Already have an account?</ThemeText>
          <ThemePressable
            type="icon"
            style={{
              padding: 0,
            }}
            onPress={() => {
              router.push('/sign-in');
            }}
          >
            <ThemeText
              style={{
                color: colors.text.brand,
              }}
            >
              Sign in
            </ThemeText>
          </ThemePressable>
        </ThemeView>
      </SafeAreaView>
    </ThemeView>
  );
}
