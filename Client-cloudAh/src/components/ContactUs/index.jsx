import React from "react";
import { Form, Input, Button } from "antd";
import FormItem from "antd/es/form/FormItem";
import { axiosClient } from "../../Libraries/axiosClient";
const index = () => {
  const [createForm] = Form.useForm();
  const [messenger, setMessenger] = React.useState("");
  const validatePhoneNumber = (value) => {
    const phoneRegex =
      /(84|\+84|0)(1\d{9}|3\d{8}|5\d{8}|7\d{8}|8\d{8}|9\d{8})\b/;
    // Kiểm tra xem số điện thoại có khớp với biểu thức chính quy hay khô<ng></ng>
    if (phoneRegex.test(value)) {
      return true; // Hợp lệ
    } else {
      return "Số điện thoại không hợp lệ!"; // Không hợp lệ
    }
  };
  const onFinish = (values) => {
    axiosClient
      .post("/guestservices", values)
      .then((response) => {
        setMessenger(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log("Mess", messenger);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="container mt-[150px] mb-4">
      <h1 className="text-left text-primary text-[35px] font-bold ">Liên hệ</h1>
      <hr style={{ background: "#008848", height: "2px" }} />
      <h1 className="mt-4 text-center text-primary text-[20px] font-semibold">
        Bạn có câu hỏi hay góp ý về vấn đề gì với chúng tôi không? 😁
      </h1>
      <Form
        form={createForm}
        name="createForm"
        initialValues={{ isRequest: false }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="w-[70%] mx-auto mt-5">
          <Form.Item
            name="fullName"
            label="Tên"
            rules={[
              {
                required: true,
                message: "Hãy cho chúng tôi biết tên hoặc biệt danh của bạn!",
              },
            ]}
            hasFeedback
            className="pb-3"
          >
            <Input placeholder="Tên của bạn là gì?" />
          </Form.Item>

          {/* Input Email */}
          <FormItem
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email không được để trống!" },
              { type: "email", message: "Thư điện tử không đúng" },
            ]}
            hasFeedback
            className="pb-3"
          >
            <Input placeholder="Email" type="email" />
          </FormItem>

          {/* Input PhoneNumber */}
          <Form.Item
            hasFeedback
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              {
                required: true,
                validator: (_, value) => {
                  if (!value) {
                    return Promise.reject("Bạn chưa nhập số điện thoại !");
                  } else {
                    const result = validatePhoneNumber(value);
                    if (result === true) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(result);
                    }
                  }
                },
              },
            ]}
            className="pb-3"
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>

          {/* Input Message */}
          <Form.Item
            name="message"
            label="Lời nhắn"
            hasFeedback
            rules={[
              { required: true, message: "Bạn chưa gửi tin nhắn phản hồi" },
              { min: 10, message: "Lời nhắn phải có ít nhất 10 ký tự" },
              { max: 200, message: "Lời nhắn không quá 200 ký tự" },
            ]}
            className="pb-3"
          >
            <Input placeholder="Lời nhắn hoặc câu hỏi của bạn" />
          </Form.Item>

          <Form.Item name="isRequest" />
          <Form.Item>
            <button
              type="submit"
              className="py-3 px-5 border bg-primary rounded-md text-white font-medium text-[15px] hover:opacity-[0.8]"
            >
              Gửi phản hồi
            </button>
          </Form.Item>
        </div>
      </Form>
      <div className="text-center mt-4">
        <div>
          <span>Bạn có thể liên hệ với tôi qua số điện thoại: </span>
          <span className="text-primary text-[20px]">0398232567</span>
        </div>
        <div>
          <span>Hoặc qua gmail: </span>
          <span className="text-primary text-[20px]">
            sieuthimini@gmail.com
          </span>
        </div>
      </div>
    </div>
  );
};

export default index;
