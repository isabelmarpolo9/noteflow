import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotesStore } from '../../../store/notesStore';
import { useTheme } from '../../../constants/theme';
import * as Haptics from 'expo-haptics';

export default function ChecklistDetalleScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { checklists, deleteChecklist, toggleChecklistItem } = useNotesStore();
  const { colors } = useTheme();

  const checklist = checklists.find(c => c.id === id);

  if (!checklist) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Tarea no encontrada</Text>
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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{checklist.title}</Text>
      <Text style={[styles.date, { color: colors.textSecondary }]}>
        {new Date(checklist.createdAt).toLocaleDateString('es-ES')}
      </Text>
      {checklist.items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.item, { borderBottomColor: colors.border }]}
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
          <Text style={[styles.itemText, { color: colors.text }, item.isCompleted && styles.itemTextCompleted]}>
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
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  date: { fontSize: 14, marginBottom: 16 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1 },
  checkbox: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#10b981', marginRight: 12 },
  checkboxCompleted: { backgroundColor: '#10b981' },
  itemText: { fontSize: 16 },
  itemTextCompleted: { textDecorationLine: 'line-through', color: '#94a3b8' },
  deleteButton: { backgroundColor: '#ef4444', borderRadius: 8, padding: 16, alignItems: 'center', marginTop: 32 },
  deleteButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
});