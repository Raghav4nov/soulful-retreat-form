"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import StatCard from "@/components/admin/StatCard";
import RegistrantDetailModal from "@/components/admin/RegistrantDetailModal";
import {
  KNOW_MORE_LABEL,
  READY_TO_REGISTER_LABEL,
  REGISTRANT_FIELDS,
  SPEAK_TEAM_LABEL,
  TABLE_COLUMNS,
  type Registrant,
} from "@/lib/adminFields";
import { downloadCsv, rowsToCsv } from "@/lib/csv";

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

export default function AdminDashboardPage() {
  const router = useRouter();
  const [registrants, setRegistrants] = useState<Registrant[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Registrant | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadRegistrants() {
      setError(null);
      try {
        const response = await fetch("/api/admin/registrations", { cache: "no-store" });
        if (response.status === 401) {
          router.push("/admin/login");
          return;
        }
        if (!response.ok) {
          if (!cancelled) setError("Failed to load registrations.");
          return;
        }
        const data = await response.json();
        if (!cancelled) setRegistrants(data.rows as Registrant[]);
      } catch {
        if (!cancelled) setError("Failed to load registrations.");
      }
    }

    loadRegistrants();
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

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const filtered = useMemo(() => {
    if (!registrants) return [];
    const query = search.trim().toLowerCase();
    if (!query) return registrants;
    return registrants.filter((registrant) =>
      [registrant["Full Name"], registrant["Email"], registrant["WhatsApp"]]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [registrants, search]);

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

        <div className="mt-6 overflow-x-auto rounded-2xl border border-sage/30 bg-white">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-sage/30">
                {TABLE_COLUMNS.map((column) => (
                  <th
                    key={column}
                    className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wide text-charcoal/50"
                  >
                    {column}
                  </th>
                ))}
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
                filtered.map((registrant) => (
                  <tr
                    key={registrant._row}
                    onClick={() => setSelected(registrant)}
                    className="cursor-pointer border-b border-sage/15 last:border-0 hover:bg-sage/10"
                  >
                    {TABLE_COLUMNS.map((column) => (
                      <td key={column} className="px-4 py-3 font-sans text-sm text-charcoal">
                        {column === "Submitted At"
                          ? formatSubmittedAt(registrant[column])
                          : registrant[column] || "—"}
                      </td>
                    ))}
                  </tr>
                ))
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
        />
      )}
    </div>
  );
}
