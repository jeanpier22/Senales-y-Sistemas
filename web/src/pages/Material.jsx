import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, BookText, CheckCircle2, Download, Target } from 'lucide-react'
import Descargas from '../components/Descargas'
import VisorPDF from '../components/VisorPDF'
import { getMaterial } from '../data/practicas'

/**
 * Pagina de un material de clase: encabezado, documento a todo el ancho,
 * descargas y objetivos. Es la version corta de la pagina de una practica:
 * no hay materiales ni formulario de retroalimentacion.
 */
export default function Material() {
  const { id } = useParams()
  const material = getMaterial(id)

  if (!material) return <Navigate to="/404" replace />

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:gap-3 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al inicio
      </Link>

      <header className="mt-6 animate-fade-up">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
            <BookText className="h-3.5 w-3.5" />
            {material.tipo}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">{material.subtitulo}</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {material.titulo}
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
          {material.resumen}
        </p>

        {material.temas.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {material.temas.map((t) => (
              <span
                key={t}
                className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-soft ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-7">
          <a
            href="#descargas"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 px-5 py-2.5 text-sm font-bold text-white shadow-glow shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            <Download className="h-4 w-4" />
            Descargar
          </a>
        </div>
      </header>

      {material.documento && (
        <div className="mt-10">
          <VisorPDF
            src={material.documento.src}
            titulo={`${material.titulo} — ${material.subtitulo}`}
            peso={material.documento.peso}
            descarga={material.descargas[0]?.nombre}
          />
        </div>
      )}

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Descargas items={material.descargas} descripcion="Archivos de este material" />

        {material.objetivos.length > 0 && (
          <section className="card flex flex-col p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-300">
                <Target className="h-4.5 w-4.5" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Objetivos</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Qué deberías lograr</p>
              </div>
            </div>
            <ul className="mt-5 grid gap-3">
              {material.objetivos.map((o) => (
                <li key={o} className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span className="leading-relaxed">{o}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
