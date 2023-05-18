import React from "react";
import { useCart } from "../../../Hook/useCart";
import { API_URL } from "../../../Constants/URL";
import numeral from "numeral";
import { Button, Radio, Form, Input, Space, message } from "antd";
import { useUser } from "../../../Hook/useUser";
import { useState } from "react";
import { axiosClient } from "../../../Libraries/axiosClient";
const ProductsPay = () => {
  const [refresh, setRefresh] = useState(0);
  const [value, setValue] = useState(1);
  const { items, remove } = useCart((state) => state);
  const { users } = useUser((state) => state);
  const totalCheck = items.reduce((total, product) => {
    return total + product.product.total * product.quantity;
  }, 0);

  const [createForm] = Form.useForm();
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

  const onFinish = async (values) => {
    // values.orderDetails = [];
    // items.forEach((item) => {
    //   const ordersPay = {
    //     productId: item.product._id,
    //     quantity: item.quantity,
    //   };
    //   values.orderDetails.push(ordersPay);
    // });
    const orderDetails = [];
    //value.createdDate = new Date();
    items.forEach((item) => {
      const orderDetail = {
        productId: item.product._id,
        quantity: item.quantity,
      };
      orderDetails.push(orderDetail);
      const { productId, quantity } = orderDetail;
      axiosClient
        .patch(`/products/${productId}`, {
          stock: item.product.stock - quantity,
        })
        .then((response) => {
          console.log(
            `Cập nhật số lượng sản phẩm "${item.product.name}" thành công`
          );
        })
        .catch((error) => {
          console.error(
            `Cập nhật số lượng sản phẩm "${item.product.name}" thất bại`
          );
          console.error(error);
        });
    });
    const payLoad = {
      ...values,
      orderDetails,
    };
    await axiosClient
      .post("/orders", payLoad)
      .then((response) => {
        console.log();
        message.success("Thanh toán thành công ❤");
        setRefresh((pre) => pre + 1);
        createForm.resetFields();
        window.localStorage.removeItem("cart-storage");
        window.location.reload();
        window.location.href = "/";
      })
      .catch((err) => {
        message.error("Thanh toán thất bại 😥");
        console.log({ message: err.message });
      });
    console.log("❤", payLoad);
  };
  return (
    <div className="container mt-[150px] mb-4">
      <h1 className="text-left text-primary text-[35px] font-bold ">
        Thanh toán đơn hàng
      </h1>
      <hr style={{ background: "#008848", height: "2px" }} />
      <div className="">
        <div className="border mt-4 border-primary">
          <div className="text-primary text-xl font-bold text-center my-6">
            Thông tin cần nhập:
          </div>
          <Form
            form={createForm}
            name="create-form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={users}
            //Dùng để gán giá trị mặc định bên dưới form
            onFinish={onFinish}
            onFinishFailed={() => {}}
            autoComplete="on"
          >
            <div className=" w-[50%] m-auto ">
              <Form.Item
                name="fullName"
                label="Tên của bạn: "
                rules={[{ required: true, message: "Chưa nhập tên của bạn!" }]}
                hasFeedback
              >
                <Input className="hover:border-primary focus:border-primary" />
              </Form.Item>
              <Form.Item
                label="Số điện thoại: "
                name="phoneNumber"
                rules={[
                  // { required: true, message: "Chưa nhập số điện thoại của bạn!" },
                  {
                    // validator: validatePhoneNumber,
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
                hasFeedback
              >
                <Input className="hover:border-primary focus:border-primary" />
              </Form.Item>
              <Form.Item
                label="Địa chỉ: "
                name="shippingAddress"
                rules={[{ required: true, message: "Chưa địa chỉ của bạn!" }]}
                hasFeedback
              >
                <Input className="hover:border-primary focus:border-primary" />
              </Form.Item>
              <Form.Item
                label="Phương thức thanh toán:"
                name="payments"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa chọn hình thức thanh toán!",
                  },
                ]}
              >
                <Radio.Group
                  // onChange={onChange}
                  value={value}
                  className="text-left pt-2"
                >
                  <Space direction="vertical">
                    <Radio value={1}>Thanh toán khi nhận hàng</Radio>
                    <Radio value={2}>Thanh toán qua thẻ ngân hàng</Radio>
                    <Radio value={3}>Ví MoMo</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
              <Form.Item>
                <button
                  type="submit"
                  className="py-3 px-5 border bg-primary rounded-md text-white font-medium text-[15px] hover:opacity-[0.8]"
                >
                  Thanh toán
                </button>
              </Form.Item>
            </div>
          </Form>
        </div>
        <div className="border mt-4 border-primary p-3">
          <h1 className="text-primary font-bold text-lg my-4">
            Danh sách sản phẩm đã chọn:
          </h1>

          <table style={{ width: "100%" }} className=" text-left">
            <tr className="text-primary mb-3">
              <th>Sản phẩm </th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
              <th></th>
            </tr>
            {items &&
              items.map((order, index) => {
                return (
                  <tr key={index}>
                    <td className="relative w-[250px]">
                      <img
                        className="w-[100px] object-contain ml-4"
                        src={`${API_URL}${order.product.imageProduct}`}
                        alt=""
                      />
                      <div
                        className={
                          order.product.discount
                            ? "discount-products_check "
                            : ""
                        }
                      >
                        {order.product.discount ? "Sale" : ""}
                      </div>
                    </td>
                    <td>{numeral(order.product.total).format("0,0$")}</td>
                    <td>{order.quantity}</td>
                    <td>
                      {numeral(`
                      ${order.product.total * order.quantity}`).format("0,0$")}
                    </td>
                    <td
                      onClick={() => {
                        remove(order.product._id);
                      }}
                      className="cursor-pointer text-red-500"
                    >
                      Remove
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
        <div className="text-right mt-4 text-primary text-2xl font-bold">
          Thành tiền: {numeral(totalCheck).format("0,0$")}
        </div>
      </div>
    </div>
  );
};

export default ProductsPay;
