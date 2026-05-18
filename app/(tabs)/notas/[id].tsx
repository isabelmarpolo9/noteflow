import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotesStore } from '../../../store/notesStore';
import { useTheme } from '../../../constants/theme';
import * as Haptics from 'expo-haptics';

export default function NotaDetalleScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { notes, deleteNote } = useNotesStore();
  const { colors, spacing, typography } = useTheme();

  const note = notes.find(n => n.id === id);

  if (!note) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Nota no encontrada</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Eliminar nota',
      '¿Estás seguro de que quieres eliminar esta nota?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            deleteNote(note.id);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{note.title}</Text>
      <Text style={[styles.date, { color: colors.textSecondary }]}>
        {new Date(note.createdAt).toLocaleDateString('es-ES')}
      </Text>
      <Text style={[styles.content, { color: colors.text }]}>{note.content}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Eliminar nota</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  date: { fontSize: 14, marginBottom: 16 },
  content: { fontSize: 16, lineHeight: 24 },
  deleteButton: { backgroundColor: '#ef4444', borderRadius: 8, padding: 16, alignItems: 'center', marginTop: 32 },
  deleteButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
});