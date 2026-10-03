import { useState } from 'react'
import { workers as baseWorkers } from './data.js'
import Home from './components/Home.jsx'
import WorkerList from './components/WorkerList.jsx'
import VouchModal from './components/VouchModal.jsx'

const STORAGE_KEY = 'kaarigar-vouches'

function readVouches() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return {}
    return parsed
  } catch {
    return {}
  }
}

function writeVouches(vouches) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vouches))
  } catch {
    // storage unavailable — fall back silently
  }
}

function mergeWorkers(vouches) {
  return baseWorkers.map((worker) => {
    const entry = vouches[worker.id]
    if (!entry) return worker
    const addedCount = Number(entry.addedCount) || 0
    const addedFlats = Array.isArray(entry.addedFlats) ? entry.addedFlats : []
    return {
      ...worker,
      vouchCount: worker.vouchCount + addedCount,
      vouchedBy: [...addedFlats, ...worker.vouchedBy],
    }
  })
}

export default function App() {
  const [screen, setScreen] = useState('home')
  const [societyId, setSocietyId] = useState('s1')
  const [categoryId, setCategoryId] = useState(null)
  const [workers, setWorkers] = useState(() => mergeWorkers(readVouches()))
  const [vouchWorker, setVouchWorker] = useState(null)

  function handleCategorySelect(id) {
    setCategoryId(id)
    setScreen('list')
  }

  function handleVouchConfirm(worker, flat) {
    const current = readVouches()
    const entry = current[worker.id]
    const addedCount = entry ? Number(entry.addedCount) || 0 : 0
    const addedFlats =
      entry && Array.isArray(entry.addedFlats) ? entry.addedFlats : []

    const next = {
      ...current,
      [worker.id]: {
        addedCount: addedCount + 1,
        addedFlats: [flat, ...addedFlats],
      },
    }

    writeVouches(next)
    setWorkers(mergeWorkers(next))
    setVouchWorker(null)
  }

  return (
    <div className="min-h-[100dvh]">
      {screen === 'home' && (
        <Home
          societyId={societyId}
          onSocietyChange={setSocietyId}
          onCategorySelect={handleCategorySelect}
        />
      )}

      {screen === 'list' && (
        <WorkerList
          categoryId={categoryId}
          societyId={societyId}
          workers={workers}
          onBack={() => setScreen('home')}
          onVouchClick={setVouchWorker}
        />
      )}

      <VouchModal
        worker={vouchWorker}
        onClose={() => setVouchWorker(null)}
        onConfirm={handleVouchConfirm}
      />
    </div>
  )
}
