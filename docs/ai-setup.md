# Configuración de herramientas de IA

## Herramienta utilizada
Claude (Anthropic) como asistente externo durante el desarrollo.

## Por qué Claude
Se ha optado por Claude en lugar de Cursor por limitaciones
de la versión gratuita. Claude se usa como asistente externo
en paralelo a VS Code.

## Configuración aplicada
Se ha creado el archivo `.cursorrules` en la raíz del proyecto
con el contexto completo de NoteFlow:
- Stack tecnológico utilizado
- Estructura de carpetas del proyecto
- Convenciones de nomenclatura
- Restricciones de arquitectura

## Cómo se usa Claude en este proyecto
Al iniciar cada sesión de trabajo se proporciona a Claude
el contexto del proyecto: stack, estructura de carpetas
y restricciones. Así Claude genera código coherente
con las decisiones de arquitectura tomadas y no sugiere
librerías o patrones incompatibles con el proyecto.