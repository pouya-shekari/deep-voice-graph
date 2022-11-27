import { createContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import localStorageHelper from "@utils/localStrogeHelper";
import PATHS from "@constants/PATHS";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const signin = (token) => {
    localStorageHelper.store("IS_LOGGED_IN", true);
    localStorageHelper.store("token", token);
    setIsLogin(true);
  };

  const signout = () => {
    localStorageHelper.remove("IS_LOGGED_IN");
    localStorageHelper.remove("token");
    setIsLogin(false);
    navigate(PATHS.LOGIN);
  };

  const value = { isLogin, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
