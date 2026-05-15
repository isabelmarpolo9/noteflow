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
import { spacing, typography } from '../constants/theme';

const noteSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  content: z.string().min(1, 'El contenido no puede estar vacío'),
});

export default function NuevaNotaScreen() {
  const router = useRouter();
  const { addNote } = useNotesStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  const handleSave = () => {
    const result = noteSchema.safeParse({ title, content });

    if (!result.success) {
  const fieldErrors: { title?: string; content?: string } = {};
  result.error?.errors?.forEach((err) => {
    if (err.path[0] === 'title') fieldErrors.title = err.message;
    if (err.path[0] === 'content') fieldErrors.content = err.message;
  });
  setErrors(fieldErrors);
  return;
}

    setErrors({});
    addNote({
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Escribe un título..."
        />
        {errors.title && <Text style={styles.error}>{errors.title}</Text>}

        <Text style={styles.label}>Contenido</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={content}
          onChangeText={setContent}
          placeholder="Escribe el contenido..."
          multiline
        />
        {errors.content && <Text style={styles.error}>{errors.content}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar nota</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  label: {
    fontSize: typography.md,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
    color: '#0f172a',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: spacing.sm,
    fontSize: typography.md,
    marginBottom: spacing.xs,
    backgroundColor: '#ffffff',
  },
  textarea: {
    height: 150,
    textAlignVertical: 'top',
  },
  error: {
    color: '#ef4444',
    fontSize: typography.sm,
    marginBottom: spacing.sm,
  },
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: typography.md,
    fontWeight: 'bold',
  },
});