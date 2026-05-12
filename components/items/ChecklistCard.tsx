import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChecklistNote } from '../../types';
import { colors, typography, spacing } from '../../constants/theme';

interface ChecklistCardProps {
  checklist: ChecklistNote;
  onPress: () => void;
}

export default function ChecklistCard({ checklist, onPress }: ChecklistCardProps) {
  const completed = checklist.items.filter(i => i.isCompleted).length;
  const total = checklist.items.length;
  const progress = total > 0 ? completed / total : 0;
  const date = new Date(checklist.createdAt).toLocaleDateString('es-ES');

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{checklist.title}</Text>
      <Text style={styles.progress}>{completed}/{total} tareas completadas</Text>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
      </View>
      <Text style={styles.date}>{date}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: colors.checklistColor,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: typography.lg,
    fontWeight: 'bold',
    color: colors.light.text,
    marginBottom: spacing.xs,
  },
  progress: {
    fontSize: typography.sm,
    color: colors.light.textSecondary,
    marginBottom: spacing.xs,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: colors.light.border,
    borderRadius: 3,
    marginBottom: spacing.xs,
  },
  progressBarFill: {
    height: 6,
    backgroundColor: colors.checklistColor,
    borderRadius: 3,
  },
  date: {
    fontSize: typography.xs,
    color: colors.light.textSecondary,
  },
});