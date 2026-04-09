const API_URL = "https://everyeye-server.onrender.com/api/orders";

export const createCheckoutSession = async (
  items: object[],
  customerEmail: string,
  discountCode?: string,
) => {
  const res = await fetch(`${API_URL}/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, customerEmail, discountCode }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const getOrderStatus = async (sessionId: string) => {
  const res = await fetch(`${API_URL}/success/${sessionId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const validateDiscount = async (code: string) => {
  const res = await fetch(`${API_URL}/validate-discount`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};
