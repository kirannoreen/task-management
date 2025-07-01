import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import AssignProject from "./pages/AssignProject";
import "./App.css";
import UserProjects from "./pages/UserProjects";
import ProjectDetail from "./pages/ProjectDetail";

// Utility function to check for auth token
const isAuthenticated = () => !!localStorage.getItem("accessToken");

// Utility function to get user role
const getUserRole = () => localStorage.getItem("role");

// Protected Route: Checks for authentication before rendering child routes
const ProtectedRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

// Admin Route: Checks for 'admin' role before rendering child routes
const AdminRoute = () => {
    // This component assumes it's used within a ProtectedRoute
    return getUserRole() === "admin" ? <Outlet /> : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public routes accessible to everyone */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes that require authentication */}
        <Route element={<ProtectedRoute />}>
          {/* Routes accessible to all authenticated users */}
          <Route path="/" element={<UserProjects />} />
          <Route path="/user-projects/:projectId" element={<ProjectDetail />} />
          
          {/* Nested admin-only routes */}
          <Route element={<AdminRoute />}>
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/assign-project" element={<AssignProject />} />
          </Route>
        </Route>
        
        {/* Fallback route to redirect users based on auth status */}
        <Route path="*" element={<Navigate to={isAuthenticated() ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;