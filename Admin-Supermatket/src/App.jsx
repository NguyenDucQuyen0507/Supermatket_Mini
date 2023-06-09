import "./App.css";
import { useState } from "react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AiOutlineWarning } from "react-icons/ai";

import cmah_logo from "/cloud-market.jpg";

import HeaderMenu from "./components/HeaderMenu";
import SiderMenu from "./components/SiderMenu";

import HomePage from "./pages/Home/HomePage";
import Categories from "./pages/Management/Categories";
import Products from "./pages/Management/Products";

import { Layout, message, Menu } from "antd";
import Employees from "./pages/Management/Employees";
import Customers from "./pages/Management/Customers";
import Suppliers from "./pages/Management/Suppliers";
import Orders from "./pages/Sales/Orders";
import Login from "./pages/Login";
import Accounts from "./pages/Management/Accounts";
import GuestService from "./pages/Management/GuestServices";

import OrdersNotShipping from "./pages/Shipping/OrdersNotShipped/index";
import OrderShipping from "./pages/Shipping/OrdersShipping/index";
import OrderShipped from "./pages/Shipping/OrdersShipped/index";
import Warehouse from "./pages/Warehouse/index";
import OrderStatus from "./pages/Sales/OrdersStatus/index";
import OrderNumber from "./pages/Sales/OrdersNumber/index";
import OrderPayment from "./pages/Sales/OrdersPayment/index";
import OrderDay from "./pages/Sales/OrdersDay/index";
import { useUser } from "./hooks/useUser";
import "numeral/locales/vi";
import numeral from "numeral";
numeral.locale("vi");
const { Header, Content, Sider } = Layout;
function App() {
  const { users } = useUser((state) => state);
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Header className="header">
            {window.localStorage.getItem("token") ? (
              <HeaderMenu />
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img className="w-[7%]" src={cmah_logo} alt="logo-CMAH" />
                  <h3 className="text-blue-200 m-0">CLOUD MARKET AT HOME</h3>
                </div>
                <div className="flex justify-end items-center gap-3 w-[50%] text-white">
                  <AiOutlineWarning size={24} />
                  <h4 className="m-0">
                    Bạn cần đăng nhập để có thể sử dụng phần mềm quản lý
                  </h4>
                </div>
              </div>
            )}
          </Header>
          <Layout>
            <Sider
              theme="light"
              width={"20%"}
              style={{ minHeight: "100vh" }}
              className="site-layout-background"
            >
              {window.localStorage.getItem("token") ? (
                <SiderMenu />
              ) : (
                <div></div>
              )}
            </Sider>
            {/* <Layout
              style={{
                padding: "0 20px",
              }}
            > */}
            <Content
              className="site-layout-background"
              style={{
                padding: "10px 20px",
                minHeight: 280,
              }}
            >
              <Routes>
                {/* HOME */}
                {window.localStorage.getItem("token") ? (
                  <Route path="/" element={<HomePage />} />
                ) : (
                  <Route path="/" element={<Login />} />
                )}

                {/* HOME */}
                <Route path="/home" element={<HomePage />} />
                {/* LOGIN */}
                <Route path="/account" element={<Login />} />
                {/* MANAGEMENT */}
                <Route path="/management/accounts" element={<Accounts />} />
                {users.roles === undefined ? (
                  <Route path="/" element={<Login />} />
                ) : users.roles.some((role) => {
                    return (
                      role === "directors" ||
                      role === "administrator" ||
                      role === "managers" ||
                      role === "sales"
                    );
                  }) ? (
                  <Route path="/management/employees" element={<Employees />} />
                ) : (
                  <Route path="*" element={<div>Not found</div>} />
                )}
                {users.roles === undefined ? (
                  <Route path="/" element={<Login />} />
                ) : users.roles.some((role) => {
                    return (
                      role === "directors" ||
                      role === "administrator" ||
                      role === "managers" ||
                      role === "sales"
                    );
                  }) ? (
                  <Route
                    path="/management/categories"
                    element={<Categories />}
                  />
                ) : (
                  <Route path="*" element={<div>Not found</div>} />
                )}
                {users.roles === undefined ? (
                  <Route path="/" element={<Login />} />
                ) : users.roles.some((role) => {
                    return (
                      role === "directors" ||
                      role === "administrator" ||
                      role === "managers" ||
                      role === "sales"
                    );
                  }) ? (
                  <Route path="/management/customers" element={<Customers />} />
                ) : (
                  <Route path="*" element={<div>Not found</div>} />
                )}
                {users.roles === undefined ? (
                  <Route path="/" element={<Login />} />
                ) : users.roles.some((role) => {
                    return (
                      role === "directors" ||
                      role === "administrator" ||
                      role === "managers" ||
                      role === "sales"
                    );
                  }) ? (
                  <Route path="/management/suppliers" element={<Suppliers />} />
                ) : (
                  <Route path="*" element={<div>Not found</div>} />
                )}
                {users.roles === undefined ? (
                  <Route path="/" element={<Login />} />
                ) : users.roles.some((role) => {
                    return (
                      role === "directors" ||
                      role === "administrator" ||
                      role === "managers" ||
                      role === "sales"
                    );
                  }) ? (
                  <Route path="/management/products" element={<Products />} />
                ) : (
                  <Route path="*" element={<div>Not found</div>} />
                )}
                {users.roles === undefined ? (
                  <Route path="/" element={<Login />} />
                ) : users.roles.some((role) => {
                    return (
                      role === "directors" ||
                      role === "administrator" ||
                      role === "managers" ||
                      role === "sales"
                    );
                  }) ? (
                  <Route path="/sales/orders" element={<Orders />} />
                ) : (
                  <Route path="*" element={<div>Not found</div>} />
                )}
                {users.roles === undefined ? (
                  <Route path="/" element={<Login />} />
                ) : users.roles.some((role) => {
                    return (
                      role === "directors" ||
                      role === "administrator" ||
                      role === "managers" ||
                      role === "sales"
                    );
                  }) ? (
                  <Route path="orders/status" element={<OrderStatus />} />
                ) : (
                  <Route path="*" element={<div>Not found</div>} />
                )}
                {users.roles === undefined ? (
                  <Route path="/" element={<Login />} />
                ) : users.roles.some((role) => {
                    return (
                      role === "directors" ||
                      role === "administrator" ||
                      role === "managers" ||
                      role === "sales"
                    );
                  }) ? (
                  <Route path="orders/number" element={<OrderNumber />} />
                ) : (
                  <Route path="*" element={<div>Not found</div>} />
                )}
                {users.roles === undefined ? (
                  <Route path="/" element={<Login />} />
                ) : users.roles.some((role) => {
                    return (
                      role === "directors" ||
                      role === "administrator" ||
                      role === "managers" ||
                      role === "sales"
                    );
                  }) ? (
                  <Route path="orders/payment" element={<OrderPayment />} />
                ) : (
                  <Route path="*" element={<div>Not found</div>} />
                )}
                {users.roles === undefined ? (
                  <Route path="/" element={<Login />} />
                ) : users.roles.some((role) => {
                    return (
                      role === "directors" ||
                      role === "administrator" ||
                      role === "managers" ||
                      role === "sales"
                    );
                  }) ? (
                  <Route path="orders/day" element={<OrderDay />} />
                ) : (
                  <Route path="*" element={<div>Not found</div>} />
                )}
                <Route
                  path="/management/guestServices"
                  element={<GuestService />}
                />
                {users.roles === undefined ? (
                  <Route path="/" element={<Login />} />
                ) : users.roles.some((role) => {
                    return (
                      role === "directors" ||
                      role === "administrator" ||
                      role === "managers" ||
                      role === "shipper"
                    );
                  }) ? (
                  <Route
                    path="orders/notshipped"
                    element={<OrdersNotShipping />}
                  />
                ) : (
                  <Route path="*" element={<div>Not found</div>} />
                )}
                {users.roles === undefined ? (
                  <Route path="/" element={<Login />} />
                ) : users.roles.some((role) => {
                    return (
                      role === "directors" ||
                      role === "administrator" ||
                      role === "managers" ||
                      role === "shipper"
                    );
                  }) ? (
                  <Route path="orders/shipping" element={<OrderShipping />} />
                ) : (
                  <Route path="*" element={<div>Not found</div>} />
                )}
                {users.roles === undefined ? (
                  <Route path="/" element={<Login />} />
                ) : users.roles.some((role) => {
                    return (
                      role === "directors" ||
                      role === "administrator" ||
                      role === "managers" ||
                      role === "shipper"
                    );
                  }) ? (
                  <Route path="orders/shipped" element={<OrderShipped />} />
                ) : (
                  <Route path="*" element={<div>Not found</div>} />
                )}
                {users.roles === undefined ? (
                  <Route path="/" element={<Login />} />
                ) : users.roles.some((role) => {
                    return (
                      role === "directors" ||
                      role === "administrator" ||
                      role === "managers" ||
                      role === "warehouse"
                    );
                  }) ? (
                  <Route path="warehouse/shipping" element={<Warehouse />} />
                ) : (
                  <Route path="*" element={<div>Not found</div>} />
                )}
                {/* SALES */}

                {/* NO MATCH ROUTE */}
                <Route
                  path="*"
                  element={
                    <main style={{ padding: "1rem" }}>
                      <p>404 Page not found 😂😂😂</p>
                    </main>
                  }
                />
              </Routes>
            </Content>
          </Layout>
          {/* </Layout> */}
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
