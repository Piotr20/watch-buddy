import { SessionProvider } from '@/components/AuthProvider';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function Root() {
  const [loaded, error] = useFonts({
    Rubik: require('@/assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Medium': require('@/assets/fonts/Rubik-Medium.ttf'),
    'Rubik-Semibold': require('@/assets/fonts/Rubik-SemiBold.ttf'),
    'Rubik-Bold': require('@/assets/fonts/Rubik-Bold.ttf'),
    'Rubik-Black': require('@/assets/fonts/Rubik-Black.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
