import React, { useState, useEffect } from "react";
import { User } from "./search-panel";
import { Table } from "antd";
import dayjs from "dayjs";
export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}
// 跳转到Table这个组件的定义：Table<RecordType extends object = any>(props: TableProps<RecordType>)
// 为了解决无止境的向ListProps添加新属性，直接用TableProps这个包含Table所有props的属性代替
interface ListProps extends TableProps<Project> {
  users: User[];
  // list: Project[]; 这时候就不用了，因为TableProps已经包含了dataSource属性
}
export const List = ({ users, ...props }: ListProps) => { 
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          // 表明从DataSource中找name属性
          dataIndex: "name",
          // localeCompare指的是中文排序
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
          {
            title: '创建时间',
            render(value, project) {
              return <span>
                {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
              </span>
            }
          }
        },
      ]}
      // dataSource={list}
      {...props}
    ></Table>
  );
};
