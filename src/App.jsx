import { useEffect, useState } from 'react'
import Home from './components/Home.jsx'
import WorkerList from './components/WorkerList.jsx'
import { strings } from './strings.js'

const LANG_KEY = 'kaarigar-lang'

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

function PitchPanel() {
  return (
    <aside className="flex flex-col justify-center bg-ink px-20 py-20">
      <h1 className="text-[56px] font-semibold text-paper">Kaarigar</h1>

      <ChainMotif />

      <h2 className="max-w-[520px] text-[40px] font-semibold text-paper">
        Jab AC kharab hota hai, aap Google nahi kholte. Padosi se poochte ho.
      </h2>

      <p className="mt-8 max-w-[520px] text-[20px] leading-[1.5] text-[#C9CEE4]">
        Har society me ek banda hai jiska electrician sabka electrician ban
        jata hai. Ye network pehle se hai — bas kahin likha nahi hai. Kaarigar
        usko likh deta hai.
      </p>

      <div className="mt-10 flex gap-12">
        <div>
          <p className="text-[32px] font-semibold text-amber">0%</p>
          <p className="text-[15px] text-[#8C93B5]">Commission</p>
        </div>
        <div>
          <p className="text-[32px] font-semibold text-amber">0</p>
          <p className="text-[15px] text-[#8C93B5]">App kaarigar ke liye</p>
        </div>
        <div>
          <p className="text-[32px] font-semibold text-amber">3</p>
          <p className="text-[15px] text-[#8C93B5]">Societies live</p>
        </div>
      </div>

      <p className="mt-10 text-[15px] text-[#8C93B5]">Team CoDeOn</p>
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
  const [whatsAppNonce, setWhatsAppNonce] = useState(0)
  const isDesktop = useIsDesktop()

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

  function handleWhatsAppClick() {
    setWhatsAppNonce((nonce) => nonce + 1)
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
        />
      )}

      {screen === 'list' && (
        <WorkerList
          categoryId={categoryId}
          societyId={societyId}
          lang={lang}
          onBack={() => setScreen('home')}
          onVouchClick={() => {}}
          onWhatsAppClick={handleWhatsAppClick}
        />
      )}
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
      <PitchPanel />
      <div className="flex items-center justify-center bg-paper">
        <div className="app-frame">{screens}</div>
      </div>
      {whatsAppBar}
    </div>
  )
}
