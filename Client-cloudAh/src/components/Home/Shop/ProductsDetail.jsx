import React from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../../Constants/URL";
import { useCart } from "../../../Hook/useCart";
import { axiosClient } from "../../../Libraries/axiosClient";
import numeral from "numeral";
const ProductsDetail = () => {
  const { categoryId, id } = useParams();
  console.log("cateId", categoryId);
  const { items, plus, subtract } = useCart((state) => state);

  const [productDetails, setProductDetails] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  React.useEffect(() => {
    if (categoryId) {
      axiosClient.get(`/products/${categoryId}/${id}`).then((response) => {
        setProductDetails(response.data);
        console.log("IDPro", productDetails);
      });
    }
    // if (categoryId) {
    //   axiosClient.get(`/categories/${categoryId}`).then((response) => {
    //     setCategory(response.data);
    //   });
    // }
  }, [categoryId, id]);
  return (
    <div className="container">
      <div className="text-green-700 pt-5">
        <span className="mr-2">
          <Link to={"/"}>Trang chủ</Link>
        </span>
        <span className="mr-2">/</span>
        <Link to={`/shop/${categoryId ? categoryId : "hotdeal"}`}>
          <span className="mr-2 text-red-600 font-semibold">
            {categoryId ? productDetails.name : ""}
          </span>
        </Link>
        <span className="mr-2">/</span>
        <span>Trang 1/1 </span>
      </div>
      <div className=" mt-[35px]">
        <h1 className="text-left text-primary text-[40px] font-bold ">
          Chi tiết sản phẩm
        </h1>
        <hr style={{ background: "#008848", height: "2px" }} />
        <div className="w-[80%] flex items-center m-auto mt-4">
          <div className="w-[80%]">
            <img
              className=""
              src={`${API_URL}${productDetails.imageProduct}`}
              alt=""
            />
          </div>
          <div className="text-[20px] flex flex-col gap-2">
            <h2>Tên: {productDetails.name}</h2>
            <p
              className={
                productDetails.discount
                  ? "line-through"
                  : "text-red-600 font-bold"
              }
            >
              Giá: {numeral(productDetails.price).format("0,0$")}
            </p>
            <p>Giảm giá: {productDetails.discount}%</p>
            <p
              className={
                productDetails.discount ? "text-red-600 font-bold" : "hidden"
              }
            >
              Giá còn: {numeral(productDetails.total).format("0,0$")}
            </p>
            <p>
              Tình trạng:{" "}
              {productDetails.stock > 0 ? `${productDetails.stock}` : "hết"} sản
              phẩm
            </p>
            <p>Mô tả: {productDetails.description}</p>
            {/* <div className=" flex">
              <div
                onClick={() => {
                  plus(productDetails.product._id);
                }}
                className="border border-primary w-10 h-9 flex items-center justify-center cursor-pointer active:bg-gray-300"
              >
                <AiOutlinePlus />
              </div>
              <div className="border border-primary w-[40px] h-9 text-center flex items-center justify-center">
                {}
              </div>
              <div
                onClick={() => subtract(productDetails.product._id)}
                className="border border-primary w-10 h-9 flex items-center justify-center cursor-pointer active:bg-gray-300"
              >
                <GrSubtract />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetail;
