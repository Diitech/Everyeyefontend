const API_URL = "https://everyeye-server.onrender.com/api/admin";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getStats = async () => {
  const res = await fetch(`${API_URL}/stats`, { headers: getHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const getAdminProducts = async (search = "", category = "") => {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category) params.set("category", category);
  const res = await fetch(`${API_URL}/products?${params}`, {
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const createProduct = async (product: object) => {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(product),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const updateProduct = async (id: string, product: object) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(product),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const deleteProduct = async (id: string) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const getAdminUsers = async () => {
  const res = await fetch(`${API_URL}/users`, { headers: getHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const toggleAdmin = async (id: string) => {
  const res = await fetch(`${API_URL}/users/${id}/toggle-admin`, {
    method: "PUT",
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const deleteUser = async (id: string) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const generateDiscount = async (
  code: string,
  percentage: number,
  expiryDays: number,
) => {
  const res = await fetch(`${API_URL}/discounts`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ code, percentage, expiryDays }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const sendAnnouncement = async (
  title: string,
  message: string,
  type: string,
) => {
  const res = await fetch(`${API_URL}/announcement`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ title, message, type }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const requestPayout = async (
  amount: number,
  accountNumber: string,
  bankName: string,
  accountName: string,
) => {
  const res = await fetch(`${API_URL}/payout`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ amount, accountNumber, bankName, accountName }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const postCampaign = async (platform: string, data: object) => {
  const res = await fetch(
    `https://everyeye-server.onrender.com/api/campaigns/${platform}`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    },
  );
  const result = await res.json();
  return result;
};

export const getCampaignStatus = async () => {
  const res = await fetch(
    `https://everyeye-server.onrender.com/api/campaigns/status`,
    {
      headers: getHeaders(),
    },
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const sendNewsletter = async (
  subject: string,
  content: string,
  ctaText: string,
  ctaLink: string,
) => {
  const res = await fetch(`${API_URL}/newsletter`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ subject, content, ctaText, ctaLink }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};
