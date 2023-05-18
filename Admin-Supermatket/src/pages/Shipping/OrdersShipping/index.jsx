import React from "react";
import { useUser } from "../../../hooks/useUser";
import { axiosClient } from "../../../libraries/axiosClient";
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
  Upload,
  message,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import numeral from "numeral";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { API_URL } from "../../../constants/URLS";
import moment from "moment";
const index = () => {
  // const moment = require("moment");
  const [orders, setOrders] = React.useState([]);
  const [refresh, setRefresh] = React.useState(0);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [editFormVisible, setEditFormVisible] = React.useState(false);
  const [editRecord, setEditRecord] = React.useState(false);
  const [selectedRecord, setSelectedRecord] = React.useState(false);
  const [employees, setEmployee] = React.useState([]);
  const [file, setFile] = React.useState();
  const { users } = useUser();

  React.useEffect(() => {
    let orderConfirmed = [];
    if (
      users.roles.some((user) => {
        return (
          user === "directors" ||
          user === "administrator" ||
          user === "managers" ||
          user === "shipper"
        );
      })
    ) {
      axiosClient
        .get("/orders")
        .then((response) => {
          response.data.map((order) => {
            if (order.status.includes("DELIVERY IN PROGRESS")) {
              orderConfirmed.push(order);
            }
          });
          setOrders(orderConfirmed);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log("Quyền", orderConfirmed);
  }, [refresh]);

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
                  //vì khi mình nhấn vào edit phần nào thì nó sẽ lấy dữ liệu của thằng đó lưu sô state để luuw lại
                  setSelectedRecord(record);
                  console.log("selectes", record);
                  updateForm.setFieldsValue(record);
                  setEditFormVisible(true);
                }}
              />
            ) : (
              // <Popconfirm>
              <Button
                type="dashed"
                onClick={() => {
                  setSelectedRecord(record);
                  console.log("selectes1", record);
                  setEditRecord(true);
                  // updateForm.setFieldsValue(record);
                }}
              >
                Xác nhận
              </Button>
              // </Popconfirm>
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
  const [updateFormOrder] = Form.useForm();

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

  const onUpdateOrders = (values) => {
    // const { file } = values;
    axiosClient
      .patch("/orders/" + selectedRecord._id, {
        // file: file,
        status: "DELIVERY SUCCESS",
        shippedDate: Date.now(),
      })
      .then((response) => {
        //UPLOAD FILE
        const { _id } = response.data;
        const formData = new FormData();
        formData.append("file", file);
        axios
          .post(`${API_URL}/upload-image/orders/${_id}`, formData)
          .then((response) => {
            // createForm.resetFields();
            setEditRecord(false);
            setRefresh((f) => f + 1);
            message.success("Đã xác nhận đơn hàng thành công");
          })
          .catch((err) => {
            message.error("Tải lên hình ảnh thất bại!");
          });

        // setHiddenForm(true);
      })
      .catch((err) => {
        message.error("Chưa thể xác nhận đơn hàng!");
        console.log(err);
      });
    // console.log("👌👌👌", values);
  };
  return (
    <>
      <h1 className="p-2 mb-5 text-xl">Đơn hàng đang vận chuyển 🛻</h1>
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
                {/* {selectedOrder.shippedDate} */}
                {moment(selectedOrder.shippedDate).format("DD/MM/yyyy")}
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

      {/* update đơn hàng */}
      <Modal
        centered
        open={editRecord}
        title="Cập nhật đơn hàng"
        onOk={() => {
          updateFormOrder.submit();
        }}
        onCancel={() => {
          setEditRecord(false);
        }}
        okText="Lưu đơn hàng"
        cancelText="Đóng"
      >
        <Form
          form={updateFormOrder}
          name="accept-form"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="on"
          onFinish={onUpdateOrders}
          onFinishFailed={() => {}}
        >
          <Form.Item
            label="Hình ảnh"
            name="file"
            rules={[
              { required: true, message: "Hãy chọn hình ảnh cho danh mục!" },
            ]}
          >
            <Upload
              showUploadList={true}
              // listType="picture-card"
              beforeUpload={(file) => {
                setFile(file);
                return false;
              }}
            >
              <div className="flex justify-center items-center w-[100px] h-[100px] border border-dashed rounded-lg hover:cursor-pointer hover:border-blue-400 hover:bg-white transition-all ease-in duration-150">
                <AiOutlinePlus size={"20px"} />
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default index;
