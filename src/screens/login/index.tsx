import React from "react";
const apiUrl = process.env.REACT_APP_API_URL;
export const LoginScreen = () => {
  const login = (params: { username: string; password: string }) => {
    fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).then(async (response) => {
      if (response.ok) {
      }
    });
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 如果不写as HTMLInputElement，默认是Element类型，Element类型上没有value
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">用户</label>
        <input type="password" id={"password"} />
      </div>
      <button type="submit">登录</button>
    </form>
  );
};
