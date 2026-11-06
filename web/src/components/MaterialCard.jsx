import { Link } from 'react-router-dom'
import { ArrowRight, BookText, FileText } from 'lucide-react'

/**
 * Tarjeta de un material de clase en la portada.
 *
 * Mismo lenguaje visual que PracticaCard, pero sin numero de practica ni
 * duracion: el material de clase no se califica ni tiene sesion fija.
 */
export default function MaterialCard({ material, indice = 0 }) {
  return (
    <Link
      to={`/material/${material.id}`}
      style={{ animationDelay: `${indice * 80}ms` }}
      className="card group relative flex animate-fade-up flex-col overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift dark:hover:border-brand-700"
    >
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-500 to-brand-600" />

      <div className="flex items-start justify-between gap-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-teal-500 to-brand-700 text-white shadow-glow">
          <BookText className="h-6 w-6" />
        </span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-900">
          Disponible
        </span>
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">{material.titulo}</h3>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{material.subtitulo}</p>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {material.resumen}
      </p>

      {material.temas.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {material.temas.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <FileText className="h-3.5 w-3.5" />
          {material.tipo} · {material.extension}
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition group-hover:gap-2 dark:text-brand-300">
          Abrir
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}
