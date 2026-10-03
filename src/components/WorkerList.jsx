import { useEffect, useState } from 'react'
import { categories, societies } from '../data.js'
import WorkerCard from './WorkerCard.jsx'
import { strings } from '../strings.js'

export default function WorkerList({
  categoryId,
  societyId,
  workers,
  flashWorkerId,
  lang,
  onBack,
  onVouchClick,
  onWhatsAppClick,
}) {
  const t = strings[lang]
  const category = categories.find((item) => item.id === categoryId)
  const society = societies.find((item) => item.id === societyId)
  // Runs once per open of this list. WorkerList unmounts when you go back,
  // so reopening a category is a fresh mount and replays the entrance.
  const [entering, setEntering] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setEntering(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const list = workers
    .filter(
      (worker) =>
        worker.categoryId === categoryId && worker.societyId === societyId,
    )
    .sort((a, b) => b.vouchCount - a.vouchCount)

  return (
    <div className="mx-auto max-w-[480px] px-5 pt-6">
      <button
        type="button"
        onClick={onBack}
        className="flex h-11 items-center text-[15px] text-inksoft active:text-ink"
      >
        ← {t.back}
      </button>

      <div className="mt-2">
        <h1 className="text-[28px] font-semibold text-ink">
          {lang === 'hindi' ? category.hindi : category.name}
        </h1>
        <p className="text-[13px] text-inksoft">{society.name}</p>
      </div>

      {list.length === 0 ? (
        <div className="mt-6 rounded-card border border-dashed border-line bg-card p-8 text-center">
          <p className="text-[15px] text-ink">{t.empty}</p>
          <p className="mt-2 text-[13px] text-inksoft">{t.emptySub}</p>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {list.map((worker, index) => (
            <WorkerCard
              key={worker.id}
              worker={worker}
              society={society}
              category={category}
              flash={worker.id === flashWorkerId}
              lang={lang}
              enter={entering}
              enterDelay={index * 50}
              onVouchClick={onVouchClick}
              onWhatsAppClick={onWhatsAppClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}
