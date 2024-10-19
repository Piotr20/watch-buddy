import { AppleAuthPressable } from '@/components/auth/appleAuthPressable';
import { GoogleAuthPressable } from '@/components/auth/googleAuthPressable';
import { useSession } from '@/components/AuthProvider';
import { ThemeTextInput, ThemeView } from '@/components/theme';
import { Logo } from '@/components/theme/logo';
import { ThemePressable } from '@/components/theme/ThemePressable';
import { ThemeText, ThemeTitle } from '@/components/theme/typography';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Dimensions,
  ImageBackground,
  Keyboard,
  Pressable,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import { EXPO_PUBLIC_API_URL } from '@/util/env-variables';
import { FacebookAuthPressable } from '@/components/auth/facebookAuthPressable';

export default function SignIn() {
  const { signIn } = useSession();
  const colors = useThemeColor();
  const theme = useColorScheme();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const windowHeight = Dimensions.get('window').height;

  const handleLogin = async () => {
    try {
      const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        await SecureStore.setItemAsync('token', data.token);
        Alert.alert('Success', 'User logged in successfully');
        // Store the token or handle the authenticated user
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.detail || 'Failed to log in');
      }
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  return (
    <Pressable
      style={{
        flex: 1,
        minHeight: windowHeight,
      }}
      onPress={Keyboard.dismiss}
    >
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
          <SafeAreaView edges={['top']}>
            <Logo
              type="horizontal"
              style={{
                height: 32,
                width: 144,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 6,
              }}
            />
            <ThemeTitle
              size="5xl"
              bold
              style={{
                marginTop: 176,
                marginBottom: 24,
                color: theme === 'light' ? colors.text.heading : colors.text.brand,
              }}
            >
              Discover Movies Made for You!
            </ThemeTitle>
          </SafeAreaView>
        </ImageBackground>
        <SafeAreaView
          edges={['bottom']}
          style={{
            flex: 1,
          }}
        >
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
              <ThemeTextInput label="Email" textContentType="emailAddress" />
            </View>
            <View
              style={{
                marginBottom: 24,
              }}
            >
              <ThemeTextInput label="Password" textContentType="password" secureTextEntry />
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
              paddingHorizontal: 24,
              marginTop: 32,
            }}
          >
            <ThemeView
              style={{
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  backgroundColor: colors.border.inverse,
                  width: '100%',
                  height: 1,
                  position: 'absolute',
                }}
              />
              <ThemeText
                style={{
                  backgroundColor: colors.background.base,
                  color: colors.text.base,
                  paddingHorizontal: 16,
                }}
              >
                or
              </ThemeText>
            </ThemeView>
            <ThemeView
              style={{
                marginTop: 24,
                marginHorizontal: 'auto',
                display: 'flex',
                flexDirection: 'row',
                columnGap: 10,
              }}
            >
              <AppleAuthPressable
                style={{
                  width: 60,
                  height: 60,
                }}
              />
              <GoogleAuthPressable />
              <FacebookAuthPressable />
            </ThemeView>
          </ThemeView>

          <ThemeView
            style={{
              marginHorizontal: 'auto',
              marginTop: 'auto',
              marginBottom: 36,
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
    </Pressable>
  );
}
