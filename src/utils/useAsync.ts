import { useState } from "react";
interface State<D> {
  data: D;
  // 状态,idle表示还未请求
  stat: "idle" | "loading" | "error" | "success";
  error: Error | null;
}

// 初始默认状态
const defaultInitialState: State<null> = {
  data: null,
  error: null,
  stat: "idle",
};

const defaultConfig = {
  throwError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const [state, setState] = useState({
    ...defaultInitialState,
    // 覆盖
    ...initialState,
  });
  const config = {
    ...defaultConfig,
    ...initialConfig,
  };
  const setError = (error: Error) => {
    setState({
      data: null,
      stat: "error",
      error,
    });
  };
  const setData = (data: D) => {
    setState({
      data,
      stat: "success",
      error: null,
    });
  };
  const setLoading = () => {
    setState({ ...state, stat: "loading" });
  };
  // 传入异步操作，Promise内的数据为D
  const run = (promise: Promise<D>) => {
    // 如果传入的不是promise或者没传入参数
    if (!promise || !promise.then) {
      throw new Error("请传入promise格式的请求");
    }
    setLoading();
    return promise
      .then((data) => {
        setData(data);
        // 链式调用
        return data;
      })
      .catch((error) => {
        // 在这里catch会消化异常，如果外面又嵌套了catch，而这里又不主动抛出，外面是接收不到异常的
        setError(error);
        // return error;
        // 让返回error成为一个可选的参数
        if (config.throwError) {
          return Promise.reject(error);
        }
        return error;
      });
  };
  return {
    isIdle: state.stat === "idle",
    isError: state.stat === "error",
    isLoading: state.stat === "loading",
    isSuccess: state.stat === "success",
    run,
    setData,
    setLoading,
    setError,
    ...state,
  };
};
