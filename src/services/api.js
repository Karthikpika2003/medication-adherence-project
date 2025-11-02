// src/services/api.js
// API Service Layer for MediTrack-AI

import axios from 'axios';

// Base URL - change this based on environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';


// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add auth token to all requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If token is invalid or expired, redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// ============= AUTHENTICATION APIs =============
export const authAPI = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  signup: (userData) => api.post('/api/auth/signup', userData),
  logout: () => api.post('/api/auth/logout'),
};

// ============= DOCTOR APIs =============
export const doctorAPI = {
  // Get all patients assigned to doctor
  getPatients: () => api.get('/api/doctor/patients'),
  
  // Get single patient details with medications and AI predictions
  getPatientById: (id) => api.get(`/api/patients/${id}`),
  
  // Get patient adherence history for charts
  getPatientHistory: (id) => api.get(`/api/patients/${id}/history`),
};

// ============= PATIENT APIs =============
export const patientAPI = {
  // Get logged-in patient's own data
  getMyData: () => api.get('/api/patient/me'),
  
  // Mark medication as taken
  markMedicationTaken: (data) => api.post('/api/patient/medication/taken', data),
  
  // Get today's medication schedule
  getTodayMedications: () => api.get('/api/patient/medications/today'),
  
  // Get medication history
  getMedicationHistory: () => api.get('/api/patient/medications/history'),
};

// ============= ML PREDICTION API =============
export const predictionAPI = {
  // Get adherence prediction for a patient
  predictAdherence: (patientData) => api.post('/api/predict/adherence', patientData),
  
  // Get risk analysis
  getRiskAnalysis: (patientId) => api.get(`/api/predict/risk/${patientId}`),
};

// ============= APPOINTMENTS API (Future) =============
export const appointmentAPI = {
  getAppointments: () => api.get('/api/appointments'),
  createAppointment: (data) => api.post('/api/appointments', data),
  updateAppointment: (id, data) => api.put(`/api/appointments/${id}`, data),
};

export default api;