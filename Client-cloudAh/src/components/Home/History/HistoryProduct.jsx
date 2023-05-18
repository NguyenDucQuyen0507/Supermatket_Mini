import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosClient } from "../../../Libraries/axiosClient";
import { AiOutlineMenu } from "react-icons/ai";
import { API_URL } from "../../../Constants/URL";
import numeral from "numeral";
import moment from "moment";
const HistoryProduct = () => {
  const [historyOrder] = Form.useForm();
  const [phoneOrder, setPhoneOrder] = useState([]);
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
  const renderStatus = (values) => {
    return (
      <div>
        {values && values === "WAITING CONFIRMATION ORDER"
          ? "Đang chờ xác nhận"
          : values === "CONFIRMED ORDER"
          ? "Xác nhận đơn hàng"
          : values === "SHIPPING CONFIRMATION"
          ? "Xác nhận vận chuyển"
          : values === "DELIVERY IN PROGRESS"
          ? "Đơn hàng đang vận chuyển"
          : values === "DELIVERY SUCCESS"
          ? "Giao hàng thành công"
          : values === "RECEIVED ORDER"
          ? "Nhận đơn hàng"
          : "Hủy đơn hàng"}
      </div>
    );
  };
  const onFinish = (values) => {
    axiosClient
      .post("/orders/lich-su-don-hang", values)
      .then((response) => {
        setPhoneOrder(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log("oih", phoneOrder);

  return (
    <div className="container mt-[150px] mb-4">
      <h1 className="text-left text-primary text-[35px] font-bold ">
        Lịch sử đơn hàng
      </h1>
      <hr style={{ background: "#008848", height: "2px" }} />
      <div>
        <Form
          form={historyOrder}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={() => {}}
          autoComplete="on"
        >
          <div className="mt-[40px] w-[80%] m-auto">
            {/* <div className=""> */}
            <Form.Item
              label="Nhập số điện thoại của bạn:"
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
              hasFeedback
            >
              <Input className="w-[300px]" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <button
                type="submit"
                className="py-2 px-4 border bg-primary rounded-md text-white font-medium text-[15px] hover:opacity-[0.8]"
              >
                Tìm kiếm
              </button>
            </Form.Item>
          </div>
          {/* </div> */}
        </Form>
      </div>
      <div>
        {phoneOrder.length !== 0 ? (
          <div className="text-[20px] flex items-center">
            Số điện thoại đã đặt hàng:
            <h2 className="text-primary ml-2 font-bold">
              {phoneOrder[0].phoneNumber}
            </h2>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="flex mt-5">
        <div className="w-[30%] flex-none items-center text-[20px] text-primary">
          <div className="flex items-center">
            <p className="mr-3">
              <AiOutlineMenu />
            </p>
            <p>Danh sách đơn hàng đã mua</p>
          </div>
        </div>
        <div className="flex-1  border border-primary p-3">
          {(() => {
            if (phoneOrder.length !== 0 && phoneOrder) {
              return (
                <>
                  <table className="w-[100%]">
                    <thead className="text-left p-3">
                      <tr>
                        <th>Mã đơn hàng</th>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Ngày mua hàng</th>
                        <th>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {phoneOrder &&
                        phoneOrder.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td className="cursor-pointer hover:text-primary">
                                <Link
                                  to={"/history/productsDetails/" + value._id}
                                >
                                  {value._id}
                                </Link>
                              </td>
                              <td className="flex items-center">
                                <img
                                  className="w-[70px]"
                                  src={`${API_URL}${value.orderDetails[0].product.imageProduct}`}
                                  alt=""
                                />
                                <span>
                                  {value.orderDetails[0].product.name}
                                </span>
                              </td>
                              <td>
                                {numeral(
                                  value.orderDetails.reduce(
                                    (accumulator, currentValue) => {
                                      return (
                                        accumulator +
                                        currentValue.product.total *
                                          currentValue.quantity
                                      );
                                    },
                                    0
                                  )
                                ).format("0,0$")}
                              </td>
                              <td>
                                {moment(value.createdDate).format("DD/MM/yyyy")}
                              </td>
                              <td>{renderStatus(value.status)}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </>
              );
            } else {
              return (
                <div className="text-red-500 text-center ">
                  Bạn chưa nhập số điện thoại để kiểm tra
                </div>
              );
            }
          })()}
        </div>
      </div>

      {/* <div className="mt-5 mb-10">
        {(() => {
          if (phoneOrder.length !== 0) {
            return (
              <div>
                <span>Xin chào ( Anh / Chị )</span>
                <span className="ml-4 text-primary font-bold">
                  {phoneOrder[0]?.fullName}
                </span>
                <span className="text-primary font-bold">
                  {" "}
                  - {phoneOrder[0]?.phoneNumber}
                </span>
              </div>
            );
          } else {
            return "";
          }
        })()}
      </div> */}
    </div>
  );
};

export default HistoryProduct;
