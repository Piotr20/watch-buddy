import { useSession } from '@/components/AuthProvider';
import { ThemePressable } from '@/components/theme/ThemePressable';
import { ThemeText, ThemeTitle } from '@/components/theme/typography';
import { ThemeTextInput, ThemeView } from '@/components/theme';
import { router } from 'expo-router';
import {
  Alert,
  Button,
  Pressable,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useState } from 'react';
import { EXPO_PUBLIC_API_URL } from '@/util/env-variables';
import * as SecureStore from 'expo-secure-store';

export default function SignUp() {
  const colors = useThemeColor();
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignUp = async () => {
    try {
      const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/registration/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        await SecureStore.setItemAsync('token', data.token);
        Alert.alert('Success', 'User registered successfully');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.detail || 'Failed to register user');
      }
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  return (
    <ThemeView style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          paddingHorizontal: 20,
        }}
      >
        <ThemeTitle
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 64,
          }}
        >
          Create Account
        </ThemeTitle>
        <ThemeView>
          <ThemeTextInput label="Full name" />
          <ThemeTextInput label="Email" />
          <ThemeTextInput label="Password" secureTextEntry info="Has to have 8 characters min" />
          <ThemePressable
            style={{
              marginTop: 8,
            }}
            onPress={() => {
              console.log('Sign up');
              // Navigate after signing in. You may want to tweak this to ensure sign-in is
              // successful before navigating.
              router.replace('/');
            }}
          >
            Create
          </ThemePressable>
        </ThemeView>
        <ThemeView
          style={{
            marginHorizontal: 'auto',
            marginTop: 64,
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
  );
}
