import React from "react";
import { useAuth } from "context/auth-context";
import { Form, Input, Button } from "antd";
import { LongButton } from "unauthenticated-app/index";
import { useAsync } from "utils/useAsync";
const apiUrl = process.env.REACT_APP_API_URL;
export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login, user } = useAuth();
  // 注入loading
  const { run, isLoading } = useAsync();
  const handleSubmit = async ({
    values,
  }: {
    username: string;
    name: password;
  }) => {
    try {
      // 这里用run发现无法再捕获异常，因为run里已经catch掉了
      await run(login(values, { throwError: true }));
    } catch (error) {
      // login是异步任务，直接用trycatch的话会在login还没执行的时候就执行onError，捕获不到
      // 所以要用async await
      onError(error);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "用户名不能为空" }]}
      >
        <Input placeholder="请输入用户名" type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "密码不能为空" }]}
      >
        <Input placeholder="请输入密码" type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type="primary">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
