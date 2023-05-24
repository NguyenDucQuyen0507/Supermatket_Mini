import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDown } from "react-icons/ai";
import { axiosClient } from "../../../Libraries/axiosClient";
import "./Navbar.css";
const Navbar = () => {
  const [categories, setCategories] = React.useState([]);
  React.useEffect(() => {
    axiosClient.get("/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);
  return (
    <div className="h-[50px] bg-primary">
      <ul className="navbar container h-[100%] flex justify-between items-center text-white font-medium">
        <Link to={"/"} className="navbar-list ">
          <div className="navbar-link">Trang chủ</div>
        </Link>
        <li className="navbar-list">
          <a className="navbar-link flex items-center" href="">
            Sản phẩm
            <AiOutlineDown size={"20px"} style={{ marginLeft: "5px" }} />
          </a>
          <ul className="navbar-list_categories mt-4 border shadow-lg rounded-xl pl-2">
            <li className="hover:ml-3 transition-all">
              <Link to={"shop/hotdeal"}>Hot deal</Link>
            </li>
            {categories &&
              categories.map((value, index) => {
                return (
                  <li className="hover:ml-3 transition-all" key={index}>
                    <Link to={`shop/${value._id}`}>
                      <p>{value.name}</p>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </li>
        <Link to={"/components/aboutUs"} className="navbar-list ">
          <div className="navbar-link">Về chúng tôi</div>
        </Link>
        <Link to={"/components/community"} className="navbar-list ">
          <div className="navbar-link" href="">
            Cộng động
          </div>
        </Link>
        <Link to={"/components/contactUs"} className="navbar-list ">
          <div className="navbar-link" href="">
            Liên hệ
          </div>
        </Link>
        <li className="navbar-list ">
          <Link to={"/history/products"} className="navbar-link" href="">
            Lịch sử đơn hàng
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
