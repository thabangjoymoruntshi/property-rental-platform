
export const dynamic = "force-dynamic";

import { prisma } from "@/app/lib/prisma";
import PropertyActions from "../PropertyActions";

export default async function PropertiesPage() {
  const properties = await prisma.property.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalProperties = properties.length;

  const pendingProperties = properties.filter(
    (property) => property.status === "PENDING"
  ).length;

  const approvedProperties = properties.filter(
    (property) => property.status === "APPROVED"
  ).length;

  const rejectedProperties = properties.filter(
    (property) => property.status === "REJECTED"
  ).length;

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      {/* Admin Header */}
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
              Rentora Properties
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-emerald-950">
              Property Management
            </h1>
          </div>

          <nav className="flex flex-wrap gap-2">
            <a
              href="/admin"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-stone-600 transition hover:bg-stone-100 hover:text-emerald-950"
            >
              Dashboard
            </a>

            <a
              href="/admin/properties"
              className="rounded-lg bg-emerald-950 px-4 py-2 text-sm font-semibold text-white"
            >
              Properties
            </a>

            <a
              href="/admin/enquiries"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-stone-600 transition hover:bg-stone-100 hover:text-emerald-950"
            >
              Enquiries
            </a>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Page Heading */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-950">
              Property Overview
            </h2>

            <p className="mt-2 text-stone-600">
              Review and manage property listings submitted by property owners.
            </p>
          </div>

          {/* Property Statistics */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-stone-500">
                Total Properties
              </p>

              <p className="mt-3 text-3xl font-bold text-emerald-950">
                {totalProperties}
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-stone-500">
                Pending
              </p>

              <p className="mt-3 text-3xl font-bold text-amber-700">
                {pendingProperties}
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-stone-500">
                Approved
              </p>

              <p className="mt-3 text-3xl font-bold text-emerald-800">
                {approvedProperties}
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-stone-500">
                Rejected
              </p>

              <p className="mt-3 text-3xl font-bold text-red-700">
                {rejectedProperties}
              </p>
            </div>
          </div>
        </section>

        {/* Property Management */}
        <section className="mt-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-950">
              Property Listings
            </h2>

            <p className="mt-2 text-stone-600">
              Review property submissions and approve or reject listings.
            </p>
          </div>

          {properties.length === 0 ? (
            <div className="rounded-2xl border border-stone-200 bg-white p-10 text-center">
              <h3 className="text-xl font-semibold text-emerald-950">
                No properties submitted
              </h3>

              <p className="mt-2 text-stone-500">
                Submitted properties will appear here for review.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {properties.map((property) => (
                <article
                  key={property.id}
                  className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-bold text-emerald-950">
                          {property.title}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                            property.status === "APPROVED"
                              ? "bg-emerald-100 text-emerald-800"
                              : property.status === "REJECTED"
                                ? "bg-red-100 text-red-800"
                                : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {property.status}
                        </span>
                      </div>

                      <p className="mt-2 text-stone-600">
                        {property.location} • {property.propertyType}
                      </p>

                      <p className="mt-4 text-lg font-semibold text-emerald-900">
                        R{property.monthlyRent.toString()} / month
                      </p>

                      <p className="mt-2 text-stone-600">
                        {property.bedrooms} bedroom
                        {property.bedrooms === 1 ? "" : "s"}
                      </p>

                      <p className="mt-4 leading-7 text-stone-600">
                        {property.description}
                      </p>

                      <PropertyActions
                        propertyId={property.id}
                        status={property.status}
                      />
                    </div>

                    <div className="rounded-xl bg-stone-50 p-5 lg:min-w-64">
                      <p className="text-sm font-semibold text-stone-900">
                        Contact
                      </p>

                      <p className="mt-2 text-sm text-stone-600">
                        {property.contactName}
                      </p>

                      <p className="text-sm text-stone-600">
                        {property.contactEmail}
                      </p>

                      <p className="mt-4 text-xs text-stone-400">
                        Submitted {property.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
