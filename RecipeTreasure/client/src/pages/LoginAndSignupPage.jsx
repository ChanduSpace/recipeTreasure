import React from "react";
import { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import api from "../api";
import { useNavigate } from "react-router";

const LoginAndSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const formToggleHandle = () => {
    setIsLogin(!isLogin);
    console.log(isLogin);
  };
  const onFinish = async (values) => {
    try {
      if (isLogin) {
        const { data } = await api.post("/user/login", values);
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        await api.post("/user/register", values);
        alert("Signup successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert("Authentication failed", err);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="flex justify-center flex-col items-center h-screen">
        <div className="border-b-1 flex justify-center flex-col items-center pb-5">
          <h3 className="text-4xl mb-2  text-[#EFC81A]">Recipe..</h3>
          <h2 className="text-3xl mb-3 text-[#EFC81A]">
            {isLogin ? "Let’s Get Started !" : "Let’s Get you set up !"}
          </h2>
          <h4 className="text-sm text-gray-400 ">
            {isLogin
              ? " Log into your existing account"
              : "Create a new account to access all features"}
          </h4>
        </div>
        <div className="p-5 pr-50">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="flex-col align-top"
          >
            {!isLogin && (
              <Form.Item
                label="Name"
                name="name"
                type="name"
                rules={[{ required: true, message: "Please input your Name!" }]}
                className="w-xl"
              >
                <Input />
              </Form.Item>
            )}
            <Form.Item
              label="Email"
              name="email"
              type="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
              className="w-xl"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              className="w-xl"
            >
              <Input.Password />
            </Form.Item>

            <Form.Item label={null} className="">
              <Button
                type="primary"
                htmlType="submit"
                className="ml-36 !bg-[#EFC81A] w-20"
              >
                {isLogin ? "Login" : "Sign up"}
              </Button>
            </Form.Item>
          </Form>
        </div>
        <h4>
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span
            className="cursor-pointer text-[#EFC81A]"
            onClick={formToggleHandle}
          >
            {" "}
            {isLogin ? "Sign up" : "Login"}
          </span>
        </h4>
      </div>
    </>
  );
};

export default LoginAndSignupPage;
