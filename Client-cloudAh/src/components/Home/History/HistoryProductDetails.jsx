import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../../Libraries/axiosClient";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { API_URL } from "../../../Constants/URL";
import numeral from "numeral";
const renderStatus = (status) => {
  return (
    <div>
      {status && status === "WAITING CONFIRMATION ORDER"
        ? "Đang chờ xác nhận"
        : status === "CONFIRMED ORDER"
        ? "Xác nhận đơn hàng"
        : status === "SHIPPING CONFIRMATION"
        ? "Xác nhận vận chuyển"
        : status === "DELIVERY IN PROGRESS"
        ? "Đơn hàng đang vận chuyển"
        : status === "DELIVERY SUCCESS"
        ? "Giao hàng thành công"
        : status === "RECEIVED ORDER"
        ? "Nhận đơn hàng"
        : "Hủy đơn hàng"}
    </div>
  );
};
const HistoryProductDetails = () => {
  const { id } = useParams();
  //Lấy dữ liệu của id chi tiết đơn hàng
  const [orderDetails, setOrderDetails] = useState();
  useEffect(() => {
    if (id !== undefined) {
      axiosClient
        .get("/orders/" + id)
        .then((response) => setOrderDetails(response.data));
    } else {
    }
  }, [id]);
  console.log("Detail: ", orderDetails);
  return (
    <div className="container mt-[150px] mb-4">
      <h1 className="text-left text-primary text-[35px] font-bold ">
        Lịch sử đơn hàng
      </h1>
      <hr style={{ background: "#008848", height: "2px" }} />
      <div className="mt-5">
        <div className="flex items-center text-[20px]">
          <h2>Số điện thoại đã mua hàng: </h2>
          <h3 className="ml-3 text-primary"> {orderDetails?.phoneNumber}</h3>
        </div>
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
        <div className="flex-1 border border-primary p-3">
          {(() => {
            if (orderDetails) {
              return (
                <div className="flex">
                  <div className="w-[50%]">
                    <h1 className="font-semibold text-[18px]">
                      Chi tiết đơn hàng: {id}
                    </h1>
                    <div>
                      {orderDetails.orderDetails.map((value, index) => {
                        return (
                          <div key={index} className="flex items-center">
                            <img
                              className="w-[100px]"
                              src={`${API_URL}${value.product.imageProduct}`}
                            />
                            <div>
                              <p>Trọng lượng: {value.product.dram}</p>
                              <p>Số lượng: {value.quantity}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="w-[50%] text-right">
                    <h2 className="font-semibold text-[18px]">
                      Trạng thái: {renderStatus(orderDetails.status)}
                    </h2>
                    <div className="ml-[100px]">
                      {orderDetails.orderDetails.map((value, index) => {
                        return (
                          <div key={index} className="flex items-center mb-6">
                            <div>
                              <p
                                className={`${
                                  value.product.discount > 0
                                    ? "line-through"
                                    : ""
                                }`}
                              >
                                Giá gốc:{" "}
                                {numeral(value.product.price).format("0,0$")}
                              </p>
                              <p className="">
                                Khuyến mãi: {value.product.discount}%
                              </p>
                              <p className="text-red-500">
                                Tổng tiền:{" "}
                                {numeral(
                                  value.product.total * value.quantity
                                ).format("0,0$")}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default HistoryProductDetails;
