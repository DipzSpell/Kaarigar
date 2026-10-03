import { categories, societies } from '../data.js'

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

export default function Home({ societyId, onSocietyChange, onCategorySelect }) {
  return (
    <div className="mx-auto max-w-[480px] px-5 pt-6">
      <header>
        <h1 className="text-[28px] font-semibold text-ink">Kaarigar</h1>
        <p className="text-[13px] text-inksoft">
          Wo kaarigar jise aapke padosi bula chuke hain
        </p>
      </header>

      <ChainDivider />

      <label
        htmlFor="society"
        className="mb-1.5 block text-[13px] text-inksoft"
      >
        Aapki society
      </label>
      <select
        id="society"
        value={societyId}
        onChange={(event) => onSocietyChange(event.target.value)}
        className="h-12 w-full rounded-card border border-line bg-card px-3.5 text-[15px] text-ink"
      >
        {societies.map((society) => (
          <option key={society.id} value={society.id}>
            {society.name} - {society.area}
          </option>
        ))}
      </select>

      <h2 className="mb-3 mt-7 text-[20px] font-semibold text-ink">
        Kya kaam hai?
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategorySelect(category.id)}
            className="min-h-24 rounded-card border border-line bg-card p-4 text-left"
          >
            <span className="block text-[15px] font-semibold text-ink">
              {category.name}
            </span>
            <span className="mt-1 block text-[13px] text-inksoft">
              {category.hindi}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
