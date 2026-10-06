export async function getLoggedInUserProfile() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("No token found. Please login first.");
  }

  const res = await fetch(`${BACKEND_URL}/api/v1/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch profile");
  }

  return result.data; 
}