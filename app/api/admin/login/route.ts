import { ADMIN_SESSION_COOKIE, checkAdminPassword, createAdminSessionToken } from "@/lib/adminAuth";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const password = typeof body === "object" && body !== null ? (body as Record<string, unknown>).password : undefined;
  if (typeof password !== "string" || !checkAdminPassword(password)) {
    return Response.json({ error: "Incorrect password" }, { status: 401 });
  }

  const isHttps = new URL(request.url).protocol === "https:";
  const response = Response.json({ ok: true });
  response.headers.append(
    "Set-Cookie",
    `${ADMIN_SESSION_COOKIE}=${createAdminSessionToken()}; Path=/; HttpOnly; ${isHttps ? "Secure; " : ""}SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`
  );
  return response;
}
