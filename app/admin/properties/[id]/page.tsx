import { notFound } from "next/navigation";
import { prisma } from "@/app/lib/prisma";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const propertyId = Number(id);

  if (Number.isNaN(propertyId)) {
    notFound();
  }

  const property = await prisma.property.findFirst({
    where: {
      id: propertyId,
      status: "APPROVED",
    },
  });

  if (!property) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
          <div className="h-80 bg-stone-200 sm:h-[450px]">
            {property.imageUrl ? (
              <img
                src={property.imageUrl}
                alt={property.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-stone-400">
                No property image available
              </div>
            )}
          </div>

          <div className="p-8 sm:p-10">
            <p className="text-sm font-semibold text-amber-600">
              {property.location}
            </p>

            <h1 className="mt-2 text-3xl font-bold text-emerald-950 sm:text-4xl">
              {property.title}
            </h1>

            <p className="mt-4 text-2xl font-bold text-emerald-900">
              R{Number(property.monthlyRent).toLocaleString()} / month
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-stone-50 p-5">
                <p className="text-sm text-stone-500">Property Type</p>
                <p className="mt-1 font-bold text-stone-800">
                  {property.propertyType}
                </p>
              </div>

              <div className="rounded-2xl bg-stone-50 p-5">
                <p className="text-sm text-stone-500">Bedrooms</p>
                <p className="mt-1 font-bold text-stone-800">
                  {property.bedrooms}
                </p>
              </div>

              <div className="rounded-2xl bg-stone-50 p-5">
                <p className="text-sm text-stone-500">Location</p>
                <p className="mt-1 font-bold text-stone-800">
                  {property.location}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-emerald-950">
                Property Description
              </h2>

              <p className="mt-3 leading-7 text-stone-600">
                {property.description}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`/enquire?property=${encodeURIComponent(property.title)}`}
                className="rounded-xl bg-emerald-950 px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-emerald-900"
              >
                Enquire About Property
              </a>

              <a
                href="/"
                className="rounded-xl border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
              >
                ← Back
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}