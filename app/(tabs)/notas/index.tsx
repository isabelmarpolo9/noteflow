import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useNotesStore } from '../../../store/notesStore';
import NoteCard from '../../../components/items/NoteCard';
import { Note } from '../../../types';
import { useTheme } from '../../../constants/theme';

export default function NotasScreen() {
  const { notes } = useNotesStore();
  const router = useRouter();
  const { colors, spacing, typography } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {notes.length === 0 ? (
        <View style={styles.empty}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No hay notas todavía</Text>
          <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>Pulsa + para crear una nueva nota</Text>
        </View>
      ) : (
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
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/nueva-nota')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 18, fontWeight: 'bold' },
  emptySubtext: { fontSize: 14, marginTop: 8 },
  fab: {
    position: 'absolute', bottom: 24, right: 24,
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: '#6366f1', alignItems: 'center',
    justifyContent: 'center', elevation: 5,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, shadowRadius: 4,
  },
  fabText: { fontSize: 28, color: '#ffffff', fontWeight: 'bold' },
});