
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const properties = [
  {
    title: "Modern 2-Bedroom Apartment",
    location: "Johannesburg, Gauteng",
    price: "R12,500",
    priceValue: 12500,
    type: "Apartment",
    href: "/properties/modern-2-bedroom-apartment",
    image: "/properties/modern-2-bedroom-apartment.jpeg",
  },
  {
    title: "Contemporary Family Home",
    location: "Pretoria, Gauteng",
    price: "R18,000",
    priceValue: 18000,
    type: "House",
    href: "/properties/contemporary-family-home",
    image: "/properties/contemporary-family-home.jpeg",
  },
  {
    title: "Luxury City Apartment",
    location: "Sandton, Johannesburg",
    price: "R22,000",
    priceValue: 22000,
    type: "Apartment",
    href: "/properties/luxury-city-apartment",
    image: "/properties/luxury-city-apartment.jpeg",
  },
];

export default function HomePage() {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("Any property");
  const [budget, setBudget] = useState("Any price");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [databaseProperties, setDatabaseProperties] = useState<any[]>([]);

  
  useEffect(() => {
    const loadProperties = async () => {
      try {
        const response = await fetch("/api/properties");

        if (!response.ok) {
          throw new Error("Failed to fetch properties.");
        }

        const data = await response.json();

        if (data.success) {
          setDatabaseProperties(data.properties);
        }
      } catch (error) {
        console.error("Property loading error:", error);
      }
    };

    loadProperties();
  }, []);

  
  const filteredProperties = databaseProperties.filter((property) => {
    const locationMatch =
      location.trim() === "" ||
      property.location.toLowerCase().includes(location.toLowerCase().trim());

    const typeMatch =
      propertyType === "Any property" ||
      property.propertyType === propertyType;

    let budgetMatch = true;

    if (budget === "Under R10,000") {
      budgetMatch = Number(property.monthlyRent) < 10000;
    }

    if (budget === "R10,000 - R20,000") {
      budgetMatch =
        Number(property.monthlyRent) >= 10000 &&
        Number(property.monthlyRent) <= 20000;
    }

    if (budget === "R20,000+") {
      budgetMatch = Number(property.monthlyRent) > 20000;
    }

    return locationMatch && typeMatch && budgetMatch;
  });


  const handleSearch = () => {
    setSearchPerformed(true);

    setTimeout(() => {
      document
        .getElementById("properties")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleViewAll = () => {
    setLocation("");
    setPropertyType("Any property");
    setBudget("Any price");
    setSearchPerformed(false);

    setTimeout(() => {
      document
        .getElementById("properties")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">

      {/* Navigation */}
      <header className="border-b border-stone-200 bg-white">
<nav className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
  <a href="/" className="group">
    <div className="text-2xl font-bold tracking-tight text-emerald-950">
      Rentora
      <span className="text-amber-600"> Properties</span>
    </div>

    <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.3em] text-stone-500">
      Find your next home
    </p>
  </a>

  <div className="flex items-center gap-4 sm:gap-6">
    <a
      href="#properties"
      className="text-sm font-semibold text-emerald-800 transition hover:text-amber-600"
    >
      Properties
    </a>

    <a
      href="/list-property"
      className="rounded-xl bg-emerald-950 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-emerald-900 sm:px-5"
    >
      List a Property
    </a>
  </div>
</nav>


      </header>

      {/* Hero */}
      <section className="bg-emerald-950 px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
            Rentora Properties
          </p>

      
<h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">

            Find a place that feels like home.
          </h1>

        
<p className="mt-5 max-w-2xl text-base leading-7 text-emerald-100/70 sm:mt-6 sm:text-lg sm:leading-8">


            Discover quality rental properties in convenient locations and
            find a home that fits your lifestyle.
          </p>

          {/* Hero Buttons */}
         
<div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">

            <a
              href="#properties"
              className="rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-bold text-emerald-950 transition hover:bg-amber-400"
            >
              Explore Properties
            </a>

            <a
              href="/list-property"
              className="rounded-xl border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              List Your Property
            </a>
          </div>

          {/* Search Panel */}
<div className="mt-10 rounded-2xl border border-white/10 bg-white p-4 shadow-2xl sm:mt-12 sm:p-5">


            <div className="grid gap-4 md:grid-cols-4">
              {/* Location */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-500">
                  Location
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="Where do you want to live?"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-700"
                />
              </div>

              {/* Property Type */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-500">
                  Property Type
                </label>

                <select
                  value={propertyType}
                  onChange={(event) => setPropertyType(event.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-600 outline-none focus:border-emerald-700"
                >
                  <option>Any property</option>
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Townhouse</option>
                </select>
              </div>

              {/* Budget */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-500">
                  Budget
                </label>

                <select
                  value={budget}
                  onChange={(event) => setBudget(event.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-600 outline-none focus:border-emerald-700"
                >
                  <option>Any price</option>
                  <option>Under R10,000</option>
                  <option>R10,000 - R20,000</option>
                  <option>R20,000+</option>
                </select>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleSearch}
                  className="w-full rounded-xl bg-emerald-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-900"
                >
                  Search Properties
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Properties */}
      <section
        id="properties"
        
className="px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"


      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
              Available properties
            </p>

            
<h2 className="mt-3 text-3xl font-bold tracking-tight text-emerald-950 sm:text-4xl">

              Explore our properties
            </h2>

            <p className="mt-4 text-lg leading-8 text-stone-600">
              Browse available homes and apartments and view the details of
              each property.
            </p>
            
          </div>
          
<div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {searchPerformed ? (
    filteredProperties.length > 0 ? (
      filteredProperties.map((property) => (
        <article
          key={property.id}
          className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
        
<div className="h-48 bg-stone-200 sm:h-56">

            <img
              src={property.imageUrl || "/properties/modern-2-bedroom-apartment.jpeg"}
              alt={property.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-6">
            <p className="text-sm font-semibold text-amber-600">
              {property.location}
            </p>

            
<h3 className="mt-2 text-xl font-bold text-emerald-950 sm:text-2xl">

              {property.title}
            </h3>

            
<p className="mt-3 text-sm leading-6 text-stone-600 sm:text-base sm:leading-7">

              {property.description}
            </p>

          
<div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-lg font-bold text-emerald-900">
                R{Number(property.monthlyRent).toLocaleString()} / month
              </p>

              <span className="text-sm font-semibold text-stone-500">
                {property.bedrooms} Bedrooms
              </span>
            </div>

            
<div className="mt-6 grid gap-2 sm:grid-cols-2">
  <a
    href={`/properties/${property.id}`}
    className="rounded-xl border border-emerald-950 px-5 py-3 text-center text-sm font-bold text-emerald-950 transition hover:bg-emerald-50"
  >
    View Property
  </a>

  <a
    href={`/enquire?property=${encodeURIComponent(property.title)}`}
    className="rounded-xl bg-emerald-950 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-emerald-900"
  >
    Enquire About Property
  </a>
</div>

          </div>
        </article>
      ))
    ) : (
      <div className="col-span-full rounded-2xl border border-stone-200 bg-white p-10 text-center">
        <h3 className="text-2xl font-bold text-emerald-950">
          No properties found
        </h3>

        <p className="mt-3 text-stone-600">
          Try adjusting your location, property type, or budget filters.
        </p>

        <button
          type="button"
          onClick={handleViewAll}
          className="mt-6 rounded-xl bg-emerald-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-900"
        >
          View All Properties
        </button>
      </div>
    )
  ) : (
    <>
      {/* Modern 2-Bedroom Apartment */}
      <article className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        <div className="h-56 bg-stone-200">
          <img
            src="/properties/modern-2-bedroom-apartment.jpeg"
            alt="Modern 2-Bedroom Apartment"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-6">
          <p className="text-sm font-semibold text-amber-600">
            Johannesburg
          </p>

          <h3 className="mt-2 text-2xl font-bold text-emerald-950">
            Modern 2-Bedroom Apartment
          </h3>

          <p className="mt-3 text-stone-600">
            Contemporary apartment designed for comfortable everyday living.
          </p>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-lg font-bold text-emerald-900">
              R12,500 / month
            </p>

            <span className="text-sm font-semibold text-stone-500">
              2 Bedrooms
            </span>
          </div>

          <a
            href="/properties/modern-2-bedroom-apartment"
            className="mt-6 block w-full rounded-xl bg-emerald-950 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-emerald-900"
          >
            View Property
          </a>
        </div>
      </article>

      {/* Contemporary Family Home */}
      <article className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        <div className="h-56 bg-stone-200">
          <img
            src="/properties/contemporary-family-home.jpeg"
            alt="Contemporary Family Home"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-6">
          <p className="text-sm font-semibold text-amber-600">
            Pretoria
          </p>

          <h3 className="mt-2 text-2xl font-bold text-emerald-950">
            Contemporary Family Home
          </h3>

          <p className="mt-3 text-stone-600">
            Spacious family home offering practical and comfortable living.
          </p>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-lg font-bold text-emerald-900">
              R18,000 / month
            </p>

            <span className="text-sm font-semibold text-stone-500">
              3 Bedrooms
            </span>
          </div>

          <a
            href="/properties/contemporary-family-home"
            className="mt-6 block w-full rounded-xl bg-emerald-950 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-emerald-900"
          >
            View Property
          </a>
        </div>
      </article>

      {/* Luxury City Apartment */}
      <article className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        <div className="h-56 bg-stone-200">
          <img
            src="/properties/luxury-city-apartment.jpeg"
            alt="Luxury City Apartment"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-6">
          <p className="text-sm font-semibold text-amber-600">
            Sandton, Johannesburg
          </p>

          <h3 className="mt-2 text-2xl font-bold text-emerald-950">
            Luxury City Apartment
          </h3>

          <p className="mt-3 text-stone-600">
            A premium apartment offering modern city living in Sandton.
          </p>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-lg font-bold text-emerald-900">
              R22,000 / month
            </p>

            <span className="text-sm font-semibold text-stone-500">
              2 Bedrooms
            </span>
          </div>

          <a
            href="/properties/luxury-city-apartment"
            className="mt-6 block w-full rounded-xl bg-emerald-950 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-emerald-900"
          >
            View Property
          </a>
        </div>
      </article>
    </>
  )}
</div>
</div>

      </section>

      {/* CTA */}
      
<section className="border-t border-stone-200 bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

      
<div className="mx-auto max-w-7xl rounded-3xl bg-emerald-950 px-5 py-10 text-center sm:px-12 sm:py-12">

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Have a property to rent out?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-emerald-100/70">
            List your property on Rentora Properties and connect with people
            looking for their next home.
          </p>

          <a
            href="/list-property"
            className="mt-8 inline-block rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-bold text-emerald-950 transition hover:bg-amber-400"
          >
            List Your Property
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-stone-500 sm:flex-row">
          <p>© 2024 Rentora Properties</p>

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
