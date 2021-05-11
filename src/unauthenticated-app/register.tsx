import React from "react";
import { useAuth } from "context/auth-context";
import { Form, Input, Button } from "antd";
import { LongButton } from "unauthenticated-app/index";
import { useAsync } from "utils/useAsync";
const apiUrl = process.env.REACT_APP_API_URL;
export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register, user } = useAuth();
  // 注入loading
  const { run, isLoading } = useAsync();
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    name: password;
    cpassword: string;
  }) => {
    if (cpassword !== password) {
      onError(new Error("请确认两次输入的密码相同"));
    }
    try {
      await run(register(values, { throwError: true }));
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
      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input placeholder="请确认密码" type="password" id={"cpassword"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type="primary">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
