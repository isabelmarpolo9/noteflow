import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IdeaNote } from '../../types';
import { useTheme } from '../../constants/theme';

interface IdeaCardProps {
  idea: IdeaNote;
  onPress: () => void;
}

export default function IdeaCard({ idea, onPress }: IdeaCardProps) {
  const { colors } = useTheme();
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
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#ffffff', marginBottom: 4 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 4 },
  tag: { backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2, marginRight: 4, marginBottom: 4 },
  tagText: { fontSize: 12, color: '#ffffff' },
  date: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
});