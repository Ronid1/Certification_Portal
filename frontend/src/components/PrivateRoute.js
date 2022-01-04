import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

//https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src/App.tsx

function PrivateRoute({ children }) {
    const auth = useSelector((state) => state.user.value.isLoggedIn);  
    if (!auth) {
      return <Navigate to="/login" />;
    }

    else
        return children;
  }
export default PrivateRoute;