import { isAdminRequestAuthorized } from "@/lib/adminAuth";
import type { Registrant } from "@/lib/adminFields";

export async function GET() {
  if (!(await isAdminRequestAuthorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.ADMIN_PASSWORD;
  if (!webhookUrl || !secret) {
    return Response.json({ error: "Server not configured" }, { status: 500 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "adminList", secret }),
      cache: "no-store",
    });

    const data = await response.json();
    if (!data.ok) {
      return Response.json({ error: data.error || "Failed to load registrations" }, { status: 502 });
    }

    return Response.json({ rows: data.rows as Registrant[] });
  } catch (error) {
    console.error("Failed to reach Google Sheets webhook:", error);
    return Response.json({ error: "Failed to load registrations" }, { status: 502 });
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdminRequestAuthorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.ADMIN_PASSWORD;
  if (!webhookUrl || !secret) {
    return Response.json({ error: "Server not configured" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { row, fields } = (body as { row?: number; fields?: Record<string, string> }) ?? {};
  if (typeof row !== "number" || !fields) {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "adminUpdate", secret, row, fields }),
      cache: "no-store",
    });

    const data = await response.json();
    if (!data.ok) {
      return Response.json({ error: data.error || "Failed to update registration" }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Failed to reach Google Sheets webhook:", error);
    return Response.json({ error: "Failed to update registration" }, { status: 502 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdminRequestAuthorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.ADMIN_PASSWORD;
  if (!webhookUrl || !secret) {
    return Response.json({ error: "Server not configured" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { row } = (body as { row?: number }) ?? {};
  if (typeof row !== "number") {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "adminDelete", secret, row }),
      cache: "no-store",
    });

    const data = await response.json();
    if (!data.ok) {
      return Response.json({ error: data.error || "Failed to delete registration" }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Failed to reach Google Sheets webhook:", error);
    return Response.json({ error: "Failed to delete registration" }, { status: 502 });
  }
}
