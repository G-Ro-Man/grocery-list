import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { GluestackUIProvider, SafeAreaView } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider config={config} colorMode={colorScheme ?? 'light'}>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors[colorScheme ?? 'light'].background}}>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{
            presentation: 'modal',
            title: 'Adding product',
            headerStyle: {
              backgroundColor: Colors[colorScheme ?? 'light'].background,
            },
            headerTintColor: Colors[colorScheme ?? 'light'].tint,
          }}
        />
      </Stack>
      </SafeAreaView>
    </GluestackUIProvider>

  );
}
