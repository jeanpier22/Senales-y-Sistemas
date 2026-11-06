# Señales y Sistemas — reglas de trabajo

Curso de **Señales y Sistemas** (2026-2), Universidad Católica San Pablo,
Facultad de Ingeniería · Ing. Electrónica y de Telecomunicaciones.
Jefe de práctica: Ing. Jeanpier Ancori Sánchez.

---

## 0. Alcance: qué se puede tocar

**Solo esta carpeta.** `Cursos/` contiene otros cursos (`Circuitos Electrónicos`,
`Electrónica Digital`, `Antenas y Propagación`). Se pueden **leer** como referencia
de formato, pero **no se editan, ni se renombran, ni se les añaden archivos**. Ningún
cambio sube por encima de `Cursos/Señales y Sistemas/`.

Este archivo tampoco se copia a `Cursos/`: allí afectaría a todos los cursos.

---

## 1. Estructura del repositorio

```
Señales y Sistemas/
├── CLAUDE.md                   este archivo
├── README.md                   instrucciones de despliegue, para humanos
├── Contenidos/                 material que se dicta en clase
│   ├── Semana_N/                 una carpeta por semana
│   │   ├── NN_Tema.ipynb           notebooks de Colab, numerados por orden de dictado
│   │   ├── README.md               índice de la semana y convenciones del código
│   │   └── _original/              material de partida, sin modificar
│   └── Series_de_Fourier/        sección temática, no atada a una semana
│       ├── NN_Tema.ipynb           mismas convenciones que Semana_N
│       ├── README.md
│       ├── LaTeX/                  Series_de_Fourier.tex/.pdf (material de clase impreso)
│       │   └── imagenes/             figuras PDF vectoriales
│       └── Codigo/                 generar_figuras.py (produce las figuras)
├── Practica_N/                 una carpeta por práctica
│   ├── LaTeX/
│   │   ├── Practica_N.tex        fuente de la guía
│   │   ├── Practica_N.pdf        compilado (queda sin comprimir)
│   │   └── imagenes/             figuras que usa el .tex
│   ├── Circuito/                 esquemático y montaje (Tinkercad, Proteus)
│   └── Codigo/                   sketches .ino y scripts de apoyo
├── herramientas/               utilidades en Python
├── web/                        sitio React que se publica en GitHub Pages
│   ├── public/practicas/labN/    archivos que descarga el visitante
│   ├── public/material/<id>/     archivos del material de clase
│   └── src/data/practicas.js     catálogo (PRACTICAS y MATERIAL_CLASE): el único archivo a editar
└── .github/workflows/deploy.yml  publicación automática
```

La numeración es **`Practica_N`** (no `Laboratorio_N`), y el identificador que usa la
web para esa misma práctica es **`labN`**. `herramientas/observar_latex.py` ya asume
esa correspondencia.

Las carpetas se numeran **sin ceros a la izquierda y con guion bajo**: `Practica_2`,
`Semana_4`. Nada de espacios en los nombres de carpeta — rompen las rutas de los scripts
y del despliegue. Dentro de `Contenidos/Semana_N/` los notebooks sí van con dos dígitos
(`01_`, `02_`, `03_`) porque ahí el cero mantiene el orden de dictado al listar.

`Contenidos/` es material de clase y `Practica_N/` es material de laboratorio: son cosas
distintas y no se mezclan. Lo primero se dicta, lo segundo se califica.

---

## 2. Formato de los informes (LaTeX)

Las guías siguen el formato ya consolidado en los otros cursos. No inventar uno nuevo.

### Motor y tipografía
- **Compilar con XeLaTeX, nunca con pdflatex.** El documento usa **Trebuchet MS**,
  una fuente TrueType del sistema que solo `fontspec` bajo XeLaTeX o LuaLaTeX sabe cargar.
- **No incluir `inputenc` ni `fontenc`:** XeLaTeX trabaja en UTF-8 de forma nativa y
  esos paquetes dan error con este motor.
- `\usepackage[spanish,es-nodecimaldot]{babel}`.

