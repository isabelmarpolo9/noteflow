import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChecklistNote } from '../../types';
import { useTheme } from '../../constants/theme';

interface ChecklistCardProps {
  checklist: ChecklistNote;
  onPress: () => void;
}

export default function ChecklistCard({ checklist, onPress }: ChecklistCardProps) {
  const { colors } = useTheme();
  const completed = checklist.items.filter(i => i.isCompleted).length;
  const total = checklist.items.length;
  const progress = total > 0 ? completed / total : 0;
  const date = new Date(checklist.createdAt).toLocaleDateString('es-ES');

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface, borderLeftColor: '#10b981' }]}
      onPress={onPress}
    >
      <Text style={[styles.title, { color: colors.text }]}>{checklist.title}</Text>
      <Text style={[styles.progress, { color: colors.textSecondary }]}>{completed}/{total} tareas completadas</Text>
      <View style={[styles.progressBarBackground, { backgroundColor: colors.border }]}>
        <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
      </View>
      <Text style={[styles.date, { color: colors.textSecondary }]}>{date}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  progress: { fontSize: 14, marginBottom: 4 },
  progressBarBackground: { height: 6, borderRadius: 3, marginBottom: 4 },
  progressBarFill: { height: 6, backgroundColor: '#10b981', borderRadius: 3 },
  date: { fontSize: 12 },
});