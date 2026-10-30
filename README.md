# Mapa Docente · DigitalSynapse

Guía pública de centros de formación y vías para enseñar en Alicante, Valencia y otras zonas. Incluye 81 fichas, búsqueda, filtros combinables, canales de contacto y orientación para docentes y futuros docentes.

## Abrir y trabajar

Desde esta carpeta:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Python sirve los archivos estáticos en tu ordenador. Abre http://127.0.0.1:8000 y detén el servidor con Ctrl+C. No publica nada. No hace falta instalar paquetes, compilar ni configurar claves.

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Estructura, orientación, fuentes, redes y apoyo voluntario |
| `assets/styles.css` | Colores, tipografía, escritorio, móvil e impresión |
| `assets/data.js` | Fichas de centros (`C`) y vías públicas/privadas (`PUB`, `PRIV`) |
| `assets/app.js` | Búsqueda, filtros, contadores y copia de correos |
| `reference/` | Catálogos de redes y apoyo recuperados del aula; sirven de referencia editorial |
| `docs/PROCEDENCIA.md` | Origen, cambios editoriales y pendientes |
| `docs/SUBIDA.md` | Comandos explicados para una futura subida |
| `docs/MANUAL_PASO_A_PASO.md` | Registro didáctico de preparación, publicación y actualizaciones |

Los catálogos de `reference/` no se cargan en el navegador. Al cambiar una URL o el texto de apoyo hay que actualizar también `index.html`. El campo de script del catálogo de apoyo se conserva como referencia del aula: este mapa solo usa un enlace normal a Buy Me a Coffee.

## Actualizar centros

Edita la ficha en `assets/data.js`: `n` es el nombre; `z` admite A (Alicante), V (Valencia), AV (ambas) u O (otras zonas/sin ubicar); `s` admite `ok`, `part` y `none`. Usa contactos profesionales cuya finalidad pública pueda comprobarse. Añade la URL y la fecha de la comprobación a la nota o al registro editorial cuando la revises. No conviertas una ficha de directorio en una oferta vigente sin comprobarla.

Prueba búsqueda por nombre y ciudad, filtros de zona/estado juntos, desactivación de filtros, cero resultados, copia y copia rechazada, navegación por teclado y anchuras de 320, 390 y 1440 px. Comprueba temas claro/oscuro. Antes de subir, ejecuta:

```bash
node --check assets/data.js
node --check assets/app.js
git diff --check
```

Estas comprobaciones detectan sintaxis y espacios problemáticos; no sustituyen la revisión en el navegador.

## Estado del contenido

La fuente original está fechada el 30/10/2026. Esta preparación conserva sus 81 centros y su orientación; **no se ha hecho una nueva verificación de centros, ofertas, requisitos, tarifas o convocatorias**. «Verificado» refleja la clasificación original, no acredita al centro ni garantiza vacantes. Los ejemplos y cifras deben contrastarse con las bases vigentes.

Hay un correo nominativo omitido hasta confirmar su finalidad pública; la ficha conserva sus portales de empleo. El usuario confirmó la dirección pública del aula: https://tan-peafowl-110712.hostingersite.com . Se integra como «Entrar al aula de práctica». No se han trasladado cuentas, datos de alumnado ni soluciones del aula.

## Publicación

Web: https://splurtch.github.io/mapa_fpe_valencia/ · Repositorio: https://github.com/Splurtch/mapa_fpe_valencia . GitHub Pages publica desde `main` y la carpeta raíz. Las rutas relativas son compatibles con el subdirectorio `/mapa_fpe_valencia/`. El primer despliegue está comprobado por build y HTTP 200; el detalle y las comprobaciones de cada actualización se registran en el [manual paso a paso](docs/MANUAL_PASO_A_PASO.md).

HTML/CSS/JS sencillos, sin backend ni framework. Google Fonts es una dependencia externa opcional; hay fuentes de sistema de reserva. Redes y café son enlaces normales y el mapa no carga el widget, cookies de pago ni analítica. El apoyo es voluntario y no condiciona el acceso.

No se asigna una licencia nueva al material original. Las fuentes externas conservan sus condiciones.
