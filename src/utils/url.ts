import { cleanObj } from './index';
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import {useMemo} from 'react'

//用泛型可以实现类型推断，当传入['name','personId']时返回的类型是{name:string,peronId:string}
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    useMemo(
      ()=>keys.reduce((total: { [p: string]: string }, key: string) => {
      // 避免null的情况，如果null默认用‘’
      return { ...total, [key]: searchParams.get(key) || "" };
    }, {} as { [key in K]: string }), 
      [searchParams])
    (param: Partial<{[key in K]: unknown }>) => {
      // 类型断言
      const o = cleanObj({...Object.fromEntries(searchParams), ...param} as URLSearchParamsInit)
      return setSearchParam(o)
    },
  ] as const; //as const是为了解决ts中会默认把数组化作为同一类型的数组，比如这里会化成{}[]
};
