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