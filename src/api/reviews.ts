const API_URL = 'https://everyeye-server.onrender.com/api/reviews';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`
});

export interface Review {
  _id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  body: string;
  verifiedPurchase: boolean;
  helpful: number;
  createdAt: string;
}

export interface ReviewsData {
  reviews: Review[];
  breakdown: { [key: number]: number };
  total: number;
}

export const getReviews = async (productId: string): Promise<ReviewsData> => {
  const res = await fetch(`${API_URL}/${productId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const createReview = async (productId: string, review: { rating: number; title: string; body: string }) => {
  const res = await fetch(`${API_URL}/${productId}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(review)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const voteHelpful = async (reviewId: string) => {
  const res = await fetch(`${API_URL}/${reviewId}/helpful`, {
    method: 'POST',
    headers: getHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const deleteReview = async (reviewId: string) => {
  const res = await fetch(`${API_URL}/${reviewId}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};