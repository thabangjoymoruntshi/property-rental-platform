import Image from "next/image";

export default function PropertyPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      {/* Navigation */}
      <header className="border-b border-stone-200 bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <a href="/" className="group">
            <div className="text-2xl font-bold tracking-tight text-emerald-950">
              Rentora
              <span className="text-amber-600"> Properties</span>
            </div>

            <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.3em] text-stone-500">
              Find your next home
            </p>
          </a>

          <a
            href="/#properties"
            className="text-sm font-semibold text-emerald-800 transition hover:text-amber-600"
          >
            ← Back to Properties
          </a>
        </nav>
      </header>

      {/* Property Hero */}
      <section className="bg-emerald-950 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
            House
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Contemporary Family Home
          </h1>

          <p className="mt-5 text-lg text-emerald-100/70">
            Pretoria, Gauteng
          </p>
        </div>
      </section>

      {/* Property Content */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          {/* Property information */}
          <div>
            {/* Property image */}
            {/* Property image */}
<div className="relative h-80 overflow-hidden rounded-2xl sm:h-[420px]">
  <Image
    src="/properties/contemporary-family-home.jpeg"
    alt="Contemporary Family Home in Pretoria"
    fill
    priority
    className="object-cover"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent" />

  <div className="absolute bottom-6 left-6">
    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
      Rentora Properties
    </p>

    <p className="mt-2 text-lg font-semibold text-white">
      Contemporary Family Home
    </p>
  </div>
</div>

            {/* Description */}
            <div className="mt-10">
              <h2 className="text-3xl font-bold text-emerald-950">
                About this property
              </h2>

              <p className="mt-5 text-lg leading-8 text-stone-600">
                This contemporary family home in Pretoria provides a
                comfortable environment designed for modern family living.
                With generous living spaces and a practical layout, the home
                offers room to relax, work, and spend time together.
              </p>

              <p className="mt-4 text-lg leading-8 text-stone-600">
                The property combines functionality and contemporary design,
                making it suitable for a family looking for a comfortable
                long-term rental home.
              </p>
            </div>

            {/* Features */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-emerald-950">
                Property features
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-stone-200 bg-white p-5">
                  <p className="text-sm font-semibold text-stone-500">
                    Bedrooms
                  </p>

                  <p className="mt-1 text-lg font-bold text-emerald-950">
                    3 Bedrooms
                  </p>
                </div>

                <div className="rounded-xl border border-stone-200 bg-white p-5">
                  <p className="text-sm font-semibold text-stone-500">
                    Property Type
                  </p>

                  <p className="mt-1 text-lg font-bold text-emerald-950">
                    House
                  </p>
                </div>

                <div className="rounded-xl border border-stone-200 bg-white p-5">
                  <p className="text-sm font-semibold text-stone-500">
                    Location
                  </p>

                  <p className="mt-1 text-lg font-bold text-emerald-950">
                    Pretoria
                  </p>
                </div>

                <div className="rounded-xl border border-stone-200 bg-white p-5">
                  <p className="text-sm font-semibold text-stone-500">
                    Availability
                  </p>

                  <p className="mt-1 text-lg font-bold text-emerald-950">
                    Available
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Rental information */}
          <aside>
            <div className="sticky top-8 rounded-2xl border border-stone-200 bg-white p-7 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">
                Monthly Rent
              </p>

              <p className="mt-2 text-4xl font-bold text-emerald-950">
                R18,000
              </p>

              <p className="mt-1 text-sm text-stone-500">
                per month
              </p>

              <div className="my-7 h-px bg-stone-200" />

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-stone-500">Location</span>

                  <span className="text-sm font-semibold text-stone-900">
                    Pretoria
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-stone-500">Type</span>

                  <span className="text-sm font-semibold text-stone-900">
                    House
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-stone-500">Bedrooms</span>

                  <span className="text-sm font-semibold text-stone-900">
                    3
                  </span>
                </div>
              </div>

              <a
                href="/enquire?property=contemporary-family-home" 
                className="mt-8 block w-full rounded-xl bg-emerald-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-900"
                >
                Enquire About This Property
              </a>

              <p className="mt-4 text-center text-xs leading-5 text-stone-400">
                Interested in this property? Contact us to learn more or
                arrange the next step.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-stone-500 sm:flex-row">
          <p>© 2026 Rentora Properties</p>

          <p>
            A property technology platform by{" "}
            <span className="font-semibold text-emerald-950">
              Avenqora Technologies
            </span>
          </p>
        </div>
      </footer>
    </main>
  );
}