import React from 'react';
import { Alert, Pressable, StyleProp, ViewStyle } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GoogleIcon } from '../icons'; // Ensure you have a GoogleIcon component
import { useThemeColor } from '@/hooks/useThemeColor';
import { colors } from '@/util/colors';
import { EXPO_PUBLIC_API_URL } from '@/util/env-variables';

type Props = {
  style?: StyleProp<ViewStyle>;
};

type GoogleSignInError = {
  code: string;
  message: string;
};

export function GoogleAuthPressable({ style }: Props) {
  const themeColor = useThemeColor();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const tokens = await GoogleSignin.getTokens();
      const { accessToken, idToken } = tokens;
      console.log('google tokens', tokens);

      // Send token to backend
      const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/google/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: accessToken }),
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

      const data = await response.json();
      console.log('data', data);

      if (data.access) {
        await SecureStore.setItemAsync('access_token', data.access);
        Alert.alert('Success', 'User authenticated successfully', data);
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
    } catch (error) {
      const typedError = error as GoogleSignInError;
      if (typedError.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Cancelled', 'User cancelled the login flow');
      } else if (typedError.code === statusCodes.IN_PROGRESS) {
        Alert.alert('In Progress', 'Sign in is in progress already');
      } else if (typedError.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Play services not available or outdated');
      } else {
        console.log('error', error);
        Alert.alert('Error', 'Network request failed');
      }
    }
  };

  return (
    <Pressable
      onPress={signIn}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 16,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: themeColor.border.inverse,
        ...(style as ViewStyle),
      }}
    >
      <GoogleIcon />
    </Pressable>
  );
}
