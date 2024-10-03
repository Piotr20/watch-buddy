import { useSession } from '@/components/AuthProvider';
import { ThemeTextInput, ThemeView } from '@/components/theme';
import { Logo } from '@/components/theme/logo';
import { ThemePressable } from '@/components/theme/ThemePressable';
import { ThemeText, ThemeTitle } from '@/components/theme/typography';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import { ImageBackground, SafeAreaView, useColorScheme, View } from 'react-native';

export default function SignIn() {
  const { signIn } = useSession();
  const colors = useThemeColor();
  const theme = useColorScheme();

  return (
    <ThemeView style={{ flex: 1 }}>
      <ImageBackground
        source={
          theme === 'light'
            ? require('@/assets/images/backgrounds/movies_yellow.png')
            : require('@/assets/images/backgrounds/movies_yellow_dark.png')
        }
        style={{
          paddingHorizontal: 24,
        }}
      >
        <SafeAreaView>
          <Logo
            type="horizontal"
            style={{
              height: 32,
              width: 144,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
          <ThemeTitle
            size="5xl"
            bold
            style={{
              marginTop: 172,
              marginBottom: 32,
              color: colors.text.heading,
            }}
          >
            Discover Movies Made for You!
          </ThemeTitle>
        </SafeAreaView>
      </ImageBackground>
      <SafeAreaView>
        <View
          style={{
            paddingHorizontal: 24,
          }}
        >
          <View
            style={{
              marginBottom: 16,
            }}
          >
            <ThemeTextInput label="Email" />
          </View>
          <View
            style={{
              marginBottom: 24,
            }}
          >
            <ThemeTextInput label="Password" secureTextEntry />
          </View>
          <ThemePressable
            onPress={() => {
              signIn();
              // Navigate after signing in. You may want to tweak this to ensure sign-in is
              // successful before navigating.
              router.replace('/');
            }}
          >
            <ThemeText
              style={{
                color: colors.text.inverse,
              }}
            >
              Sign In
            </ThemeText>
          </ThemePressable>
        </View>
        <ThemeView
          style={{
            marginHorizontal: 'auto',
            marginTop: 64,
            display: 'flex',
            flexDirection: 'row',
            gap: 4,
          }}
        >
          <ThemeText>Don’t have an account yet?</ThemeText>
          <ThemePressable
            type="icon"
            style={{
              padding: 0,
            }}
            onPress={() => {
              router.push('/sign-up');
            }}
          >
            <ThemeText
              style={{
                color: colors.text.brand,
              }}
            >
              Join us!
            </ThemeText>
          </ThemePressable>
        </ThemeView>
      </SafeAreaView>
    </ThemeView>
  );
}
