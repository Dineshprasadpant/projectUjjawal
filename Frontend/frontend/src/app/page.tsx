
import Link from 'next/link'

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-white border-b">
        <h1 className="text-xl font-bold text-blue-600">🏥 MedLocate</h1>
        <Link href="/hospitals" className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition">
          Get All Hospital
        </Link>
      </nav>

      {/* Hero Content */}
      <section className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h2 className="text-5xl font-extrabold mb-6 tracking-tight">
          Find the nearest care, <span className="text-blue-600">instantly.</span>
        </h2>
        <p className="text-lg text-slate-600 mb-10 leading-relaxed">
          MedLocate uses your live GPS coordinates to find medical facilities around you. 
          Get instant distance calculations and mapping to ensure help is always reachable.
        </p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="text-2xl mb-2">📍</div>
            <h3 className="font-bold">Live GPS</h3>
            <p className="text-sm text-slate-500">Real-time location detection.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="text-2xl mb-2">🗺️</div>
            <h3 className="font-bold">Interactive</h3>
            <p className="text-sm text-slate-500">Visual markers on a live map.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-bold">Fast API</h3>
            <p className="text-sm text-slate-500">Optimized for emergency speed.</p>
          </div>
        </div>
      </section>
    </main>
  )
}