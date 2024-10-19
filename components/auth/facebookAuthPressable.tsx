import React, { useEffect } from 'react';
import { Alert, Pressable, StyleProp, useColorScheme, View, ViewStyle } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { AccessToken, LoginButton } from 'react-native-fbsdk-next';
import { EXPO_PUBLIC_API_URL } from '@/util/env-variables';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export function FacebookAuthPressable({ style }: Props) {
  const theme = useColorScheme() ?? 'light';

  return (
    <View>
      <LoginButton
        style={{
          width: 60,
          height: 60,
          borderRadius: 16,
        }}
        onLoginFinished={async (error, result) => {
          if (error) {
            console.log('login has error: ' + error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            const token = await AccessToken.getCurrentAccessToken();
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/social/facebook/`, {
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
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      />
    </View>
  );
}
