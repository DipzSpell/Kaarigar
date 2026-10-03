export default function WorkerCard({ worker, onVouchClick }) {
  const shown = worker.vouchedBy.slice(0, 3)
  const remaining = worker.vouchCount - shown.length
  const flats = shown.join(', ') + (remaining > 0 ? ` और ${remaining} और` : '')

  return (
    <article className="rounded-card border border-line bg-card p-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="min-w-0 text-[20px] font-semibold text-ink">
          {worker.name}
        </h3>
        <span className="shrink-0 whitespace-nowrap text-[13px] text-inksoft">
          {worker.yearsActive} saal se
        </span>
      </div>

      <p className="mt-0.5 text-[13px] text-inksoft">{worker.note}</p>

      <div className="my-3.5 w-full rounded-[12px] bg-ambertint p-3.5">
        <div className="flex items-baseline gap-2">
          <span className="text-[34px] font-semibold text-amberdeep">
            {worker.vouchCount}
          </span>
          <span className="text-[15px] text-amberdeep">
            पड़ोसियों ने बुलाया है
          </span>
        </div>
        <p className="mt-1.5 text-[13px] text-amberdeep/75">{flats}</p>
      </div>

      <p className="text-[13px] text-inksoft">Last call: {worker.lastCalled}</p>

      <div className="mt-3.5 flex gap-2.5">
        <a
          href={'tel:' + worker.phone}
          className="flex h-12 flex-1 items-center justify-center rounded-[12px] bg-amber text-[15px] font-semibold text-ink"
        >
          Call karo
        </a>
        <button
          type="button"
          onClick={() => onVouchClick(worker)}
          className="flex h-12 flex-1 items-center justify-center rounded-[12px] border border-line bg-card text-[15px] font-semibold text-ink"
        >
          Maine bulaya tha
        </button>
      </div>
    </article>
  )
}
