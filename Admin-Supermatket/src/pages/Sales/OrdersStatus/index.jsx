import { Button, Form, Input, Select, Table, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { axiosClient } from "../../../libraries/axiosClient";
import numeral from "numeral";
import moment from "moment";
const index = () => {
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState([]);
  const renderStatus = (status) => {
    return (
      <div>
        {status && status === "WAITING CONFIRMATION ORDER"
          ? "Đang Chờ Xác Nhận"
          : status === "CONFIRMED ORDER"
          ? "Đã Xác Nhận Đơn Hàng"
          : status === "SHIPPING CONFIRMATION"
          ? "Xác Nhận Vận Chuyển"
          : status === "DELIVERY IN PROGRESS"
          ? "Đang Giao Hàng"
          : status === "DELIVERY SUCCESS"
          ? "Giao Hàng Thành Công"
          : status === "RECEIVED ORDER"
          ? "Đã Nhận Hàng"
          : "Đã Hủy Đơn Hàng"}
      </div>
    );
  };
  const columnOrder = [
    {
      title: "Khách hàng",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => {
        return <p>{text}</p>;
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (text) => {
        return <p>{text}</p>;
      },
    },
    {
      title: "Hình thức thanh toán",
      dataIndex: "paymentType",
      key: "paymentType",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        return renderStatus(text);
      },
    },
    {
      title: "Nhân viên",
      dataIndex: "employee",
      key: "employee",
      render: (text, record) => {
        return <p>{record.employee?.fullName}</p>;
      },
    },
    {
      title: "Ngày tạo hóa đơn",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text, record) => {
        return <p>{moment(text.createDate).format("DD/MM/YYYY")}</p>;
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (text, record) => {
        const { orderDetails } = record;

        let total = 0;
        orderDetails.forEach((od) => {
          let sum = od.quantity * od.product.total;
          total = total + sum;
        });

        return <strong>{numeral(total).format("0,0$")}</strong>;
      },
    },
  ];
  const [searchForm] = Form.useForm();
  const onFinish = (values) => {
    setLoading(true);
    axiosClient
      .post("/orders/trang-thai-don-hang", values)
      .then((response) => {
        setStatus(response.data);
        setLoading(false);
        message.success("Lọc trạng thái thành công");
      })
      .catch((error) => {
        message.error("Lọc trạng thái thất bại!!");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  console.log("status", status);
  return (
    <div>
      <h1 className="text-xl ">Thống kê đơn hàng theo trạng thái 🤷‍♂️</h1>
      <Form
        form={searchForm}
        name="search-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ status: "" }} //nó sẽ lấy value rỗng bên OrderStatusExport
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <div className="w-[80%] mt-[50px]">
          <Form.Item label="Trạng thái đơn hàng" name="status">
            <Select
              options={[
                {
                  value: "",
                  label: "Chọn trạng thái đơn hàng ...",
                },
                {
                  value: "WAITING CONFIRMATION ORDER",
                  label: "Đang chờ xác nhận đơn hàng",
                },
                {
                  value: "CONFIRMED ORDER",
                  label: "Đã Xác Nhận Đơn Hàng",
                },
                {
                  value: "SHIPPING CONFIRMATION",
                  label: "Xác Nhận Vận Chuyển",
                },
                {
                  value: "DELIVERY IN PROGRESS",
                  label: "Đang Giao Hàng",
                },
                {
                  value: "DELIVERY SUCCESS",
                  label: "Giao Hàng Thành Công",
                },
                {
                  value: "RECEIVED ORDER",
                  label: "Đã Nhận Hàng",
                },
                {
                  value: "CANCELED ORDER",
                  label: "Đã Hủy Đơn Hàng",
                },
              ]}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              {loading ? "Đang xử lý ..." : "Lọc thông tin"}
            </Button>
          </Form.Item>
        </div>
      </Form>
      <Table rowKey="_id" dataSource={status} columns={columnOrder} />
    </div>
  );
};

export default index;
