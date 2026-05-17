import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotesStore } from '../../../store/notesStore';
import { spacing, typography } from '../../../constants/theme';
import * as Haptics from 'expo-haptics';


export default function IdeaDetalleScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { ideas, deleteIdea } = useNotesStore();

  const idea = ideas.find(i => i.id === id);

  if (!idea) {
    return (
      <View style={styles.container}>
        <Text>Idea no encontrada</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Eliminar idea',
      '¿Estás seguro de que quieres eliminar esta idea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            deleteIdea(idea.id);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: idea.color }]}>
      <Text style={styles.title}>{idea.title}</Text>
      <Text style={styles.date}>
        {new Date(idea.createdAt).toLocaleDateString('es-ES')}
      </Text>
      <View style={styles.tagsContainer}>
        {idea.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>#{tag}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Eliminar idea</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
  title: { fontSize: typography.xxl, fontWeight: 'bold', color: '#ffffff', marginBottom: spacing.xs },
  date: { fontSize: typography.sm, color: 'rgba(255,255,255,0.8)', marginBottom: spacing.md },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.md },
  tag: { backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 12, paddingHorizontal: spacing.sm, paddingVertical: 4, marginRight: spacing.xs, marginBottom: spacing.xs },
  tagText: { fontSize: typography.sm, color: '#ffffff' },
  deleteButton: { backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: spacing.md, alignItems: 'center', marginTop: spacing.xl },
  deleteButtonText: { color: '#ffffff', fontSize: typography.md, fontWeight: 'bold' },
});