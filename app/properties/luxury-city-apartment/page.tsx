import Image from "next/image";

export default function LuxuryCityApartmentPage() {
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
            className="text-sm font-semibold text-stone-600 transition hover:text-emerald-800"
          >
            ← Back to Properties
          </a>
        </nav>
      </header>

      {/* Property Hero */}
      <section className="bg-emerald-950 px-6 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
              Apartment
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Luxury City Apartment
            </h1>

            <p className="mt-4 text-lg text-emerald-100/60">
              Sandton, Johannesburg
            </p>
          </div>

          {/* Main Image */}
          <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-emerald-900">
          <Image
          src="/properties/luxury-city-apartment.jpeg"
          alt="Luxury City Apartment in Sandton, Johannesburg"
          fill
          priority
          className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent" />
            
            <div className="relative text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
                Rentora Properties
              </p>

              <p className="mt-3 text-stone-400">
                Luxury City Apartment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Property Information */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_380px]">
          {/* Details */}
          <div>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-emerald-950 px-4 py-2 text-sm font-semibold text-white">
                Apartment
              </span>

              <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
                Available
              </span>
            </div>

            <h2 className="mt-8 text-3xl font-bold tracking-tight text-emerald-950 sm:text-4xl">
              A sophisticated home in the heart of Sandton.
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600">
              Experience modern city living in this beautifully designed
              apartment located in Sandton, Johannesburg. The property offers
              a comfortable living environment with convenient access to
              business districts, restaurants, shopping centres, and
              entertainment.
            </p>

            {/* Property Features */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-stone-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Bedrooms
                </p>

                <p className="mt-2 text-xl font-bold text-emerald-950">
                  2
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Bathrooms
                </p>

                <p className="mt-2 text-xl font-bold text-emerald-950">
                  2
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Property Size
                </p>

                <p className="mt-2 text-xl font-bold text-emerald-950">
                  110 m²
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="mt-12 border-t border-stone-200 pt-10">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
                Location
              </p>

              <h3 className="mt-3 text-2xl font-bold text-emerald-950">
                Sandton, Johannesburg
              </h3>

              <p className="mt-4 max-w-2xl leading-7 text-stone-600">
                Located in one of Johannesburg's major business and lifestyle
                districts, with access to shopping, restaurants, offices,
                transport, and other city amenities.
              </p>
            </div>
          </div>

          {/* Rental Card */}
          <aside>
            <div className="sticky top-8 rounded-3xl border border-stone-200 bg-white p-7 shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">
                Monthly Rent
              </p>

              <p className="mt-3 text-4xl font-bold text-emerald-950">
                R22,000
              </p>

              <p className="mt-1 text-sm text-stone-500">
                per month
              </p>

              <div className="my-7 border-t border-stone-200" />

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-500">Property type</span>
                  <span className="font-semibold text-stone-900">
                    Apartment
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-stone-500">Bedrooms</span>
                  <span className="font-semibold text-stone-900">
                    2
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-stone-500">Bathrooms</span>
                  <span className="font-semibold text-stone-900">
                    2
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-stone-500">Size</span>
                  <span className="font-semibold text-stone-900">
                    110 m²
                  </span>
                </div>
              </div>

              <a 
                href="/enquire?property=luxury-city-apartment"
                className="mt-8 block w-full rounded-xl bg-emerald-950 px-6 py-4 text-sm font-bold text-white transition hover:bg-emerald-900"
                >
                Enquire About Property
              </a>

              <p className="mt-4 text-center text-xs leading-5 text-stone-500">
                Interested in this property? Send an enquiry and a Rentora
                representative can assist you.
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