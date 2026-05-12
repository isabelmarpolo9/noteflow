import { Stack } from 'expo-router';

export default function ChecklistsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Tareas' }} />
      <Stack.Screen name="[id]" options={{ headerShown: true, title: 'Detalle' }} />
    </Stack>
  );
}