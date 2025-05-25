// src/components/protectedRoute/ProtectedRoute.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

// Super basic Protected Route - no dependencies on Redux or token service
const ProtectedRoute = ({ children }) => {
  // Simple check for token in localStorage
  const hasToken = localStorage.getItem('accessToken') !== null;
  
  // If no token, redirect to login
  if (!hasToken) {
    return <NavLink to="/login" />;
  }
  
  // If token exists, render children
  return children;
};

export default ProtectedRoute;