import { useAuth } from "./../context/auth-context";
import { logout } from "./../auth-provider";
import qs from "qs";
const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: Object;
}

export const http = (
  endUrl: string,
  // 因为这里的参数也可以不填，所以赋予默认值，让它自动变成可选的
  { token, data, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      // Bearer开头的是标准写法
      Authorization: token ? `Bearer ${token} ` : "",
      "Content-Type": data ? "application/json" : "",
    },
    // 这里最后写，会覆盖前面的选项
    ...customConfig,
  };
  // 判断是get请求还是post请求
  if (config.method.toUpperCase() === "GET") {
    endUrl = `${endUrl}?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data);
  }
  return window
    .fetch(`${apiUrl}/${endUrl}`, { config })
    .then(async (response) => {
      // 401表示未授权，即未登录状态或token过期状态
      if (response.status === 401) {
        await logout();
        // 刷新页面
        window.location.reload();
        // 当服务端返回401和500等异常时，fetch是无法在catch里捕获异常的(axios可以),因此要reject
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};
export const useHttp = () => {
  const { user } = useAuth();
  // 由于这里的参数类型和http的完全相同，采用Parameters提取出来
  // 为了简便以后调用后不用写[]，用...将数组的数据解放出来
  return (...[endUrl, config]: Parameters<typeof http>) =>
    http(endUrl, { ...config, token: user.token });
};
