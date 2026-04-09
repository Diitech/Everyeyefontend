const API_URL = "https://everyeye-server.onrender.com";

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed");
  return data;
};

export const loginWithGoogle = () => {
  window.location.href = `${API_URL}/google`;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const res = await fetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return null;
  }
  const data = await res.json();
  return data.user;
};

export const saveAuth = (token: string, user: object) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getSavedUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
