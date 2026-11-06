"""
Genera las figuras de la guia Series_de_Fourier.tex.

Salen en PDF vectorial y con la tipografia del documento (Trebuchet MS), como
pide CLAUDE.md para las figuras generadas. Se escriben en ../LaTeX/imagenes/.

    python Contenidos/Series_de_Fourier/Codigo/generar_figuras.py

La senal es siempre la misma, f(t) = t en (-pi, pi) con T = 2 pi, y su serie
f_N(t) = 2 * sum_{n=1}^{N} (-1)^(n+1)/n * sin(n t).
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

plt.rcParams.update({
    "axes.grid": True,
    "grid.alpha": 0.35,
    "pdf.fonttype": 42,          # texto como fuente TrueType incrustada
    "font.size": 9,
    "axes.titlesize": 10,
    "mathtext.fontset": "dejavusans",
})

AZUL = "#1f5fa8"
ROJO = "#c0392b"
VERDE = "#1e8449"
GRIS = "#7f8c8d"

DESTINO = os.path.normpath(
    os.path.join(os.path.dirname(__file__), "..", "LaTeX", "imagenes"))
os.makedirs(DESTINO, exist_ok=True)


def guardar(nombre):
    plt.savefig(os.path.join(DESTINO, nombre), bbox_inches="tight")
    plt.close()
    print("  ", nombre)


def original(t):
    return np.mod(t + np.pi, 2 * np.pi) - np.pi


def parcial(t, N):
    n = np.arange(1, N + 1).reshape(-1, 1)
    return np.sum(2 * (-1.0) ** (n + 1) / n * np.sin(n * t), axis=0)


def ejes_pi(ax, a=-3, b=3):
    ticks = np.arange(a, b + 1) * np.pi
    etiquetas = []
    for k in range(a, b + 1):
        if k == 0:
            etiquetas.append("0")
        elif k == 1:
            etiquetas.append(r"$\pi$")
        elif k == -1:
            etiquetas.append(r"$-\pi$")
        else:
            etiquetas.append(rf"${k}\pi$")
    ax.set_xticks(ticks)
    ax.set_xticklabels(etiquetas)


def sierra_sin_saltos(t):
    """La senal con NaN en los saltos para que no dibuje la linea vertical."""
    y = original(t)
    y = y.astype(float)
    saltos = np.where(np.abs(np.diff(y)) > np.pi)[0]
    y[saltos] = np.nan
    return y


print("Figuras:")

# ------------------------------------------------------------ 1. la senal
t = np.linspace(-3 * np.pi, 3 * np.pi, 6001)
plt.figure(figsize=(6.4, 2.6))
plt.plot(t, sierra_sin_saltos(t), color=AZUL, linewidth=2)
for k in (-2, 0, 2):  # en cada salto: extremos huecos y valor de la serie (0)
    plt.plot(k * np.pi + np.pi, np.pi, "o", mfc="white", mec=AZUL, ms=5)
    plt.plot(k * np.pi + np.pi, -np.pi, "o", mfc="white", mec=AZUL, ms=5)
    plt.plot(k * np.pi + np.pi, 0, "o", color=ROJO, ms=5)
plt.axhline(0, color="black", linewidth=0.8)
ejes_pi(plt.gca())
plt.yticks([-np.pi, 0, np.pi], [r"$-\pi$", "0", r"$\pi$"])
plt.xlabel("Tiempo $t$ [s]")
plt.ylabel("$f(t)$")
plt.annotate("$T=2\\pi$", xy=(-np.pi, -3.9), xytext=(np.pi, -3.9),
             arrowprops=dict(arrowstyle="<->", color=GRIS), ha="center",
             va="center", color=GRIS)
plt.ylim(-4.4, 3.8)
guardar("senal_original.pdf")

# ----------------------------------------------- 2. armonicos individuales
t = np.linspace(-np.pi, np.pi, 2000)
fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(6.4, 4.4), sharex=True)
colores = ["#1f5fa8", "#c0392b", "#1e8449", "#8e44ad", "#d68910"]
for n in range(1, 6):
    bn = 2 * (-1.0) ** (n + 1) / n
    ax1.plot(t, bn * np.sin(n * t), color=colores[n - 1], linewidth=1.4,
             label=rf"$n={n}$: $b_{n}\sin({n}t)$")
ax1.set_ylabel("Amplitud")
ax1.set_title("Los cinco primeros armónicos, uno por uno")
ax1.legend(ncol=3, fontsize=7.5, loc="lower center")
ax2.plot(t, t, color=GRIS, linestyle="--", linewidth=1.5, label="$f(t)=t$")
ax2.plot(t, parcial(t, 5), color=AZUL, linewidth=2, label="$f_5(t)$ (suma de los cinco)")
ax2.set_ylabel("Amplitud")
ax2.set_xlabel("Tiempo $t$ [s]")
ax2.set_title("Su suma")
ax2.legend(loc="upper left", fontsize=8)
ejes_pi(ax2, -1, 1)
fig.tight_layout()
guardar("armonicos.pdf")

# ------------------------------------------------------- 3. convergencia
t = np.linspace(-2 * np.pi, 2 * np.pi, 6000)
fig, ejes = plt.subplots(2, 2, figsize=(6.4, 4.8), sharex=True, sharey=True)
for ax, N in zip(ejes.flatten(), (1, 3, 10, 50)):
    ax.plot(t, sierra_sin_saltos(t), color=GRIS, linestyle="--", linewidth=1.2,
            label="$f(t)$")
    ax.plot(t, parcial(t, N), color=AZUL, linewidth=1.5, label=f"$f_{{{N}}}(t)$")
    ax.set_title(f"$N={N}$ armónicos")
    ax.legend(loc="upper left", fontsize=7.5)
    ejes_pi(ax, -2, 2)
for ax in ejes[1]:
    ax.set_xlabel("Tiempo $t$ [s]")
for ax in ejes[:, 0]:
    ax.set_ylabel("Amplitud")
fig.tight_layout()
guardar("convergencia.pdf")

# ----------------------------------------------------------- 4. espectro
n = np.arange(-10, 11)
Cn = np.zeros(n.shape, dtype=complex)
no_cero = n != 0
Cn[no_cero] = 1j * (-1.0) ** n[no_cero] / n[no_cero]

fig, (ax1, ax2, ax3) = plt.subplots(3, 1, figsize=(6.4, 6.0), sharex=True)
ax1.stem(n, np.abs(Cn), basefmt=" ")
ax1.set_ylabel(r"$|C_n|$")
ax1.set_title(r"Espectro de magnitud: $|C_n|=1/|n|$ (par)")

ax2.stem(n, np.imag(Cn), basefmt=" ")
ax2.set_ylabel(r"$\mathrm{Im}\{C_n\}$")
ax2.set_title(r"Parte imaginaria de $C_n$ (la real es cero): impar")

fase = np.where(np.abs(Cn) > 1e-12, np.angle(Cn), 0.0)
ax3.stem(n, fase, basefmt=" ")
ax3.set_yticks([-np.pi / 2, 0, np.pi / 2])
ax3.set_yticklabels([r"$-\pi/2$", "0", r"$\pi/2$"])
ax3.set_ylabel(r"$\angle C_n$ [rad]")
ax3.set_xlabel("Índice del armónico $n$")
ax3.set_title(r"Espectro de fase: $\pm\pi/2$ (impar)")
ax3.set_xticks(n)
fig.tight_layout()
guardar("espectro.pdf")

# ------------------------------------- 5. exponenciales que giran (Euler)
th = np.pi / 3
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(6.4, 3.3))
c = np.exp(1j * np.linspace(0, 2 * np.pi, 400))
for ax in (ax1, ax2):
    ax.plot(c.real, c.imag, color=GRIS, linewidth=1)
    ax.axhline(0, color="black", linewidth=0.7)
    ax.axvline(0, color="black", linewidth=0.7)
    ax.set_aspect("equal")
    ax.set_xlim(-1.5, 1.5)
    ax.set_ylim(-1.5, 1.5)
    ax.set_xlabel("Parte real")
    ax.set_ylabel("Parte imaginaria")

p, m = np.exp(1j * th), np.exp(-1j * th)
flecha = dict(arrowstyle="-|>", linewidth=1.6)
ax1.annotate("", xy=(p.real, p.imag), xytext=(0, 0), arrowprops=dict(**flecha, color=AZUL))
ax1.annotate("", xy=(m.real, m.imag), xytext=(0, 0), arrowprops=dict(**flecha, color=ROJO))
ax1.annotate("", xy=(2 * p.real, 0), xytext=(0, 0),
             arrowprops=dict(**flecha, color=VERDE, linestyle="--"))
ax1.plot([p.real, p.real], [p.imag, m.imag], color=GRIS, linestyle=":")
ax1.text(p.real + 0.05, p.imag + 0.08, r"$e^{j\theta}$", color=AZUL)
ax1.text(m.real + 0.05, m.imag - 0.22, r"$e^{-j\theta}$", color=ROJO)
ax1.text(0.35, -0.2, r"$2\cos\theta$", color=VERDE, ha="center")
ax1.set_title(r"Suma: $e^{j\theta}+e^{-j\theta}=2\cos\theta$")
ax1.set_xlim(-1.5, 2.3)

ax2.annotate("", xy=(p.real, p.imag), xytext=(0, 0), arrowprops=dict(**flecha, color=AZUL))
ax2.annotate("", xy=(-m.real, -m.imag), xytext=(0, 0), arrowprops=dict(**flecha, color=ROJO))
ax2.annotate("", xy=(0, 2 * p.imag), xytext=(0, 0),
             arrowprops=dict(**flecha, color=VERDE, linestyle="--"))
ax2.text(p.real + 0.05, p.imag + 0.05, r"$e^{j\theta}$", color=AZUL)
ax2.text(-m.real - 0.45, -m.imag - 0.2, r"$-e^{-j\theta}$", color=ROJO)
ax2.text(0.08, 2 * p.imag - 0.05, r"$2j\sin\theta$", color=VERDE)
ax2.set_title(r"Resta: $e^{j\theta}-e^{-j\theta}=2j\sin\theta$")
ax2.set_ylim(-1.5, 2.1)
fig.tight_layout()
guardar("euler_giro.pdf")

# ----------------------------------------------------------- 6. Gibbs
t = np.linspace(2.2, 4.1, 6000)
y = original(t).astype(float)
y[np.abs(t - np.pi) < 1e-3] = np.nan
y = np.where(t < np.pi, t, t - 2 * np.pi)
y_plot = y.copy()
y_plot[np.argmax(t >= np.pi)] = np.nan
plt.figure(figsize=(6.4, 3.6))
plt.plot(t, y_plot, color=GRIS, linestyle="--", linewidth=1.3, label="$f(t)$")
for N, col in ((10, ROJO), (50, VERDE), (200, AZUL)):
    plt.plot(t, parcial(t, N), color=col, linewidth=1.4, label=f"$N={N}$")
plt.axhline(np.pi + 0.0895 * 2 * np.pi, color="black", linewidth=0.7, linestyle=":")
plt.text(2.25, np.pi + 0.0895 * 2 * np.pi + 0.08,
         r"$\approx\pi+0{,}0895\cdot 2\pi\approx 3{,}70$", fontsize=8)
plt.axvline(np.pi, color="black", linewidth=0.7)
plt.xticks([2.5, np.pi, 3.5, 4], ["2,5", r"$\pi$", "3,5", "4"])
plt.xlabel("Tiempo $t$ [s]")
plt.ylabel("Amplitud")
plt.title("Fenómeno de Gibbs junto al salto en $t=\\pi$")
plt.legend(loc="lower left", fontsize=8)
guardar("gibbs.pdf")
