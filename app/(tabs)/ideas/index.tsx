import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useNotesStore } from '../../../store/notesStore';
import IdeaCard from '../../../components/items/IdeaCard';
import { IdeaNote } from '../../../types';

export default function IdeasScreen() {
  const { ideas } = useNotesStore();
  const router = useRouter();

  if (ideas.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No hay ideas todavía</Text>
        <Text style={styles.emptySubtext}>Pulsa + para crear una nueva idea</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={ideas}
        estimatedItemSize={100}
        renderItem={({ item }: { item: IdeaNote }) => (
          <IdeaCard
            idea={item}
            onPress={() => router.push(`/ideas/${item.id}`)}
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