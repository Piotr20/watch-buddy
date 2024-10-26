import * as SecureStore from 'expo-secure-store';

export async function getUserFromSecureStore() {
  const user = await SecureStore.getItemAsync('user');
  return user ? JSON.parse(user) : null;
}
