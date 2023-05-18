import React from "react";
import { useCart } from "../../../../Hook/useCart";
import { API_URL } from "../../../../Constants/URL";
import { Link, useParams } from "react-router-dom";
import numeral from "numeral";
//dùng để lưu sản phẩm vừa tìm kiếm được
const NameProducts = (props) => {
  const product = props.products;
  console.log("product", product.name);
  const { add } = useCart((state) => state);
  console.log("Quyền", product);
  return (
    <div className="pl-5 flex-1">
      <div className="grid grid-cols-4 gap-4">
        {product.map((values, index) => {
          const sale = (values.price * (100 - values.discount)) / 100;
          return (
            <div key={index} className="h-auto">
              <div className=" border">
                <Link to={`/shop/${values.categoryId}/${values._id}`}>
                  <div className="thumbnail-discount relative">
                    <img
                      className="w-[100%] h-[100%]"
                      src={`${API_URL}${values.imageProduct}`}
                      alt=""
                    />
                    <div className={values.discount ? "discount-products" : ""}>
                      {values.discount ? "Sale" : ""}
                    </div>
                    <div className="thumbnail-overplay">
                      <button className="info">Xem nhanh</button>
                    </div>
                  </div>
                </Link>

                <div className="p-5">
                  <h2 className="text-primary text-center font-bold">
                    {values.name}
                  </h2>
                  <div className="flex justify-center">
                    <h3
                      className={
                        values.discount ? "text-red-600 mr-3" : "hidden"
                      }
                    >
                      {numeral(sale).format("0,0$")}
                    </h3>
                    <h3 className={values.discount ? "line-through" : ""}>
                      {numeral(values.price).format("0,0$")}
                    </h3>
                  </div>
                </div>
                <div className="text-center pb-4">
                  <button
                    disabled={values.stock <= 0}
                    className={`${
                      values.stock <= 0
                        ? " rounded-tl-[24px] rounded-tr-[6px] rounded-br-[24px] rounded-bl-[6px] px-[10px] py-[5px] border border-primary   cursor-default hover:opacity-[1] "
                        : "border-button "
                    } `}
                    onClick={() => {
                      add({ product: values, quantity: 1 });
                    }}
                  >
                    {values.stock <= 0 ? "Hết sản phẩm" : "Thêm vào giỏ hàng"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default NameProducts;
