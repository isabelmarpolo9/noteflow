import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotesStore } from '../../../store/notesStore';
import { spacing, typography } from '../../../constants/theme';
import * as Haptics from 'expo-haptics';

export default function ChecklistDetalleScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { checklists, deleteChecklist, toggleChecklistItem } = useNotesStore();

  const checklist = checklists.find(c => c.id === id);

  if (!checklist) {
    return (
      <View style={styles.container}>
        <Text>Tarea no encontrada</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Eliminar tarea',
      '¿Estás seguro de que quieres eliminar esta lista?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            deleteChecklist(checklist.id);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{checklist.title}</Text>
      <Text style={styles.date}>
        {new Date(checklist.createdAt).toLocaleDateString('es-ES')}
      </Text>
      {checklist.items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.item}
          onPress={() => {
            toggleChecklistItem(checklist.id, item.id);
            const updatedItems = checklist.items.map(i =>
              i.id === item.id ? { ...i, isCompleted: !i.isCompleted } : i
            );
            const allCompleted = updatedItems.every(i => i.isCompleted);
            if (allCompleted) {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            }
          }}
        >
          <View style={[styles.checkbox, item.isCompleted && styles.checkboxCompleted]} />
          <Text style={[styles.itemText, item.isCompleted && styles.itemTextCompleted]}>
            {item.text}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Eliminar lista</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md, backgroundColor: '#f8fafc' },
  title: { fontSize: typography.xxl, fontWeight: 'bold', color: '#0f172a', marginBottom: spacing.xs },
  date: { fontSize: typography.sm, color: '#64748b', marginBottom: spacing.md },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  checkbox: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#10b981', marginRight: spacing.sm },
  checkboxCompleted: { backgroundColor: '#10b981' },
  itemText: { fontSize: typography.md, color: '#0f172a' },
  itemTextCompleted: { textDecorationLine: 'line-through', color: '#94a3b8' },
  deleteButton: { backgroundColor: '#ef4444', borderRadius: 8, padding: spacing.md, alignItems: 'center', marginTop: spacing.xl },
  deleteButtonText: { color: '#ffffff', fontSize: typography.md, fontWeight: 'bold' },
});