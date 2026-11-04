/**
 * Catalogo de practicas de laboratorio de Senales y Sistemas.
 *
 * Este es el UNICO archivo que hay que editar para publicar una practica:
 *   1. Copiar sus archivos a  web/public/practicas/labN/
 *   2. Cambiar  estado: 'proximamente'  por  estado: 'disponible'
 *   3. Rellenar  documento{} y descargas[]  con las rutas reales
 * Ningun componente conoce el contenido: todos leen de aqui.
 */

export const CURSO = {
  nombre: 'Señales y Sistemas',
  periodo: '2026-2',
  universidad: 'Universidad Católica San Pablo',
  facultad: 'Facultad de Ingeniería · Ing. Electrónica y de Telecomunicaciones',
  // TODO: confirmar el nombre del docente titular del curso.
  docente: 'Por confirmar',
  correoRetroalimentacion: 'jbancori@ucsp.edu.pe',
}

/**
 * Cronograma del curso.
 *
 * Se deja VACIO a proposito: todavia no estan fijadas las fechas ni los grupos
 * de laboratorio de este curso, y el componente Cronograma se oculta solo
 * cuando el arreglo esta vacio (`if (CRONOGRAMA.length === 0) return null`).
 *
 * Para activarlo basta con rellenarlo siguiendo esta forma, una entrada por
 * semana, sin tocar ningun componente:
 *
 *   {
 *     semana: 1,
 *     unidad: 1,                     // 1 | 2 | null (evaluaciones)
 *     tipo: 'practica',              // 'practica' | 'examen'
 *     grupoMiercoles: '19 de agosto',
 *     grupoViernes: '21 de agosto',
 *     practica: 'lab2',              // id de PRACTICAS, o null
 *     titulo: 'Generación de señales con Arduino',
 *     estado: 'completada',          // 'completada' | 'encurso' | 'programada'
 *   }
 *
 * Las semanas con `titulo: null` se dibujan como "Por confirmar".
 */
export const CRONOGRAMA = []

