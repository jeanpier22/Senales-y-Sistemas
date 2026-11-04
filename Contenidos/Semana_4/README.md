# Semana 4 — Material de clase

Contenido dictado en la semana 4 de **Señales y Sistemas** (2026-2), repartido en tres
notebooks de Colab. Cada uno es una sesión autocontenida y se apoya en el anterior.

| Notebook | Tema | Depende de |
|---|---|---|
| `01_Funciones_y_graficas.ipynb` | Funciones en Python, vector de tiempo, `plot` vs `stem`, rotulado, muestreo, superposición | — |
| `02_Clasificacion_de_senales.ipynb` | Continua/discreta, real/compleja, plano complejo, determinista/aleatoria, par/impar, simetría conjugada, audio real | 01 |
| `03_Singulares_y_transformaciones.ipynb` | Escalón, rampa, pulso, señales por tramos, desplazamiento, escalado, reflexión, diezmado e interpolación | 01, 02 |

`_original/` conserva los dos notebooks de los que salió este material
(`Semana 4.ipynb` y `Semana 4_ Funciones.ipynb`), sin modificar, como referencia.

## Cómo usarlos

Los tres corren en Colab sin instalar nada: solo necesitan NumPy y Matplotlib, que ya
vienen incluidos. La única celda que requiere permisos es el montaje de Google Drive en
la sección 7 del notebook 02, para leer el archivo de audio.

Si el audio no está en la ruta indicada, esa celda **no interrumpe la clase**: avisa y
genera una señal de sustitución. Para usar el audio real, ajusta la constante
`RUTA_AUDIO` a su ubicación en tu Drive.

## Convenciones del material

- **El código debe enseñar Python, no estorbar.** Los alumnos empiezan de cero, así que
  el material usa únicamente variables, definición y llamada de funciones, aritmética,
  `print` y llamadas a NumPy y Matplotlib. **Sin bucles `for`, sin `zip`, sin
  comprensiones, sin clases, sin `try`/`except`.** Cuando hace falta repetir un dibujo
  con distintos parámetros, se escribe una función que dibuja un caso y se la llama
  varias veces — que además refuerza el tema de la sesión.
- **Matplotlib con `plt.subplot(filas, columnas, posición)`** y `plt.title()`,
  `plt.xlabel()`, nunca `fig, ejes = plt.subplots()` con `ejes[0].set_title()`: la
  interfaz de objetos obligaría a explicar qué es un `Axes`.
- **El tiempo va siempre primero** en la lista de argumentos: `seno(t, f, A)`. El resto
  se pasa con nombre.
- **Los títulos de las figuras se generan por interpolación** desde las propias
  variables (`f"...{fm:.0f} Hz"`), nunca escritos a mano. Así no pueden desincronizarse
  del código cuando se cambia un parámetro en clase.
- **Toda figura lleva** título, ejes rotulados con unidades, rejilla y leyenda cuando hay
  más de una curva. Es la misma regla que se les exige a los alumnos.
- **LaTeX con `$…$`**, nunca con `\(…\)`: Colab no renderiza esos delimitadores.
- Cada notebook cierra con sus **ejercicios propuestos**, separados de la solución. Los
  enunciados no van sueltos como comentarios dentro de las celdas de código.

## Antes de subir a git

Los notebooks se guardan **sin salidas ejecutadas**, y así deben commitearse: las
imágenes incrustadas hacían que el material anterior pesara 1,2 MB. Para limpiarlos
después de una sesión de clase:

```bash
jupyter nbconvert --clear-output --inplace Contenidos/Semana_4/*.ipynb
```
