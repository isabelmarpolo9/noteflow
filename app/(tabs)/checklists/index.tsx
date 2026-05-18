import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useNotesStore } from '../../../store/notesStore';
import ChecklistCard from '../../../components/items/ChecklistCard';
import { ChecklistNote } from '../../../types';
import { useTheme } from '../../../constants/theme';

export default function ChecklistsScreen() {
  const { checklists } = useNotesStore();
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {checklists.length === 0 ? (
        <View style={styles.empty}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No hay tareas todavía</Text>
          <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>Pulsa + para crear una nueva lista</Text>
        </View>
      ) : (
        <FlashList
          data={checklists}
          estimatedItemSize={100}
          renderItem={({ item }: { item: ChecklistNote }) => (
            <ChecklistCard
              checklist={item}
              onPress={() => router.push(`/checklists/${item.id}`)}
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
    backgroundColor: '#10b981', alignItems: 'center',
    justifyContent: 'center', elevation: 5,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, shadowRadius: 4,
  },
  fabText: { fontSize: 28, color: '#ffffff', fontWeight: 'bold' },
});