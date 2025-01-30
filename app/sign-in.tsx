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

export default function SignIn() {
  const { signIn } = useSession();
  const colors = useThemeColor();
  const theme = useColorScheme();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const windowHeight = Dimensions.get('window').height;

  const loginUser = async () => {
    try {
      const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      // Extract cookies from response headers
      const cookies = response.headers.get('set-cookie');
      if (cookies) {
        const cookieArray = cookies.split(', ');
        const cookieMap: { [key: string]: string } = {};

        cookieArray.forEach((cookie) => {
          const [nameValue, ...attributes] = cookie.split(';');
          if (nameValue) {
            const [name, value] = nameValue.split('=');
            if (name && value) {
              cookieMap[name.trim()] = value.trim();
            }
          }
        });

        console.log('Cookies:', cookieMap);

        // Store relevant cookies in SecureStore
        if (cookieMap['_auth']) await SecureStore.setItemAsync('auth_token', cookieMap['_auth']);
        if (cookieMap['refresh_token'])
          await SecureStore.setItemAsync('refresh_token', cookieMap['refresh_token']);
        if (cookieMap['csrftoken'])
          await SecureStore.setItemAsync('csrftoken', cookieMap['csrftoken']);
        if (cookieMap['sessionid'])
          await SecureStore.setItemAsync('sessionid', cookieMap['sessionid']);
      }

      if (response.ok) {
        const data = await response.json();
        console.log('Data:', data);

        if (data.access) {
          await SecureStore.setItemAsync('access_token', data.access);
        }
        if (data.refresh) {
          await SecureStore.setItemAsync('refresh_token', data.refresh);
        }
        if (data.user) {
          await SecureStore.setItemAsync(
            'user',
            JSON.stringify({
              email: data.user.email,
              username: data.user.username,
              first_name: data.user.first_name,
              last_name: data.user.last_name,
            })
          );
        }
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.detail || 'Failed to register user');
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
            flex: 1,
            justifyContent: 'flex-start',
          }}
          imageStyle={{
            width: '100%',
            height: windowHeight / 2,
          }}
        >
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
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
            <View>
              <ThemeTitle
                size="5xl"
                bold
                style={{
                  paddingHorizontal: 24,
                  marginTop: 48,
                  marginBottom: 24,
                  color: theme === 'light' ? colors.text.heading : colors.text.brand,
                }}
              >
                Discover Movies Made for You!
              </ThemeTitle>

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
                  <ThemeTextInput
                    label="Email"
                    autoCapitalize="none"
                    textContentType="emailAddress"
                    onChangeText={setEmail}
                  />
                </View>
                <View
                  style={{
                    marginBottom: 24,
                  }}
                >
                  <ThemeTextInput
                    label="Password"
                    textContentType="password"
                    secureTextEntry
                    onChangeText={setPassword}
                  />
                </View>
                <ThemePressable
                  onPress={async () => {
                    await loginUser();
                    router.push('/(auth)');
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
                <ThemePressable
                  style={{
                    marginTop: 16,
                  }}
                  type="text"
                  onPress={() => {
                    router.push('/forgot-password');
                  }}
                >
                  Forgot password?
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
                </ThemeView>
              </ThemeView>
            </View>
            <ThemeView
              style={{
                marginHorizontal: 'auto',
                marginBottom: 12,
                display: 'flex',
                flexDirection: 'row',
                gap: 4,
              }}
            >
              <ThemeText>Don't have an account yet?</ThemeText>
              <ThemePressable
                type="icon"
                style={{
                  padding: 0,
                }}
                onPress={() => {
                  router.push('/registration');
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
        </ImageBackground>
      </ThemeView>
    </Pressable>
  );
}
