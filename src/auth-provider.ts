// 在真实开发中如果使用的是一些如firebase这种第三方auth服务，不需要开发本文件
import { User } from "./screens/project-list/search-panel";
const localStorageKey = "__auth_provider_token__";

const apiUrl = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      // 不加这句 login返回的是Promise<User|undefined>， 加上这句后返回的就是Promise<User></User>
      // 写这一句是为了防止在auth-context中调用时 如果请求失败会返回undefined类型，类型不是User了
      return Promise.reject(await response.json());
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      // 不加这句 register返回的是Promise<User|undefined>， 加上这句后返回的就是Promise<User></User>
      return Promise.reject(await response.json());
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
