import React from "react";
import { useAuth } from "context/auth-context";
import { Form, Input, Button } from "antd";
const apiUrl = process.env.REACT_APP_API_URL;
export const RegisterScreen = () => {
  const { register, user } = useAuth();
  const handleSubmit = (values: { username: string; password: string }) => {
    register({ username, password });
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
        <Button htmlType="submit" type="primary">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};
