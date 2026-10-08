export async function getLoggedInUserProfile() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("No token found. Please login first.");
  }

  const res = await fetch(`${BACKEND_URL}/api/v1/users/me`, {
    method: "GET",
    cache: "no-store",
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

export async function updateLoggedInUserProfile(
  fields: { name: string; phone: string; email: string },
  profileImage: File | null,
) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("No token found. Please login first.");
  }

  const body = new FormData();
  body.append("name", fields.name);
  body.append("phone", fields.phone);
  body.append("email", fields.email);

  if (profileImage) {
    body.append("profileImage", profileImage);
  }

  const res = await fetch(`${BACKEND_URL}/api/v1/users/me`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to update profile");
  }

  return result.data;
}