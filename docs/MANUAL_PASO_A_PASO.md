# Del archivo HTML a una web pública: Mapa Docente DigitalSynapse

Registro didáctico del trabajo realizado el 30/10/2026. Distingue las acciones ejecutadas de los ejemplos para otros proyectos. No necesitas copiar comandos sin entenderlos: revisa siempre dónde estás, qué archivos entran y qué destino remoto recibiría el cambio.

## 1. Qué estamos publicando y dónde se trabaja

El mapa es una web estática: el navegador recibe HTML, CSS y JavaScript. No necesita servidor de aplicación, base de datos, inicio de sesión ni claves. Git guarda versiones; GitHub almacena el repositorio; GitHub Pages sirve sus archivos como una web. Son tres funciones distintas.

Carpeta de trabajo real del ejecutor:

```text
/home/digitalsynapse/Documents/Codex/2026-10-30/task
```

Proyecto preparado:

```text
/home/digitalsynapse/Documents/Codex/2026-10-30/task/mapa_fpe_valencia
```

Repositorio autorizado: https://github.com/Splurtch/mapa_fpe_valencia . El código y la web serán públicos. El aula permanece en otro repositorio y no se modifica durante este proceso.

## 2. Inspección inicial: mirar antes de escribir

Se ejecutaron `pwd`, `ls -la` y búsquedas con `rg`. `pwd` muestra la carpeta actual; `ls -la` incluye archivos ocultos; `rg` localiza texto o nombres de archivos sin recorrer contenido innecesario. El workspace estaba vacío de archivos del proyecto. Una búsqueda por el nombre de ambos repositorios en Documentos no localizó una copia existente.

El conector GitHub consultó los metadatos de ambos repositorios y las ramas del destino. El mapa era público, tamaño 0 KB y sin ramas. Se repitió esta consulta antes de preparar el primer envío. Esta revisión evita confundir «parece vacío» con «es seguro sobrescribirlo».

El aula se identificó por su README «Aula de práctica · Docencia». Se leyeron sus `AGENTS.md`, README, árbol de archivos y últimas PR. La #4 de comunidad/café ya estaba integrada. Solo se leyeron fuentes relevantes; no se modificó su despliegue ni se trasladaron cuentas, soluciones o datos de alumnos.

## 3. Recuperar el original y conservarlo

La herramienta Library `prepare_materialize` resolvió el archivo conocido `libfile_8c0c9615dec0819191adcf5b85ed12a2`. Devolvió una URL temporal de transferencia, no una ruta local ya existente. Se descargó mediante `curl --fail --silent --show-error … -o …` al destino local `original/Mapa Docente DigitalSynapse.html`. Los puntos suspensivos no son un comando reproducible: la URL era temporal y se omite deliberadamente.

`curl` lee una URL; `--fail` marca error ante respuestas HTTP fallidas; `--show-error` conserva los errores aunque `--silent` quite el progreso; `-o` indica dónde guardar. Se comprobaron los 40.350 bytes y la lectura del archivo. Se aplicó el atributo de versión devuelto por Library. El SHA-256 del original es `66b5b85f07fae23e02aa70cbb6dbdb78db4478f3d03fc5a5fd6bbcd00931eb08`.

El original permanece fuera de la carpeta que se sube. Conserva material pendiente de revisión y permite comparar con la versión preparada; no debe publicarse por accidente.

## 4. Recuperar los destinos reales del aula

Se consultaron estos archivos del aula mediante el conector GitHub:

| Archivo | Qué aportó |
|---|---|
| `011_PLATAFORMA_PRACTICA/content/social-links.json` | Los cinco destinos sociales |
| `011_PLATAFORMA_PRACTICA/content/support.json` | Texto aprobado, URL de café y color |
| `011_PLATAFORMA_PRACTICA/web/src/SocialLinks.tsx` | Confirmación de que el aula consume ese catálogo |
| `docs/COMUNIDAD_Y_CAFE.md` | Contexto y funcionamiento de la integración |

Las URLs exactas y el copy están en `docs/PROCEDENCIA.md`. No se dedujeron nombres de usuario ni direcciones. El dominio del aula aparecía en la configuración de alojamiento: se pidió confirmación antes de convertirlo en enlace público. El usuario confirmó `https://tan-peafowl-110712.hostingersite.com`.

Una petición pública de lectura con `curl` devolvió HTTP 200. Chromium mostró «Aula de práctica · DigitalSynapse» y su pantalla de acceso. No se inició sesión, envió formularios ni probó recuperación. Así se comprueba que un destino es el esperado sin tocar cuentas reales.

## 5. Preparar una estructura sencilla

Antes: un HTML exportado de aproximadamente 40 KB con estilos, datos y lógica juntos.

Después:

