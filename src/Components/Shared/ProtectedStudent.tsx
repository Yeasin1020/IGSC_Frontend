import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

const ProtectedStudent = ({ children }: { children: ReactNode }) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0b1220]">
        <LoadingSpinner label="Checking session..." />
      </div>
    );
  }

  if (isAdmin) {
    return <Navigate to="/admin-panel" replace />;
  }

  if (!user) {
    return (
      <Navigate
        to="/admin-panel/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
};

export default ProtectedStudent;
