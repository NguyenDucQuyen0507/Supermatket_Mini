import React, { useEffect, useState } from "react";
import { axiosClient } from "../../../libraries/axiosClient";
import {
  Table,
  Button,
  Popconfirm,
  Divider,
  Form,
  Input,
  Descriptions,
  Modal,
  message,
  Upload,
} from "antd";
import {
  AiFillEdit,
  AiFillDelete,
  AiOutlineUpload,
  AiOutlinePlus,
  AiFillQuestionCircle,
} from "react-icons/ai";
import { FaTrashRestore } from "react-icons/fa";
import "./categories.css";
import axios from "axios";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";
import { API_URL } from "../../../constants/URLS";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [file, setFile] = useState();
  const [isDelete, setIsDelete] = useState([]);
  const [saveDelete, setSaveDelete] = React.useState([]);
  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "imageURL",
      key: "imageURL",
      render: (text, record) => {
        return (
          <div className="">
            {text && (
              <img
                className="max-w-[150px] w-[30%] min-w-[70px]"
                src={`${API_URL}${text}`}
                alt=""
              />
            )}
          </div>
        );
      },
    },
    {
      title: "Tên Danh Mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "",
      key: "actions",
      render: (text, record) => {
        return (
          <div className="flex gap-5 items-center">
            {/* Button Upload Image */}
            <Upload
              showUploadList={false}
              name="file"
              data={{ name: "uploads file image category" }}
              action={`${API_URL}/upload-image/categories/${record._id}`}
              headers={{ authorization: "authorization-text" }}
              onChange={(info) => {
                if (info.file.status !== "uploading") {
                  console.log(info.file, info.fileList);
                }
                if (info.file.status === "done") {
                  message.success(`${info.file.name} file tải lên thành công`);
                  setRefresh((f) => f + 1);
                } else if (info.file.status === "error") {
                  message.error(`${info.file.name} file tải lên thất bại.`);
                }
              }}
            >
              <Button
                className="py-5 flex justify-center items-center"
                icon={<AiOutlineUpload size={"20px"} />}
              />
            </Upload>

            {/* Button Edit */}
            <Button
              className="py-5 flex items-center"
              onClick={() => {
                setSelectedRecord(record);
                updateForm.setFieldsValue(record);
                setEditFormVisible(true);
              }}
            >
              {<AiFillEdit size={"16px"} />}
            </Button>
            {/* Button Delete */}
            <Popconfirm
              icon={
                <AiFillQuestionCircle size={"24px"} className="text-red-600" />
              }
              title="Bạn có chắc muốn xóa danh mục này không?"
              onConfirm={() => {
                const id = record._id;
                axiosClient
                  .patch("/categories/" + id, { isDelete: true })
                  //{isDelete:true là mình sẽ lấy giá trị isDelete và xét nó về giá trị true}
                  .then((response) => {
                    message.success("Đã đưa vào bộ nhớ tạm!");
                    setRefresh((f) => f + 1);
                  })
                  .catch((err) => {
                    console.log(err);
                    message.error("Thất bại !!!");
                  });
              }}
              onCancel={() => {}}
              okText="Có"
              cancelText="Không"
            >
              <Button danger className="py-5 flex items-center">
                <AiFillDelete size={"16px"} />
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const isColumns = [
    {
      title: "",
      dataIndex: "imageURL",
      key: "imageURL",
      width: "20%",
      render: (text, record) => {
        return (
          <div className="text-center">
            {text && (
              <img
                className="max-w-[150px] w-[30%] min-w-[70px]"
                src={`${API_URL}${text}`}
                alt=""
              />
            )}
          </div>
        );
      },
    },
    {
      title: "Tên Danh Mục",
      dataIndex: "name",
      key: "name",
      width: "15%",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: "50%",
    },
    {
      title: " Chức năng",
      width: "20%",
      render: (text, record) => {
        return (
          <div className="flex">
            <Popconfirm
              icon={
                <AiFillQuestionCircle size={"24px"} className="text-red-600" />
              }
              title="Bạn có chắc muốn xóa vĩnh viễn danh mục này không?"
              onConfirm={() => {
                const id = record._id;
                axiosClient
                  .delete("/categories/" + id)
                  //{isDelete:true là mình sẽ lấy giá trị isDelete và xét nó về giá trị true}
                  .then((response) => {
                    message.success("Đã xóa thành công");
                    setRefresh((f) => f + 1);
                  })
                  .catch((err) => {
                    console.log(err);
                    message.error("Thất bại !!!");
                  });
              }}
              onCancel={() => {}}
              okText="Có"
              cancelText="Không"
            >
              <Button danger className=" flex items-center rounded-2xl mr-3">
                {" "}
                <AiFillDelete size={"16px"} style={{ marginRight: "5px" }} />
                Xóa
              </Button>
            </Popconfirm>
            <Button
              onClick={() => {
                const id = record._id;
                console.log("id", id);
                axiosClient
                  .patch("/categories/" + id, { isDelete: false })
                  .then((response) => {
                    setRefresh((f) => f + 1);
                  })
                  .catch((err) => {
                    console.log(err);
                    message.error("Thất bại !!!");
                  });
              }}
              className="flex items-center bg-blue-400 rounded-2xl text-white"
            >
              <FaTrashRestore size={"16px"} style={{ marginRight: "5px" }} />
              Restore
            </Button>
          </div>
        );
      },
    },
    {},
  ];

  useEffect(() => {
    axiosClient
      .get("/categories")
      .then((response) => {
        // console.log(response.data);
        let array = [];
        response.data.map((cate) => {
          // return cate.isDelete === false;
          if (cate.isDelete == false) {
            array.push(cate);
          }
        });
        // console.log(array);
        setCategories(array);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  useEffect(() => {
    axiosClient.get("/categories").then((response) => {
      let array = [];
      response.data.map((cate) => {
        if (cate.isDelete === true) {
          array.push(cate);
        }
      });
      setIsDelete(array);
    });
  }, [refresh]);

  const onFinish = (values) => {
    axiosClient
      .post("/categories", values)
      .then((response) => {
        //UPLOAD FILE
        const { _id } = response.data;
        const formData = new FormData();
        formData.append("file", file);
        axios
          .post(`${API_URL}/upload-image/categories/${_id}`, formData)
          .then((response) => {
            // message.success("Tải lên hình ảnh thành công!");
            createForm.resetFields();
            setRefresh((f) => f + 1);
          })
          .catch((err) => {
            message.error("Tải lên hình ảnh thất bại!");
          });
        message.success("Thêm thành công!");
      })
      .catch((err) => {
        message.error("Thêm thất bại!");
        console.log(err);
      });
    console.log("👌👌👌", values);
  };

  const onFinishFailed = (errors) => {
    console.log("💣💣💣 ", errors);
  };

  const onUpdateFinish = (values) => {
    axiosClient
      .patch("/categories/" + selectedRecord._id, values)
      .then((response) => {
        const { _id } = response.data;
        const formData = new FormData();
        formData.append("file", file);
        axios
          .post(`${API_URL}/upload-image/categories/${_id}`, formData)
          .then((response) => {
            message.success("Cập nhật thành công!");
            updateForm.resetFields();
            setRefresh((f) => f + 1);
            setEditFormVisible(false);
          })
          .catch((err) => {
            message.error("Tải lên hình ảnh thất bại!");
          });
      })
      .catch((err) => {
        message.error("Cập nhật thất bại!");
        console.log(err);
      });
  };
  const onUpdateFinishFailed = (errors) => {
    console.log("💣💣💣 ", errors);
  };

  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  return (
    <>
      <h1 className="text-center p-2 mb-5 text-xl">
        📝 Quản Lý Danh Mục Sản Phẩm 📝
      </h1>
      <Form
        form={createForm}
        name="create-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="w-[80%]">
          {/* Tên danh mục */}
          <Form.Item
            hasFeedback
            className=""
            label="Tên danh mục"
            name="name"
            rules={[
              { required: true, message: "Tên danh mục không được để trống!" },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Mô tả */}
          <Form.Item hasFeedback className="" label="Mô tả" name="description">
            <TextArea rows={5} />
          </Form.Item>

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
          {/* 
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <div className="flex justify-between">
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
              <Button
                danger
                className="text-right flex items-center"
                onClick={() => {
                  setEditFormVisible(true);
                }}
              >
                Nơi lưu danh mục đã xóa <AiFillDelete size={"20px"} />
              </Button>
            </div>
          </Form.Item> */}
        </div>
      </Form>
      <Table rowKey={"_id"} dataSource={categories} columns={columns} />

      <Modal
        centered
        title="Cập Nhật Danh Mục"
        open={editFormVisible}
        onOk={() => {
          updateForm.submit();
        }}
        onCancel={() => {
          setEditFormVisible(false);
        }}
        okText="Lưu thay đổi"
        cancelText="Đóng"
      >
        <Form
          form={updateForm}
          name="update-form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onUpdateFinish}
          onFinishFailed={onUpdateFinishFailed}
          autoComplete="off"
        >
          {/* Tên danh mục */}
          <Form.Item
            hasFeedback
            className=""
            label="Tên danh mục"
            name="name"
            rules={[{ required: true, message: "Please input name category!" }]}
          >
            <Input />
          </Form.Item>

          {/* Mô tả */}
          <Form.Item hasFeedback className="" label="Mô tả" name="description">
            <TextArea rows={5} />
          </Form.Item>

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

      {/* <Modal
        centered
        width={"80%"}
        title="Danh mục tạm thời xóa"
        open={editFormVisible}
        onCancel={() => {
          setEditFormVisible(false);
        }}
        okText="Lưu thay đổi"
        cancelText="Thoát"
      >
        <Table rowKey={"_id"} dataSource={isDelete} columns={isColumns} />
      </Modal> */}
    </>
  );
}

export default Categories;
