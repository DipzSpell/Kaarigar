import { useEffect, useState } from 'react'
import Home from './components/Home.jsx'
import WorkerList from './components/WorkerList.jsx'
import VouchModal from './components/VouchModal.jsx'
import { strings } from './strings.js'
import { workers as baseWorkers } from './data.js'

const LANG_KEY = 'kaarigar-lang'
const THEME_KEY = 'kaarigar-theme'
const STORAGE_KEY = 'kaarigar-vouches'

function readTheme() {
  try {
    const raw = localStorage.getItem(THEME_KEY)
    return raw === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

function writeTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    // storage unavailable — fall back silently
  }
}

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

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(min-width: 768px)').matches
  })

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)')
    const handleChange = (event) => setIsDesktop(event.matches)
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  return isDesktop
}

function ChainMotif() {
  return (
    <svg
      className="my-8 block h-5 w-[360px] text-amber"
      role="presentation"
      aria-hidden="true"
    >
      <line
        x1="10"
        y1="10"
        x2="350"
        y2="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="10 8"
        strokeLinecap="round"
      />
      <circle cx="10" cy="10" r="5" fill="currentColor" />
      <circle cx="180" cy="10" r="5" fill="currentColor" />
      <circle cx="350" cy="10" r="5" fill="currentColor" />
    </svg>
  )
}

function PitchPanel({ t }) {
  return (
    <aside className="pitch-panel flex flex-col justify-center bg-ink px-20 py-20">
      <h1 className="text-[56px] font-semibold text-paper">{t.title}</h1>

      <ChainMotif />

      <h2 className="max-w-[520px] text-[40px] font-semibold text-paper">
        {t.pitchHeadline}
      </h2>

      <p className="mt-8 max-w-[520px] text-[20px] leading-[1.5] text-[#C9CEE4]">
        {t.pitchBody}
      </p>

      <div className="mt-10 flex gap-12">
        <div>
          <p className="text-[32px] font-semibold text-amber">0%</p>
          <p className="text-[15px] text-[#8C93B5]">{t.pitchCommission}</p>
        </div>
        <div>
          <p className="text-[32px] font-semibold text-amber">0</p>
          <p className="text-[15px] text-[#8C93B5]">{t.pitchApp}</p>
        </div>
        <div>
          <p className="text-[32px] font-semibold text-amber">3</p>
          <p className="text-[15px] text-[#8C93B5]">{t.pitchSocieties}</p>
        </div>
      </div>

      <p className="mt-10 text-[15px] text-[#8C93B5]">{t.pitchTeam}</p>
    </aside>
  )
}

function readLang() {
  try {
    const raw = localStorage.getItem(LANG_KEY)
    if (raw === 'en' || raw === 'hindi' || raw === 'hinglish') return raw
    return 'hinglish'
  } catch {
    return 'hinglish'
  }
}

function writeLang(lang) {
  try {
    localStorage.setItem(LANG_KEY, lang)
  } catch {
    // storage unavailable — fall back silently
  }
}

export default function App() {
  const [screen, setScreen] = useState('home')
  const [societyId, setSocietyId] = useState('s1')
  const [categoryId, setCategoryId] = useState(null)
  const [lang, setLang] = useState(readLang)
  const [theme, setTheme] = useState(readTheme)
  const [workers, setWorkers] = useState(() => mergeWorkers(readVouches()))
  const [vouchWorker, setVouchWorker] = useState(null)
  const [flashWorkerId, setFlashWorkerId] = useState(null)
  const [whatsAppNonce, setWhatsAppNonce] = useState(0)
  const isDesktop = useIsDesktop()

  useEffect(() => {
    if (!flashWorkerId) return undefined
    const timer = setTimeout(() => setFlashWorkerId(null), 700)
    return () => clearTimeout(timer)
  }, [flashWorkerId])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    if (whatsAppNonce === 0) return undefined
    const timer = setTimeout(() => setWhatsAppNonce(0), 4000)
    return () => clearTimeout(timer)
  }, [whatsAppNonce])

  function handleCategorySelect(id) {
    setCategoryId(id)
    setScreen('list')
  }

  function handleLangChange(next) {
    setLang(next)
    writeLang(next)
  }

  function handleThemeToggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    writeTheme(next)
  }

  function handleWhatsAppClick() {
    setWhatsAppNonce((nonce) => nonce + 1)
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
    setFlashWorkerId(worker.id)
  }

  const screens = (
    <>
      {screen === 'home' && (
        <Home
          societyId={societyId}
          onSocietyChange={setSocietyId}
          onCategorySelect={handleCategorySelect}
          lang={lang}
          onLangChange={handleLangChange}
          theme={theme}
          onThemeToggle={handleThemeToggle}
        />
      )}

      {screen === 'list' && (
        <WorkerList
          categoryId={categoryId}
          societyId={societyId}
          workers={workers}
          flashWorkerId={flashWorkerId}
          lang={lang}
          onBack={() => setScreen('home')}
          onVouchClick={setVouchWorker}
          onWhatsAppClick={handleWhatsAppClick}
        />
      )}

      <VouchModal
        worker={vouchWorker}
        lang={lang}
        onClose={() => setVouchWorker(null)}
        onConfirm={handleVouchConfirm}
      />
    </>
  )

  const whatsAppBar = whatsAppNonce > 0 && (
    <div
      key={whatsAppNonce}
      className="animate-toast-fade fixed inset-x-0 z-50 mx-4 rounded-[12px] bg-ink px-3.5 py-3.5 text-[14px] text-paper"
      style={{ bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))' }}
      role="status"
    >
      {strings[lang].whatsappReady}
    </div>
  )

  if (!isDesktop) {
    return (
      <>
        {screens}
        {whatsAppBar}
      </>
    )
  }

  return (
    <div className="app-shell">
      <PitchPanel t={strings[lang]} />
      <div className="flex items-center justify-center bg-paper">
        <div className="app-frame">{screens}</div>
      </div>
      {whatsAppBar}
    </div>
  )
}
