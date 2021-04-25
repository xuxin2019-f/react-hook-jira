import React, { useState, useEffect } from "react";
// 排除0
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const cleanObj = (Obj: object) => {
  // 不要修改源对象
  const result = { ...Obj };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    // 当value是0时不删除属性
    if (isFalsy(value)) {
      // 删除该属性及值 tsignore代表这里有报错但我现在先忽略
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

// 抽离出只在组件第一次加载执行副作用的逻辑
// 注意自定义hook一定要用use开头
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// 防抖
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // 每次在上一个useEffect处理完之后再运行，即最后只保留了最后一个useEffect的定时器
    return () => clearTimeout(timeout);
    // 一般只是value变
  }, [value, delay]);

  return debouncedValue;
};

export const useArray = <T>(person: T[]) => {
  const [value, setValue] = useState(person);
  const clear = () => {
    setValue([]);
  };
  const removeIndex = (index: number) => {
    // 不修改源对象
    const newValue = [...value];
    newValue.splice(index, 1);
    setValue(newValue);
  };
  const add = (item: T) => {
    const newValue = [...value, item];
    setValue(newValue);
  };
  return {
    value,
    clear,
    removeIndex,
    add,
  };
};
