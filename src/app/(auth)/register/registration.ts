export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: "CUSTOMER";
}

export async function registerUserApi(data: RegisterPayload) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const response = await fetch(`${BACKEND_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Something went wrong during registration.");
  }

  return result;
}