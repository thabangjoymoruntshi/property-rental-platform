
"use client";

import { useState } from "react";

type PropertyActionsProps = {
  propertyId: number;
  status: string;
};

export default function PropertyActions({
  propertyId,
  status,
}: PropertyActionsProps) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const updateStatus = async (newStatus: "APPROVED" | "REJECTED") => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/properties/${propertyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update property.");
      }

      setCurrentStatus(newStatus);
    } catch (error) {
      console.error("Status update error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this property?"
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setError("");

    try {
      const response = await fetch("/api/properties", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: propertyId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete property.");
      }

      window.location.reload();
    } catch (error) {
      console.error("Property deletion error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while deleting the property."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="mt-5">
      {currentStatus === "PENDING" && (
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => updateStatus("APPROVED")}
            disabled={loading || deleting}
            className="rounded-lg bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Updating..." : "Approve"}
          </button>

          <button
            type="button"
            onClick={() => updateStatus("REJECTED")}
            disabled={loading || deleting}
            className="rounded-lg border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Updating..." : "Reject"}
          </button>
        </div>
      )}

      {currentStatus !== "PENDING" && (
        <p className="text-sm font-semibold text-stone-600">
          Status:{" "}
          <span className="text-emerald-800">{currentStatus}</span>
        </p>
      )}

      <div className="mt-4">
        <button
          type="button"
          onClick={deleteProperty}
          disabled={loading || deleting}
          className="rounded-lg border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete Property"}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}