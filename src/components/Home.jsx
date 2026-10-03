import { categories, societies, workers } from '../data.js'
import { strings } from '../strings.js'

const LANGS = [
  { id: 'en', label: 'EN' },
  { id: 'hinglish', label: 'Hin' },
  { id: 'hindi', label: 'हिं' },
]

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
        onChange={(event) => onSocietyChange(event.target.value)}
        className="h-12 w-full rounded-card border border-line bg-card px-3.5 text-[15px] text-ink active:bg-paper"
      >
        {societies.map((society) => (
          <option key={society.id} value={society.id}>
            {society.name} - {society.area}
          </option>
        ))}
      </select>

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
