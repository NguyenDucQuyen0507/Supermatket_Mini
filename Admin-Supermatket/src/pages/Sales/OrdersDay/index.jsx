import { Button, DatePicker, Form, Input, Select, Table, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { axiosClient } from "../../../libraries/axiosClient";
import numeral from "numeral";
import moment from "moment";
const index = () => {
  const [loading, setLoading] = React.useState(false);
  const [day, setDay] = React.useState([]);
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
        return <strong>{record.employee?.fullName}</strong>;
      },
    },
    {
      title: "Ngày tạo hóa đơn",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text) => {
        return <p>{moment(text).format("DD/MM/YYYY HH:mm:ss")}</p>;
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
      .post("/orders/theo-ngay-hoa-don", values)
      .then((response) => {
        setDay(response.data);
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
  const dateFormat = "YYYY/MM/DD";
  console.log("status", day);
  return (
    <div>
      <h1 className="text-xl ">Thống kê theo ngày 🗓️</h1>
      <Form
        form={searchForm}
        name="search-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ createdDate: "" }} //nó sẽ lấy value rỗng bên OrderStatusExport
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <div className="w-[80%] mt-[50px]">
          <Form.Item label="Ngày hóa đơn" name="createdDate" hasFeedback>
            <DatePicker format={"YYYY/MM/DD"} />
            {/* <DatePicker
              format={dateFormat}
              onChange={(date, dateString) => console.log(dateString)}
            /> */}
            {/* <Input /> */}
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              {loading ? "Đang xử lý ..." : "Lọc thông tin"}
            </Button>
          </Form.Item>
        </div>
      </Form>
      <Table rowKey="_id" dataSource={day} columns={columnOrder} />
    </div>
  );
};

export default index;
