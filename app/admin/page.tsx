"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import StatCard from "@/components/admin/StatCard";
import RegistrantDetailModal from "@/components/admin/RegistrantDetailModal";
import {
  FOLLOWUP_STATUS_OPTIONS,
  KNOW_MORE_LABEL,
  READY_TO_REGISTER_LABEL,
  REGISTRANT_FIELDS,
  SORTABLE_COLUMNS,
  SPEAK_TEAM_LABEL,
  TABLE_COLUMNS,
  type Registrant,
  type RegistrantField,
} from "@/lib/adminFields";
import { downloadCsv, rowsToCsv } from "@/lib/csv";
import { toWhatsAppLink } from "@/lib/whatsapp";

const INTENT_FILTER_OPTIONS: { value: string; label: string }[] = [
  { value: READY_TO_REGISTER_LABEL, label: "Ready to Register" },
  { value: KNOW_MORE_LABEL, label: "Wants to Know More" },
  { value: SPEAK_TEAM_LABEL, label: "Wants to Speak with Team" },
];

type SortState = { column: RegistrantField; direction: "asc" | "desc" };

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

function compareByColumn(a: Registrant, b: Registrant, column: RegistrantField): number {
  if (column === "Submitted At") {
    return new Date(a[column]).getTime() - new Date(b[column]).getTime();
  }
  return (a[column] || "").localeCompare(b[column] || "");
}

