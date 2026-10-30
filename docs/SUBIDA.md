# Guía de subida y registro inicial

Esta guía se escribió durante la preparación local, antes de autorizar la publicación. Explica el primer envío. El registro actualizado de comandos realmente ejecutados y el resultado de Pages está en [MANUAL_PASO_A_PASO.md](MANUAL_PASO_A_PASO.md). Ejecutar los ejemplos desde la carpeta `mapa_fpe_valencia` y revisar el resultado de cada paso antes de continuar.

## Ver la preparación local

```bash
git status --short --branch
git diff --stat
git diff
```

`status` indica la rama y los archivos modificados; `diff --stat` resume el tamaño del cambio y `diff` permite leerlo. Esta copia usa una rama local `codex/comunidad-cafe`, sin commit. Las marcas de intención de añadir permiten ver los archivos nuevos en el diff; aún no están preparados para commit.

```bash
node --check assets/data.js
node --check assets/app.js
git diff --check
```

Comprueban sintaxis y espacios. Se espera salida vacía y código de salida 0. Después, abrir el servidor y revisar la página como indica el README.

## Comprobar GitHub antes de escribir

```bash
git remote -v
git ls-remote --heads origin
```

El primer comando debe mostrar `https://github.com/Splurtch/mapa_fpe_valencia.git`. El segundo consulta las ramas remotas y no publica nada. Durante esta entrega el repositorio estaba vacío: se espera salida vacía. **Si aparecen ramas, no continúes con el primer envío**: hay trabajo nuevo que debe recuperarse y compararse en una copia limpia, sin sobrescribirlo.

## Solo cuando se autorice la subida

Si el remoto sigue vacío:

```bash
git add index.html assets reference docs README.md
git diff --cached --stat
git diff --cached
git commit -m "Preparar mapa docente con comunidad y apoyo voluntario"
git push -u origin HEAD:main
```

`add` prepara los archivos elegidos; no publica. `diff --cached` muestra exactamente lo que entrará en el commit. `commit` guarda una versión local con nombre e identificador; si falta identidad Git, configura tu nombre/correo para este repositorio antes de seguir. `push` es el primer paso que escribe en GitHub: crea `main` desde esta rama y la vincula para futuras sincronizaciones. Nunca usar `--force`.

Después del push se espera ver los archivos en GitHub y el identificador del commit. Esto no significa que Pages esté activado. Su activación y la verificación de la URL pública son un paso posterior que requiere autorización; no se ha añadido un workflow que publique automáticamente.

Con la publicación autorizada, Pages puede servir `main` y la carpeta raíz. Una vez que GitHub confirme el despliegue, comprobar la URL real que muestre, los archivos relativos, búsqueda/filtros, copia y móvil. Añadir entonces la URL canónica, si procede.
