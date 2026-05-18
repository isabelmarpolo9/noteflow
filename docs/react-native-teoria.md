# Teoría de React Native

## React Native vs app nativa
Una app nativa se escribe en Swift para iOS o Kotlin para Android,
lenguajes específicos de cada sistema operativo. Esto significa que
si quieres la app en los dos sistemas, tienes que escribirla dos veces.

React Native permite escribir el código una sola vez en TypeScript
y ese código se convierte en componentes nativos reales del sistema
operativo. No es una página web dentro del móvil, son botones,
listas y pantallas reales. La diferencia con una app 100% nativa
es mínima en rendimiento pero el ahorro de tiempo es enorme.

## Qué es el Metro bundler
Metro es el empaquetador de React Native. Cuando el proyecto tiene
decenas de archivos separados, Metro los analiza y los junta en un
único archivo que el móvil puede ejecutar.

Además, Metro tiene hot reload: detecta los cambios que haces en
el código y actualiza la app al instante sin tener que recompilarla
entera. Esto hace que el desarrollo sea muy rápido.

## Por qué Expo Go no es suficiente en proyectos reales
Expo Go es una app genérica que ejecuta tu código escaneando un QR,
sin necesidad de compilar nada. Es perfecta para aprender y hacer
prototipos rápidos.

El problema es que Expo Go solo soporta los módulos que Expo
decidió incluir por defecto. Si el proyecto necesita funcionalidades
avanzadas como notificaciones push personalizadas, biometría,
cámara con configuración propia o cualquier módulo nativo externo,
Expo Go no puede ejecutarlas.

Para eso se usa un Development Build: una versión compilada
específicamente para tu proyecto que incluye exactamente los módulos
que necesitas. En proyectos reales siempre se usa Development Build.

## Sistemas de diseño
Se ha elegido Gluestack UI frente a React Native Paper por las
siguientes razones:

- Gluestack UI tiene una filosofía similar a Tailwind CSS, lo que
  permite personalizar completamente la identidad visual de NoteFlow
- React Native Paper implementa Material Design de Google, que da
  un aspecto muy genérico de app Android
- Gluestack UI está optimizado para Expo y TypeScript, el stack
  que usamos en este proyecto

  ## Sistemas de diseño

Se compararon las dos librerías UI principales para Expo:

**Gluestack UI**
- Filosofía similar a Tailwind CSS
- Muy personalizable
- Tuvo problemas de compatibilidad con Expo SDK 54 y React 19
- Requiere muchas dependencias nativas adicionales

**React Native Paper**
- Implementación de Material Design
- Muy estable y bien mantenida
- Integración sencilla con Expo
- Componentes listos para usar sin configuración compleja

Se eligió **React Native Paper** por su estabilidad y compatibilidad
con la versión actual de Expo, ya que Gluestack UI presentó conflictos
de dependencias que impedían arrancar la app correctamente.

## Gestión de estado

Se compararon tres opciones para gestionar el estado en NoteFlow:

**useState**
- Gestiona estado local de un componente
- Si dos pantallas necesitan los mismos datos hay que "elevar" el estado
- Se complica rápido cuando la app crece

**Context API**
- Permite compartir estado entre componentes sin pasarlo por props
- El problema es que cualquier cambio en el contexto re-renderiza
  todos los componentes que lo consumen, aunque no usen el dato que cambió
- Provoca problemas de rendimiento en apps medianas y grandes

**Zustand**
- Almacén global al que cualquier componente puede acceder
- Solo re-renderiza los componentes que usan el dato que cambió
- No necesita providers anidados
- La sintaxis es mucho más simple que Redux
- Es el estándar moderno para apps React Native de tamaño medio

Se eligió Zustand por su simplicidad, rendimiento y porque escala
bien con el tamaño de NoteFlow.

## Rendimiento en listas

FlatList, el componente nativo de React Native, renderiza todos los
elementos de la lista aunque no sean visibles en pantalla. Con listas
largas esto provoca pantallas en blanco al hacer scroll rápido y
consumo innecesario de memoria.

FlashList de Shopify resuelve esto con un sistema de reciclaje más
agresivo: reutiliza los componentes que salen de la pantalla para
renderizar los que entran. La propiedad `estimatedItemSize` le indica
cuánto espacio ocupará cada elemento antes de renderizarlo, lo que
permite calcular mejor qué elementos mostrar en cada momento.

En NoteFlow usamos FlashList en las tres pestañas para garantizar
un scroll fluido aunque haya muchas notas.

## Navegación

Expo Router ofrece tres tipos de navegación que usamos en NoteFlow:

**Tabs (pestañas)**
- Navegación principal entre las tres secciones (Notas, Tareas, Ideas)
- El usuario puede cambiar de sección en cualquier momento
- Las pantallas se mantienen en memoria al cambiar de pestaña

**Stack (pila)**
- Navegación hacia el detalle de una nota
- Cada pantalla se apila encima de la anterior
- El usuario puede volver atrás con el botón de retroceso

**Modal**
- Pantalla de creación de nueva nota
- Se presenta desde abajo cubriendo parcialmente la pantalla
- Transmite que es una acción temporal, no una navegación permanente

## Rehidratación del store

Cuando la app arranca, AsyncStorage carga los datos guardados de forma
asíncrona. Durante ese proceso el store de Zustand está vacío.
A esto se le llama rehidratación.

Si la app renderiza antes de que termine la rehidratación, el usuario
verá brevemente el estado vacío ("No hay notas todavía") aunque tenga
notas guardadas. Para evitar esto se puede usar el método
`useNotesStore.persist.hasHydrated()` para mostrar un indicador de
carga mientras se rehidrata el store.

En NoteFlow la rehidratación es tan rápida que no es perceptible,
pero en apps con muchos datos sería importante implementar este
indicador de carga.