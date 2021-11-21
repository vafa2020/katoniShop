import { createContext, useContext, useEffect } from "react";
import { useState } from "react/cjs/react.development";

const AuthContext = createContext();
const AuthContextDispatcher = createContext();

const LOCAL_STORAGE_AUTH_KEY = "authUser";

const AuthProvider = ({ children }) => {
  const [Auth, setAuth] = useState(false);
  useEffect(() => {
    const userData =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)) || false;
    setAuth(userData);
  }, []);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(Auth));
  }, [Auth]);
  return (
    <AuthContext.Provider value={Auth}>
      <AuthContextDispatcher.Provider value={setAuth}>
        {children}
      </AuthContextDispatcher.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
export const useAuthAction = () => useContext(AuthContextDispatcher);
