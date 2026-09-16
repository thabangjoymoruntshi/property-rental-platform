
"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function EnquireForm() {
  const searchParams = useSearchParams();
  const property = searchParams.get("property");

  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "Rent",
    message: "",
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

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          property,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Enquiry submission error:", error);

      alert("Something went wrong while submitting your enquiry.");
    }
  };

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-16 text-stone-900">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
            Rentora Properties
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-emerald-950">
            Enquire About This Property
          </h1>

          <p className="mt-4 leading-7 text-stone-600">
            Interested in this property? Send us your details and a member of
            our team can assist you with the next steps.
          </p>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Property of Interest
            </p>

            <p className="mt-1 font-bold text-emerald-950">
              {property || "No property selected"}
            </p>
          </div>

          <button 
            type="button"
            onClick={() => window.history.back()}
            className="mt-5 rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 hover:text-emerald-950"
            >
              ← Back
            </button>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-emerald-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-800">
              ✓
            </div>

            <h2 className="mt-6 text-2xl font-bold text-emerald-950">
              Enquiry Received
            </h2>

            <p className="mt-3 leading-7 text-stone-600">
              Thank you for your interest. Your enquiry has been received and
              we will be in touch with you soon.
            </p>

            <a
              href="/"
              className="mt-8 inline-block rounded-xl bg-emerald-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-900"
            >
              Back to Home
            </a>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-stone-900"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-emerald-700"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-stone-900"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-emerald-700"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="text-sm font-semibold text-stone-900"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-emerald-700"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label
                  htmlFor="interest"
                  className="text-sm font-semibold text-stone-900"
                >
                  I Am Interested In
                </label>

                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-700"
                >
                  <option value="Rent">Renting this property</option>
                  <option value="Buy">Buying this property</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-stone-900"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-emerald-700"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-900"
              >
                Submit Enquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

export default function EnquirePage() {
  return (
    <Suspense fallback={null}>
      <EnquireForm />
    </Suspense>
  );
}
