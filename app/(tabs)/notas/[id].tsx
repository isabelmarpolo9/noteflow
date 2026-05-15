import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotesStore } from '../../../store/notesStore';
import { spacing, typography } from '../../../constants/theme';

export default function NotaDetalleScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { notes, deleteNote } = useNotesStore();

  const note = notes.find(n => n.id === id);

  if (!note) {
    return (
      <View style={styles.container}>
        <Text>Nota no encontrada</Text>
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
            deleteNote(note.id);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.date}>
        {new Date(note.createdAt).toLocaleDateString('es-ES')}
      </Text>
      <Text style={styles.content}>{note.content}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Eliminar nota</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md, backgroundColor: '#f8fafc' },
  title: { fontSize: typography.xxl, fontWeight: 'bold', color: '#0f172a', marginBottom: spacing.xs },
  date: { fontSize: typography.sm, color: '#64748b', marginBottom: spacing.md },
  content: { fontSize: typography.md, color: '#0f172a', lineHeight: 24 },
  deleteButton: { backgroundColor: '#ef4444', borderRadius: 8, padding: spacing.md, alignItems: 'center', marginTop: spacing.xl },
  deleteButtonText: { color: '#ffffff', fontSize: typography.md, fontWeight: 'bold' },
});