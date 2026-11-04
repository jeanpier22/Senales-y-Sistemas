// ============================================================
// GENERADOR DE SEÑAL SENOIDAL
// ARDUINO + DAC R-2R DE 4 BITS
// ============================================================
//
// A0 -> Potenciometro de AMPLITUD
// A1 -> Potenciometro de FRECUENCIA
//
// D2 -> Bit 0 (LSB)
// D3 -> Bit 1
// D4 -> Bit 2
// D5 -> Bit 3 (MSB)
//
// VREF = 5 V
// DAC = 4 bits
// Frecuencia = 1 Hz a 500 Hz
// ============================================================

const int potAmplitud = A0;
const int potFrecuencia = A1;

// Pines del DAC
const int DAC0 = 2;
const int DAC1 = 3;
const int DAC2 = 4;
const int DAC3 = 5;

// Referencia del DAC
const float VREF = 5.0;

// DAC de 4 bits
const int nivelesDAC = 16;

// Voltaje maximo teorico del DAC
const float VmaxDAC = VREF * 15.0 / 16.0;

// Voltaje de referencia de la señal
// Mitad del voltaje maximo
const float Voffset = VmaxDAC / 2.0;

// Amplitud maxima
const float amplitudMax = VmaxDAC / 2.0;

// Numero de muestras por ciclo
const int muestras = 64;

// Rango de frecuencia
const float frecuenciaMin = 1.0;
const float frecuenciaMax = 500.0;


// ============================================================
// ESCRIBIR VALOR EN EL DAC
// ============================================================

void escribirDAC(int valor)
{
  digitalWrite(DAC0, bitRead(valor, 0));
  digitalWrite(DAC1, bitRead(valor, 1));
  digitalWrite(DAC2, bitRead(valor, 2));
  digitalWrite(DAC3, bitRead(valor, 3));
}


// ============================================================
// SETUP
// ============================================================

void setup()
{
  pinMode(DAC0, OUTPUT);
  pinMode(DAC1, OUTPUT);
  pinMode(DAC2, OUTPUT);
  pinMode(DAC3, OUTPUT);

  Serial.begin(115200);
}


// ============================================================
// LOOP
// ============================================================

void loop()
{
  // ----------------------------------------------------------
  // LEER POTENCIOMETROS
  // ----------------------------------------------------------

  int lecturaAmplitud = analogRead(potAmplitud);
  int lecturaFrecuencia = analogRead(potFrecuencia);


  // ----------------------------------------------------------
  // AMPLITUD
  //
  // A0 = 0    -> amplitud = 0
  // A0 = 1023 -> amplitud = 1
  // ----------------------------------------------------------

  float amplitud =
    lecturaAmplitud / 1023.0;


  // ----------------------------------------------------------
  // FRECUENCIA
  //
  // A1 = 0    -> 1 Hz
  // A1 = 1023 -> 500 Hz
  // ----------------------------------------------------------

  float frecuencia =
    frecuenciaMin +
    (lecturaFrecuencia / 1023.0) *
    (frecuenciaMax - frecuenciaMin);


  // ----------------------------------------------------------
  // GENERAR SENOIDE
  // ----------------------------------------------------------

  for (int i = 0; i < muestras; i++)
  {
    // Angulo de la muestra
    float angulo =
      2.0 * PI * i / muestras;


    // Seno
    float seno =
      sin(angulo);


    // --------------------------------------------------------
    // CALCULAR AMPLITUD EN VOLTIOS
    // --------------------------------------------------------

    float amplitudReal =
      amplitudMax * amplitud;


    // --------------------------------------------------------
    // SEÑAL CENTRADA
    //
    // V(t) = Voffset + A*sin(2*pi*f*t)
    //
    // Voffset = 2.34375 V
    //
    // Con amplitud maxima:
    //
    // Vmin = 0 V
    // Vmax = 4.6875 V
    // --------------------------------------------------------

    float senalIdeal =
      Voffset +
      amplitudReal * seno;


    // --------------------------------------------------------
    // LIMITAR VOLTAJE
    // --------------------------------------------------------

    if (senalIdeal < 0.0)
    {
      senalIdeal = 0.0;
    }

    if (senalIdeal > VmaxDAC)
    {
      senalIdeal = VmaxDAC;
    }


    // --------------------------------------------------------
    // CUANTIZACION A 4 BITS
    // --------------------------------------------------------

    int valorDAC =
      round(
        (senalIdeal / VmaxDAC) *
        (nivelesDAC - 1)
      );


    // --------------------------------------------------------
    // LIMITAR CODIGO DAC
    // --------------------------------------------------------

    if (valorDAC < 0)
    {
      valorDAC = 0;
    }

    if (valorDAC > 15)
    {
      valorDAC = 15;
    }


    // --------------------------------------------------------
    // ENVIAR AL DAC
    // --------------------------------------------------------

    escribirDAC(valorDAC);


    // --------------------------------------------------------
    // VOLTAJE TEORICO DE SALIDA
    // --------------------------------------------------------

    float senalDAC =
      VmaxDAC *
      valorDAC /
      (nivelesDAC - 1);


    // --------------------------------------------------------
    // SERIAL PLOTTER
    //
    // Primera señal = ideal
    // Segunda señal = DAC
    // --------------------------------------------------------

    Serial.print(senalIdeal, 3);
    Serial.print('\t');
    Serial.println(senalDAC, 3);


    // --------------------------------------------------------
    // TIEMPO ENTRE MUESTRAS
    // --------------------------------------------------------

    unsigned long periodo =
      (1000000.0 / frecuencia) /
      muestras;

    delayMicroseconds(periodo);
  }
}
