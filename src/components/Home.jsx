import { useState } from 'react'
import { categories, societies, workers } from '../data.js'
import { strings } from '../strings.js'

const LANGS = [
  { id: 'en', label: 'EN' },
  { id: 'hinglish', label: 'Hin' },
  { id: 'hindi', label: 'हिं' },
]

// Straight-line (great-circle) distance in km between two coordinates.
function haversineKm(lat1, lng1, lat2, lng2) {
  const toRad = (deg) => (deg * Math.PI) / 180
  const R = 6371
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

function ChainDivider() {
  return (
    <svg
      className="my-5 block h-5 w-full text-amber"
      role="presentation"
      aria-hidden="true"
    >
      <line
        x1="10"
        y1="10"
        x2="100%"
        y2="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="10 8"
        strokeLinecap="round"
        transform="translate(-5 0)"
      />
      <circle cx="5" cy="10" r="5" fill="currentColor" />
      <circle cx="50%" cy="10" r="5" fill="currentColor" />
      <circle
        cx="100%"
        cy="10"
        r="5"
        fill="currentColor"
        transform="translate(-5 0)"
      />
    </svg>
  )
}

export default function Home({
  societyId,
  onSocietyChange,
  onCategorySelect,
  lang,
  onLangChange,
  theme,
  onThemeToggle,
}) {
  const t = strings[lang]
  const [locating, setLocating] = useState(false)
  const [locateResult, setLocateResult] = useState(null)
  const [address, setAddress] = useState('')
  const [addressResult, setAddressResult] = useState(null)

  function handleSocietyChange(nextId) {
    setLocateResult(null)
    setAddressResult(null)
    onSocietyChange(nextId)
  }

  function handleAddressChange(value) {
    setAddress(value)
    setAddressResult(null)
  }

  function handleAddressSubmit() {
    const query = address.trim().toLowerCase()
    if (!query) return

    const match = societies.find(
      (society) =>
        society.name.toLowerCase().includes(query) ||
        society.area.toLowerCase().includes(query),
    )

    if (match) {
      onSocietyChange(match.id)
      setLocateResult(null)
      setAddressResult({ name: match.name })
      return
    }

    setAddressResult({ address: address.trim() })
  }

  function handleLocate() {
    setLocateResult(null)

    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setLocateResult({ error: true })
      return
    }

    setLocating(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords

        const nearest = societies.reduce((best, society) => {
          const distance =
            haversineKm(latitude, longitude, society.lat, society.lng) || 0
          if (!best || distance < best.distance) {
            return { society, distance }
          }
          return best
        }, null)

        setLocating(false)

        if (!nearest) {
          setLocateResult({ error: true })
          return
        }

        onSocietyChange(nearest.society.id)
        setLocateResult({
          name: nearest.society.name,
          distance: nearest.distance,
        })
      },
      () => {
        setLocating(false)
        setLocateResult({ error: true })
      },
    )
  }

  return (
    <div className="mx-auto max-w-[480px] px-5 pt-6">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-[34px] font-semibold text-ink">Kaarigar</h1>
          <p className="text-[13px] tracking-[2px] text-inksoft">{t.tagline}</p>
        </div>

        <div className="flex h-11 shrink-0 items-center">
          <button
            type="button"
            onClick={onThemeToggle}
            className="mr-2 flex h-11 items-center text-[15px] text-inksoft"
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <span className="mr-2 h-4 w-px bg-line" />

          {LANGS.map((option, index) => (
            <div key={option.id} className="flex h-11 items-center">
              {index > 0 && <span className="mx-2 h-4 w-px bg-line" />}
              <button
                type="button"
                onClick={() => onLangChange(option.id)}
                className={`flex h-11 items-center text-[15px] ${
                  lang === option.id
                    ? 'font-semibold text-amberdeep'
                    : 'text-inksoft'
                }`}
              >
                {option.label}
              </button>
            </div>
          ))}
        </div>
      </header>

      <ChainDivider />

      <label
        htmlFor="society"
        className="mb-1.5 block text-[13px] text-inksoft"
      >
        {t.society}
      </label>
      <select
        id="society"
        value={societyId}
        onChange={(event) => handleSocietyChange(event.target.value)}
        className="h-12 w-full rounded-card border border-line bg-card px-3.5 text-[15px] text-ink active:bg-paper"
      >
        {societies.map((society) => (
          <option key={society.id} value={society.id}>
            {society.name} - {society.area}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={handleLocate}
        className="mt-3 h-12 w-full rounded-card border border-line bg-card text-[15px] text-ink active:bg-paper"
      >
        {locating ? 'Dhundh rahe hain...' : 'Meri location se dhundho'}
      </button>

      {locateResult && (
        <p
          className={`mt-2 text-[13px] ${
            locateResult.error ? 'text-inksoft' : 'text-amberdeep'
          }`}
        >
          {locateResult.error
            ? 'Location nahi mili — list se chun lo'
            : `${locateResult.name} — ${locateResult.distance.toFixed(1)} km door`}
        </p>
      )}

      <label
        htmlFor="address"
        className="mb-1.5 mt-3 block text-[13px] text-inksoft"
      >
        Aapka address
      </label>
      <div className="flex gap-3">
        <input
          id="address"
          type="text"
          value={address}
          onChange={(event) => handleAddressChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') handleAddressSubmit()
          }}
          placeholder="Ya apna address likho — jaise Sector 4, Kopar Khairane"
          className="h-12 w-full rounded-card border border-line bg-card px-[14px] text-[15px] text-ink active:bg-paper"
        />
        <button
          type="button"
          onClick={handleAddressSubmit}
          className="h-12 shrink-0 rounded-card border border-line bg-card px-4 text-[15px] text-ink active:bg-paper"
        >
          Dhundho
        </button>
      </div>

      {addressResult && (
        <div className="mt-2 text-[13px]">
          {addressResult.name ? (
            <p className="text-amberdeep">{addressResult.name} mila</p>
          ) : (
            <>
              <p className="text-inksoft">
                Ye area abhi list me nahi hai — aap pehle ho sakte ho.
              </p>
              <p className="text-[15px] text-ink">{addressResult.address}</p>
            </>
          )}
        </div>
      )}

      <h2 className="mb-6 mt-7 text-[20px] font-semibold text-ink">
        {t.whatWork}
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => {
          const count = workers.filter(
            (worker) =>
              worker.categoryId === category.id &&
              worker.societyId === societyId,
          ).length

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onCategorySelect(category.id)}
              className={`min-h-24 rounded-card border-y border-r border-line border-l-[3px] bg-card p-4 text-left active:bg-paper ${
                count > 0 ? 'border-l-amber' : 'border-l-line'
              }`}
            >
              <span className="block text-[15px] font-semibold text-ink">
                {lang === 'hindi' ? category.hindi : category.name}
              </span>
              {lang === 'hinglish' && (
                <span className="mt-1 block text-[13px] text-inksoft">
                  {category.hindi}
                </span>
              )}
              {count > 0 ? (
                <span className="mt-2.5 block text-[13px] text-amberdeep">
                  {count} {t.countWord}
                </span>
              ) : (
                <span className="mt-2.5 block text-[13px] text-inksoft">
                  {t.noCount}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
