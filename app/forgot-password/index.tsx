import { SvgIcon } from '@/components/svg-icon';
import { ThemeTextInput, ThemeView } from '@/components/theme';
import { Logo } from '@/components/theme/logo';
import { ThemePressable } from '@/components/theme/ThemePressable';
import { ThemeText, ThemeTitle } from '@/components/theme/typography';
import { useThemeColor } from '@/hooks/useThemeColor';
import { User } from '@/models/user';
import { getUserFromSecureStore } from '@/services/getUserFromSecureStore.service';
import { resendRegisterVerificationEmail } from '@/services/resendRegisterVerificationEmail.service';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, Keyboard, Pressable, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function resetPassword() {
  const colors = useThemeColor();
  const theme = useColorScheme();
  const [email, setEmail] = useState<string>('');
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
              source={require('@/assets/images/illustrations/undraw_text_field_htlv.png')}
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
                marginBottom: 32,
              }}
            >
              Please enter your email to receive an email with reset link
            </ThemeTitle>

            <View>
              <ThemeTextInput
                label="Email"
                textContentType="emailAddress"
                onChangeText={setEmail}
              />
              <ThemePressable
                style={{
                  marginTop: 24,
                }}
                onPress={() => {
                  router.replace('/sign-in');
                }}
              >
                <ThemeText
                  style={{
                    color: colors.text.inverse,
                  }}
                >
                  Reset password
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
                    const status = await resendRegisterVerificationEmail(user?.email);
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
