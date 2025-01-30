import { EXPO_PUBLIC_API_URL } from '@/util/env-variables';
import * as SecureStore from 'expo-secure-store';

export async function resetPassword(email: string) {
  try {
    /*  const csrftoken = await SecureStore.getItemAsync('csrftoken'); */
    const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/password/reset/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        /*   'X-CSRFToken': csrftoken || '', */
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      const data = await response.json();
      return true;
    } else {
      throw new Error('Failed to reset password');
    }
  } catch (error) {
    console.error('Failed to rest password:', error);
    return false;
  }
}
