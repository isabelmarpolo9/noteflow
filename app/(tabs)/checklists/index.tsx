import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useNotesStore } from '../../../store/notesStore';
import ChecklistCard from '../../../components/items/ChecklistCard';
import { ChecklistNote } from '../../../types';

export default function ChecklistsScreen() {
  const { checklists } = useNotesStore();
  const router = useRouter();

  if (checklists.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No hay tareas todavía</Text>
        <Text style={styles.emptySubtext}>Pulsa + para crear una nueva lista</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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