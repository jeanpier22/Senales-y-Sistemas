import { AlertTriangle, PackageOpen, Repeat2 } from 'lucide-react'

/**
 * Lista de materiales de la practica.
 *
 * Reproduce el formato de las guias en LaTeX de los otros cursos: la cantidad
 * en dos digitos abriendo cada linea y, cuando existe, el designador del
 * esquematico entre parentesis. Los componentes que van por duplicado porque
 * pueden averiarse en el montaje se marcan con un icono, igual que en la guia
 * impresa van en negrita.
 *
 * El componente se oculta solo si la practica todavia no tiene materiales, de
 * modo que las practicas puramente de simulacion no necesitan tocarlo.
 *
 * `nota` admite un texto suelto o una lista: cada aviso se dibuja en su propia
 * caja, igual que en la guia impresa cada uno va en su \notatec.
 */
export default function Materiales({ items, nota }) {
  if (!items?.length) return null

  const notas = nota ? (Array.isArray(nota) ? nota : [nota]) : []

  return (
    <section id="materiales" className="card flex flex-col p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-300">
          <PackageOpen className="h-4.5 w-4.5" />
        </span>
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Materiales</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Los adquiere el alumno
          </p>
        </div>
      </div>

      <ul className="mt-5 grid gap-2.5">
        {items.map((m) => (
          <li
            key={`${m.cantidad}-${m.detalle}`}
            className="flex gap-3 border-b border-slate-100 pb-2.5 last:border-0 last:pb-0 dark:border-slate-800"
          >
            <span
              className={[
                'mt-px shrink-0 rounded-md px-1.5 py-0.5 font-mono text-xs font-bold tabular-nums',
                m.repuesto
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
              ].join(' ')}
            >
              {m.cantidad}
            </span>

            <span className="min-w-0 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {m.detalle}
              {m.designador && (
                <span className="ml-1.5 font-mono text-xs text-slate-400 dark:text-slate-500">
                  ({m.designador})
                </span>
              )}
            </span>

            {m.repuesto && (
              <Repeat2
                className="mt-0.5 h-4 w-4 shrink-0 text-amber-500"
                aria-label="Va por duplicado: puede averiarse en el montaje"
              />
            )}
          </li>
        ))}
      </ul>

      {notas.length > 0 && (
        <div className="mt-5 grid gap-3">
          {notas.map((texto) => (
            <p
              key={texto}
              className="flex gap-2.5 rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 text-xs leading-relaxed text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200"
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{texto}</span>
            </p>
          ))}
        </div>
      )}
    </section>
  )
}
