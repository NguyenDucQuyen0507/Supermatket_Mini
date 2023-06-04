import React from "react";
import logo from "../../assets/img/logo/cloud-market.jpg";
import {
  AiOutlineShoppingCart,
  AiOutlineLogout,
  AiOutlineLogin,
} from "react-icons/ai";
import Navbar from "./Navi/Navbar";
import { useCart } from "../../Hook/useCart";
import { Link } from "react-router-dom";
import { useUser } from "../../Hook/useUser";
import Search from "./Navi/Search";
import { API_URL } from "../../Constants/URL";
const index = () => {
  const { users } = useUser((state) => state);
  const { items } = useCart((state) => state);
  const totalQuantity = items.reduce((total, products) => {
    return total + products.quantity;
  }, 0);

  // function component
  // const LogoutBtn = () => {
  //   return (
  //     <>
  //       <div>Quyền</div>
  //     </>
  //   );
  // };
  //jsx
  // thất bại
  const logout = () => {
    console.log("logout");
    try {
      localStorage.removeItem("cookie-google");
      localStorage.clear();
      window.open(API_URL + "/customers/logout", "_self");
      window.location.assign("/");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const loginBtn = (
    <div className="text-primary font-semibold mr-3 cursor-pointer border border-primary rounded-[30px] px-3 hover:bg-primary hover:text-white logout-block h-[50px]">
      <div className="flex items-center h-full w-full">
        <img
          className="w-[30px] object-cover"
          src={
            users.accountType === "google" || users.accountType === "github"
              ? `${users.avatar}`
              : `${API_URL}${users.avatar}`
          }
          alt=""
        />
        <span className="ml-[5px]"> {users.fullName}</span>
      </div>
      <div className="logout-none">
        <ul className="logout-list">
          <li className="hover:bg-green-400">
            <Link className="block" onClick={logout}>
              Đăng xuất
            </Link>
          </li>
          <li className="hover:bg-green-400">
            <Link to={"/accounts/user"}>Thông tin tài khoản</Link>
          </li>
        </ul>
      </div>
    </div>
  );
  const logoutBtn = (
    <div className="flex">
      <Link to={"/account/register"}>
        <div className="flex items-centercursor-pointer ">
          <div className="font-bold text-primary">Đăng kí</div>
        </div>
      </Link>
      <span className="w-[2px] h-[25px] bg-gray-300 mx-2"></span>
      <Link to={"/account/login"}>
        <div className="flex items-center cursor-pointer mr-2">
          <div className="font-bold text-primary">Đăng nhập</div>
        </div>
      </Link>
    </div>
  );

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[10]">
        <div className="bg-white">
          <div className="container flex justify-between items-center h-[80px] ">
            <div className="flex items-center">
              <img src={logo} alt="" width={"60px"} height={"60px"} />
              <h3 className="uppercase font-bold text-primary">
                Siêu thị Mini
              </h3>
              {/* <Search /> */}
              {/* <div className="ml-6">
                <input
                  placeholder="Tìm kiếm ..."
                  className="pl-2 py-4 w-[450px] h-[30px] border border-primary rounded-[10px] outline-none "
                  type="text"
                />
              </div> */}
              <Search />
            </div>
            <div className="flex items-center">
              {window.localStorage.getItem("token") ||
              window.localStorage.getItem("cookie-google")
                ? loginBtn
                : logoutBtn}
              {/* <Link to={"/account/register"}>
                <div className="flex items-centercursor-pointer ">
                  <div className="font-bold text-primary">Đăng kí</div>
                </div>
              </Link>
              <span className="w-[2px] h-[25px] bg-gray-300 mx-2"></span>
              <Link to={"/account/login"}>
                <div className="flex items-center cursor-pointer mr-2">
                  <div className="font-bold text-primary">Đăng nhập</div>
                </div>
              </Link> */}
              <Link to={"/shop/shoppingCart"}>
                <div className="relative cursor-pointer flex items-center justify-center w-[50px] h-[50px] rounded-[50%] border border-primary hover:bg-primary hover:text-white text-primary">
                  <AiOutlineShoppingCart
                    size={"20px"}
                    style={{ fontWeight: "300" }}
                  />
                  <div className="absolute top-0 right-[-10px] ">
                    <span className="flex items-center justify-center w-[25px] h-[25px] border bg-primary rounded-[50%] text-white font-normal">
                      {totalQuantity}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <Navbar />
      </div>
      {/* <Slider /> */}
    </>
  );
};

export default index;
