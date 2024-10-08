import { EXPO_PUBLIC_ANDROID_GOOGLE_OAUTH2_CLIENT_ID } from '@/util/env-variables';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, { useEffect } from 'react';
import { Alert, StyleProp, useColorScheme, View, ViewStyle } from 'react-native';

type GoogleSignInError = Error & {
  code?: string;
};

type Props = {
  style?: StyleProp<ViewStyle>;
};

export function GoogleAuthPressable({ style }: Props) {
  const theme = useColorScheme() ?? 'light';

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: EXPO_PUBLIC_ANDROID_GOOGLE_OAUTH2_CLIENT_ID,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      Alert.alert('User Info', JSON.stringify(userInfo));
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
    <GoogleSigninButton
      onPress={signIn}
      color={theme === 'light' ? 'dark' : 'light'}
      style={{
        borderRadius: 16,
        ...(style as ViewStyle),
      }}
    />
  );
}
