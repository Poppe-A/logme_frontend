import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./provider/AuthProvider";
import { useContext, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import { logout, whoami } from "./services/auth.service";
import { CircularProgress } from "@mui/material";

export const ProtectedRoute = () => {
  const { token, setToken } = useAuth();
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    if (token && !user) {
      whoami(token)
        .then(loggedUser => {
          if (loggedUser?.username && loggedUser?.id) {
            return setUser(loggedUser)
          } else {
            throw Error
          }
        }) 
        .catch((e) => {
          console.error(e);
          setToken(null)
        })
    }
  }, [])

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <CircularProgress />
  }

  // If authenticated, render the child routes
  return <Outlet />;
};