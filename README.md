# Señales y Sistemas — Laboratorios

Sitio web de las prácticas de laboratorio del curso de **Señales y Sistemas** (2026-2),
Facultad de Ingeniería · Ing. Electrónica y de Telecomunicaciones,
Universidad Católica San Pablo.

Cada práctica tiene su propia página con el documento embebido, la lista de materiales,
botones de descarga y un formulario de retroalimentación que llega a
**jbancori@ucsp.edu.pe**.

> Las convenciones de trabajo (formato LaTeX de las guías, reglas de la plataforma,
> qué se puede tocar) están en [`CLAUDE.md`](CLAUDE.md).

---

## Estructura del repositorio

```
Señales y Sistemas/
├── Contenidos/               Material que se dicta en clase
│   └── Semana_4/               notebooks de Colab, una carpeta por semana
├── Practica_2/               Material fuente de cada práctica
│   ├── LaTeX/                  .tex, PDF compilado e imágenes
│   ├── Circuito/               esquemático y montaje (Tinkercad)
│   └── Codigo/                 sketches de Arduino
├── herramientas/             utilidades en Python
├── web/                      Sitio React que se publica en GitHub Pages
│   ├── public/practicas/       archivos servidos al visitante
│   └── src/
│       ├── data/practicas.js   catálogo de prácticas (único archivo a editar)
│       └── services/feedback.js envío del formulario
└── .github/workflows/deploy.yml  publicación automática
```

## Desarrollo local

```bash
cd web
npm install
npm run dev      # http://localhost:5173
npm run build    # genera web/dist
npm run preview  # revisa el build antes de publicar
```

Mientras se escribe una guía, en otra terminal:

```bash
python herramientas/observar_latex.py 2
```

Recompila `Practica_2/LaTeX/Practica_2.tex` con XeLaTeX cada vez que se guarda, copia
el PDF a `web/public/practicas/lab2/` y Vite recarga la página sola.

## Publicar en GitHub Pages

1. Crea el repositorio en GitHub y sube el proyecto:

   ```bash
   git init
   git add .
   git commit -m "Sitio de laboratorios de Señales y Sistemas"
   git branch -M main
   git remote add origin https://github.com/USUARIO/REPOSITORIO.git
   git push -u origin main
   ```

2. En GitHub: **Settings → Pages → Source: GitHub Actions**.

3. Cada `push` a `main` reconstruye y publica el sitio automáticamente.
   Quedará en `https://USUARIO.github.io/REPOSITORIO/`.

> El sitio usa rutas relativas (`base: './'`) y `HashRouter`, así que funciona en cualquier
> subcarpeta sin tocar la configuración, y recargar una práctica no da error 404.

Si el nombre del repositorio no es `Senales-y-Sistemas`, hay que actualizar las cuatro
URL absolutas de `web/index.html` (`canonical`, `og:url` y las dos de `og:image`): las
redes sociales leen el HTML desde sus propios servidores y no resuelven rutas relativas.

## El formulario de retroalimentación

GitHub Pages es hosting **estático**: no ejecuta código propio (ni Python, ni Node, ni PHP).
El envío se hace con **FormSubmit**, un endpoint público al que el navegador manda el
formulario. No hay que desplegar ni mantener ningún servidor, **ni crear ninguna cuenta**.

### Activación (una sola vez)

1. Abre la práctica en el sitio y envía un mensaje de prueba con el botón
   *Enviar retroalimentación*.
2. Llegará un correo de **FormSubmit** a `jbancori@ucsp.edu.pe` pidiendo confirmar la
   dirección. Pulsa el enlace de activación.
3. Listo. Desde ese momento todos los mensajes se entregan directamente.

La interfaz avisa de este paso: en el primer envío muestra que el mensaje quedó registrado
y que falta confirmar la dirección.

### Ocultar la dirección de correo (recomendado)

Al activar, el panel de FormSubmit entrega un identificador aleatorio del tipo `a1b2c3d4e5f6`.
Ponlo en `VITE_FORMSUBMIT_ID` (en `web/.env` y como variable `FORMSUBMIT_ID` en GitHub) para
que la dirección no quede escrita en el código de la página, a la vista de los robots de spam.

### Alternativa: Web3Forms

Si prefieres un servicio con panel de control y estadísticas, registra una clave gratuita en
<https://web3forms.com> y ponla en `VITE_WEB3FORMS_KEY`. Si esa variable existe, tiene
prioridad sobre FormSubmit.

### Si falla la red

El formulario detecta el fallo y ofrece un botón que abre la aplicación de correo del
visitante con el mensaje ya redactado. Nunca se queda sin salida.

## Comprimir el PDF antes de publicarlo

Los PDF compilados desde LaTeX arrastran las imágenes a su resolución original.
`herramientas/comprimir_pdf.py` remuestrea cada imagen a 200 DPI efectivos y elige el
mejor formato para cada una:

```bash
pip install pymupdf pillow
python herramientas/comprimir_pdf.py entrada.pdf salida.pdf
```

Preserva el texto seleccionable y respeta la transparencia. La copia de
`Practica_N/LaTeX/` conserva el PDF original sin comprimir; en `web/public/` va la
versión ligera, que es la que se muestra y se descarga.

## Identidad del sitio

Los iconos y la tarjeta que se ve al compartir el enlace se generan con:

```bash
pip install pillow
python herramientas/generar_metadatos.py web/public
```

El monograma y el título están en las constantes `MONOGRAMA` y `TITULO` de la cabecera
del script.

## Agregar una práctica

1. Copia los archivos a `web/public/practicas/labN/`.
2. En `web/src/data/practicas.js`, añade o completa la entrada `labN`:
   - cambia `estado: 'proximamente'` por `estado: 'disponible'`,
   - completa `titulo`, `resumen`, `objetivos`, `temas` y `materiales`,
   - apunta `documento.src` al PDF y rellena el arreglo `descargas`.
3. `git push`. No hay que tocar ningún componente.

## Tecnologías

React 19 · Vite 8 · Tailwind CSS 4 · React Router 7 · lucide-react · GitHub Actions
