import * as AppleAuthentication from 'expo-apple-authentication';
import { Falsy, RecursiveArray, RegisteredStyle, useColorScheme, ViewStyle } from 'react-native';

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
          // signed in
        } catch (e) {
          if ((e as any).code === 'ERR_REQUEST_CANCELED') {
            // handle that the user canceled the sign-in flow
          } else {
            // handle other errors
          }
        }
      }}
    />
  );
}
