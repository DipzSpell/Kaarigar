import { useState } from 'react'
import Home from './components/Home.jsx'

export default function App() {
  const [screen, setScreen] = useState('home')
  const [societyId, setSocietyId] = useState('s1')
  const [categoryId, setCategoryId] = useState(null)

  function handleCategorySelect(id) {
    setCategoryId(id)
    setScreen('list')
  }

  return (
    <>
      {screen === 'home' && (
        <Home
          societyId={societyId}
          onSocietyChange={setSocietyId}
          onCategorySelect={handleCategorySelect}
        />
      )}

      {screen === 'list' && <div />}
    </>
  )
}
