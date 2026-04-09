import { useState } from "react";

interface CheckoutOptions {
  productId: string;
  productName: string;
  price: number;
  currency?: string;
}

export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkout = async ({
    productId,
    productName,
    price,
    currency = "usd",
  }: CheckoutOptions) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, productName, price, currency }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Checkout failed");

      // Redirect to Stripe hosted checkout — full page redirect, no iframe
      window.location.href = data.url;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Checkout failed";
      console.error("Checkout error:", message);
      setError(message);
      setLoading(false);
    }
  };

  return { checkout, loading, error };
}