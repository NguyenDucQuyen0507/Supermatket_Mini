import React from "react";
import { API_URL } from "../../../Constants/URL";
import { useCart } from "../../../Hook/useCart";
import { AiOutlinePlus, AiTwotoneDelete } from "react-icons/ai";
import { GrSubtract } from "react-icons/gr";
import numeral from "numeral";
import { Link } from "react-router-dom";
import { useUser } from "../../../Hook/useUser";
const ShoppingCart = () => {
  const { items, plus, subtract, remove } = useCart((state) => state);

  const totalProducts = items.reduce((total, product) => {
    return total + product.product.total * product.quantity;
  }, 0);

  const totalSale = items.reduce((total, product) => {
    return (
      total +
      ((product.product.price * (100 - product.product.discount)) / 100) *
        product.quantity
    );
  }, 0);

  // const length = Object.keys(users).length;
  // console.log("dai", length);
  return (
    <div className="container mt-[150px] mb-4">
      <h1 className="text-left text-primary text-[35px] font-bold ">
        Shopping Cart
      </h1>
      <hr style={{ background: "#008848", height: "2px" }} />
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          <div className="border-r-2 border-primary ">
            {items &&
              items.map((cart, index) => {
                const sale =
                  (cart.product.price * (100 - cart.product.discount)) / 100;
                return (
                  <div
                    key={index}
                    className="relative flex  border border-primary rounded-2xl w-[800px] my-4 py-4"
                  >
                    <div className="pl-4">
                      <img
                        className="w-[150px] object-contain"
                        src={`${API_URL}${cart.product.imageProduct}`}
                        alt=""
                      />
                      <div
                        className={
                          cart.product.discount ? "discount-products_shop " : ""
                        }
                      >
                        {cart.product.discount ? "Sale" : ""}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-[300px] ">
                      <p className="text-xl break-all">
                        Tên sản phẩm: {cart.product.name}
                      </p>
                      <p
                        className={
                          cart.product.discount
                            ? "line-through"
                            : "text-red-600 font-bold text-xl"
                        }
                      >
                        Giá: {numeral(cart.product.price).format("0,0$")}
                      </p>
                      <p className="text-xl">
                        Giảm giá: {cart.product.discount}%
                      </p>
                      <p
                        className={
                          cart.product.discount
                            ? "text-red-600 font-bold text-xl"
                            : "hidden"
                        }
                      >
                        {/* Giá còn:{cart.product.total?{numeral(cart.product.total).format("0,0$")}:{numeral(sale).format("0,0$")}} */}
                        Giá còn:{" "}
                        {cart.product.total
                          ? numeral(cart.product.total).format("0,0$")
                          : numeral(sale).format("0,0$")}
                      </p>
                      <div className=" flex">
                        <div
                          onClick={() => {
                            plus(cart.product._id);
                          }}
                          className="border border-primary w-10 h-9 flex items-center justify-center cursor-pointer active:bg-gray-300"
                        >
                          <AiOutlinePlus />
                        </div>
                        <div className="border border-primary w-[40px] h-9 text-center flex items-center justify-center">
                          {cart.quantity}
                        </div>
                        <div
                          onClick={() => subtract(cart.product._id)}
                          className="border border-primary w-10 h-9 flex items-center justify-center cursor-pointer active:bg-gray-300"
                        >
                          <GrSubtract />
                        </div>
                        <div
                          onClick={() => remove(cart.product._id)}
                          className="border border-red-500 w-10 h-9 ml-[100px] flex items-center justify-center cursor-pointer active:bg-gray-300"
                        >
                          <AiTwotoneDelete style={{ color: "red" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="col-span-3 ">
          <div className=" w-[80%] m-auto my-4 p-4 border border-primary  rounded-2xl ">
            <p className="text-primary font-bold text-lg">
              {" "}
              Tổng tiền: {numeral(totalSale).format("0,0$")}
              {/* Thành tiền:{" "}
              {items.product.total
                ? numeral(totalProducts).format("0,0$")
                : numeral(totalSale).format("0,0$")} */}
            </p>
            <div className="mt-4">
              <h1 className="text-primary font-bold text-xl">Ghi chú: </h1>
              <textarea
                className=" p-2 border border-primary outline-none"
                rows="4"
                cols="25"
              ></textarea>
            </div>
            <div className="flex justify-center">
              <Link to={"/shop/productpay"}>
                <button
                  disabled={items.length === 0}
                  className={` my-4 mx-auto p-2 text-white text-[18px] border border-primary bg-primary rounded-xl hover:opacity-[0.8] ${
                    items.length === 0 ? "cursor-default hover:opacity-[1]" : ""
                  } `}
                >
                  Thanh toán
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
