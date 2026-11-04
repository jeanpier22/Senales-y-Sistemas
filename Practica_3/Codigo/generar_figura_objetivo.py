"""
Dibuja la senal objetivo del ejercicio 3 de la Practica 3 (era el 2 en la
version 1 de la guia).

Sale en PDF vectorial y con la tipografia del documento (Trebuchet MS), como
pide CLAUDE.md para las figuras generadas. La senal es la misma que el alumno
tiene que construir con escalon, rampa y pulso:

    x(t) = r(t+2) - r(t) - 2 u(t-1)

es decir: sube con pendiente 1 desde t = -2, se estabiliza en 2 V al llegar a
t = 0 (ahi la segunda rampa cancela el crecimiento) y cae a cero de golpe en
t = 1.
"""

import os

import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager

RUTA_FUENTE = "C:/Windows/Fonts/trebuc.ttf"
if os.path.exists(RUTA_FUENTE):
    font_manager.fontManager.addfont(RUTA_FUENTE)
    plt.rcParams["font.family"] = "Trebuchet MS"

plt.rcParams["axes.grid"] = True
plt.rcParams["pdf.fonttype"] = 42


def escalon(t):
    return np.heaviside(t, 1)


def rampa(t, pendiente=1.0, inicio=0.0):
    return pendiente * (t - inicio) * escalon(t - inicio)


t = np.linspace(-4, 4, 1601)
x = rampa(t, 1, -2) - rampa(t, 1, 0) - 2 * escalon(t - 1)

plt.figure(figsize=(7.2, 3.2))
plt.plot(t, x, linewidth=2)

plt.axvline(-2, color="gray", linestyle=":")
plt.axvline(0, color="gray", linestyle=":")
plt.axvline(1, color="gray", linestyle=":")
plt.axhline(0, color="black", linewidth=0.8)

plt.xlabel("t [s]")
plt.ylabel("Amplitud [V]")
plt.xticks(np.arange(-4, 5, 1))
plt.yticks(np.arange(0, 3, 1))
plt.ylim(-0.6, 2.6)

salida = os.path.join(os.path.dirname(__file__), "..", "LaTeX", "imagenes", "senal_objetivo.pdf")
plt.savefig(os.path.normpath(salida), bbox_inches="tight")
print("Figura escrita en", os.path.normpath(salida))
