import { Stack } from 'expo-router';

export default function NotasLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Notas' }} />
      <Stack.Screen name="[id]" options={{ headerShown: true, title: 'Detalle' }} />
    </Stack>
  );
}