import React from "react";
import { Button, ConfigProvider, Form, Input } from "antd";
import {
  ArrowRightOutlined,
  GoogleOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { axiosClient } from "../../Libraries/axiosClient";
import { useUser } from "../../Hook/useUser";
import { API_URL } from "../../Constants/URL";
const index = () => {
  const { add } = useUser((state) => state);
  const onFinish = (values) => {
    const { email, password } = values;
    axiosClient
      .post("/customers/login-jwt", { email, password })
      .then((response) => {
        console.log(response.data);
        // window.location.href = "/";
        axiosClient.get(`/customers/${response.data._id}`).then((data) => {
          add(data.data);
          console.log(data);
          window.location.href = "/";
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleGoogle = () => {
    window.open(API_URL + "/customers/auth/google", "_self");
  };
  const handleGithub = () => {
    window.open(API_URL + "/customers/auth/github", "_self");
  };

  const LogForm = Form.useForm();
  return (
    <div className="container mt-[150px] mb-4">
      <h1 className="text-left text-primary text-[35px] font-bold ">
        Đăng nhập
      </h1>
      <hr style={{ background: "#008848", height: "2px" }} />
      <div className="mt-[50px] ">
        <div className=" max-w-[400px] m-auto">
          <button
            onClick={handleGoogle}
            className="bg-orange-300  border w-[100%] h-[50px] flex items-center justify-between hover:opacity-80 cursor-pointer"
          >
            <h2 className="px-3 text-black font-semibold text-[20px]">
              Đăng nhập với Google
            </h2>
            <GoogleOutlined
              style={{
                color: "red",
                fontSize: "30px",
                height: "100%",
                padding: "0 12px",
              }}
            />
          </button>
          <button
            onClick={handleGithub}
            className="bg-black  border w-[100%] h-[50px] flex items-center justify-between hover:opacity-80 cursor-pointer"
          >
            <h2 className="px-3 text-white font-semibold text-[20px]">
              Đăng nhập với Github
            </h2>
            <GithubOutlined
              style={{
                color: "red",
                fontSize: "30px",
                height: "100%",
                padding: "0 12px",
              }}
            />
          </button>
          <div className="relative">
            <hr className="my-6 " />
            <span className="hr-or">Hoặc</span>
          </div>

          <Form
            id={LogForm}
            name="login-form"
            initialValues={{ remember: true }}
            autoComplete="on"
            onFinish={onFinish}
            onFinishFailed={() => {}}
          >
            <div className="mb-4 mt-4">
              <div className="">
                <h2 className="text-xl text-primary ">Email</h2>
                <Form.Item
                  // label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Chưa nhập thư điện tử!" },
                    { type: "email", message: "Thư điện tử không đúng" },
                  ]}
                  hasFeedback
                >
                  <Input
                    className="outline-none border border-gray-400"
                    type="text"
                    style={{
                      width: "100%",
                      padding: "10px 5px",
                      fontSize: "18px",
                    }}
                    placeholder="Nhập email hoặc số điện thoại"
                  />
                </Form.Item>

                <h2 className="text-xl text-primary ">Password</h2>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Chưa nhập mật khẩu!" },
                    {
                      min: 5,
                      max: 50,
                      message: "Độ dài mật khẩu từ 5-50 kí tự",
                    },
                    // { type: "password", message: "Mật khẩu không đúng" },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    className="outline-none border border-gray-400"
                    type="password"
                    style={{
                      width: "100%",
                      padding: "10px 5px",
                      fontSize: "18px",
                    }}
                    placeholder="Nhập mật khẩu"
                  />
                </Form.Item>
                <em style={{ textAlign: "right", display: "block" }}>
                  <a href="#" className="text-primary hover:text-blue-500">
                    Forgot your password?
                  </a>
                </em>
                <div className="flex justify-between items-center">
                  <Form.Item>
                    <ConfigProvider
                      theme={{
                        token: {},
                      }}
                    >
                      <button
                        type="submit"
                        className="py-3 px-5 border bg-primary rounded-md text-white font-medium text-[15px]"
                      >
                        Đăng nhập
                      </button>
                    </ConfigProvider>
                  </Form.Item>

                  <h2 className="flex items-center ">
                    New Customer?
                    <Link to={"/account/register"}>
                      <div className="ml-2 hover:text-primary ">
                        Sign up
                        <ArrowRightOutlined size={""} />
                      </div>
                    </Link>
                  </h2>
                </div>
                {/* </div> */}
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default index;
