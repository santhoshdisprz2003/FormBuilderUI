import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import FormBuilderHome from "./components/FormBuilderHome";
import CreateForm from "./components/CreateForm";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user already has a token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Home Page (Protected Route) */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <FormBuilderHome onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Create Form Page (Protected Route) */}
        <Route
          path="/create-form"
          element={
            isLoggedIn ? (
              <CreateForm />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}
