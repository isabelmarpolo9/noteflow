import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Note } from '../../types';
import { colors, typography, spacing } from '../../constants/theme';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
}

export default function NoteCard({ note, onPress }: NoteCardProps) {
  const date = new Date(note.createdAt).toLocaleDateString('es-ES');

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.content} numberOfLines={2}>{note.content}</Text>
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
    borderLeftColor: colors.noteColor,
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
  content: {
    fontSize: typography.sm,
    color: colors.light.textSecondary,
    marginBottom: spacing.xs,
  },
  date: {
    fontSize: typography.xs,
    color: colors.light.textSecondary,
  },
});
