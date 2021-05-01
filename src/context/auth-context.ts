import { http } from "./../utils/http";
import { User } from "./../screens/project-list/search-panel";
import * as Auth from "./../auth-provider";
import React, { useState, ReactNode } from "react";
// 如果这里只写undefined,ts会默认value的类型只是undefined，在下面return时会报错，因此加入泛型
// Promise<void>指返回值为空
interface ContextProps {
  user: User | null;
  register: (form: FormData) => Promise<void>;
  login: (form: FormData) => Promise<void>;
  logout: (form: FormData) => Promise<void>;
}
const AuthContext = React.createContext<undefined>(undefined);
interface FormData {
  username: string;
  password: string;
}
AuthContext.displayName = "AuthContext";

// 初始化user
const bootStrapUser = () => {
  let user = null;
  const token = Auth.getToken();
  if (token) {
    const data = http("me", { token });
    user = data.token;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 如果这里只赋值null，那么user会被赋值成null类型，下面的setUser会报错，因此用泛型。
  const [user, setUser] = useState<User | null>(null);
  // 这一步把登录后拿到的所有数据赋值
  const login = (form: FormData) =>
    Auth.login(form).then((user) => setUser(user));
  const register = (form: FormData) =>
    Auth.register(form).then((user) => setUser(user));
  const logout = () => Auth.logout(form).then(() => setUser(null));

  // 每次刷新都初始化user
  useEffect(() => {
    bootStrapUser().then(setUser);
  });
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
