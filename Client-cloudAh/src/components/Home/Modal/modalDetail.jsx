import React from "react";
import numeral from "numeral";
const ModalDetail = ({ body }) => {
  console.log("body", body);
  return (
    <>
      <div className="flex flex-col gap-2 text-[20px]">
        <h1>Tên: {body.name}</h1>
        <p className={`${body.discount ? "line-through" : "text-red-500"}`}>
          Giá: {numeral(body.price).format("0,0$")}
        </p>
        <p className={`${body.discount ? "" : "hidden"}`}>
          Giảm: {body.discount}%
        </p>
        <p className={`${body.discount ? "text-red-500" : "hidden"}`}>
          Giá còn: {numeral(body.total).format("0,0$")}
        </p>
        <p>Tình trạng: {body.stock > 0 ? `${body.stock}` : "hết "} sản phẩm</p>
        <p>Mô tả sản phẩm: {body.description}</p>
      </div>
    </>
  );
};

export default ModalDetail;
