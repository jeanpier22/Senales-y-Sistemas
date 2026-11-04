/**
 * Esquema de calificacion del curso.
 *
 * Este archivo es PUBLICO: se compila dentro del sitio y cualquiera que abra la
 * pagina puede leerlo. No poner aqui nombres de alumnos ni notas individuales.
 * El registro de notas por alumno se lleva fuera de web/ y fuera de git.
 *
 * Todo va VACIO a proposito: de este curso todavia no esta confirmado ni el
 * docente titular (ver CURSO.docente en practicas.js), asi que menos aun los
 * pesos de evaluacion. Con los cuatro arreglos vacios, la pagina se dibuja
 * sola como "Por confirmar" sin tocar ningun componente.
 *
 * Para activarla, rellenar con esta forma (ejemplo de Electronica Digital):
 *
 *   export const COMPONENTES = [
 *     { nombre: 'Evaluación permanente', peso: 40, detalle: '...' },
 *     { nombre: 'Examen parcial',        peso: 30, detalle: '...' },
 *     { nombre: 'Examen final',          peso: 30, detalle: '...' },
 *   ]
 *
 *   export const LABORATORIO = [
 *     { nombre: 'Prácticas',     peso: 80, detalle: '...' },
 *     { nombre: 'Participación', peso: 20, detalle: '...' },
 *   ]
 *
 *   export const RUBRICAS = [
 *     { practica: 'lab2', total: 20, filas: [{ seccion: '...', puntos: 4 }] },
 *   ]
 *
 *   export const FECHAS = [
 *     { fecha: 'jueves 15 de octubre', evento: 'Examen parcial', contenido: '...' },
 *   ]
 */

// Pesos que componen la nota final. Deben sumar 100.
export const COMPONENTES = []

// Como se compone la nota de laboratorio.
export const LABORATORIO = []

// Reparto de los 20 puntos dentro de cada guia.
export const RUBRICAS = []

// Fechas de evaluacion.
export const FECHAS = []

// Avisos de lo pendiente. Vacio: con todo lo demas vacio, la pagina ya muestra
// el estado "Por confirmar" y un aviso encima seria redundante.
export const AVISOS = []
