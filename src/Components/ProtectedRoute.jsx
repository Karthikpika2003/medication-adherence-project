// src/components/ProtectedRoute.jsx
// Component to protect routes from unauthorized access

import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, requiredRole }) {
  // Check if user is authenticated
  const token = localStorage.getItem('authToken');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  // No token = not logged in, redirect to home
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Check if user has required role (doctor or patient)
  if (requiredRole && user?.role !== requiredRole) {
    // Wrong role, redirect to home
    return <Navigate to="/" replace />;
  }

  // All checks passed, render the protected component
  return children;
}