export interface LoginPayload {
  email: string;
  password: string;
}

export async function loginUserApi(data: LoginPayload) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const res = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Invalid credentials. Please try again.");
  }

  return result;
}