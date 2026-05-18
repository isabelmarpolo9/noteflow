import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Note } from '../../types';
import { colors, typography, spacing, useTheme } from '../../constants/theme';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
}

export default function NoteCard({ note, onPress }: NoteCardProps) {
  const { colors, isDark } = useTheme();
  const date = new Date(note.createdAt).toLocaleDateString('es-ES');

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface, borderLeftColor: '#6366f1' }]}
      onPress={onPress}
    >
      <Text style={[styles.title, { color: colors.text }]}>{note.title}</Text>
      <Text style={[styles.content, { color: colors.textSecondary }]} numberOfLines={2}>{note.content}</Text>
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
  content: { fontSize: 14, marginBottom: 4 },
  date: { fontSize: 12 },
});