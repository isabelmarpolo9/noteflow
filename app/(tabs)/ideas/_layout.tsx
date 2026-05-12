import { Stack } from 'expo-router';

export default function IdeasLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Ideas' }} />
      <Stack.Screen name="[id]" options={{ headerShown: true, title: 'Detalle' }} />
    </Stack>
  );
}