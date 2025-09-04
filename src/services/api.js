import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://cabsharing-qeo5.onrender.com/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
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

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  validateToken: () => api.get('/auth/validate'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
  changePassword: (passwordData) => api.put('/auth/change-password', passwordData),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
};

// Booking API
export const bookingAPI = {
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  getBookings: (params) => api.get('/bookings', { params }),
  getBookingById: (id) => api.get(`/bookings/${id}`),
  updateBooking: (id, data) => api.put(`/bookings/${id}`, data),
  cancelBooking: (id, reason) => api.put(`/bookings/${id}/cancel`, { reason }),
  rateBooking: (id, rating) => api.put(`/bookings/${id}/rate`, rating),
  calculateFare: (data) => api.post('/bookings/calculate-fare', data),
  getNearbyDrivers: (location) => api.post('/bookings/nearby-drivers', location),
};

// Driver API
export const driverAPI = {
  registerDriver: (driverData) => api.post('/drivers/register', driverData),
  updateLocation: (location) => api.put('/drivers/location', location),
  updateStatus: (status) => api.put('/drivers/status', { status }),
  getEarnings: (period) => api.get('/drivers/earnings', { params: { period } }),
  getTrips: (params) => api.get('/drivers/trips', { params }),
  acceptBooking: (bookingId) => api.put(`/drivers/bookings/${bookingId}/accept`),
  rejectBooking: (bookingId, reason) => api.put(`/drivers/bookings/${bookingId}/reject`, { reason }),
  startTrip: (bookingId) => api.put(`/drivers/bookings/${bookingId}/start`),
  completeTrip: (bookingId) => api.put(`/drivers/bookings/${bookingId}/complete`),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getBookingHistory: (params) => api.get('/users/bookings', { params }),
  addFavoriteLocation: (location) => api.post('/users/favorites', location),
  getFavoriteLocations: () => api.get('/users/favorites'),
  deleteFavoriteLocation: (id) => api.delete(`/users/favorites/${id}`),
  getNotifications: () => api.get('/users/notifications'),
  markNotificationRead: (id) => api.put(`/users/notifications/${id}/read`),
};

// Payment API
export const paymentAPI = {
  createPaymentIntent: (amount, bookingId) => api.post('/payments/create-intent', { amount, bookingId }),
  confirmPayment: (paymentIntentId) => api.post('/payments/confirm', { paymentIntentId }),
  getPaymentMethods: () => api.get('/payments/methods'),
  addPaymentMethod: (method) => api.post('/payments/methods', method),
  deletePaymentMethod: (id) => api.delete(`/payments/methods/${id}`),
  getTransactionHistory: (params) => api.get('/payments/transactions', { params }),
};

// Admin API
export const adminAPI = {
  getDashboardStats: () => api.get('/admin/dashboard'),
  getUsers: (params) => api.get('/admin/users', { params }),
  getDrivers: (params) => api.get('/admin/drivers', { params }),
  getBookings: (params) => api.get('/admin/bookings', { params }),
  updateUserStatus: (userId, status) => api.put(`/admin/users/${userId}/status`, { status }),
  updateDriverStatus: (driverId, status) => api.put(`/admin/drivers/${driverId}/status`, { status }),
  getReports: (type, period) => api.get('/admin/reports', { params: { type, period } }),
};

export default api;