import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "admin_session";

function getAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("ADMIN_PASSWORD is not configured");
  }
  return password;
}

export function createAdminSessionToken(): string {
  return createHmac("sha256", getAdminPassword()).update("admin-session").digest("hex");
}

export function isValidAdminSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;

  let expected: string;
  try {
    expected = createAdminSessionToken();
  } catch {
    return false;
  }

  const tokenBuffer = Buffer.from(token);
  const expectedBuffer = Buffer.from(expected);
  if (tokenBuffer.length !== expectedBuffer.length) return false;

  return timingSafeEqual(tokenBuffer, expectedBuffer);
}

export async function isAdminRequestAuthorized(): Promise<boolean> {
  const cookieStore = await cookies();
  return isValidAdminSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export function checkAdminPassword(password: string): boolean {
  let expected: string;
  try {
    expected = getAdminPassword();
  } catch {
    return false;
  }

  const passwordBuffer = Buffer.from(password);
  const expectedBuffer = Buffer.from(expected);
  if (passwordBuffer.length !== expectedBuffer.length) return false;

  return timingSafeEqual(passwordBuffer, expectedBuffer);
}