```text
mapa_fpe_valencia/
├── index.html
├── .nojekyll
├── assets/
│   ├── styles.css
│   ├── data.js
│   └── app.js
├── reference/
│   ├── social-links.json
│   └── support.json
├── README.md
└── docs/
    ├── PROCEDENCIA.md
    ├── SUBIDA.md
    └── MANUAL_PASO_A_PASO.md
```

`index.html` es la entrada; CSS define la presentación; `data.js` contiene centros y vías; `app.js` implementa búsqueda, filtros y copia. `reference/` conserva catálogos editoriales: el navegador no los carga; si cambian, también hay que actualizar el HTML. `.nojekyll` indica a Pages que sirva el sitio estático directamente, sin procesar plantillas Jekyll.

La edición se realizó con parches de texto y un script Python temporal de transformación, conservando el original. No se añadió framework ni proceso de compilación. Las rutas `./assets/…` funcionan tanto en local como en el subdirectorio del repositorio en Pages.

Se corrigieron `head`, idioma y metadatos; anchuras móviles; mensajes de error al copiar; búsqueda sin tildes y accesibilidad básica. Se integraron redes, acceso al aula y apoyo voluntario al final para mantener los centros como protagonistas. Se conservaron los 81 centros. Las notas personales se neutralizaron y se omitió un correo nominativo sin fuente pública comprobada, dejando sus portales de empleo.

## 6. Comprobar localmente

Comando ejecutado desde el workspace:

```bash
python3 -m http.server 18765 --bind 127.0.0.1
```

Python sirve esa carpeta en el puerto 18765. `127.0.0.1` limita el acceso al propio ordenador. La preview utilizada es `http://127.0.0.1:18765/mapa_fpe_valencia/`. No publica en Internet. Ctrl+C detiene el proceso cuando se ejecuta en tu terminal; hay que volver a arrancarlo si se cierra la sesión.

Comandos ejecutados para la sintaxis y revisión:

```bash
node --check mapa_fpe_valencia/assets/data.js
node --check mapa_fpe_valencia/assets/app.js
git -C mapa_fpe_valencia diff --check
```

`node --check` analiza JavaScript sin ejecutar la aplicación. `git -C` hace que Git trabaje en la carpeta indicada sin cambiar tu terminal. `diff --check` busca errores de espacios en los cambios. Se espera salida vacía y código 0; eso no demuestra por sí solo que la interfaz funcione.

Se ejecutó Playwright con Chromium instalado, sobre el servidor local. El script de evidencia queda fuera de la carpeta pública, en `evidence/run-browser.cjs`. Se indicó la ubicación de Playwright y Chromium mediante las variables de proceso `PLAYWRIGHT_MODULE` y `CHROMIUM_EXECUTABLE`; no contienen claves. No son dependencias del mapa.

La batería verifica 1440/390/320 px, claro/oscuro, 81 fichas, 12 vías, búsqueda, filtros combinados y reversibles, copia correcta/rechazada, enlaces, botón de aula, teclado, movimiento reducido e impresión. Se guardaron capturas y se revisaron visualmente. Un portapapeles simulado permite comprobar éxito y rechazo sin depender de permisos del navegador del equipo.

Las pruebas de interfaz **no revalidan todas las convocatorias, acreditaciones, contactos, tarifas ni requisitos**. Las etiquetas de los centros proceden de la fuente original. Esa revisión editorial debe hacerse con sus fuentes antes de confiar en una oferta o presentar una candidatura.

## 7. Preparar Git y revisar qué se enviaría

Comandos ejecutados:

```bash
git init -b codex/comunidad-cafe mapa_fpe_valencia
git -C mapa_fpe_valencia remote add origin https://github.com/Splurtch/mapa_fpe_valencia.git
git -C mapa_fpe_valencia add -N .
git -C mapa_fpe_valencia status --short --branch
git -C mapa_fpe_valencia diff --stat
```

`init` crea el historial local en una carpeta nueva; no clona ni sobrescribe GitHub. `-b` nombra la rama de preparación. `remote add` guarda el destino, sin enviar archivos. `add -N` marca intención de añadir para que los archivos nuevos aparezcan en `diff`; todavía no prepara su contenido para commit. `status` muestra la situación y `diff --stat` resume los cambios. Con archivos nuevos, el indicador aparece como ` A`, en la columna de cambios sin preparar.

Se ejecutó `gh auth status` para comprobar la cuenta de GitHub CLI. Con acceso de red autorizado respondió que la cuenta Splurtch estaba conectada. No se copiaron tokens al proyecto. También:

```bash
git -C mapa_fpe_valencia ls-remote --heads origin
gh api repos/Splurtch/mapa_fpe_valencia/pages
```

