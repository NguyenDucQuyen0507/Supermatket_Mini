import { Button, Form, Input, Select, Table, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { axiosClient } from "../../../libraries/axiosClient";
import numeral from "numeral";
import moment from "moment";
const index = () => {
  const [loading, setLoading] = React.useState(false);
  const [number, setNumber] = React.useState([]);
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
      render: (text, record) => {
        return <p>{moment(text.createdDate).format("DD/MM/YYYY")}</p>;
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
      .post("/orders/lich-su-don-hang", values)
      .then((response) => {
        setNumber(response.data);
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
  console.log("status", number);
  const validatePhoneNumber = (value) => {
    const phoneRegex =
      /(84|\+84|0)(1\d{9}|3\d{8}|5\d{8}|7\d{8}|8\d{8}|9\d{8})\b/;
    // Kiểm tra xem số điện thoại có khớp với biểu thức chính quy hay khô<ng></ng>
    if (phoneRegex.test(value)) {
      return true; // Hợp lệ
    } else {
      return "Số điện thoại không hợp lệ!"; // Không hợp lệ
    }
  };
  return (
    <div>
      <h1 className="text-xl ">Thống kê đơn hàng theo số điện thoại ☎️</h1>
      <Form
        form={searchForm}
        name="search-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ phoneNumber: "" }} //nó sẽ lấy value rỗng bên OrderStatusExport
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <div className="w-[80%] mt-[50px]">
          <Form.Item
            label="Số điện thoại đơn hàng"
            name="phoneNumber"
            rules={[
              {
                required: true,
                validator: (_, value) => {
                  if (!value) {
                    return Promise.reject("Bạn chưa nhập số điện thoại !");
                  } else {
                    const result = validatePhoneNumber(value);
                    if (result === true) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(result);
                    }
                  }
                },
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              {loading ? "Đang xử lý ..." : "Lọc thông tin"}
            </Button>
          </Form.Item>
        </div>
      </Form>
      <Table rowKey="_id" dataSource={number} columns={columnOrder} />
    </div>
  );
};

export default index;
