import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotesStore } from '../../../store/notesStore';
import { useTheme } from '../../../constants/theme';
import * as Haptics from 'expo-haptics';

export default function IdeaDetalleScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { ideas, deleteIdea } = useNotesStore();
  const { colors } = useTheme();

  const idea = ideas.find(i => i.id === id);

  if (!idea) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Idea no encontrada</Text>
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
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginBottom: 4 },
  date: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 16 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  tag: { backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4, marginRight: 4, marginBottom: 4 },
  tagText: { fontSize: 14, color: '#ffffff' },
  deleteButton: { backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: 16, alignItems: 'center', marginTop: 32 },
  deleteButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
});