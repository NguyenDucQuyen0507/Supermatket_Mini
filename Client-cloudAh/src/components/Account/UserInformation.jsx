import React from "react";
import axios from "axios";
import { Form, Input, Button, Upload, ConfigProvider, message } from "antd";
import { useUser } from "../../Hook/useUser";
import { API_URL } from "../../Constants/URL";
import { axiosClient } from "../../Libraries/axiosClient";
const UserInformation = () => {
  const [profile] = Form.useForm();
  const [file, setFile] = React.useState(null);
  const { users } = useUser((state) => state);
  // const onFinish = (values) => {
  //   axiosClient
  //     .patch("/customers/" + users._id, values)
  //     .then((response) => {
  //       const { _id } = response.data;
  //       const formData = new FormData();
  //       formData.append("file", file);
  //       axios
  //         .post(API_URL + "/upload-image/customers/" + _id, formData)
  //         .then((respose) => {
  //           message.success("Cập nhật thành công!");
  //         })
  //         .catch((err) => {
  //           message.error("Upload file bị lỗi!");
  //         });
  //     })
  //     .catch(() => {
  //       message.error("Cập nhật thất bại!");
  //     });
  //   console.log("❤️", values);
  // };
  const [updateForm] = Form.useForm();
  const onFinish = (values) => {
    axiosClient
      .patch("/customers/" + users._id, values)
      .then((response) => {
        if (values.file !== undefined) {
          //UPLOAD FILE
          const { _id } = response.data;
          const formData = new FormData();
          formData.append("file", file);
          axios
            .post(`${API_URL}/upload-image/customers/${_id}`, formData)
            .then((response) => {
              message.success("Cập nhật thành công!");
            })
            .catch((err) => {
              message.error("Tải lên hình ảnh thất bại!");
            });
        } else {
          message.success("Cập nhật thành công!");
        }
        updateForm.resetFields();
      })
      .catch((err) => {
        message.error("Cập nhật thất bại!");
        console.log(err);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="container mt-[150px] mb-4">
      <h1 className="text-left text-primary text-[35px] font-bold ">
        Thông tin tài khoản
      </h1>
      <hr style={{ background: "#008848", height: "2px" }} />

      <Form
        form={profile}
        name="update-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={users}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="w-[60%] flex m-auto mt-5">
          {/* FirstName */}
          <div className="w-[80%]">
            <span>Họ - Tên Đệm</span>
            <Form.Item
              hasFeedback
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Họ - Tên đệm không được để trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/* LastName */}
            <span>Tên</span>
            <Form.Item
              hasFeedback
              name="lastName"
              rules={[{ required: true, message: "Tên không được để trống!" }]}
            >
              <Input />
            </Form.Item>

            {/* Email */}
            <span>Email</span>
            <Form.Item
              hasFeedback
              name="email"
              rules={[
                { required: true, message: "Email không được để trống!" },
                { type: "email", message: `Email không hợp lệ!` },
              ]}
            >
              <Input />
              {/* <Input disabled={users.accountType !== "email" ? true : false} /> */}
            </Form.Item>

            {/* Password */}
            {/* {users.accountType !== "email" ? (
              <></>
            ) : ( */}
            <div>
              <span>Mật khẩu</span>
              <Form.Item
                hasFeedback
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Mật khẩu không được để trống!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </div>
            {/* )} */}

            {/* Phone */}
            <span>Số điện thoại</span>
            <Form.Item
              hasFeedback
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Số điện thoại không được để trống!",
                },
                { min: 10, message: "Số điện thoại không quá 10 chữ số!" },
                { max: 10, message: "Số điện thoại không quá 10 chữ số!" },
                {
                  //   validator: phoneValidator,
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/* Address */}
            <span>Địa chỉ</span>
            <Form.Item hasFeedback name="address">
              <Input />
            </Form.Item>

            {/* BirthDay */}
            {/* <span>Ngày Sinh</span>
            <Form.Item
              hasFeedback
              name="birthDay"
              rules={[
                {
                  //   validator: dateOfBirthValidator,
                },
                { type: "date", message: "Ngày sinh không hợp lệ" },
              ]}
            >
              <Input />
            </Form.Item> */}
            <Form.Item>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#005745",
                  },
                }}
              >
                <button
                  type="primary"
                  className="py-2 px-6 bg-primary text-white hover:opacity-[0.7]"
                >
                  Lưu
                </button>
              </ConfigProvider>
            </Form.Item>
          </div>

          <div className="w-[20%] text-center  ">
            <h2 className="mb-3 text-left">Avatar</h2>
            <Form.Item name="file">
              <Upload
                showUploadList={true}
                beforeUpload={(file) => {
                  setFile(file);
                  return false;
                }}
              >
                <div className="flex justify-center items-center w-[150px] h-[100px] border border-dashed rounded-lg hover:cursor-pointer hover:border-blue-400 hover:bg-white transition-all ease-in duration-150">
                  <img
                    className="w-[100px]"
                    src={`${API_URL}${users.avatar}`}
                    alt=""
                  />
                </div>
              </Upload>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default UserInformation;
