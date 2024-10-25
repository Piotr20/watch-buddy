import { EXPO_PUBLIC_API_URL } from '@/util/env-variables';
import * as SecureStore from 'expo-secure-store';

export async function resendVerificationEmail(email: string) {
  try {
    const csrftoken = await SecureStore.getItemAsync('csrftoken');
    const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/registration/resend-email/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken || '',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error('Failed to resend verification email');
    }
  } catch (error) {
    console.error('Failed to resend verification email:', error);
    return false;
  }
}
