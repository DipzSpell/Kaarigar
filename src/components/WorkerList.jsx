import { categories, societies } from '../data.js'
import WorkerCard from './WorkerCard.jsx'

export default function WorkerList({
  categoryId,
  societyId,
  workers,
  onBack,
  onVouchClick,
}) {
  const category = categories.find((item) => item.id === categoryId)
  const society = societies.find((item) => item.id === societyId)

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
        className="flex h-11 items-center text-[15px] text-inksoft"
      >
        ← Wapas
      </button>

      <div className="mt-2">
        <h1 className="text-[28px] font-semibold text-ink">{category.name}</h1>
        <p className="text-[13px] text-inksoft">{society.name}</p>
      </div>

      {list.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-[15px] text-ink">
            Is society me abhi koi kaarigar nahi hai.
          </p>
          <p className="mt-2 text-[13px] text-inksoft">
            Aap pehle ho sakte ho — kisi ko jaante ho to add karo.
          </p>
        </div>
      ) : (
        <div className="mt-5 flex flex-col gap-3">
          {list.map((worker) => (
            <WorkerCard
              key={worker.id}
              worker={worker}
              onVouchClick={onVouchClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}
