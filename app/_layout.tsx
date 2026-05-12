import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="nueva-nota"
          options={{
            headerShown: true,
            presentation: 'modal',
            title: 'Nueva nota',
          }}
        />
      </Stack>
    </PaperProvider>
  );
}