// Plain (non-hook) fetch so both the mount effect and the post-delete
// refresh can share it without either calling setState from inside it.
async function fetchRegistrants(): Promise<Registrant[]> {
  const response = await fetch("/api/admin/registrations", { cache: "no-store" });
  if (response.status === 401) throw new Error("UNAUTHORIZED");
  if (!response.ok) throw new Error("FAILED");
  const data = await response.json();
  return data.rows as Registrant[];
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [registrants, setRegistrants] = useState<Registrant[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [intentFilter, setIntentFilter] = useState<string | null>(null);
  const [sort, setSort] = useState<SortState>({ column: "Submitted At", direction: "desc" });
  const [selected, setSelected] = useState<Registrant | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchRegistrants()
      .then((rows) => {
        if (!cancelled) setRegistrants(rows);
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof Error && err.message === "UNAUTHORIZED") {
          router.push("/admin/login");
          return;
        }
        setError("Failed to load registrations.");
      });

    return () => {
      cancelled = true;
    };
  }, [router]);

  async function handleSave(row: number, fields: Record<string, string>) {
    const response = await fetch("/api/admin/registrations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ row, fields }),
    });
    if (!response.ok) throw new Error("Failed to save");

    setRegistrants((prev) =>
      prev
        ? prev.map((registrant) =>
            registrant._row === row ? { ...registrant, ...fields } : registrant
          )
        : prev
    );
    setSelected((prev) => (prev && prev._row === row ? { ...prev, ...fields } : prev));
  }

  async function handleDelete(row: number) {
    const response = await fetch("/api/admin/registrations", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ row }),
    });
    if (!response.ok) throw new Error("Failed to delete");

    setSelected(null);
    // Deleting shifts every later row up by one, so refetch rather than
    // trust the _row numbers already held on the client.
    try {
      setRegistrants(await fetchRegistrants());
    } catch {
      setError("Failed to refresh registrations.");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function toggleSort(column: RegistrantField) {
    setSort((prev) =>
      prev.column === column
        ? { column, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { column, direction: "asc" }
    );
  }

  const filtered = useMemo(() => {
    if (!registrants) return [];
    const query = search.trim().toLowerCase();

    let rows = registrants;
    if (query) {
      rows = rows.filter((registrant) =>
        [registrant["Full Name"], registrant["Email"], registrant["WhatsApp"]]
          .join(" ")
          .toLowerCase()
          .includes(query)
      );
    }
    if (intentFilter) {
      rows = rows.filter((registrant) => registrant["Registration Intent"] === intentFilter);
    }

    const sorted = [...rows].sort((a, b) => compareByColumn(a, b, sort.column));
    return sort.direction === "asc" ? sorted : sorted.reverse();
  }, [registrants, search, intentFilter, sort]);

  const stats = useMemo(() => {
    const rows = registrants ?? [];
    return {
      total: rows.length,
      ready: rows.filter((r) => r["Registration Intent"] === READY_TO_REGISTER_LABEL).length,
      knowMore: rows.filter((r) => r["Registration Intent"] === KNOW_MORE_LABEL).length,
      speakTeam: rows.filter((r) => r["Registration Intent"] === SPEAK_TEAM_LABEL).length,
    };
  }, [registrants]);

  function handleExportCsv() {
    if (!registrants) return;
    const csv = rowsToCsv([...REGISTRANT_FIELDS], filtered);
    downloadCsv(`soulful-healing-adventure-registrations-${Date.now()}.csv`, csv);
  }

  return (
    <div className="flex min-h-full bg-ivory">
      <aside className="hidden w-64 shrink-0 flex-col bg-forest px-6 py-8 text-ivory sm:flex">
        <Logo showWordmark={false} markSize={40} variant="ivory" />
        <p className="font-playfair mt-4 text-lg">Soulful Healing</p>
        <nav className="mt-10 flex flex-col gap-1">
          <span className="rounded-lg bg-ivory/10 px-4 py-2.5 font-sans text-sm font-semibold">
            Dashboard
          </span>
        </nav>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-auto rounded-lg px-4 py-2.5 text-left font-sans text-sm text-ivory/70 hover:bg-ivory/10 hover:text-ivory"
        >
          Log Out
        </button>
      </aside>

      <main className="min-w-0 flex-1 px-6 py-8 sm:px-10">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-playfair text-3xl text-forest">Dashboard</h1>
            <p className="mt-1 font-sans text-sm text-charcoal/60">
              Registrations for Soulful Healing Adventure — Rishikesh, 14&ndash;15 Nov 2026.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 self-start rounded-full border border-sage/40 px-4 py-2 font-sans text-xs font-semibold text-charcoal sm:hidden"
          >
            Log Out
          </button>
        </div>

        {error && <p className="mt-6 font-sans text-sm text-red-600">{error}</p>}

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Total Registrations" value={stats.total} highlight />
          <StatCard label="Ready to Register" value={stats.ready} />
          <StatCard label="Wants to Know More" value={stats.knowMore} />
          <StatCard label="Wants to Speak with Team" value={stats.speakTeam} />
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, email, or WhatsApp"
            className="w-full max-w-sm rounded-xl border border-sage/40 bg-white px-4 py-2.5 font-sans text-sm text-charcoal outline-none focus:border-forest"
          />
          <button
            type="button"
            onClick={handleExportCsv}
            disabled={!registrants || registrants.length === 0}
            className="rounded-full bg-forest px-5 py-2.5 font-sans text-sm font-semibold text-ivory disabled:opacity-50"
          >
            Export CSV
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setIntentFilter(null)}
            className={`rounded-full px-4 py-1.5 font-sans text-xs font-semibold ${
              intentFilter === null ? "bg-forest text-ivory" : "border border-sage/40 text-charcoal"
            }`}
          >
            All
          </button>
          {INTENT_FILTER_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setIntentFilter(option.value)}
              className={`rounded-full px-4 py-1.5 font-sans text-xs font-semibold ${
                intentFilter === option.value ? "bg-forest text-ivory" : "border border-sage/40 text-charcoal"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-sage/30 bg-white">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="border-b border-sage/30">
                {TABLE_COLUMNS.map((column) => {
                  const isSortable = (SORTABLE_COLUMNS as readonly string[]).includes(column);
                  const isActive = sort.column === column;
                  return (
                    <th
                      key={column}
                      className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wide text-charcoal/50"
                    >
                      {isSortable ? (
                        <button
                          type="button"
                          onClick={() => toggleSort(column)}
                          className="flex items-center gap-1 hover:text-charcoal"
                        >
                          {column}
                          <span className="text-[10px]">
                            {isActive ? (sort.direction === "asc" ? "▲" : "▼") : ""}
                          </span>
                        </button>
                      ) : (
                        column
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {registrants === null ? (
                <tr>
                  <td colSpan={TABLE_COLUMNS.length} className="px-4 py-8 text-center font-sans text-sm text-charcoal/50">
                    Loading registrations...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={TABLE_COLUMNS.length} className="px-4 py-8 text-center font-sans text-sm text-charcoal/50">
                    No registrations found.
                  </td>
                </tr>
              ) : (
                filtered.map((registrant) => {
                  const whatsAppLink = toWhatsAppLink(registrant["WhatsApp"] || "");
                  return (
                    <tr
                      key={registrant._row}
                      onClick={() => setSelected(registrant)}
                      className="cursor-pointer border-b border-sage/15 last:border-0 hover:bg-sage/10"
                    >
                      {TABLE_COLUMNS.map((column) => (
                        <td key={column} className="px-4 py-3 font-sans text-sm text-charcoal">
                          {column === "Submitted At" ? (
                            formatSubmittedAt(registrant[column])
                          ) : column === "WhatsApp" && whatsAppLink ? (
                            <a
                              href={whatsAppLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(event) => event.stopPropagation()}
                              className="text-forest underline decoration-forest/40 underline-offset-2 hover:decoration-forest"
                            >
                              {registrant[column]}
                            </a>
                          ) : column === "Follow-up Status" ? (
                            <select
                              value={registrant[column] || ""}
                              onClick={(event) => event.stopPropagation()}
                              onChange={(event) => handleSave(registrant._row, { "Follow-up Status": event.target.value })}
                              className="rounded-lg border border-sage/40 bg-white px-2 py-1 font-sans text-xs text-charcoal outline-none focus:border-forest"
                            >
                              <option value="">Pending</option>
                              {FOLLOWUP_STATUS_OPTIONS.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          ) : (
                            registrant[column] || "—"
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </main>

      {selected && (
        <RegistrantDetailModal
          registrant={selected}
          onClose={() => setSelected(null)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
