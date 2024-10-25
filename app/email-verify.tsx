import { AppleAuthPressable } from '@/components/auth/appleAuthPressable';
import { GoogleAuthPressable } from '@/components/auth/googleAuthPressable';
import { useSession } from '@/components/AuthProvider';
import { ThemeTextInput, ThemeView } from '@/components/theme';
import { Logo } from '@/components/theme/logo';
import { ThemePressable } from '@/components/theme/ThemePressable';
import { ThemeText, ThemeTitle } from '@/components/theme/typography';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
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
import { User } from '@/models/user';
import { resendVerificationEmail } from '@/services/resendVerificationEmail.service';

async function getPreVerifiedUserFromSecureStore() {
  const user = await SecureStore.getItemAsync('user');
  return user ? JSON.parse(user) : null;
}

export default function EmailVerify() {
  const { signIn } = useSession();
  const colors = useThemeColor();
  const theme = useColorScheme();
  const [user, setUser] = useState<User>();
  const [resendStatus, setResendStatus] = useState<boolean>(false);

  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    getPreVerifiedUserFromSecureStore().then((user) => {
      setUser(user);
    });
  }, []);

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
                marginBottom: 4,
                color: theme === 'light' ? colors.text.heading : colors.text.brand,
              }}
            >
              We've sent you a verification email!
            </ThemeTitle>
            <ThemeText
              style={{
                marginBottom: 24,
              }}
            >
              We've sent you a verification email to{' '}
              <ThemeText
                bold
                style={{
                  color: theme === 'light' ? colors.text.heading : colors.text.brand,
                }}
              >
                {user?.email}
              </ThemeText>
              . Please verify your email to continue.
            </ThemeText>
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
            <ThemePressable
              onPress={() => {
                router.replace('/sign-in');
              }}
            >
              <ThemeText
                style={{
                  color: colors.text.inverse,
                }}
              >
                Go to sign in
              </ThemeText>
            </ThemePressable>
          </View>

          <ThemeView
            style={{
              paddingHorizontal: 24,
              marginTop: 16,
            }}
          >
            <ThemeText
              style={{
                marginBottom: 8,
              }}
            >
              Haven't received the email?
            </ThemeText>
            <ThemePressable
              type="secondary"
              onPress={async () => {
                if (user?.email) {
                  const status = await resendVerificationEmail(user?.email);
                  setResendStatus(status);
                }
              }}
            >
              {resendStatus ? (
                <ThemeText
                  style={{
                    color: colors.text.success,
                  }}
                ></ThemeText>
              ) : (
                <ThemeText>Resend email</ThemeText>
              )}
            </ThemePressable>
          </ThemeView>
        </SafeAreaView>
      </ThemeView>
    </Pressable>
  );
}
