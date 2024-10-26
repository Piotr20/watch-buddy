import { SvgIcon } from '@/components/svg-icon';
import { ThemeView } from '@/components/theme';
import { Logo } from '@/components/theme/logo';
import { ThemePressable } from '@/components/theme/ThemePressable';
import { ThemeText, ThemeTitle } from '@/components/theme/typography';
import { useThemeColor } from '@/hooks/useThemeColor';
import { User } from '@/models/user';
import { getUserFromSecureStore } from '@/services/getUserFromSecureStore.service';
import { resetPassword } from '@/services/resetPassword.service';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, Keyboard, Pressable, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordEmailVerify() {
  const colors = useThemeColor();
  const theme = useColorScheme();
  const [user, setUser] = useState<User>();
  const [resendStatus, setResendStatus] = useState<boolean>(false);

  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    getUserFromSecureStore().then((user) => {
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
        <SafeAreaView
          style={{
            flex: 1,
            paddingHorizontal: 24,
            justifyContent: 'flex-start',
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
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Image
              source={require('@/assets/images/illustrations/verification-checkmark.png')}
              style={{
                width: '50%',
                aspectRatio: 1,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />
            <ThemeTitle
              size="3xl"
              bold
              style={{
                marginTop: 40,
                marginBottom: 12,
              }}
            >
              We've sent you a verification email!
            </ThemeTitle>
            <ThemeText
              style={{
                marginBottom: 32,
              }}
            >
              We've sent you a verification email to{' '}
              <ThemeText
                bold
                style={{
                  color: colors.text.brand,
                }}
              >
                {user?.email}
              </ThemeText>
              . Please verify your email to continue.
            </ThemeText>

            <View>
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
                marginTop: 32,
                marginBottom: 8,
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
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  ...(resendStatus && {
                    borderColor: colors.text.success,
                    pointerEvents: 'none',
                  }),
                }}
                onPress={async () => {
                  if (user?.email) {
                    const status = await resetPassword(user?.email);
                    setResendStatus(status);
                    setTimeout(() => {
                      setResendStatus(false);
                    }, 3000);
                  }
                }}
              >
                {resendStatus ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 20,
                    }}
                  >
                    <SvgIcon svg="checkcircle" color={colors.text.success} />
                    <ThemeText
                      style={{
                        color: colors.text.success,
                      }}
                    >
                      Email sent
                    </ThemeText>
                  </View>
                ) : (
                  <ThemeText>Resend email</ThemeText>
                )}
              </ThemePressable>
            </ThemeView>
          </View>
        </SafeAreaView>
      </ThemeView>
    </Pressable>
  );
}
