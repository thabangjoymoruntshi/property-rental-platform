
import { prisma } from "@/app/lib/prisma";
import LogoutButton from "./LogoutButton";

export default async function AdminPage() {
  const [properties, enquiries] = await Promise.all([
    prisma.property.findMany(),
    prisma.enquiry.findMany(),
  ]);

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

  const totalEnquiries = enquiries.length;

  const newEnquiries = enquiries.filter(
    (enquiry) => enquiry.status === "NEW"
  ).length;

  const inProgressEnquiries = enquiries.filter(
    (enquiry) => enquiry.status === "IN_PROGRESS"
  ).length;

  const completedEnquiries = enquiries.filter(
    (enquiry) => enquiry.status === "COMPLETED"
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
              Admin Dashboard
            </h1>
          </div>

          <nav className="flex flex-wrap gap-2">
            <a
              href="/admin"
              className="rounded-lg bg-emerald-950 px-4 py-2 text-sm font-semibold text-white"
            >
              Dashboard
            </a>

            <a
              href="/admin/properties"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-stone-600 transition hover:bg-stone-100 hover:text-emerald-950"
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

          <LogoutButton />
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Dashboard Overview */}
        <section>
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
              Overview
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-emerald-950">
              Dashboard Overview
            </h2>

            <p className="mt-2 text-stone-600">
              Manage property listings and monitor activity across Rentora.
            </p>
          </div>

          {/* Property Statistics */}
          <div>
            <div className="mb-5">
              <h3 className="text-lg font-bold text-emerald-950">
                Properties
              </h3>

              <p className="mt-1 text-sm text-stone-500">
                Current property listing activity.
              </p>
            </div>

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
          </div>

          {/* Enquiry Statistics */}
          <div className="mt-12">
            <div className="mb-5">
              <h3 className="text-lg font-bold text-emerald-950">
                Enquiries
              </h3>

              <p className="mt-1 text-sm text-stone-500">
                Current renter and buyer enquiry activity.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-stone-500">
                  Total Inquiries
                </p>

                <p className="mt-3 text-3xl font-bold text-emerald-950">
                  {totalEnquiries}
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-stone-500">
                  New
                </p>

                <p className="mt-3 text-3xl font-bold text-amber-700">
                  {newEnquiries}
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-stone-500">
                  In Progress
                </p>

                <p className="mt-3 text-3xl font-bold text-emerald-800">
                  {inProgressEnquiries}
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-stone-500">
                  Completed
                </p>

                <p className="mt-3 text-3xl font-bold text-stone-700">
                  {completedEnquiries}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <a
              href="/admin/properties"
              className="group rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
                Properties
              </p>

              <h3 className="mt-2 text-xl font-bold text-emerald-950">
                Manage Properties
              </h3>

              <p className="mt-2 text-sm leading-6 text-stone-600">
                Review submitted properties and manage their approval status.
              </p>

              <p className="mt-5 text-sm font-bold text-emerald-800">
                Open Properties →
              </p>
            </a>

            <a
              href="/admin/enquiries"
              className="group rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
                Enquiries
              </p>

              <h3 className="mt-2 text-xl font-bold text-emerald-950">
                Manage Enquiries
              </h3>

              <p className="mt-2 text-sm leading-6 text-stone-600">
                Review renter and buyer enquiries and follow up with
                interested users.
              </p>

              <p className="mt-5 text-sm font-bold text-emerald-800">
                Open Enquiries →
              </p>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

