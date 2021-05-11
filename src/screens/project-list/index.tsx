import React, { useState, useEffect } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { cleanObj, useMount, useDebounce } from "utils/index";
import * as qs from "qs";
import { useHttp } from "utils/http";
import { Typography } from "antd";
import { useAsync } from "utils/useAsync";
import { Project } from "./list";
export const ProjectListSreen = () => {
  // 第一行input框的姓名和筛选框的用户
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 2000);
  const { isLoading, error, data: list } = useProject(debounceParam);
  const { data: users } = useUsers();
  return (
    <div>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} list={list || []} />
    </div>
  );
};
