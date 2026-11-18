import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../auth";

export default function ProtectedRoute({ children }: { children: ReactElement }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
