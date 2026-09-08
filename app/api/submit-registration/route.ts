export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("GOOGLE_SHEETS_WEBHOOK_URL is not configured");
    return Response.json({ error: "Server not configured" }, { status: 500 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Google Sheets webhook returned an error:", response.status, text);
      return Response.json({ error: "Failed to save registration" }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Failed to reach Google Sheets webhook:", error);
    return Response.json({ error: "Failed to save registration" }, { status: 502 });
  }
}
