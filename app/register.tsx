import { useSession } from '@/components/AuthProvider';
import { ThemePressable } from '@/components/theme/ThemePressable';
import { ThemeText, ThemeTitle } from '@/components/theme/typography';
import { ThemeTextInput, ThemeView } from '@/components/theme';
import { router } from 'expo-router';
import {
  Alert,
  Button,
  Dimensions,
  ImageBackground,
  Keyboard,
  Pressable,
  TextInput,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useEffect, useState } from 'react';
import { EXPO_PUBLIC_API_URL } from '@/util/env-variables';
import * as SecureStore from 'expo-secure-store';
import { GoogleAuthPressable } from '@/components/auth/googleAuthPressable';
import { AppleAuthPressable } from '@/components/auth/appleAuthPressable';
import { Logo } from '@/components/theme/logo';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Register() {
  const theme = useColorScheme();
  const colors = useThemeColor();
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const windowHeight = Dimensions.get('window').height;

  const registerUser = async () => {
    try {
      const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/registration/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password1: password,
          password2: password,
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
        router.push('/email-verify');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.detail || 'Failed to register user');
      }
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  useEffect(() => {
    console.log('email', email);
    console.log('username', username);
    console.log('password', password);
  }, [email, username, password]);

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
                marginTop: 100,
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
              <ThemeTextInput label="Name" onChangeText={setUsername} />
            </View>
            <View
              style={{
                marginBottom: 16,
              }}
            >
              <ThemeTextInput
                label="Email"
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
                await registerUser();
              }}
            >
              <ThemeText
                style={{
                  color: colors.text.inverse,
                }}
              >
                Create account
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
    </Pressable>
  );
}
