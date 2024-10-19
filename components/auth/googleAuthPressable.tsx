import {
  EXPO_PUBLIC_ANDROID_GOOGLE_OAUTH2_CLIENT_ID,
  EXPO_PUBLIC_API_URL,
  EXPO_PUBLIC_IOS_GOOGLE_OAUTH2_CLIENT_ID,
} from '@/util/env-variables';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, { useEffect } from 'react';
import { Alert, Pressable, StyleProp, useColorScheme, View, ViewStyle } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { GoogleIcon } from '../icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { colors } from '@/constants/colors';

type GoogleSignInError = Error & {
  code?: string;
};

type Props = {
  style?: StyleProp<ViewStyle>;
};

export function GoogleAuthPressable({ style }: Props) {
  const theme = useColorScheme() ?? 'light';
  const themeColor = useThemeColor();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: EXPO_PUBLIC_ANDROID_GOOGLE_OAUTH2_CLIENT_ID,
      iosClientId: EXPO_PUBLIC_IOS_GOOGLE_OAUTH2_CLIENT_ID,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const token = userInfo.data?.idToken;

      // Send token to backend
      const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/social/google/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const data = await response.json();
        await SecureStore.setItemAsync('token', data.token);
        Alert.alert('Success', 'User authenticated successfully', data);
      } else {
        Alert.alert('Error', 'Failed to authenticate user');
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
        Alert.alert('Error', (error as Error).message);
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
      <GoogleIcon theme={theme} />
    </Pressable>
  );
}
