import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function NotaDetalleScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Detalle de la nota: {id}</Text>
    </View>
  );
}
