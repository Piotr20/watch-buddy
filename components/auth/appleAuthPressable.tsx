import * as AppleAuthentication from 'expo-apple-authentication';
import {
  Alert,
  Falsy,
  RecursiveArray,
  RegisteredStyle,
  useColorScheme,
  ViewStyle,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { EXPO_PUBLIC_API_URL } from '@/util/env-variables';

type Props = {
  style?:
    | ((
        | false
        | ViewStyle
        | RegisteredStyle<ViewStyle>
        | RecursiveArray<Falsy | ViewStyle | RegisteredStyle<ViewStyle>>
      ) &
        (
          | false
          | ViewStyle
          | RegisteredStyle<ViewStyle>
          | RecursiveArray<Falsy | ViewStyle | RegisteredStyle<ViewStyle>>
        ))
    | null
    | undefined;
};

export function AppleAuthPressable({ style }: Props) {
  const theme = useColorScheme();
  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={
        theme === 'light'
          ? AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
          : AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
      }
      cornerRadius={16}
      style={style}
      onPress={async () => {
        try {
          const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
          });
          const token = credential.identityToken;

          // Send token to backend
          const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/social/apple/`, {
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
        } catch (e) {
          if ((e as any).code === 'ERR_REQUEST_CANCELED') {
            Alert.alert('Cancelled', 'User cancelled the login flow');
          } else {
            Alert.alert('Error', 'Failed to authenticate user');
          }
        }
      }}
    />
  );
}
