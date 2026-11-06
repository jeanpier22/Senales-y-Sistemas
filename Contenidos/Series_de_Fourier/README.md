# Series de Fourier — Material de clase

Sección temática de **Señales y Sistemas** (2026-2). No está atada a una semana
concreta; si se fija una, basta con mover la carpeta a `Contenidos/Semana_N/`.

| Notebook | Tema | Depende de |
|---|---|---|
| `01_Serie_trigonometrica_y_compleja.ipynb` | Un único ejercicio, $f(t)=t$ en $(-\pi,\pi)$, resuelto por el método trigonométrico y por el exponencial complejo; demostración de la equivalencia vía Euler; frecuencias positivas y negativas; simetría conjugada; aproximación por armónicos y fenómeno de Gibbs | Semana 4 (exponencial compleja, par/impar) |

| `LaTeX/Series_de_Fourier.pdf` | Versión impresa del notebook: ejercicio resuelto paso a paso, figuras, tablas, fórmulas de resumen, apéndice de identidades, ejercicios cortos y un ejercicio completo con la onda cuadrada, con respuestas de control (27 páginas) | — |

## Regenerar el PDF

```bash
python Contenidos/Series_de_Fourier/Codigo/generar_figuras.py     # figuras vectoriales
cd Contenidos/Series_de_Fourier/LaTeX && xelatex Series_de_Fourier.tex   # dos pasadas
```

Compilar con **XeLaTeX** (Trebuchet MS). Como las figuras son vectoriales, el PDF no se
comprime con `comprimir_pdf.py` (no hay imágenes que remuestrear). La copia que sirve
la web está en `web/public/material/fourier/`; hay que volver a copiarla tras recompilar.

## Cómo usarlo

Corre en Colab sin instalar nada: solo NumPy y Matplotlib. Para ver el efecto de añadir
armónicos, cambiar `N_ARMONICOS` en la sección 11.

Las verificaciones numéricas (secciones 3.3, 4.2, 5.5 y 9) comparan cada resultado
analítico con la integral calculada por una suma de Riemann.

## Convenciones

Las mismas que `Contenidos/Semana_4/README.md`: sin bucles `for`, `plt.subplot`,
títulos de figura por f-string, LaTeX con `$…$`, ejercicios al final, notebooks
guardados **sin salidas ejecutadas**. Las sumas sobre armónicos se hacen con
broadcasting de NumPy (`n` como columna) en lugar de un bucle.

## Antes de subir a git

```bash
jupyter nbconvert --clear-output --inplace Contenidos/Series_de_Fourier/*.ipynb
```
