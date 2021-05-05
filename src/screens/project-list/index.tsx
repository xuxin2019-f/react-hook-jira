import React, { useState, useEffect } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { cleanObj, useMount, useDebounce } from "utils/index";
import * as qs from "qs";
import { useHttp } from "utils/http";
const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListSreen = () => {
  // 第一行input框的姓名和筛选框的用户
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  // 筛选框所有用户组成的数组
  const [users, setUsers] = useState([]);
  // 当前要显示的列表
  const [list, setList] = useState([]);
  const debounceParam = useDebounce(param, 2000);
  const client = useHttp();
  // 请求数据的副作用，每当param改变时请求
  useEffect(() => {
    // 这里有个情况是当name为0时，后端可能没做处理，导致找不到personId为某值时，name为空的任何项
    // 因此要写个函数做特别处理，创建utils/index.js
    client("projects", {
      data: cleanObj(debounceParam),
    }).then(setList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam]);
  // 请求user数据
  useMount(() => {
    client("user").then(setUsers);
    // fetch(`${apiUrl}/user`).then(async (response) => {
    //   if (response.ok) {
    //     setUsers(await response.json());
    //   }
    // });
  });
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
