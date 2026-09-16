
"use client";

import { useState } from "react";

type EnquiryActionsProps = {
  enquiryId: number;
  status: string;
};

export default function EnquiryActions({
  enquiryId,
  status,
}: EnquiryActionsProps) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [loading, setLoading] = useState(false);

  const updateStatus = async (newStatus: string) => {
    setLoading(true);

    try {
      const response = await fetch(`/api/enquiries/${enquiryId}`, {
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
        throw new Error(data.message || "Failed to update enquiry.");
      }

      setCurrentStatus(newStatus);
    } catch (error) {
      console.error("Enquiry status update error:", error);

      alert("Something went wrong while updating the enquiry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => updateStatus("NEW")}
        disabled={loading || currentStatus === "NEW"}
        className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Mark New
      </button>

      <button
        type="button"
        onClick={() => updateStatus("IN_PROGRESS")}
        disabled={loading || currentStatus === "IN_PROGRESS"}
        className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Mark In Progress
      </button>

      <button
        type="button"
        onClick={() => updateStatus("COMPLETED")}
        disabled={loading || currentStatus === "COMPLETED"}
        className="rounded-lg border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Mark Completed
      </button>
    </div>
  );
}
