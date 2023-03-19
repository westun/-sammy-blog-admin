import React, { ReactNode } from "react";
import { isAuthenticated } from "../../services/authService";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const isAuthenticatedUser = isAuthenticated();
  if (!isAuthenticatedUser) {
    return <Navigate to="/login" replace={true} />;
  }

  // the idea is that the ProtectedRoute componenet will have children
  // and those children will be components themselves
  // eg: <ProtectedRoute><Route path="/home" element={<Home/>}/></ProtectedRoute>
  // so by returning "children" will render the children that itself is a component
  return children;
}
