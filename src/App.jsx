import { useState } from 'react'
import Home from './components/Home.jsx'
import WorkerList from './components/WorkerList.jsx'

const LANG_KEY = 'kaarigar-lang'

function readLang() {
  try {
    const raw = localStorage.getItem(LANG_KEY)
    return raw === 'hindi' ? 'hindi' : 'hinglish'
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

  function handleCategorySelect(id) {
    setCategoryId(id)
    setScreen('list')
  }

  function handleLangChange(next) {
    setLang(next)
    writeLang(next)
  }

  return (
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
        />
      )}
    </>
  )
}
