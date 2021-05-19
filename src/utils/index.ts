import React, { useState, useEffect, useRef } from "react";
// 排除0
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// object可以是对象、函数、正则，太笼统，所以ts直接给了一个{}空对象，这会使下面取key值时报错
export const cleanObj = (Obj: { [key: string]: unknown }) => {
  // 不要修改源对象
  const result = { ...Obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    // 当value是0时不删除属性
    // 用isFalsy此时{checked: false}这样的属性也会被删掉，改用isVoid
    if (isFalsy(value)) {
      // 删除该属性及值 @ts-ignore代表这里有报错但我现在先忽略

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
    // 依赖项里加callback会无限循环，这和useCallback以及useMemo有关
    // eslint-disable-next-line (规则)react-hooks/exhaustive-deps
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

// 改变title
export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  // 在整个生命周期保持值不变
  const oldTitle = useRef(document.title).current;
  // 页面加载时， oldTitle === 旧title
  // 加载后，又一次执行了该hook， oldTitle===新taitle
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [oldTitle, keepOnUnmount]);
};

export const resetRoute = () => (window.location.href = window.location.origin);
