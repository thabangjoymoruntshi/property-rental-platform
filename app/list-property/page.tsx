"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

export default function ListPropertyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 const [propertyImage, setPropertyImage] = useState<string>("");

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    propertyType: "",
    monthlyRent: "",
    bedrooms: "",
    description: "",
    contactName: "",
    contactEmail: "",
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/properties", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ...formData,
    imageUrl: propertyImage,
  }),
});

const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Property submission error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting the property."
      );
    } finally {
      setLoading(false);
    }
  };

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

      {/* Hero */}
      <section className="bg-emerald-950 px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
            Property Owners & Agents
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            List your property.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-100/70">
            Share your rental property with people looking for their next
            home.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {submitted ? (
            <div className="rounded-2xl border border-emerald-200 bg-white p-10 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-800">
                ✓
              </div>

              <h2 className="mt-6 text-3xl font-bold text-emerald-950">
                Property submitted
              </h2>

              <p className="mx-auto mt-4 max-w-xl leading-7 text-stone-500">
                Thank you. Your property information has been received and
                will be reviewed before being published.
              </p>

              <a
                href="/"
                className="mt-8 inline-block rounded-xl bg-emerald-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-900"
              >
                Return Home
              </a>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-stone-200 bg-white p-7 shadow-sm sm:p-10"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
                  Property Details
                </p>

                <h2 className="mt-3 text-3xl font-bold text-emerald-950">
                  Tell us about your property
                </h2>

                <p className="mt-3 text-stone-500">
                  Provide the basic information about the property you want
                  to list.
                </p>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">


  {/* Property Image */}
<div className="sm:col-span-2">
  <label className="mb-2 block text-sm font-bold text-stone-700">
    Property Image
  </label>

  <CldUploadWidget
    signatureEndpoint="/api/cloudinary/sign-upload"
    onSuccess={(result) => {
      if (
        result.event === "success" &&
        result.info &&
        typeof result.info === "object" &&
        "secure_url" in result.info
      ) {
        setPropertyImage(result.info.secure_url as string);
      }
    }}
  >
    {({ open }) => (
      <button
        type="button"
        onClick={() => open()}
        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm font-semibold text-stone-700 transition hover:border-emerald-700 hover:bg-emerald-50 hover:text-emerald-950"
      >
        Upload Property Image
      </button>
    )}
  </CldUploadWidget>

  <p className="mt-2 text-xs text-stone-400">
    Upload a JPG, PNG, or WebP image of the property.
  </p>

  {propertyImage && (
    <p className="mt-2 text-sm font-medium text-emerald-800">
      Image uploaded successfully.
    </p>
  )}
</div>

                {/* Property Title */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-stone-700">
                    Property Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Modern 3-Bedroom Family Home"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-stone-400 focus:border-emerald-700"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-stone-700">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Sandton, Johannesburg"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-stone-400 focus:border-emerald-700"
                  />
                </div>

                {/* Property Type */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-stone-700">
                    Property Type
                  </label>

                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm outline-none focus:border-emerald-700"
                  >
                    <option value="">Select property type</option>
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Townhouse</option>
                  </select>
                </div>

                {/* Monthly Rent */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-stone-700">
                    Monthly Rent
                  </label>

                  <input
                    type="number"
                    name="monthlyRent"
                    value={formData.monthlyRent}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 15000"
                    min="0"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-stone-400 focus:border-emerald-700"
                  />
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-stone-700">
                    Bedrooms
                  </label>

                  <select
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm outline-none focus:border-emerald-700"
                  >
                    <option value="">Select bedrooms</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5+</option>
                  </select>
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-stone-700">
                    Property Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Describe the property, its features, nearby amenities, and anything potential tenants should know."
                    className="w-full resize-none rounded-xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-stone-400 focus:border-emerald-700"
                  />
                </div>

                {/* Contact Name */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-stone-700">
                    Contact Name
                  </label>

                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-stone-400 focus:border-emerald-700"
                  />
                </div>

                {/* Contact Email */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-stone-700">
                    Contact Email
                  </label>

                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-stone-400 focus:border-emerald-700"
                  />
                </div>
              </div>

              {error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="mt-10 border-t border-stone-200 pt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-emerald-950 px-6 py-4 text-sm font-bold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Submitting Property..." : "Submit Property"}
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-stone-400">
                  Your property will be reviewed before it is published on
                  Rentora Properties.
                </p>
              </div>
            </form>
          )}
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