export const PRACTICAS = [
  {
    id: 'lab2',
    numero: 2,
    titulo: 'Generación y reconstrucción de señales',
    subtitulo: 'Adquisición por ADC y reconstrucción por DAC R-2R',
    // Pasa a 'disponible' cuando el PDF este compilado y copiado a
    // web/public/practicas/lab2/.
    estado: 'proximamente',
    duracion: '2 horas',
    resumen:
      'La placa —Arduino UNO o ESP32— se usa como generador y como sistema: dos potenciómetros entran por el ADC como dos señales independientes, el programa opera con ellas y el resultado sale por una escalera R-2R que hace de DAC. La práctica cierra observando la salida reconstruida en el osciloscopio y contrastándola con la señal que predice el cálculo.',
    objetivos: [
      'Generar señales de prueba con la placa y describirlas como secuencias discretas x[n].',
      'Adquirir dos señales independientes por el ADC de la placa y relacionar el valor leído con la tensión de entrada.',
      'Operar con las dos señales —suma, resta, escalado por constante y desplazamiento de nivel— y verificar el resultado en la salida.',
      'Reconstruir la señal resultante con una escalera R-2R y medir la tensión de cada escalón.',
      'Contrastar la señal medida con la calculada y estimar el error introducido por la cuantización.',
    ],
    temas: [
      'Arduino UNO',
      'ESP32',
      'Señales discretas',
      'ADC',
      'DAC R-2R',
      'Cuantización',
      'Suma y escalado de señales',
      'Osciloscopio',
    ],

    /**
     * Lista de materiales, en el mismo formato que las guias de los otros
     * cursos: cantidad en dos digitos al principio y, entre parentesis, el
     * designador con el que el componente aparece en el esquematico.
     *
     * `repuesto: true` marca los componentes que van por duplicado porque
     * pueden averiarse en el montaje. Aqui todo el circuito trabaja a la tension
     * de la placa (5 V con Arduino UNO, 3,3 V con ESP32), asi que el unico
     * fragil de verdad es el LED: montado al reves no enciende y es el error
     * tipico.
     */
    materiales: [
      {
        cantidad: '01',
        detalle: 'placa Arduino UNO R3 o ESP32, con su cable USB',
        designador: 'U6',
      },
      {
        cantidad: '02',
        detalle: 'potenciómetros de 250 kΩ — con ESP32, de 10 kΩ',
        designador: 'RPOT1, RPOT2',
      },
      {
        cantidad: '04',
        detalle: 'resistencias de 1 kΩ (1/4 W)',
        designador: 'R19 – R22',
      },
      {
        cantidad: '05',
        detalle: 'resistencias de 2 kΩ (1/4 W)',
        designador: 'R14 – R18',
      },
      {
        cantidad: '02',
        detalle: 'diodos LED rojos (uno de repuesto)',
        designador: 'D2',
        repuesto: true,
      },
      { cantidad: '01', detalle: 'protoboard' },
      { cantidad: '—', detalle: 'cables conectores para protoboard' },
      {
        cantidad: '01',
        detalle:
          'computadora con el IDE de Arduino instalado. Para el ESP32, además el gestor de tarjetas de Espressif',
      },
    ],

    /**
     * Avisos que acompanan a la lista. En las guias en LaTeX cada uno de estos
     * textos va en una caja \notatec; aqui se muestran al pie de la tarjeta.
     */
    notaMateriales: [
      'La práctica funciona con Arduino UNO o con ESP32, pero no son intercambiables sin más: el UNO trabaja a 5 V con un ADC de 10 bits y el ESP32 a 3,3 V con uno de 12. Cambian el paso de cuantización y el fondo de escala, y con ellos todos los números de la práctica. Elija una placa al empezar y trabaje con ella hasta el final.',
      'Con ESP32 los potenciómetros bajan a 10 kΩ. Su ADC muestrea sobre un condensador que hay que cargar en cada lectura, y con 250 kΩ de impedancia de fuente no llega a estabilizarse: las lecturas salen bajas, ruidosas y dependientes de la anterior. Parece un fallo del programa y no lo es. Al Arduino UNO, de entrada muy alta, esto no le afecta.',
      'La escalera R-2R exige que la relación entre las dos resistencias sea exactamente 2:1. No sustituya las de 2 kΩ por las de 2,2 kΩ, que son las que suele haber a mano: la relación pasaría a 2,2:1 y los escalones del DAC dejarían de ser uniformes.',
    ],

    /**
     * El PDF y el .tex los deja aqui herramientas/observar_latex.py en cada
     * compilacion. Ojo: esa version NO esta comprimida. Antes de publicar hay
     * que pasarla por herramientas/comprimir_pdf.py.
     *
     * La pagina de la practica es accesible por su ruta directa
     * (#/practica/lab2) aunque el estado sea 'proximamente': lo que el estado
     * decide es si la tarjeta de la portada enlaza o queda bloqueada.
     */
    documento: {
      src: 'practicas/lab2/Practica_2.pdf',
      paginas: 8,
      peso: '0.15 MB',
    },
    descargas: [
      {
        etiqueta: 'Práctica en PDF',
        detalle: 'Documento compilado desde LaTeX — versión en curso, faltan el cuestionario y las conclusiones',
        archivo: 'practicas/lab2/Practica_2.pdf',
        nombre: 'Practica_2_Senales_y_Sistemas.pdf',
        tipo: 'PDF',
        peso: '0.15 MB',
        destacado: true,
      },
      {
        etiqueta: 'Programa de partida',
        detalle:
          'Sketch de Arduino que genera la senoide: A0 controla la amplitud, A1 la frecuencia. Es el esqueleto sobre el que se programa la tarea de la sección IV',
        archivo: 'practicas/lab2/generador_senoidal.ino',
        nombre: 'generador_senoidal.ino',
        tipo: 'INO',
        peso: '6 KB',
        destacado: true,
      },
      {
        etiqueta: 'Fuente LaTeX',
        detalle: 'Código .tex para recompilar o reutilizar el formato',
        archivo: 'practicas/lab2/Practica_2.tex',
        nombre: 'Practica_2.tex',
        tipo: 'TEX',
        peso: '38 KB',
        destacado: false,
      },
    ],
  },
]

export const getPractica = (id) => PRACTICAS.find((p) => p.id === id)
