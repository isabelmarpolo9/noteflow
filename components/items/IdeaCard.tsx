import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IdeaNote } from '../../types';
import { colors, typography, spacing } from '../../constants/theme';

interface IdeaCardProps {
  idea: IdeaNote;
  onPress: () => void;
}

export default function IdeaCard({ idea, onPress }: IdeaCardProps) {
  const date = new Date(idea.createdAt).toLocaleDateString('es-ES');

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: idea.color }]}
      onPress={onPress}
    >
      <Text style={styles.title}>{idea.title}</Text>
      <View style={styles.tagsContainer}>
        {idea.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>#{tag}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.date}>{date}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: typography.lg,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: spacing.xs,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.xs,
  },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  tagText: {
    fontSize: typography.xs,
    color: '#ffffff',
  },
  date: {
    fontSize: typography.xs,
    color: 'rgba(255,255,255,0.8)',
  },
});