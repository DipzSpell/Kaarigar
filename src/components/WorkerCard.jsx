import { strings, whatsappMessage } from '../strings.js'

export default function WorkerCard({
  worker,
  society,
  category,
  flash,
  lang,
  enter = false,
  enterDelay = 0,
  onVouchClick,
  onWhatsAppClick,
}) {
  const t = strings[lang]
  const shown = worker.vouchedBy.slice(0, 3)
  const remaining = worker.vouchCount - shown.length
  const moreSuffix =
    remaining > 0
      ? ` ${t.morePrefix} ${remaining} ${t.moreSuffix}`
      : ''
  const flats =
    shown.join(', ') + moreSuffix

  const waHref =
    'https://wa.me/91' +
    worker.phone +
    '?text=' +
    encodeURIComponent(whatsappMessage({ worker, society, category }))

  return (
    <article
      style={enter ? { animationDelay: `${enterDelay}ms` } : undefined}
      className={`rounded-card border border-line bg-card p-4 ${
        enter ? 'enter' : ''
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="min-w-0 break-words text-[20px] font-semibold text-ink">
          {worker.name}
        </h3>
        <span className="shrink-0 whitespace-nowrap text-[13px] text-inksoft">
          {worker.yearsActive} {t.years}
        </span>
      </div>

      <p className="mt-0.5 text-[13px] text-inksoft">{worker.note}</p>

      <div
        className={`my-3.5 w-full rounded-[12px] bg-ambertint p-3.5 ${
          flash ? 'vouch-flash-block' : ''
        }`}
      >
        <div className="flex items-baseline gap-2">
          <span
            className={`inline-block text-[34px] font-semibold text-amberdeep ${
              flash ? 'vouch-flash-numeral' : ''
            }`}
          >
            {worker.vouchCount}
          </span>
          <span className="text-[15px] text-amberdeep">{t.neighbours}</span>
        </div>
        <p className="mt-1.5 break-words text-[13px] text-amberdeep/75">
          {flash && shown.length > 0 ? (
            <>
              <span className="vouch-flash-flat">{shown[0]}</span>
              {shown.length > 1 ? ', ' : ''}
              {shown.slice(1).join(', ')}
              {moreSuffix}
            </>
          ) : (
            flats
          )}
        </p>
      </div>

      <p className="text-[13px] text-inksoft">
        {t.lastCall}: {worker.lastCalled}
      </p>

      <div className="mt-3.5 flex flex-col gap-2">
        <div className="flex gap-2">
          <a
            href={'tel:' + worker.phone}
            className="press app-on-amber flex h-12 flex-1 items-center justify-center rounded-[12px] bg-amber text-[15px] font-semibold text-ink active:bg-amberdeep"
          >
            {t.call}
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onWhatsAppClick(worker)}
            className="press app-on-whatsapp flex h-12 flex-1 items-center justify-center rounded-[12px] bg-whatsapp text-[15px] font-semibold text-card"
          >
            {t.whatsapp}
          </a>
        </div>
        <button
          type="button"
          onClick={() => onVouchClick(worker)}
          className="press flex h-12 w-full items-center justify-center rounded-[12px] border border-line bg-card text-[15px] font-semibold text-ink active:bg-paper"
        >
          {t.vouch}
        </button>
      </div>
    </article>
  )
}
