// import React from "react";

// const index = () => {
//   const orders = [{}];
//   return (
//     <>
//       <h1>Đơn hạng đang đợi shipper</h1>
//     </>
//   );
// };

// export default index;
import React from "react";
import { useUser } from "../../hooks/useUser";
import { axiosClient } from "../../libraries/axiosClient";
import {
  Button,
  Descriptions,
  Divider,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  message,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import numeral from "numeral";
import { API_URL } from "../../constants/URLS";
const index = () => {
  const [orders, setOrders] = React.useState([]);
  const [orderShipping, setOrderShipping] = React.useState([]);
  const [orderSuccesse, setOrderSuccesse] = React.useState([]);
  const [orderCancel, setOrderCancel] = React.useState([]);
  const [refresh, setRefresh] = React.useState(0);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [editFormVisible, setEditFormVisible] = React.useState(false);
  const [selectedRecord, setSelectedRecord] = React.useState(null);
  const [employees, setEmployee] = React.useState([]);
  const { users } = useUser();
  React.useEffect(() => {
    let orderConfirmed = [];
    if (
      users.roles.some((user) => {
        return (
          user === "directors" ||
          user === "administrator" ||
          user === "managers" ||
          user === "warehouse"
        );
      })
    ) {
      axiosClient
        .get("/orders")
        .then((response) => {
          response.data.map((order) => {
            if (order.status.includes("SHIPPING CONFIRMATION")) {
              orderConfirmed.push(order);
            }
          });
          setOrders(orderConfirmed);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [refresh]);

  //Order is Shipping
  React.useEffect(() => {
    let orderShippings = [];
    axiosClient.get("/orders").then((response) => {
      response.data.map((order) => {
        if (order.status.includes("DELIVERY IN PROGRESS")) {
          orderShippings.push(order);
        }
      });
      setOrderShipping(orderShippings);
    });
  }, [refresh]);
  //Order Success
  React.useEffect(() => {
    let orderSuccess = [];
    axiosClient.get("/orders").then((response) => {
      response.data.map((order) => {
        if (order.status.includes("DELIVERY SUCCESS")) {
          orderSuccess.push(order);
        }
      });
      setOrderSuccesse(orderSuccess);
    });
  }, [refresh]);
  //Order Cancelled
  React.useEffect(() => {
    let orderCancel = [];
    axiosClient.get("/orders").then((response) => {
      response.data.map((order) => {
        if (order.status.includes("CANCELED ORDER")) {
          orderCancel.push(order);
        }
      });
      setOrderCancel(orderCancel);
    });
  }, [refresh]);
  console.log("Order", orderCancel);
  React.useEffect(() => {
    axiosClient
      .get("/employees")
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const renderStatus = (status) => {
    return (
      <div>
        {status && status === "WAITING CONFIRMATION ORDER"
          ? "Đang Chờ Xác Nhận"
          : status === "CONFIRMED ORDER"
          ? "Đã Xác Nhận Đơn Hàng"
          : status === "SHIPPING CONFIRMATION"
          ? "Đang đợi shipper"
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

    {
      title: "",
      key: "details",
      render: (text, record) => {
        return (
          <Button
            onClick={() => {
              setSelectedOrder(record);
            }}
          >
            Xem
          </Button>
        );
      },
    },
    {
      title: "",
      key: "actions",
      render: (text, record) => {
        return (
          <Space>
            {users.roles.some((role) => {
              return (
                role === "directors" ||
                role === "administrator" ||
                role === "managers"
              );
            }) ? (
              <Button
                type="dashed"
                icon={<EditOutlined />}
                onClick={() => {
                  setSelectedRecord(record);
                  console.log("selectes", record);
                  updateForm.setFieldsValue(record);
                  setEditFormVisible(true);
                }}
              />
            ) : (
              <Popconfirm
                title="Bạn muốn giao đơn hàng này không?"
                onConfirm={() => {
                  //Cancel order
                  const id = record._id;
                  axiosClient
                    .patch("/orders/" + id, {
                      status: "DELIVERY IN PROGRESS",
                    })
                    .then((response) => {
                      message.success("Giao đơn hàng thành công!");
                      setRefresh((pre) => pre + 1);
                    })
                    .catch((err) => {
                      message.error("Giao đơn hàng thất bại!");
                    });
                  // console.log("Cancel order", record);
                }}
                onCancel={() => {}}
                okText="Có"
                cancelText="Không"
              >
                <Button className="border border-green-500">Giao hàng</Button>
              </Popconfirm>
            )}
            {users.roles.some((role) => {
              return (role =
                role === "directors" ||
                role === "administrator" ||
                role === "managers");
            }) ? (
              <Popconfirm
                title="Bạn muốn hủy đơn hàng này không?"
                onConfirm={() => {
                  //Cancel order
                  const id = record._id;
                  axiosClient
                    .patch("/orders/" + id, {
                      employeeId: null,
                      status: "WAITING CONFIRMATION ORDER",
                    })
                    .then((response) => {
                      message.success("Hủy đơn hàng thành công!");
                      setRefresh((pre) => pre + 1);
                    })
                    .catch((err) => {
                      message.error("Hủy đơn hàng thất bại!");
                    });
                  console.log("Cancel order", record);
                }}
                onCancel={() => {}}
                okText="Có"
                cancelText="Không"
              >
                <Button danger icon={<DeleteOutlined />} />
              </Popconfirm>
            ) : (
              ""
            )}
          </Space>
        );
      },
    },
  ];
  const columnOrderShipping = [
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

    {
      title: "",
      key: "details",
      render: (text, record) => {
        return (
          <Button
            onClick={() => {
              setSelectedOrder(record);
            }}
          >
            Xem
          </Button>
        );
      },
    },
  ];
  const columnOrderShipper = [
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
    {
      title: "Hình ảnh xác nhận",
      dataIndex: "imageConfirm",
      key: "imageConfirm",
      render: (text, record) => {
        return (
          <div>
            {text && (
              <img
                className="max-w-[150px] w-[30%] min-w-[70px]"
                src={`${API_URL}${text}`}
                alt="image-confirm"
              />
            )}
          </div>
        );
      },
    },
    {
      title: "",
      key: "details",
      render: (text, record) => {
        return (
          <Button
            onClick={() => {
              setSelectedOrder(record);
            }}
          >
            Xem
          </Button>
        );
      },
    },
  ];

  //Form modal
  const productColumns = [
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "product.name",
      key: "product.name",
      render: (text, record) => {
        return <strong>{record?.product?.name}</strong>;
      },
    },
    {
      title: "Giá",
      dataIndex: "product.price",
      key: "product.price",
      render: (text, record) => {
        return (
          <div style={{ textAlign: "right" }}>
            {numeral(
              record?.product?.discount
                ? record?.product?.total
                : record?.product?.price
            ).format("0,0$")}
          </div>
        );
      },
    },
    {
      title: "Giảm giá",
      dataIndex: "product.discount",
      key: "product.discount",
      render: (text, record) => {
        return (
          <div style={{ textAlign: "right" }}>
            {numeral(record?.product?.discount).format("0,0")}%
          </div>
        );
      },
    },
  ];
  // update form
  const [updateForm] = Form.useForm();
  const onUpdateFinish = (values) => {
    //1 khi nhập form xong nó sẽ post lên cơ sở dữ liệu và render ra màn hình
    axiosClient
      .patch("/orders/" + selectedRecord._id, values)
      .then((response) => {
        message.success("Cập nhật thành công");
        setRefresh((f) => f + 1); //2.4giá trị thay đổi thì useEffect thay đổi
        updateForm.resetFields(); //reset lại form
        setEditFormVisible(false);
      })
      .catch((err) => {
        message.error("Cập nhật thất bại!!");
      });
    console.log("❤️", values);
  };

  const onUpdateFinishFailed = (errors) => {
    console.log("🙈", errors);
  };
  return (
    <>
      <h1 className="p-2 mb-5 text-xl">Đơn hàng đang đợi shipper 📦</h1>
      <Modal
        centered
        title="Chi tiết đơn hàng"
        open={selectedOrder}
        onOk={() => {
          setSelectedOrder(null);
        }}
        onCancel={() => {
          setSelectedOrder(null);
        }}
        okText="Tiếp tục"
        cancelText="Đóng"
      >
        {selectedOrder && (
          <div>
            <Descriptions
              bordered
              column={1}
              labelStyle={{ fontWeight: "700" }}
            >
              <Descriptions.Item label="Trạng thái">
                {renderStatus(selectedOrder.status)}
                {/* {selectedOrder.status} */}
              </Descriptions.Item>
              <Descriptions.Item label="Khách hàng">
                {selectedOrder.fullName}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {selectedOrder.phoneNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tạo hóa đơn">
                {selectedOrder.createdDate}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày giao">
                {selectedOrder.shippedDate}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ giao hàng">
                {selectedOrder.shippingAddress}
              </Descriptions.Item>
              <Descriptions.Item label="Nhân viên">
                {selectedOrder.employee?.fullName}
              </Descriptions.Item>
            </Descriptions>
            <Divider />
            <Table
              rowKey="_id"
              dataSource={selectedOrder.orderDetails}
              columns={productColumns}
            />
          </div>
        )}
      </Modal>
      <Table rowKey={"_id"} dataSource={orders} columns={columnOrder} />
      {/*Update form  */}
      <Modal
        centered
        open={editFormVisible}
        title="Cập nhật thông tin"
        onOk={() => {
          updateForm.submit();
        }}
        onCancel={() => {
          setEditFormVisible(false);
        }}
        okText="Lưu thông tin"
        cancelText="Đóng"
      >
        <Form
          form={updateForm}
          name="update-form"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onUpdateFinish}
          onFinishFailed={onUpdateFinishFailed}
          autoComplete="off"
        >
          <div className="w-[80%]">
            {/* Created Date */}
            <Form.Item
              hasFeedback
              className=""
              label="Ngày tạo"
              name="createdDate"
              rules={[{ required: false }]}
            >
              <Input />
            </Form.Item>

            {/* Shipped Date */}
            <Form.Item
              hasFeedback
              className=""
              label="Ngày giao"
              name="shippedDate"
              rules={[
                { required: true, type: "Date", message: "Không để trống" },
                { type: "date", message: "Ngày không hợp lệ" },
                {
                  validate: {
                    validator: function (value) {
                      if (!value) return true;
                      if (value < createDate) {
                        return false;
                      }
                      return true;
                    },
                    message: "Ngày giao phải nhỏ hơn ngày hiện tại",
                  },
                },
              ]}
            >
              <Input value={Date.now()} />
            </Form.Item>

            {/* Status */}
            <Form.Item
              hasFeedback
              className=""
              label="Trạng thái đơn hàng"
              name="status"
              rules={[
                { required: true, message: "Không thể để trống" },
                // {
                //   validator: (_, value) => {
                //     if (
                //       [
                //         "WAITING CONFIRMATION ORDER",
                //         "CONFIRMED ORDER",
                //         "SHIPPING CONFIRMATION",
                //         "DELIVERY IN PROGRESS",
                //         "DELIVERY SUCCESS",
                //         "RECEIVED ORDER",
                //         "CANCELED ORDER",
                //       ].includes(value)
                //     ) {
                //       return Promise.resolve();
                //     } else {
                //       return Promise.reject("Trạng thái không hợp lệ!");
                //     }
                //   },
                // },
              ]}
            >
              <Select
                options={[
                  {
                    value: "CONFIRMED ORDER",
                    label: "Đã Xác Nhận Đơn Hàng",
                  },
                  {
                    value: "SHIPPING CONFIRMATION",
                    label: "Xác Nhận Vận Chuyển",
                  },
                ]}
              />
            </Form.Item>

            {/* Description */}
            <Form.Item
              hasFeedback
              className=""
              label="Mô tả"
              name="description"
            >
              <Input />
            </Form.Item>

            {/* Shipping Address */}
            <Form.Item
              hasFeedback
              className=""
              label="Địa chỉ giao hàng"
              name="shippingAddress"
              rules={[{ required: true, message: "Nhập địa chỉ giao hàng!" }]}
            >
              <Input />
            </Form.Item>

            {/* Payment Type */}
            <Form.Item
              hasFeedback
              className=""
              label="Hình thức thanh toán"
              name="paymentType"
              rules={[{ required: true, message: "Không thể để trống" }]}
            >
              <Select
                options={[
                  {
                    value: "MOMO",
                    label: "MOMO",
                  },
                  {
                    value: "CASH",
                    label: "Thanh Toán Bằng Tiền Mặt",
                  },
                ]}
              />
            </Form.Item>

            {/* Customer */}
            <Form.Item
              className=""
              label="Khách hàng"
              name="fullName"
              rules={[{ required: true, message: "Please selected customer!" }]}
            >
              <Input />
            </Form.Item>
            {/* PhoneNumber */}
            <Form.Item
              className=""
              label="Số điện thoại"
              name="phoneNumber"
              rules={[{ required: true, message: "Please selected customer!" }]}
            >
              <Input />
            </Form.Item>
            {/* Employee */}
            <Form.Item
              disabled={true}
              label="Nhân viên"
              name="employeeId"
              rules={[{ required: true, message: "Please selected empoyees!" }]}
            >
              <Select
                options={
                  employees &&
                  employees.map((employee) => {
                    return {
                      value: employee._id,
                      label: employee.fullName,
                    };
                  })
                }
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
      <h1 className="p-2 mb-5 text-xl">Đơn hàng đang giao 🛻</h1>
      <Table
        rowKey={"_id"}
        dataSource={orderShipping}
        columns={columnOrderShipping}
      />
      <h1 className="p-2 mb-5 text-xl">Đơn hàng đã giao thành công 🎉</h1>
      <Table
        rowKey={"_id"}
        dataSource={orderSuccesse}
        columns={columnOrderShipper}
      />
      <h1 className="p-2 mb-5 text-xl">Đơn hàng bị hủy ❌</h1>
      <Table
        rowKey={"_id"}
        dataSource={orderCancel}
        columns={columnOrderShipping}
      />
    </>
  );
};

export default index;
