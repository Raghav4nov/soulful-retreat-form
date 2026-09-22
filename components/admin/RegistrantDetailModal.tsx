"use client";

import { useState } from "react";
import { FOLLOWUP_STATUS_OPTIONS, REGISTRANT_FIELDS, type Registrant } from "@/lib/adminFields";
import { toWhatsAppLink } from "@/lib/whatsapp";

function formatSubmittedAt(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type RegistrantDetailModalProps = {
  registrant: Registrant;
  onClose: () => void;
  onSave: (row: number, fields: Record<string, string>) => Promise<void>;
  onDelete: (row: number) => Promise<void>;
};

export default function RegistrantDetailModal({
  registrant,
  onClose,
  onSave,
  onDelete,
}: RegistrantDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const field of REGISTRANT_FIELDS) {
      initial[field] = registrant[field] ?? "";
    }
    return initial;
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingStatus, setIsSavingStatus] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setIsSaving(true);
    setError(null);
    try {
      await onSave(registrant._row, values);
      setIsEditing(false);
    } catch {
      setError("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleStatusChange(status: string) {
    setIsSavingStatus(true);
    setError(null);
    try {
      await onSave(registrant._row, { "Follow-up Status": status });
      setValues((prev) => ({ ...prev, "Follow-up Status": status }));
    } catch {
      setError("Failed to update follow-up status. Please try again.");
    } finally {
      setIsSavingStatus(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Delete ${registrant["Full Name"] || "this registrant"}? This can't be undone.`)) {
      return;
    }
    setIsDeleting(true);
    setError(null);
    try {
      await onDelete(registrant._row);
    } catch {
      setError("Failed to delete registrant. Please try again.");
      setIsDeleting(false);
    }
  }

  const whatsAppLink = toWhatsAppLink(registrant["WhatsApp"] || "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-ivory p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-playfair text-2xl text-forest">
            {registrant["Full Name"] || "Registrant"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1 text-charcoal/50 hover:text-charcoal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6L18 18M6 18L18 6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {REGISTRANT_FIELDS.map((field) => (
            <div key={field} className={field === "Special Requests" || field === "Food Notes" || field === "Activity Notes" ? "sm:col-span-2" : ""}>
              <label className="font-sans text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                {field}
              </label>
              {field === "Follow-up Status" ? (
                <select
                  value={values[field] || ""}
                  onChange={(event) => handleStatusChange(event.target.value)}
                  disabled={isSavingStatus}
                  className="mt-1 w-full rounded-lg border border-sage/40 bg-white px-3 py-2 font-sans text-sm text-charcoal outline-none focus:border-forest disabled:opacity-50"
                >
                  <option value="">Pending</option>
                  {FOLLOWUP_STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : isEditing ? (
                <input
                  type="text"
                  value={values[field]}
                  onChange={(event) => setValues((prev) => ({ ...prev, [field]: event.target.value }))}
                  className="mt-1 w-full rounded-lg border border-sage/40 bg-white px-3 py-2 font-sans text-sm text-charcoal outline-none focus:border-forest"
                />
              ) : field === "WhatsApp" && whatsAppLink ? (
                <a
                  href={whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block font-sans text-sm text-forest underline decoration-forest/40 underline-offset-2 hover:decoration-forest"
                >
                  {registrant[field]}
                </a>
              ) : (
                <p className="mt-1 font-sans text-sm text-charcoal">
                  {field === "Submitted At"
                    ? formatSubmittedAt(registrant[field])
                    : registrant[field] || "—"}
                </p>
              )}
            </div>
          ))}
        </div>

        {error && <p className="mt-4 font-sans text-sm text-red-600">{error}</p>}

        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-full border border-red-300 px-5 py-2.5 font-sans text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>

          <div className="flex gap-3">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setValues(() => {
                      const reset: Record<string, string> = {};
                      for (const field of REGISTRANT_FIELDS) reset[field] = registrant[field] ?? "";
                      return reset;
                    });
                  }}
                  className="rounded-full border border-sage/40 px-5 py-2.5 font-sans text-sm font-semibold text-charcoal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="rounded-full bg-forest px-5 py-2.5 font-sans text-sm font-semibold text-ivory disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="rounded-full bg-forest px-5 py-2.5 font-sans text-sm font-semibold text-ivory"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