`ls-remote` consulta las ramas sin modificarlas; la salida estaba vacía. La consulta de Pages devolvió 404: no había un sitio configurado. Un 404 aislado también puede deberse a permisos; aquí se contrastó con cuenta conectada, repositorio accesible y autorización administrativa.

Se configuró exclusivamente en este repositorio el correo público de privacidad de GitHub:

```bash
git -C mapa_fpe_valencia config user.email '220085828+Splurtch@users.noreply.github.com'
```

Esto afecta a la autoría de los commits nuevos de esta copia, no a tu correo de cuenta ni a otros proyectos. El nombre existente es Splurtch. En otro proyecto usa tu propia identidad y tu dirección noreply de GitHub, no copies la de este ejemplo.

## 8. Registro de publicación

La publicación está autorizada por el usuario. Este apartado se completará con los comandos realmente ejecutados, el commit remoto y el resultado de Pages. La revisión local y la configuración de Pages son hechos diferentes de una web servida correctamente.

## 9. Problemas reales y cómo se resolvieron

- El sandbox no resolvía algunos destinos externos: las operaciones necesarias se ejecutaron mediante la revisión de permisos del entorno. No se desactivaron controles ni se copiaron credenciales.
- `gh auth status` dentro del sandbox aparentó token inválido; al comprobar con acceso de red autorizado, la cuenta del llavero era válida. No hubo que cambiar credenciales.
- El primer puerto de prueba estaba ocupado: se eligió 18765 sin detener ni modificar el servicio ajeno.
- Chromium no podía arrancar dentro del sandbox y la versión por defecto no estaba instalada: se utilizó un binario ya instalado, mediante ejecución local autorizada.
- Un caso de prueba buscaba un centro inexistente: se corrigió el ensayo para usar Trébol. Otra comparación confundía la barra final que normaliza el navegador: se compararon los atributos originales. No eran defectos de los destinos.
- Al retomar, el servidor local ya no estaba activo: se arrancó de nuevo antes de repetir pruebas. Un servidor temporal no es un despliegue.

## 10. Repetirlo en otro proyecto: ejemplos futuros

Estos comandos son ejemplos, **no se han ejecutado para otro proyecto**. Sustituye nombres, rutas, cuenta y repositorio.

```bash
mkdir mi-web
cd mi-web
git init -b main
git remote add origin https://github.com/TU-CUENTA/TU-REPO.git
```

Primero crea o revisa el repositorio remoto y confirma que no hay trabajo previo. Prepara un `index.html` y sus recursos; usa rutas relativas. No añadas contraseñas, archivos `.env`, datos personales ni dependencias de servidor si Pages solo va a servir archivos estáticos. Arranca un servidor local y verifica la web. Revisa `git status`, `git diff` y el destino antes de preparar el commit.

Si prefieres la interfaz de GitHub para Pages, el recorrido equivalente es repositorio → Settings → Pages → Build and deployment → Deploy from a branch → rama `main`, carpeta `/ (root)` → Save. **Este recorrido es una alternativa didáctica; la publicación de este proyecto se documenta con el mecanismo realmente utilizado en el apartado 8.** Espera a que GitHub confirme el despliegue y comprueba su URL real.

## 11. Actualizar después y recuperarse de un error: ejemplos futuros

Antes de una actualización, desde una copia limpia y vinculada a la rama publicada:

```bash
git status
git pull --ff-only
```

`status` evita mezclar cambios sin revisar. `pull --ff-only` descarga y avanza solo si no hace falta fusionar historias; si se niega, hay divergencia que debe entenderse antes de continuar. No uses `--force` como solución.

Después de editar y probar:

```bash
git add index.html assets docs README.md
git diff --cached
git commit -m "Describir el cambio concreto"
git push
```

`add` selecciona contenido; `diff --cached` muestra exactamente lo preparado; `commit` guarda una versión local; `push` la envía. Tras configurar Pages por rama, un push puede publicar automáticamente: revisa antes de enviarlo. Confirma el commit del build y la página pública después.

Si ya publicaste una versión incorrecta, `git log --oneline` permite localizar el cambio. `git revert IDENTIFICADOR` crea un commit que deshace ese cambio sin borrar el historial. Resuelve cualquier conflicto con cuidado, prueba y sube normalmente. No uses reset destructivo ni force-push para borrar una publicación. Para un archivo sin commit, conserva una copia antes de descartar cambios.

## 12. Evidencia y referencias

Las evidencias locales quedan en `../evidence/`; no se publican con el sitio. La procedencia editorial está en `PROCEDENCIA.md`. El detalle de la subida se mantendrá en este manual y en `SUBIDA.md`.

Documentación oficial consultada: https://docs.github.com/en/rest/pages/pages#create-a-github-pages-site . Ninguna prueba técnica sustituye la comprobación de la vigencia del contenido docente.
