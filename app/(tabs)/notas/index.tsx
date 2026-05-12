import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useNotesStore } from '../../../store/notesStore';
import NoteCard from '../../../components/items/NoteCard';
import { Note } from '../../../types';
import { Text } from 'react-native';

export default function NotasScreen() {
  const { notes } = useNotesStore();
  const router = useRouter();

  if (notes.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No hay notas todavía</Text>
        <Text style={styles.emptySubtext}>Pulsa + para crear una nueva nota</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={notes}
        estimatedItemSize={100}
        renderItem={({ item }: { item: Note }) => (
          <NoteCard
            note={item}
            onPress={() => router.push(`/notas/${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#64748b',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 8,
  },
});