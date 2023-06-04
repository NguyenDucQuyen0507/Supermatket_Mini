import { GoogleOutlined } from "@ant-design/icons";
import { Form, Input, message } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { axiosClient } from "../../Libraries/axiosClient";
import { API_URL } from "../../Constants/URL";
const Register = () => {
  const [registerForm] = Form.useForm();
  const onFinish = (values) => {
    axiosClient
      .post("/customers", values)
      .then((response) => {
        window.alert("Tạo tài khoản thành công, mời bạn đăng nhập.");
        registerForm.resetFields();
      })
      .catch((error) => {
        if (error.response.status === 406)
          message.error(error.response.data.msg);
        else
          window.alert(
            "Tạo tài khoản không thành công!\nXin lỗi bạn chúng tôi sẽ cố khắc phục"
          );
      });
  };
  const handleGoogle = () => {
    window.open(API_URL + "/customers/auth/google", "_self");
  };
  return (
    <div className="container mt-[150px] mb-4">
      <h1 className="text-left text-primary text-[35px] font-bold ">Đăng kí</h1>
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
          <div className="relative">
            <hr className="my-6 " />
            <span className="hr-or">Hoặc</span>
          </div>

          <Form
            form={registerForm}
            name="login-form"
            // initialValues={{ remember: true }}
            // autoComplete="on"
            onFinish={onFinish}
            onFinishFailed={() => {}}
          >
            <div className="mb-4 mt-4">
              <div className="">
                <Form.Item
                  // label="Email"
                  name="firstName"
                  rules={[{ required: true, message: "Chưa nhập họ của bạn" }]}
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
                    placeholder="Nhập họ của bạn."
                  />
                </Form.Item>
                <Form.Item
                  // label="Email"
                  name="lastName"
                  rules={[{ required: true, message: "Chưa nhập tên của bạn" }]}
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
                    placeholder="Nhập tên của bạn."
                  />
                </Form.Item>
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
                    placeholder="Nhập email của bạn"
                  />
                </Form.Item>

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
                <Form.Item
                  name="confirm"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa xác nhận lại mật khẩu.",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Mật khẩu không khớp!!!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder="Xác nhận lại mật khẩu"
                    className="outline-none border border-gray-400"
                    style={{
                      width: "100%",
                      padding: "10px 5px",
                      fontSize: "18px",
                    }}
                  />
                </Form.Item>

                <Form.Item>
                  <div className="flex items-center justify-between">
                    <button
                      //   type="primary"
                      type="submit"
                      className="py-3 px-5 border bg-primary rounded-md text-white font-medium text-[15px]"
                    >
                      Đăng kí
                    </button>
                    <Link to={"/account/login"}>
                      <i className="cursor-pointer hover:text-primary">
                        Đăng nhập tài khoản
                      </i>
                    </Link>
                  </div>
                </Form.Item>

                {/* </div> */}
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
