
import { prisma } from "@/app/lib/prisma";
import EnquiryActions from "./EnquiryActions";
export default async function EnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

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
              Enquiry Management
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
              className="rounded-lg px-4 py-2 text-sm font-semibold text-stone-600 transition hover:bg-stone-100 hover:text-emerald-950"
            >
              Properties
            </a>

            <a
              href="/admin/enquiries"
              className="rounded-lg bg-emerald-950 px-4 py-2 text-sm font-semibold text-white"
            >
              Enquiries
            </a>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Enquiry Overview */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-950">
              Enquiry Overview
            </h2>

            <p className="mt-2 text-stone-600">
              Monitor and manage enquiries from renters and buyers.
            </p>
          </div>

          {/* Enquiry Statistics */}
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
        </section>

        {/* Enquiry Management */}
        <section className="mt-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-950">
              Property Enquiries
            </h2>

            <p className="mt-2 text-stone-600">
              Manage enquiries from renters and buyers interested in your
              properties.
            </p>
          </div>

          {enquiries.length === 0 ? (
            <div className="rounded-2xl border border-stone-200 bg-white p-10 text-center shadow-sm">
              <h3 className="text-xl font-bold text-emerald-950">
                No enquiries yet
              </h3>

              <p className="mt-2 text-stone-600">
                Renter and buyer enquiries will appear here once visitors
                submit an enquiry about a property.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {enquiries.map((enquiry) => (
                <article
                  key={enquiry.id}
                  className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-bold text-emerald-950">
                          {enquiry.name}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                            enquiry.status === "NEW"
                              ? "bg-amber-100 text-amber-800"
                              : enquiry.status === "IN_PROGRESS"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-stone-100 text-stone-700"
                          }`}
                        >
                          {enquiry.status.replace("_", " ")}
                        </span>
                      </div>

                      <p className="mt-2 font-semibold text-emerald-900">
                        {enquiry.property}
                      </p>

                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                            Email
                          </p>

                          <p className="mt-1 text-sm text-stone-700">
                            {enquiry.email}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                            Phone
                          </p>

                          <p className="mt-1 text-sm text-stone-700">
                            {enquiry.phone}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                            Interest
                          </p>

                          <p className="mt-1 text-sm font-semibold text-stone-700">
                            {enquiry.interest}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                            Submitted
                          </p>

                          <p className="mt-1 text-sm text-stone-700">
                            {enquiry.createdAt.toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 rounded-xl bg-stone-50 p-5">
                        <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                          Message
                        </p>

                        <p className="mt-2 leading-7 text-stone-700">
                          {enquiry.message}
                        </p>
                      </div>

                      <EnquiryActions
                        enquiryId={enquiry.id}
                         status={enquiry.status}
                      />
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

