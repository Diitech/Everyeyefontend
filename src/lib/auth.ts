export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getToken = () => localStorage.getItem('token') || localStorage.getItem('adminToken');
export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('adminToken');
  localStorage.removeItem('user');
};
export const getSavedUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  if (!token) throw new Error('No authentication token found');
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });
  
  if (response.status === 401) {
    const data = await response.json().catch(() => ({}));
    if (data.error === 'TokenExpired') {
      clearAuth();
      window.location.href = '/admin/login?expired=true';
      throw new Error('Session expired');
    }
    throw new Error(data.message || 'Unauthorized');
  }
  
  if (response.status === 403) {
    throw new Error('Permission denied');
  }
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message);
  }
  
  return response.json();
};