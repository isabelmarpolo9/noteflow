import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { z } from 'zod';
import { useNotesStore } from '../store/notesStore';
import { spacing, typography, useTheme } from '../constants/theme';

const noteSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  content: z.string().min(1, 'El contenido no puede estar vacío'),
});

const checklistSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
});

const ideaSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  tags: z.string().min(1, 'Añade al menos una etiqueta'),
});

type NoteType = 'note' | 'checklist' | 'idea';

const IDEA_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export default function NuevaNotaScreen() {
  const router = useRouter();
  const { addNote, addChecklist, addIdea } = useNotesStore();
  const { colors } = useTheme();

  const [type, setType] = useState<NoteType>('note');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [selectedColor, setSelectedColor] = useState(IDEA_COLORS[0]);
  const [checklistItem, setChecklistItem] = useState('');
  const [checklistItems, setChecklistItems] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addChecklistItem = () => {
    if (checklistItem.trim()) {
      setChecklistItems([...checklistItems, checklistItem.trim()]);
      setChecklistItem('');
    }
  };

  const handleSave = () => {
    setErrors({});
    const now = new Date();
    const id = Date.now().toString();

    if (type === 'note') {
      const result = noteSchema.safeParse({ title, content });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error?.errors?.forEach((err) => { fieldErrors[err.path[0]] = err.message; });
        setErrors(fieldErrors);
        return;
      }
      addNote({ id, title, content, createdAt: now, updatedAt: now });
    } else if (type === 'checklist') {
      const result = checklistSchema.safeParse({ title });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error?.errors?.forEach((err) => { fieldErrors[err.path[0]] = err.message; });
        setErrors(fieldErrors);
        return;
      }
      addChecklist({
        id, title,
        items: checklistItems.map((text, i) => ({ id: `${id}-${i}`, text, isCompleted: false })),
        createdAt: now, updatedAt: now,
      });
    } else if (type === 'idea') {
      const result = ideaSchema.safeParse({ title, tags });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error?.errors?.forEach((err) => { fieldErrors[err.path[0]] = err.message; });
        setErrors(fieldErrors);
        return;
      }
      addIdea({
        id, title,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        color: selectedColor,
        createdAt: now, updatedAt: now,
      });
    }
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>

        <Text style={[styles.label, { color: colors.text }]}>Tipo</Text>
        <View style={styles.typeSelector}>
          {(['note', 'checklist', 'idea'] as NoteType[]).map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.typeButton, { borderColor: colors.border }, type === t && styles.typeButtonActive]}
              onPress={() => setType(t)}
            >
              <Text style={[styles.typeButtonText, { color: colors.textSecondary }, type === t && styles.typeButtonTextActive]}>
                {t === 'note' ? 'Nota' : t === 'checklist' ? 'Tarea' : 'Idea'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.label, { color: colors.text }]}>Título</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
          value={title}
          onChangeText={setTitle}
          placeholder="Escribe un título..."
          placeholderTextColor={colors.textSecondary}
        />
        {errors.title && <Text style={styles.error}>{errors.title}</Text>}

        {type === 'note' && (
          <>
            <Text style={[styles.label, { color: colors.text }]}>Contenido</Text>
            <TextInput
              style={[styles.input, styles.textarea, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
              value={content}
              onChangeText={setContent}
              placeholder="Escribe el contenido..."
              placeholderTextColor={colors.textSecondary}
              multiline
            />
            {errors.content && <Text style={styles.error}>{errors.content}</Text>}
          </>
        )}

        {type === 'checklist' && (
          <>
            <Text style={[styles.label, { color: colors.text }]}>Añadir tareas</Text>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, { flex: 1, marginBottom: 0, backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
                value={checklistItem}
                onChangeText={setChecklistItem}
                placeholder="Nueva tarea..."
                placeholderTextColor={colors.textSecondary}
              />
              <TouchableOpacity style={styles.addButton} onPress={addChecklistItem}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            {checklistItems.map((item, index) => (
              <Text key={index} style={[styles.checklistItem, { color: colors.text }]}>• {item}</Text>
            ))}
          </>
        )}

        {type === 'idea' && (
          <>
            <Text style={[styles.label, { color: colors.text }]}>Etiquetas (separadas por comas)</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
              value={tags}
              onChangeText={setTags}
              placeholder="ej: trabajo, importante, urgente"
              placeholderTextColor={colors.textSecondary}
            />
            {errors.tags && <Text style={styles.error}>{errors.tags}</Text>}

            <Text style={[styles.label, { color: colors.text }]}>Color</Text>
            <View style={styles.colorSelector}>
              {IDEA_COLORS.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[styles.colorCircle, { backgroundColor: color },
                    selectedColor === color && styles.colorCircleSelected]}
                  onPress={() => setSelectedColor(color)}
                />
              ))}
            </View>
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md },
  label: { fontSize: typography.md, fontWeight: 'bold', marginBottom: spacing.xs, marginTop: spacing.sm },
  input: { borderWidth: 1, borderRadius: 8, padding: spacing.sm, fontSize: typography.md, marginBottom: spacing.xs },
  textarea: { height: 150, textAlignVertical: 'top' },
  error: { color: '#ef4444', fontSize: typography.sm, marginBottom: spacing.sm },
  button: { backgroundColor: '#6366f1', borderRadius: 8, padding: spacing.md, alignItems: 'center', marginTop: spacing.md },
  buttonText: { color: '#ffffff', fontSize: typography.md, fontWeight: 'bold' },
  typeSelector: { flexDirection: 'row', marginBottom: spacing.sm },
  typeButton: { flex: 1, padding: spacing.sm, borderWidth: 1, alignItems: 'center', borderRadius: 8, marginRight: spacing.xs },
  typeButtonActive: { backgroundColor: '#6366f1', borderColor: '#6366f1' },
  typeButtonText: { fontWeight: 'bold' },
  typeButtonTextActive: { color: '#ffffff' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  addButton: { backgroundColor: '#6366f1', padding: spacing.sm, borderRadius: 8, marginLeft: spacing.xs },
  addButtonText: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
  checklistItem: { fontSize: typography.md, marginBottom: spacing.xs, paddingLeft: spacing.sm },
  colorSelector: { flexDirection: 'row', marginBottom: spacing.sm },
  colorCircle: { width: 36, height: 36, borderRadius: 18, marginRight: spacing.sm },
  colorCircleSelected: { borderWidth: 3, borderColor: '#0f172a' },
});