### Estructura de la página
- `\documentclass[11pt,a4paper]{article}`, márgenes 2,4 / 2,4 / 3,1 / 2,6 cm.
- Encabezado y pie con `fancyhdr`: a la izquierda la facultad, a la derecha el periodo
  y el docente; al pie, el número y título de la práctica y `Página N de M` (`lastpage`).
- **Secciones numeradas en romanos** (`\renewcommand{\thesection}{\Roman{section}}`),
  subsecciones en arábigos colgando de ellas (2.1, 2.2…), `secnumdepth` a 3.
- Cabecera de la guía: tabla de tres columnas con el número de práctica en cuerpo 58,
  el título, la casilla **Nota**, y debajo las filas de **Grupo / Fecha** y **Alumno(s)**.

### Orden de las secciones
`I. Objetivos` · `II. Marco teórico` · `III. Materiales` · `IV. Construcción` ·
`V. Desarrollo / Caracterización` · `VI. Cuestionario` · `VII. Conclusiones`.

Las secciones calificadas llevan el puntaje en el título con `\puntos{n}`, y los
puntajes deben **sumar 20**.

### Cajas y comandos propios
| Comando / entorno | Para qué |
|---|---|
| `\begin{notatec}{tema}` | nota técnica (marco azul) |
| `\begin{seguridad}{tema}` | advertencia de seguridad (marco rojo) |
| `\begin{ejemplo}{tema}` | ejemplo resuelto (marco verde) |
| `\lineasresp{n}` | n líneas punteadas para que el alumno escriba |
| `\puntos{n}` | puntaje al final del título de una sección |

### Convenciones de contenido
- **Números y unidades siempre con `siunitx`** (`\qty{5}{\volt}`), configurado con
  `output-decimal-marker={,}` y `mode=match`. Sin `mode=match` los números salen en
  Computer Modern en medio de un párrafo en Trebuchet.
- babel-spanish rotula las tablas como «Cuadro»; se fuerza **«Tabla»** con
  `\addto\captionsspanish{\renewcommand{\tablename}{Tabla}}`.
- `\FloatBarrier` al cerrar cada sección para que las figuras no se escapen.
- Viudas y huérfanas prohibidas (`\widowpenalty=\clubpenalty=10000`) y `needspace`
  antes de `\section` y `\subsection`.
- **Lista de materiales:** cantidad en **dos dígitos** al principio de cada línea
  (`01 Arduino UNO…`, `04 resistencias de 1 kΩ…`) y el designador del esquemático
  entre paréntesis al final. Los componentes que pueden averiarse en el montaje van
  **por duplicado y en negrita**.
- Cuidado con `babel` en español: deja **activos `<` y `>`** para las comillas
  latinas. Dentro de TikZ hay que escribir `{Stealth}-{Stealth}` en vez de `<->`,
  o la compilación se rompe.
- `\textasciitilde` se lee como un guion en Trebuchet: usar `$\sim$`.

### Changelog en la cabecera del .tex
Convención propia y **obligatoria**: el `.tex` abre con un bloque de comentarios que
registra el curso, el docente, el autor y **una entrada por versión** explicando *qué*
cambió y sobre todo *por qué*, incluyendo las decisiones descartadas y los errores de
compilación que costó encontrar. Ese bloque es la memoria del documento: es donde se
busca antes de rehacer algo que ya se probó.

### Nivel del texto
Son alumnos de los primeros semestres. Cuando una sección exija una herramienta que
todavía no han visto, **no se recorta el temario: se apuntala** — se añade una
subsección previa, un ejemplo resuelto en una caja `\ejemplo`, o una tabla con la
primera fila ya rellenada para que el alumno repita el patrón en vez de despejar de cero.

---

## 3. Plataforma web

### Tecnologías
React 19 · Vite 8 · Tailwind CSS 4 · React Router 7 · lucide-react · GitHub Actions.

### Reglas que no se cambian
- **`base: './'` y `HashRouter`.** GitHub Pages sirve estáticos y devuelve 404 al
  recargar una ruta profunda; con el hash lo resuelve el navegador. Así el sitio
  funciona en cualquier subcarpeta sin tocar configuración.
