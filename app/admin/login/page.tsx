"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError("Incorrect password. Please try again.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-ivory px-6 py-16">
      <Logo showWordmark={false} markSize={56} />
      <h1 className="font-playfair mt-6 text-2xl text-forest">Admin Login</h1>
      <p className="font-sans mt-2 text-sm text-charcoal/60">
        Enter the admin password to view registrations.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex w-full max-w-xs flex-col gap-4">
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          autoFocus
          className="rounded-xl border border-sage/40 bg-white px-4 py-3 font-sans text-sm text-charcoal outline-none focus:border-forest"
        />
        {error && <p className="font-sans text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting || !password}
          className="rounded-full bg-forest px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-ivory transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
        >
          {isSubmitting ? "Checking..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
