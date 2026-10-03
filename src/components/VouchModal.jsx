import { useEffect, useState } from 'react'

export default function VouchModal({ worker, onClose, onConfirm }) {
  const [flat, setFlat] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    setFlat('')
    setError(false)
  }, [worker])

  if (!worker) return null

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = flat.trim()
    if (!trimmed) {
      setError(true)
      return
    }
    onConfirm(worker, trimmed)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end"
      style={{ backgroundColor: 'rgba(34,40,77,0.45)' }}
      onClick={onClose}
    >
      <div
        className="animate-vouch-slide-up w-full rounded-t-[20px] bg-card p-5"
        style={{ paddingBottom: 'calc(20px + env(safe-area-inset-bottom, 0px))' }}
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-[20px] font-semibold text-ink">
          Aapne inhe bulaya tha?
        </h2>
        <p className="mt-1 text-[15px] text-inksoft">{worker.name}</p>

        <form className="mt-5" onSubmit={handleSubmit}>
          <label htmlFor="flat" className="mb-1.5 block text-[13px] text-inksoft">
            Aapka flat number
          </label>
          <input
            id="flat"
            autoFocus
            value={flat}
            onChange={(event) => {
              setFlat(event.target.value)
              if (error) setError(false)
            }}
            placeholder="Jaise B-402"
            className="h-12 w-full rounded-card border border-line px-3.5 text-[15px] text-ink"
          />
          {error && (
            <p className="mt-1.5 text-[13px] text-red-600">
              Flat number daal do
            </p>
          )}

          <button
            type="submit"
            className="mt-4 flex h-12 w-full items-center justify-center rounded-[12px] bg-amber text-[15px] font-semibold text-ink"
          >
            Haan, maine bulaya tha
          </button>
        </form>

        <button
          type="button"
          onClick={onClose}
          className="flex h-11 w-full items-center justify-center text-[15px] text-inksoft"
        >
          Rehne do
        </button>
      </div>
    </div>
  )
}
