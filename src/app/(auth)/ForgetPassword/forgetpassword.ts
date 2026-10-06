export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

// 1. Send OTP for Forgot Password
export async function forgotPasswordApi(data: ForgotPasswordPayload) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const res = await fetch(`${BACKEND_URL}/api/v1/users/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to send OTP. Please check your email.");
  }

  return result;
}

// 2. Reset Password with OTP
export async function resetPasswordApi(data: ResetPasswordPayload) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const res = await fetch(`${BACKEND_URL}/api/v1/users/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Password reset failed. Invalid OTP or expired.");
  }

  return result;
}