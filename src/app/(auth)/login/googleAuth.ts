import { toast } from "sonner";

export interface GoogleLoginPayload {
  idToken: string;
  phone: string;
}

export async function loginWithGoogleApi(payload: GoogleLoginPayload) {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://desh-parcel-backend.vercel.app";

  const res = await fetch(`${BACKEND_URL}/api/v1/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Google authentication failed.");
  }

  if (typeof window !== "undefined" && result.success) {
    localStorage.setItem("accessToken", result.data.accessToken);
    localStorage.setItem("userRole", result.data.user.role);
  }

  return result;
}
export const handleGoogleAuthentication = async (
  idToken: string,
  phone: string,
  router: any,
) => {
  try {
    const result = await loginWithGoogleApi({ idToken, phone });
    toast.success("Google Login Successful!", {
      description: `Welcome back, ${result.data?.user?.name || "User"}!`,
    });
    setTimeout(() => {
      router.push("/");
    }, 1000);
  } catch (error: any) {
    toast.error("Google Login Failed", {
      description: error.message || "Something went wrong.",
    });
  }
};
