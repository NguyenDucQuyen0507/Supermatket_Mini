import React, { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineShopping,
  AiOutlineDatabase,
  AiOutlineUser,
  AiOutlineUserSwitch,
} from "react-icons/ai";
import {
  MdOutlineSupportAgent,
  MdOutlinePeopleAlt,
  MdOutlineArticle,
  MdOutlineManageAccounts,
  MdOutlineCategory,
} from "react-icons/md";
import { FaWarehouse } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { RiLuggageDepositLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";

import { useUser } from "../hooks/useUser";

export default function SiderMenu() {
  const { users } = useUser((state) => state);
  const navigate = useNavigate();
  const itemsSider = [
    { label: "Trang Chủ", key: "home", icon: <AiOutlineHome /> }, // remember to pass the key prop
    {
      label: "Quản Trị",
      key: "management",
      icon: <MdOutlineManageAccounts />,
      children: [
        {
          label: "Tài khoản",
          key: "management-accounts",
          icon: <AiOutlineUser />,
        },
        {
          label: "Danh mục",
          key: "management-categories",
          icon: <MdOutlineCategory />,
        },
        {
          label: "Sản phẩm",
          key: "management-products",
          icon: <AiOutlineShopping />,
        },
        {
          label: "Khách hàng",
          key: "management-customers",
          icon: <MdOutlinePeopleAlt />,
        },
        /* Làm ẩn đi MenuItem Nhân viên
        // {
        //   label:
        //     users.roles &&
        //     users.roles.some((role) => {
        //       return (
        //         role === "directors" ||
        //         role === "administrator" ||
        //         role === "managers"
        //       );
        //     })
        //       ? "Nhân viên"
        //       : null,
        //   key:
        //     users.roles &&
        //     users.roles.some((role) => {
        //       return (
        //         role === "directors" ||
        //         role === "administrator" ||
        //         role === "managers"
        //       );
        //     })
        //       ? "management-employees"
        //       : null,
        //   icon:
        //     users.roles &&
        //     users.roles.some((role) => {
        //       return (
        //         role === "directors" ||
        //         role === "administrator" ||
        //         role === "managers"
        //       );
        //     }) ? (
        //       <MdOutlineSupportAgent />
        //     ) : null,
        // },*/
        {
          label: "Nhân viên",
          key: "management-employees",
          icon: <MdOutlineSupportAgent />,
          disabled:
            users.roles &&
            users.roles.some((role) => {
              return (
                role === "directors" ||
                role === "administrator" ||
                role === "managers"
              );
            })
              ? false
              : true,
        },
        { label: "Đơn hàng", key: "sales-orders", icon: <MdOutlineArticle /> },
        {
          label: "Nhà cung cấp",
          key: "management-suppliers",
          icon: <RiLuggageDepositLine />,
        },
        {
          label: "Chăm sóc KH",
          key: "management-guestServices",
          icon: <AiOutlineUserSwitch />,
        },
      ],
    },
    {
      label: "Quản Lý Bán Hàng",
      key: "sales",
      icon: <AiOutlineDatabase />,
      children: [
        {
          label: "Thống kê",
          key: "orders",
          icon: <MdOutlineArticle />,
          children: [
            {
              label: "Theo trạng thái đơn hàng",
              key: "orders-status",
            },
            {
              label: "Theo hình thức thanh toán",
              key: "orders-payment",
            },
            {
              label: "Theo số điện thoại",
              key: "orders-number",
            },
            {
              label: "Theo ngày cần tìm",
              key: "orders-day",
            },
          ],
        },
      ],
    },
    {
      label: "Quản lý vận chuyển",
      key: "shipping",
      icon: <FaShippingFast />,
      children: [
        { label: "Chưa vận chuyển", key: "orders-notshipped" },
        {
          label: "Đang vận chuyển",
          key: "orders-shipping",
        },
        {
          label: "Đã vận chuyển",
          key: "orders-shipped",
        },
      ],
    },
    {
      label: "Quản lý khoa",
      key: "warehouse",
      icon: <FaWarehouse />,
      children: [
        {
          label: "Đơn hàng đang đợi vận chuyển",
          key: "warehouse-shipping",
        },
      ],
    },
    { label: "Cài Đặt", key: "settings", icon: <AiOutlineSetting /> }, // which is required
  ];
  const itemsSiderShipper = [
    {
      label: "Quản lý vận chuyển",
      key: "shipping",
      icon: <FaShippingFast />,
      children: [
        { label: "Chưa vận chuyển", key: "orders-notshipped" },
        {
          label: "Đang vận chuyển",
          key: "orders-shipping",
        },
        {
          label: "Đã vận chuyển",
          key: "orders-shipped",
        },
      ],
    },
  ];
  const itemsSiderWarehouse = [
    {
      label: "Quản lý khoa",
      key: "warehouse",
      icon: <FaWarehouse />,
      children: [
        {
          label: "Đơn hàng vận chuyển",
          key: "warehouse-shipping",
        },
      ],
    },
  ];
  // Sử dụng với Redux
  // const [collapsed, setCollapsed] = useState(false);
  // const toggleCollapsed = () => {
  //   setCollapsed(!collapsed);
  // };
  return (
    <div>
      <Menu
        theme="light"
        mode="inline"
        style={{
          height: "100%",
          borderRight: 0,
        }}
        // inlineCollapsed={collapsed}
        items={
          users.roles.some((role) => {
            return (
              role === "directors" ||
              role === "administrator" ||
              role === "managers"
            );
          })
            ? itemsSider
            : users.roles.some((role) => {
                return role === "shipper";
              })
            ? itemsSiderShipper
            : itemsSiderWarehouse
        }
        onClick={({ key, keyPath, domEvent }) => {
          navigate("/" + key.split("-").join("/"));
          console.log(key);
        }}
      />
      {/* <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
      </Button> */}
    </div>
  );
}
