import { useState, useEffect } from "react"
import eyeOpen from './assets/eye-open.png'
import eyeClosed from './assets/eye-closed.png'

// ─── Cookie helpers ───────────────────────────────────────────────────────────
function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict`
}
function getCookie(name: string): string | null {
  const match = document.cookie
    .split("; ")
    .find((r) => r.startsWith(name + "="))
  return match ? decodeURIComponent(match.split("=")[1]) : null
}
function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Strict`
}

// ─── Demo credentials ─────────────────────────────────────────────────────────
const DEMO_USERS = [
  { email: "user@foodie.id", password: "foodie123", name: "Foodie User" },
  { email: "admin@foodie.id", password: "admin123", name: "Admin" },
]

// ─── Google Logo SVG ──────────────────────────────────────────────────────────
function GoogleLogo() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  )
}

// ─── Google Account Picker Modal ──────────────────────────────────────────────
const MOCK_GOOGLE_ACCOUNTS = [
  { name: "Foodie User", email: "foodieuser@gmail.com", avatar: "FU" },
  { name: "Sari Dewi", email: "saridewi@gmail.com", avatar: "SD" },
]

function GooglePickerModal({
  onSelect,
  onClose,
}: {
  onSelect: (name: string, email: string) => void
  onClose: () => void
}) {
  const [loading, setLoading] = useState<string | null>(null)

  const handlePick = (acc: typeof MOCK_GOOGLE_ACCOUNTS[number]) => {
    setLoading(acc.email)
    setTimeout(() => {
      setCookie(
        "foodie_session",
        JSON.stringify({ name: acc.name, email: acc.email }),
        7,
      )
      onSelect(acc.name, acc.email)
    }, 900)
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Google header */}
        <div className="px-6 pt-6 pb-4 text-center border-b border-gray-100">
          <div className="flex justify-center mb-3">
            <GoogleLogo />
          </div>
          <h3 className="text-base font-medium text-[#202124]">
            Sign in with Google
          </h3>
          <p className="text-xs text-[#5f6368] mt-1">to continue to FOODIE</p>
        </div>

        {/* Accounts */}
        <div className="py-2">
          {MOCK_GOOGLE_ACCOUNTS.map((acc) => (
            <button
              key={acc.email}
              onClick={() => handlePick(acc)}
              disabled={loading !== null}
              className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors text-left disabled:opacity-60"
            >
              <div className="w-10 h-10 rounded-full bg-[#2B7A78] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                {loading === acc.email ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                ) : (
                  acc.avatar
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#202124] truncate">
                  {acc.name}
                </p>
                <p className="text-xs text-[#5f6368] truncate">{acc.email}</p>
              </div>
            </button>
          ))}

          <button
            onClick={onClose}
            className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#5f6368] text-lg flex-shrink-0">
              +
            </div>
            <p className="text-sm text-[#1a73e8] font-medium">
              Use another account
            </p>
          </button>
        </div>

        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-[10px] text-[#5f6368]">
            By continuing, Google will share your name and email with FOODIE.{" "}
            <span className="text-[#1a73e8]">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Login Page ───────────────────────────────────────────────────────────────
function LoginPage({ onLogin }: { onLogin: (name: string) => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showGooglePicker, setShowGooglePicker] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    setTimeout(() => {
      const user = DEMO_USERS.find(
        (u) =>
          u.email === email.trim().toLowerCase() && u.password === password,
      )
      if (user) {
        setCookie(
          "foodie_session",
          JSON.stringify({ name: user.name, email: user.email }),
          7,
        )
        onLogin(user.name)
      } else {
        setError("Invalid email or password.")
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(135deg, #153F3D 0%, #2B7A78 60%, #3a9e9b 100%)",
      }}
    >
      {showGooglePicker && (
        <GooglePickerModal
          onSelect={(name) => onLogin(name)}
          onClose={() => setShowGooglePicker(false)}
        />
      )}

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-4xl font-extrabold tracking-tight text-white mb-1">
            FOOD<span className="text-[#F4A261]">IE</span>
          </div>
          <p className="text-white/60 text-sm">
            Discover something worth eating.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-[#153F3D] mb-1">
            Welcome back
          </h2>
          <p className="text-[#888] text-sm mb-6">
            Sign in to your FOODIE account
          </p>

          {/* Google button */}
          <button
            onClick={() => setShowGooglePicker(true)}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-[#3c4043] font-medium py-3 rounded-xl text-sm transition-all mb-5 shadow-sm"
          >
            <GoogleLogo />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-[#aaa] font-medium">
              or sign in with email
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#555] uppercase tracking-wide mb-1.5">
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2B7A78] focus:ring-2 focus:ring-[#2B7A78]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#555] uppercase tracking-wide mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:border-[#2B7A78] focus:ring-2 focus:ring-[#2B7A78]/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 opacity-40 hover:opacity-70 transition-opacity"
                  tabIndex={-1}
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  <img
                    src={showPass ? eyeClosed : eyeOpen}
                    alt={showPass ? "Hide" : "Show"}
                    className="w-5 h-5 object-contain"
                  />
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2B7A78] hover:bg-[#236360] disabled:bg-[#2B7A78]/60 text-white font-bold py-3.5 rounded-xl text-[15px] transition-colors mt-1 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 bg-[#EDF7F5] rounded-xl px-4 py-3">
            <p className="text-xs text-[#2B7A78] font-semibold mb-1">
              Demo credentials
            </p>
            <p className="text-xs text-[#555]">user@foodie.id · foodie123</p>
          </div>
        </div>

        <p className="text-center text-white/40 text-xs mt-6">
          Protected by FOODIE secure session · Jakarta
        </p>
      </div>
    </div>
  )
}

// ─── Data ────────────────────────────────────────────────────────────────────

const restaurants = [
  {
    id: 1,
    name: "Rempah Bistro",
    rating: 4.4,
    category: "Indonesian",
    location: "Central Park",
    price: "Rp 50K – 100K",
    reviews: "740+",
    tags: ["Hidden Gem", "Indonesian", "Parking", "Group Friendly"],
    filters: ["hidden", "cheap", "parking"],
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&h=500&fit=crop&auto=format",
    desc: "A warm, intimate bistro serving authentic Indonesian flavors with a modern twist. Known for its rich rempah (spice) dishes and cozy atmosphere that feels like home cooking elevated.",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Rempah+Bistro+Central+Park+Jakarta",
    match: "94%",
    matchDesc:
      "A hidden gem for Indonesian food with a reasonable price and a strong rating.",
  },
  {
    id: 2,
    name: "Baia Nonna",
    rating: 4.9,
    category: "Southeast Asian",
    location: "Tribeca",
    price: "Rp 50K – 150K",
    reviews: "1,100+",
    tags: ["Highly Rated", "Parking"],
    filters: ["rating", "parking"],
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=500&fit=crop&auto=format",
    desc: "A beloved Southeast Asian kitchen with a relaxed, modern dining room. Baia Nonna blends regional flavors from across the archipelago with careful technique and seasonal ingredients.",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Baia+Nonna+Central+Park+Jakarta",
    match: "91%",
    matchDesc:
      "A highly-rated choice if you want something comfortable and popular near Tribeca.",
  },
  {
    id: 3,
    name: "Katsukita",
    rating: 4.9,
    category: "Japanese",
    location: "Central Park",
    price: "Rp 50K – 150K",
    reviews: "4,300+",
    tags: ["Highly Rated", "Japanese", "Parking"],
    filters: ["rating", "parking"],
    image:
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&h=500&fit=crop&auto=format",
    desc: "The undisputed home of katsu in Central Park. Katsukita's crispy, golden cutlets are legendary — the tonkatsu sauce recipe hasn't changed since day one.",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Katsukita+Central+Park+Jakarta",
    match: "89%",
    matchDesc:
      "A strong choice when craving Japanese food — excellent ratings back it up.",
  },
  {
    id: 4,
    name: "Song Fa Bak Kut Teh",
    rating: 4.8,
    category: "Singaporean",
    location: "Central Park",
    price: "Rp 100K – 200K",
    reviews: "2,100+",
    tags: ["Highly Rated", "Singaporean"],
    filters: ["rating"],
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&h=500&fit=crop&auto=format",
    desc: "Singapore's iconic peppery pork rib soup, faithfully recreated in Jakarta. The broth is simmered for hours with prime pork ribs, garlic, and a proprietary spice blend.",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Song+Fa+Bak+Kut+Teh+Central+Park+Jakarta",
    match: "87%",
    matchDesc:
      "Authentic Singaporean flavors and top ratings make this a reliable choice.",
  },
  {
    id: 5,
    name: "Dandang Gulo",
    rating: 4.9,
    category: "Indonesian",
    location: "Palmerah",
    price: "Rp 50K – 100K",
    reviews: "380+",
    tags: ["Hidden Gem", "Nusantara"],
    filters: ["hidden", "cheap"],
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=500&fit=crop&auto=format",
    desc: "A quiet Nusantara kitchen in Palmerah that doesn't need to advertise — the regulars keep it full. Rotating regional menus mean every visit brings something new.",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Dandang+Gulo+Palmerah+Jakarta",
    match: "96%",
    matchDesc:
      "A less obvious Indonesian pick with an exceptional rating — a true hidden gem.",
  },
  {
    id: 6,
    name: "Remboelan",
    rating: 4.8,
    category: "Indonesian",
    location: "Central Park",
    price: "Rp 75K – 150K",
    reviews: "3,500+",
    tags: ["Highly Rated", "Parking", "Group Friendly"],
    filters: ["rating", "parking"],
    image:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&h=500&fit=crop&auto=format",
    desc: "A spacious Indonesian restaurant with a colonial-era ambiance and a menu that tours the archipelago. Ideal for groups — the long communal tables are part of the experience.",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Remboelan+Central+Park+Jakarta",
    match: "88%",
    matchDesc:
      "Highly rated, group-friendly, and centrally located — a dependable all-rounder.",
  },
]

const recommendations = [0, 1, 2, 4] // indices into restaurants array
const groupRecommendations = [0, 5] // group-friendly only

type Restaurant = typeof restaurants[number]

// ─── Tag pill component ───────────────────────────────────────────────────────
function Tag({ label }: { label: string }) {
  const cls =
    label === "Hidden Gem"
      ? "bg-amber-50 text-amber-700"
      : label === "Parking"
        ? "bg-blue-50 text-blue-700"
        : label === "Group Friendly"
          ? "bg-purple-50 text-purple-700"
          : label === "Highly Rated"
            ? "bg-green-50 text-green-700"
            : "bg-[#EDF7F5] text-[#2B7A78]"
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full ${cls}`}
    >
      {label === "Hidden Gem" && "💎"}
      {label === "Parking" && "🚗"}
      {label === "Group Friendly" && "👥"}
      {label === "Highly Rated" && "⭐"}
      {label}
    </span>
  )
}

// ─── Restaurant Card ──────────────────────────────────────────────────────────
function RestaurantCard({
  r,
  onView,
}: {
  r: Restaurant
  onView: (r: Restaurant) => void
}) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="relative h-52 bg-[#EDF7F5]">
        <img
          src={r.image}
          alt={r.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-sm font-semibold text-[#222]">
          ⭐ {r.rating}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-[18px] font-bold text-[#222] mb-1">{r.name}</h3>
        <p className="text-sm text-[#888] mb-0.5">
          {r.category} · {r.location}
        </p>
        <p className="text-sm font-semibold text-[#2B7A78] mb-3">{r.price}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {r.tags.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <span className="text-sm text-[#999]">{r.reviews} reviews</span>
          <button
            onClick={() => onView(r)}
            className="bg-[#2B7A78] hover:bg-[#236360] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            View
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Restaurant Detail Modal ──────────────────────────────────────────────────
function RestaurantModal({
  r,
  onClose,
}: {
  r: Restaurant
  onClose: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#102F2D]/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 bg-[#EDF7F5]">
          <img
            src={r.image}
            alt={r.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#222] hover:bg-white transition-colors shadow-sm"
          >
            ←
          </button>
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold">
            ⭐ {r.rating}
          </div>
        </div>
        <div className="p-7">
          <h2 className="text-2xl font-bold text-[#222] mb-1">{r.name}</h2>
          <p className="text-[#888] text-sm mb-1">
            {r.category} · {r.location}
          </p>
          <p className="text-[#2B7A78] font-semibold mb-4">{r.price}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {r.tags.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
          <p className="text-[#555] leading-relaxed mb-6">{r.desc}</p>
          <div className="flex gap-3 flex-wrap">
            <a
              href={r.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#F4A261] hover:bg-[#e89550] text-white font-semibold px-5 py-3 rounded-xl transition-colors"
            >
              📍 Open in Google Maps
            </a>
            <button
              onClick={onClose}
              className="flex items-center gap-2 border border-[#2B7A78] text-[#2B7A78] hover:bg-[#EDF7F5] font-semibold px-5 py-3 rounded-xl transition-colors"
            >
              ← Back to Discover
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Party Size Modal ─────────────────────────────────────────────────────────
function PartyModal({ onClose }: { onClose: (size: number) => void }) {
  const [selected, setSelected] = useState<number | null>(null)
  const [custom, setCustom] = useState("")

  const handleSubmit = () => {
    const n = custom ? parseInt(custom) : selected
    if (!n) return
    onClose(n)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#102F2D]/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
        <div className="text-4xl mb-4">👋</div>
        <h2 className="text-2xl font-bold text-[#153F3D] mb-2">
          Welcome to FOODIE
        </h2>
        <p className="text-[#666] leading-relaxed mb-6">
          Before we recommend a place, tell us how many people are eating with
          you.
        </p>
        <div className="grid grid-cols-4 gap-3 mb-5">
          {[1, 2, 3, "4+"].map((n, i) => (
            <button
              key={n}
              onClick={() => {
                setSelected(i === 3 ? 4 : n as number)
                setCustom("")
              }}
              className={`py-4 rounded-2xl text-lg font-bold border-2 transition-all ${
                selected === (i === 3 ? 4 : n)
                  ? "bg-[#2B7A78] text-white border-[#2B7A78] scale-105"
                  : "border-gray-200 text-[#333] hover:border-[#2B7A78] hover:text-[#2B7A78]"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <input
          type="number"
          min="1"
          placeholder="Or enter exact number of people"
          value={custom}
          onChange={(e) => {
            setCustom(e.target.value)
            setSelected(null)
          }}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] mb-5 focus:outline-none focus:border-[#2B7A78] focus:ring-2 focus:ring-[#2B7A78]/20"
        />
        {selected && selected >= 4 && (
          <div className="bg-[#EDF7F5] text-[#2B7A78] rounded-xl px-4 py-3 text-sm mb-5 text-left">
            👥 <strong>Group mode on!</strong> We'll prioritize restaurants with
            larger seating and group dining options.
          </div>
        )}
        <button
          onClick={handleSubmit}
          disabled={!selected && !custom}
          className="w-full bg-[#2B7A78] hover:bg-[#236360] disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-4 rounded-xl text-[16px] transition-colors"
        >
          Find My Food
        </button>
      </div>
    </div>
  )
}

// ─── FOODIE Card Apply Modal ──────────────────────────────────────────────────
function CardModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"form" | "confirm">("form")
  const [form, setForm] = useState({ name: "", email: "", phone: "" })

  const handleSubmit = () => setStep("confirm")

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#102F2D]/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {step === "form" ? (
          <>
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-[#999] hover:text-[#333] text-xl"
            >
              ✕
            </button>
            <div className="text-3xl mb-4">💳</div>
            <h2 className="text-2xl font-bold text-[#153F3D] mb-2">
              Apply for FOODIE Card
            </h2>
            <p className="text-[#777] mb-6 text-sm">
              Unlock parking benefits and exclusive restaurant promotions.
            </p>
            <div className="flex flex-col gap-3 mb-6">
              {(["Full Name", "Email", "Phone Number"] as const).map(
                (label) => (
                  <div key={label}>
                    <label className="block text-xs font-semibold text-[#555] mb-1.5 uppercase tracking-wide">
                      {label}
                    </label>
                    <input
                      type={
                        label === "Email"
                          ? "email"
                          : label === "Phone Number"
                            ? "tel"
                            : "text"
                      }
                      placeholder={label}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2B7A78] focus:ring-2 focus:ring-[#2B7A78]/20"
                    />
                  </div>
                ),
              )}
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-[#2B7A78] hover:bg-[#236360] text-white font-bold py-4 rounded-xl transition-colors"
            >
              Continue Application
            </button>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="text-5xl mb-5">🎉</div>
            <h2 className="text-2xl font-bold text-[#153F3D] mb-3">
              Application Started
            </h2>
            <p className="text-[#666] leading-relaxed mb-7">
              You can continue your registration and payment in the full FOODIE
              experience.
            </p>
            <button
              onClick={onClose}
              className="bg-[#2B7A78] hover:bg-[#236360] text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Got It
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Parking Floor Bar ────────────────────────────────────────────────────────
function FloorBar({ label, pctFree }: { label: string pctFree: number }) {
  const color =
    pctFree >= 50 ? "#4caf72" : pctFree >= 20 ? "#e6a23c" : "#d9534f"
  const textColor =
    pctFree >= 50 ? "#2b9b72" : pctFree >= 20 ? "#e69a27" : "#d9534f"
  const status =
    pctFree >= 50 ? "Available" : pctFree >= 20 ? "Limited" : "Almost Full"
  return (
    <div className="flex items-center gap-4 bg-white/60 rounded-xl px-4 py-3">
      <span className="w-8 font-bold text-white/90 text-sm">{label}</span>
      <div className="flex-1 h-3 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${100 - pctFree}%`, background: color }}
        />
      </div>
      <span
        className="text-xs font-semibold w-20 text-right"
        style={{ color: textColor }}
      >
        {pctFree}% free
      </span>
      <span className="text-xs text-white/60 w-20 text-right hidden lg:block">
        {status}
      </span>
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────
function FoodieApp({
  loggedInUser,
  onLogout,
}: {
  loggedInUser: string
  onLogout: () => void
}) {
  const [showParty, setShowParty] = useState(true)
  const [partySize, setPartySize] = useState(0)
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [detailRest, setDetailRest] = useState<Restaurant | null>(null)
  const [showCardModal, setShowCardModal] = useState(false)
  const [recIdx, setRecIdx] = useState(0)
  const [vehicle, setVehicle] = useState<"car" | "motorcycle">("car")
  const [navScrolled, setNavScrolled] = useState(false)
  const [activeNav, setActiveNav] = useState("discover")

  useEffect(() => {
    const handler = () => setNavScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const handlePartyClose = (size: number) => {
    setPartySize(size)
    setShowParty(false)
    if (size >= 4) setRecIdx(0)
  }

  const recPool = partySize >= 4 ? groupRecommendations : recommendations
  const currentRec = restaurants[recPool[recIdx % recPool.length]]

  const handleNextRec = () => {
    setRecIdx((i) => i + 1)
    document
      .getElementById("recommendation")
      ?.scrollIntoView({ behavior: "smooth" })
  }

  const filteredRestaurants = restaurants.filter((r) => {
    const matchesFilter =
      activeFilter === "all" || r.filters.includes(activeFilter)
    const matchesSearch =
      !searchQuery ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesGroup = partySize < 4 || r.tags.includes("Group Friendly")
    return (
      matchesFilter &&
      matchesSearch &&
      (activeFilter === "all" ? matchesGroup || partySize < 4 : true)
    )
  })

  const handleSearch = () => {
    document.getElementById("discover")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollTo = (id: string) => {
    setActiveNav(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-[#F7F8F6]">
      {/* Party Modal */}
      {showParty && <PartyModal onClose={handlePartyClose} />}

      {/* Restaurant Detail Modal */}
      {detailRest && (
        <RestaurantModal r={detailRest} onClose={() => setDetailRest(null)} />
      )}

      {/* FOODIE Card Modal */}
      {showCardModal && <CardModal onClose={() => setShowCardModal(false)} />}

      {/* ── Nav ── */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          navScrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
            : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-14 flex items-center justify-between h-16">
          <div className="text-2xl font-extrabold tracking-tight text-[#153F3D]">
            FOOD<span className="text-[#F4A261]">IE</span>
          </div>
          <ul className="hidden md:flex items-center gap-8">
            {[
              { id: "discover", label: "Discover" },
              { id: "parking", label: "Parking" },
              { id: "recommendation", label: "For You" },
              { id: "how", label: "How It Works" },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`text-sm font-medium transition-colors pb-1 border-b-2 ${
                    activeNav === item.id
                      ? "text-[#2B7A78] border-[#2B7A78]"
                      : "text-[#555] border-transparent hover:text-[#2B7A78]"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            {partySize > 0 && (
              <button
                onClick={() => setShowParty(true)}
                className="flex items-center gap-1.5 text-sm text-[#2B7A78] font-medium bg-[#EDF7F5] hover:bg-[#d9eeeb] px-3 py-2 rounded-full transition-colors border border-[#2B7A78]/20"
                title="Change party size"
              >
                👥 {partySize === 4 ? "4+" : partySize}
              </button>
            )}
            <button
              onClick={() => scrollTo("profile")}
              className="bg-[#2B7A78] hover:bg-[#236360] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              {loggedInUser.split(" ")[0]}
            </button>
            <button
              onClick={onLogout}
              className="text-sm text-[#888] hover:text-[#333] font-medium px-2 py-2 transition-colors"
              title="Sign out"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        className="relative min-h-[580px] flex items-center px-6 lg:px-14"
        style={{
          background:
            "linear-gradient(rgba(247,248,246,0.93),rgba(247,248,246,0.93)), url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&h=900&fit=crop&auto=format) center/cover",
        }}
      >
        <div className="max-w-7xl mx-auto w-full py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold tracking-widest text-[#2B7A78] uppercase mb-5">
              Your Personal Food Guide
            </span>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-[#222] leading-[1.05] mb-6">
              Not sure what
              <br />
              to eat? <span className="text-[#2B7A78]">We've got you.</span>
            </h1>
            <p className="text-lg text-[#666] leading-relaxed max-w-[540px] mb-9">
              Discover hidden gems, highly-rated restaurants, affordable meals,
              and places with available parking around Slipi and Central Park.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  scrollTo("recommendation")
                  handleNextRec()
                }}
                className="bg-[#2B7A78] hover:bg-[#236360] text-white font-bold px-7 py-4 rounded-full text-[15px] transition-colors shadow-[0_8px_20px_rgba(43,122,120,0.3)]"
              >
                Recommend Something
              </button>
              <button
                onClick={() => scrollTo("discover")}
                className="bg-white hover:bg-[#EDF7F5] text-[#2B7A78] border border-[#2B7A78] font-bold px-7 py-4 rounded-full text-[15px] transition-colors"
              >
                Explore Restaurants
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Search Card ── */}
      <div className="max-w-5xl mx-auto px-6 lg:px-14 -mt-10 relative z-10 mb-14">
        <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.10)] p-7">
          <h3 className="text-xl font-bold text-[#222] mb-4">
            What are you craving?
          </h3>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Try: Japanese, cheap food, dessert..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 border border-gray-200 rounded-xl px-5 py-3.5 text-[15px] focus:outline-none focus:border-[#2B7A78] focus:ring-2 focus:ring-[#2B7A78]/20"
            />
            <button
              onClick={handleSearch}
              className="bg-[#F4A261] hover:bg-[#e89550] text-white font-bold px-7 py-3.5 rounded-xl transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* ── Discover Restaurants ── */}
      <section id="discover" className="max-w-7xl mx-auto px-6 lg:px-14 pb-20">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#222] mb-1">
            Discover Around You
          </h2>
          <p className="text-[#888]">
            Restaurants around Slipi &amp; Central Park
          </p>
        </div>

        {partySize >= 4 && (
          <div className="bg-[#EDF7F5] text-[#2B7A78] rounded-xl px-5 py-3.5 text-sm mb-6 border border-[#2B7A78]/20">
            👥 <strong>Group of 4+ detected:</strong> We're prioritizing
            restaurants with larger seating and group dining options.
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-2 flex-wrap mb-8">
          {[
            { id: "all", label: "All" },
            { id: "hidden", label: "💎 Hidden Gems" },
            { id: "rating", label: "⭐ Highly Rated" },
            { id: "cheap", label: "💰 Budget Friendly" },
            { id: "parking", label: "🚗 Easy Parking" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                activeFilter === f.id
                  ? "bg-[#2B7A78] text-white border-[#2B7A78]"
                  : "bg-white text-[#555] border-gray-200 hover:border-[#2B7A78] hover:text-[#2B7A78]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((r) => (
              <RestaurantCard key={r.id} r={r} onView={setDetailRest} />
            ))
          ) : (
            <div className="col-span-3 text-center py-16 text-[#aaa]">
              <div className="text-4xl mb-3">🍽️</div>
              <p className="font-medium">No restaurants match your search.</p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setActiveFilter("all")
                }}
                className="mt-4 text-[#2B7A78] text-sm underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Parking ── */}
      <section
        id="parking"
        className="bg-[#153F3D] text-white py-20 px-6 lg:px-14"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-2">
            Check Parking Before You Go 🚗
          </h2>
          <p className="text-[#b8cecc] mb-8 text-lg">
            Choose your vehicle and see the parking situation before heading to
            your restaurant.
          </p>

          {/* Vehicle selector */}
          <div className="flex gap-3 mb-8">
            {(["car", "motorcycle"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVehicle(v)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all ${
                  vehicle === v
                    ? "bg-[#F4A261] border-[#F4A261] text-white"
                    : "border-white/30 text-white/70 hover:border-white/60 hover:text-white"
                }`}
              >
                {v === "car" ? "🚗" : "🏍️"} {v === "car" ? "Car" : "Motorcycle"}
              </button>
            ))}
          </div>

          {/* Parking cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {[
              {
                loc: "Central Park",
                type: "Car Parking",
                status: "Available",
                statusColor: "#4caf72",
              },
              {
                loc: "Central Park",
                type: "Motorcycle Parking",
                status: "Limited",
                statusColor: "#e6a23c",
              },
              {
                loc: "Taman Anggrek",
                type: "Car Parking",
                status: "Available",
                statusColor: "#4caf72",
              },
            ].map((p, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <div className="text-3xl mb-3">
                  {p.type.includes("Car") ? "🚗" : "🏍️"}
                </div>
                <h3 className="text-lg font-bold mb-0.5">{p.loc}</h3>
                <p className="text-white/60 text-sm mb-3">{p.type}</p>
                <span
                  className="flex items-center gap-2 text-sm font-semibold"
                  style={{ color: p.statusColor }}
                >
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ background: p.statusColor }}
                  />
                  {p.status}
                </span>
              </div>
            ))}
          </div>

          {/* Floor detail */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-7 border border-white/10">
            <h3 className="text-xl font-bold mb-1">
              Central Park — {vehicle === "car" ? "Car" : "Motorcycle"} Parking
            </h3>
            <p className="text-white/60 text-sm mb-6">
              <span className="text-[#4caf72] font-medium">Green</span> = more
              spaces ·{" "}
              <span className="text-[#e6a23c] font-medium">Orange</span> =
              limited · <span className="text-[#d9534f] font-medium">Red</span>{" "}
              = almost full
            </p>
            <div className="flex flex-col gap-3">
              {vehicle === "car" ? (
                <>
                  <FloorBar label="B1" pctFree={75} />
                  <FloorBar label="B2" pctFree={60} />
                  <FloorBar label="B3" pctFree={30} />
                  <FloorBar label="B4" pctFree={8} />
                </>
              ) : (
                <>
                  <FloorBar label="G1" pctFree={45} />
                  <FloorBar label="G2" pctFree={20} />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Recommendation ── */}
      <section id="recommendation" className="bg-[#FFF8EF] py-20 px-6 lg:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#222] mb-1">
              Your Recommendation
            </h2>
            <p className="text-[#888]">
              Based on rating, price, popularity and hidden-gem potential
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-80 xl:w-96 bg-[#EDF7F5] flex-shrink-0">
              <img
                key={currentRec.image}
                src={currentRec.image}
                alt={currentRec.name}
                className="w-full h-64 lg:h-full object-cover"
              />
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <span className="inline-block bg-[#2B7A78] text-white text-sm font-bold px-4 py-1.5 rounded-full mb-5 w-fit">
                {currentRec.match} Match
              </span>
              {partySize >= 4 && (
                <div className="bg-[#EDF7F5] text-[#2B7A78] text-sm rounded-xl px-4 py-2.5 mb-5 border border-[#2B7A78]/20">
                  👥 This recommendation is optimized for larger groups and
                  offers great seating capacity.
                </div>
              )}
              <h2 className="text-3xl font-extrabold text-[#222] mb-3">
                {currentRec.name}
              </h2>
              <p className="text-[#666] leading-relaxed mb-5">
                {currentRec.matchDesc}
              </p>
              <div className="flex flex-wrap gap-5 text-sm font-medium text-[#555] mb-7">
                <span>⭐ {currentRec.rating} Rating</span>
                <span>💰 {currentRec.price}</span>
                {currentRec.tags.includes("Hidden Gem") && (
                  <span>💎 Hidden Gem</span>
                )}
                {currentRec.tags.includes("Group Friendly") && (
                  <span>👥 Group Friendly</span>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleNextRec}
                  className="flex items-center gap-2 bg-[#EDF7F5] hover:bg-[#d9eeeb] text-[#2B7A78] font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  🔄 Give Me Another Choice
                </button>
                <a
                  href={currentRec.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#F4A261] hover:bg-[#e89550] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  📍 Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOODIE Card ── */}
      <section className="py-20 px-6 lg:px-14 bg-[#EDF7F5]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          {/* Card visual */}
          <div className="flex-shrink-0">
            <div
              className="w-80 h-48 rounded-3xl p-7 flex flex-col justify-between shadow-[0_20px_50px_rgba(21,63,61,0.3)]"
              style={{
                background: "linear-gradient(135deg, #2B7A78, #153F3D)",
              }}
            >
              <div className="flex justify-between items-start">
                <span className="text-3xl text-white/80">◈</span>
                <span className="text-white/60 text-xs font-bold tracking-widest uppercase">
                  FOODIE PASS
                </span>
              </div>
              <div>
                <p className="text-white/50 tracking-[6px] text-base mb-2">
                  •••• •••• •••• 2026
                </p>
                <p className="text-white/60 text-xs uppercase tracking-widest">
                  Your FOODIE Member
                </p>
              </div>
            </div>
          </div>
          {/* Copy */}
          <div className="flex-1">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#222] mb-4">
              Meet the FOODIE Card 💳
            </h2>
            <p className="text-[#666] leading-relaxed text-lg mb-7">
              Use your FOODIE Card to unlock parking benefits and exclusive
              restaurant promotions.
            </p>
            <div className="flex flex-wrap gap-3 mb-7">
              {[
                "🚗 Parking Benefits",
                "🏷️ Exclusive Discounts",
                "🍽️ Restaurant Deals",
                "⭐ Member Rewards",
              ].map((b) => (
                <span
                  key={b}
                  className="bg-white px-4 py-2 rounded-full text-[#2B7A78] text-sm font-semibold shadow-sm border border-[#2B7A78]/10"
                >
                  {b}
                </span>
              ))}
            </div>
            <div className="bg-[#FFF2DF] border-l-4 border-[#F4A261] rounded-xl px-5 py-4 mb-7">
              <p className="text-sm text-[#7a4b0a]">
                <strong>Example deal:</strong> Get 15% off at selected partner
                restaurants when you pay with FOODIE Card.
              </p>
            </div>
            <button
              onClick={() => setShowCardModal(true)}
              className="bg-[#2B7A78] hover:bg-[#236360] text-white font-bold px-8 py-4 rounded-xl text-[15px] transition-colors shadow-[0_8px_20px_rgba(43,122,120,0.3)]"
            >
              Apply for FOODIE Card
            </button>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how" className="py-20 px-6 lg:px-14 bg-[#F7F8F6]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#222] mb-1">
              How FOODIE Works
            </h2>
            <p className="text-[#888]">
              Finding your next meal in three simple steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                n: "1",
                title: "Tell Us What You Want",
                desc: "Choose your budget, food preference, rating preference, and location.",
              },
              {
                n: "2",
                title: "We Find Your Match",
                desc: "FOODIE compares ratings, prices, distance and hidden-gem potential.",
              },
              {
                n: "3",
                title: "Check Parking & Go",
                desc: "Check parking availability before you leave and enjoy your meal.",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#2B7A78] text-white text-xl font-extrabold flex items-center justify-center mx-auto mb-6">
                  {step.n}
                </div>
                <h3 className="text-[18px] font-bold text-[#222] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#777] leading-relaxed text-sm">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Profile ── */}
      <section id="profile" className="py-20 px-6 lg:px-14 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#222] mb-8">My Profile</h2>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-72 bg-[#EDF7F5] rounded-2xl p-7 text-center">
              <div className="w-20 h-20 bg-[#2B7A78] rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                👤
              </div>
              <h3 className="text-xl font-bold text-[#222] mb-1">
                {partySize ? `Party of ${partySize}` : "Food Explorer"}
              </h3>
              <p className="text-[#888] text-sm mb-5">FOODIE Member</p>
              <div className="flex flex-col gap-3">
                {["Edit Preferences", "Saved Restaurants", "FOODIE Card"].map(
                  (btn) => (
                    <button
                      key={btn}
                      onClick={
                        btn === "FOODIE Card"
                          ? () => setShowCardModal(true)
                          : undefined
                      }
                      className="bg-white hover:bg-[#d9eeeb] text-[#2B7A78] font-semibold py-2.5 rounded-xl text-sm transition-colors border border-[#2B7A78]/20"
                    >
                      {btn}
                    </button>
                  ),
                )}
              </div>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  label: "Party Size",
                  value: partySize ? `${partySize} people` : "Not set",
                  icon: "👥",
                },
                {
                  label: "Favorite Cuisines",
                  value: "Indonesian, Japanese",
                  icon: "🍽️",
                },
                {
                  label: "Budget Preference",
                  value: "Rp 50K – 150K",
                  icon: "💰",
                },
                {
                  label: "Saved Restaurants",
                  value: "3 restaurants",
                  icon: "❤️",
                },
                { label: "FOODIE Card", value: "Apply Now", icon: "💳" },
                {
                  label: "Location",
                  value: "Slipi & Central Park",
                  icon: "📍",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-[#F7F8F6] rounded-2xl p-5 flex items-start gap-4"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-[#888] uppercase tracking-wide mb-0.5">
                      {item.label}
                    </p>
                    <p className="font-semibold text-[#222]">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#102F2D] text-white py-14 px-6 lg:px-14 text-center">
        <div className="text-3xl font-extrabold tracking-tight mb-2">
          FOOD<span className="text-[#F4A261]">IE</span>
        </div>
        <p className="text-[#b8cecc] mt-2">Discover something worth eating.</p>
        <p className="text-[#7a9e9c] text-sm mt-1">
          Slipi • Central Park • Jakarta
        </p>
      </footer>
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(() => {
    const cookie = getCookie("foodie_session")
    if (!cookie) return null
    try {
      return JSON.parse(cookie).name
    } catch {
      return null
    }
  })

  const handleLogout = () => {
    deleteCookie("foodie_session")
    setLoggedInUser(null)
  }

  if (!loggedInUser) {
    return <LoginPage onLogin={(name) => setLoggedInUser(name)} />
  }

  return <FoodieApp loggedInUser={loggedInUser} onLogout={handleLogout} />
}
