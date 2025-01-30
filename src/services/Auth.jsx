import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(null);
const SESSION_COOKIE_NAME = "user_session";
const SESSION_COOKIE_PERMISSIONS = "user_session_permissions";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userSessionExpired, setUserSessionExpired] = useState(false);
  const [userPermissions, setUserPermissions] = useState(null);

  const setSession = (userData) => {
    console.log(userData);
    setUser(userData);
    setUserPermissions(userData.permissions);

    Cookies.set(
      SESSION_COOKIE_PERMISSIONS,
      JSON.stringify(userData.permissions),
      {
        expires: 7,
      }
    );

    delete userData["permissions"];

    Cookies.set(SESSION_COOKIE_NAME, JSON.stringify(userData), {
      expires: 7,
    });
  };

  const clearSession = () => {
    setUser(null);
    setUserPermissions(null);
    Cookies.remove(SESSION_COOKIE_NAME);
    Cookies.remove(SESSION_COOKIE_PERMISSIONS);
  };

  useEffect(() => {
    let session = Cookies.get(SESSION_COOKIE_NAME);
    let session_permissions = Cookies.get(SESSION_COOKIE_PERMISSIONS);
    if (session) {
      setUser(JSON.parse(session));
    }
    if (session_permissions) {
      setUserPermissions(JSON.parse(session_permissions));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setSession,
        clearSession,
        userPermissions,
        userSessionExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
