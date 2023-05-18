import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosClient } from "../../../Libraries/axiosClient";
import Products from "./Products";
import SideBar from "./SideBar";
const NavProductId = () => {
  const { categoryId } = useParams();
  //Phải dựa theo đường dẫn Url mà mình đã tạo khi lưu trữ id /shop/:categoryId
  const [category, setCategory] = React.useState([]);
  React.useEffect(() => {
    if (categoryId) {
      axiosClient.get(`/categories/${categoryId}`).then((response) => {
        setCategory(response.data);
      });
    }
  }, [categoryId]);
  console.log(categoryId);
  return (
    <div className="shop-products">
      <div className="container ">
        <div className="text-green-700 pt-5">
          <span className="mr-2">
            <Link to={"/"}>Trang chủ</Link>
          </span>
          <span className="mr-2">/</span>
          <Link to={`/shop/${categoryId ? categoryId : "hotdeal"}`}>
            <span className="mr-2 text-red-600 font-semibold">
              {categoryId ? category.name : "Hot deal"}
            </span>
          </Link>
          <span className="mr-2">/</span>
          <span>Trang 1/1 </span>
        </div>
        <div className="mt-[30px] text-[35px] font-bold text-primary">
          <h1>{categoryId ? category.name : "Sản phẩm của chúng tôi"}</h1>
        </div>
        <hr style={{ background: "#008848", height: "2px" }} />
        <div className="flex mt-5">
          <SideBar />
          <Products />
        </div>
      </div>
    </div>
  );
};

export default NavProductId;
