import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  demoLogin: (email) => api.post('/auth/demo-login', { email }),
};

// Stores API calls
export const storesAPI = {
  getAll: (filters = {}) => api.get('/stores', { params: filters }),
  getById: (id) => api.get(`/stores/${id}`),
  create: (storeData) => api.post('/stores', storeData),
};

// Ratings API calls
export const ratingsAPI = {
  submit: (storeId, rating) => api.post('/ratings', { storeId, rating }),
  getUserRating: (storeId) => api.get(`/ratings/user/${storeId}`),
  getStoreRatings: (storeId) => api.get(`/ratings/store/${storeId}`),
};

// Users API calls
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  changePassword: (currentPassword, newPassword) => 
    api.put('/users/change-password', { currentPassword, newPassword }),
  getAll: (filters = {}) => api.get('/users', { params: filters }),
};

export default api;