- **Todo el contenido vive en `web/src/data/practicas.js`.** Ningún componente
  conoce una práctica concreta. Publicar una práctica es: copiar archivos a
  `web/public/practicas/labN/`, poner `estado: 'disponible'` y rellenar
  `documento{}` y `descargas[]`. **No se tocan componentes para añadir contenido.**
- `CRONOGRAMA` vacío oculta la sección de cronograma; no hay que borrar el componente.
- Modo claro/oscuro por clase en `<html>`, aplicada en `main.jsx` **antes** del primer
  pintado para evitar el parpadeo blanco.
- Los textos de la interfaz van **en español**, igual que los nombres de variables,
  props y comentarios del código.

### Formulario de retroalimentación
GitHub Pages no ejecuta código propio. El envío usa **FormSubmit** (sin cuenta ni
clave) hacia `jbancori@ucsp.edu.pe`; la primera vez hay que confirmar la dirección
desde el correo de activación. `VITE_FORMSUBMIT_ID` y `VITE_WEB3FORMS_KEY` son
opcionales y sirven para ocultar la dirección. Todo el transporte está aislado en
`web/src/services/feedback.js`: para cambiar de servicio solo se reescribe
`enviarRetroalimentacion()`.

### Despliegue
`git push` a `main` dispara `.github/workflows/deploy.yml`, que construye `web/` y
publica `web/dist` en GitHub Pages. En GitHub: **Settings → Pages → Source: GitHub Actions**.

---

## 4. Herramientas

```bash
python herramientas/observar_latex.py 2        # recompila la práctica 2 al guardar
python herramientas/observar_latex.py 2 --una  # una sola pasada
python herramientas/comprimir_pdf.py in.pdf out.pdf   # antes de publicar
python herramientas/generar_metadatos.py web/public   # iconos y tarjeta social
```

- `observar_latex.py` compila con XeLaTeX, repite pasada si quedan referencias sin
  resolver y copia el PDF y el `.tex` a `web/public/practicas/labN/`.
- `comprimir_pdf.py` remuestrea las imágenes a 200 DPI efectivos conservando el texto
  seleccionable. **La copia de `Practica_N/LaTeX/` conserva el PDF original sin
  comprimir; en `web/public/` va la versión ligera.**
- `generar_metadatos.py` lleva la identidad del curso en las constantes `MONOGRAMA`
  y `TITULO` de su cabecera.

Para figuras generadas (curvas, espectros, respuestas en frecuencia): matplotlib,
salida en **PDF vectorial** y con la tipografía del documento (Trebuchet MS), no PNG.

---

## 5. Hardware de la Práctica 2

Arduino UNO como generador y como sistema:

- **Entrada:** dos potenciómetros de 250 kΩ en `A0` y `A1` → dos canales de ADC de 10 bits.
- **Salida:** escalera **R-2R** de 1 kΩ / 2 kΩ sobre pines digitales, con un LED rojo
  como carga visible.
- Esquemático y montaje exportados de Tinkercad en `Practica_2/Circuito/`.

**La relación 2:1 de la escalera R-2R es exacta por diseño.** Sustituir las de 2 kΩ
por las de 2,2 kΩ que suele haber a mano rompe la uniformidad de los escalones del DAC.

---

## 6. Pendientes

- Confirmar el **nombre del docente titular** del curso (`CURSO.docente` está en
  `'Por confirmar'` en `web/src/data/practicas.js` y aparece en la portada).
- Fijar **fechas y grupos de laboratorio** para rellenar `CRONOGRAMA`.
- Compilar `Practica_2.pdf` y pasar la práctica a `estado: 'disponible'`.
- Añadir la **Práctica 1** al catálogo cuando exista: la actual es la N.º 2, y el
  identificador `lab1` está libre.
- Material de clase en la web: ya existe la sección (`MATERIAL_CLASE` en
  `practicas.js`, página `#/material/<id>`) y publica Series de Fourier. Falta publicar
  los notebooks de la Semana 4 de la misma forma si se quiere.
- Activar GitHub Pages en `jeanpier22/Senales-y-Sistemas` (Settings → Pages →
  Source: GitHub Actions). Hasta entonces el despliegue falla en `configure-pages`.
