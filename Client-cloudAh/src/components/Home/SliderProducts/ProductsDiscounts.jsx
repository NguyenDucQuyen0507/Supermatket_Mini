import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { axiosClient } from "../../../Libraries/axiosClient";
import { API_URL } from "../../../Constants/URL";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../../../Hook/useCart";
import numeral from "numeral";
// const axios = require("axios");
const ProductsDiscounts = () => {
  const { add } = useCart((state) => state);
  var settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const [products, setProducts] = React.useState([]);
  // const { categoryId } = useParams();
  React.useEffect(() => {
    axiosClient.get("/products").then((response) => {
      let hotDeal = response.data.filter((product) => {
        return product.discount;
      });
      setProducts(hotDeal);
      //setProducts(response.data);
      console.log("data", products);
    });
  }, []);
  return (
    <div className="container overflow-hidden ">
      <Slider {...settings}>
        {products &&
          products.map((value, index) => {
            return (
              <div key={index} className="my-[100px] h-auto">
                <div className="mr-5 border ">
                  <Link to={`shop/${value.categoryId}/${value._id}`}>
                    <div className="thumbnail-discount relative">
                      <img
                        className="w-[100%] h-[100%]"
                        src={`${API_URL}${value.imageProduct}`}
                        alt=""
                      />

                      <div className="absolute top-0 right-0 bg-red-500 p-3 text-white font-bold">
                        Sale
                      </div>
                      <div className="thumbnail-overplay">
                        <button className="info">Xem nhanh</button>
                      </div>
                    </div>
                  </Link>
                  <div className="p-5">
                    <h2 className="text-primary text-center font-bold">
                      {value.name}
                    </h2>
                    <div className="flex justify-center">
                      <h3
                        className={
                          value.discount ? "text-red-600 mr-3" : "hidden"
                        }
                      >
                        {numeral(value.total).format("0,0$")}
                      </h3>
                      <h3 className={value.discount ? "line-through" : ""}>
                        {numeral(value.price).format("0,0$")}
                      </h3>
                    </div>
                  </div>
                  <div className="text-center pb-4">
                    <button
                      className={`${
                        value.stock <= 0
                          ? " rounded-tl-[24px] rounded-tr-[6px] rounded-br-[24px] rounded-bl-[6px] px-[10px] py-[5px] border border-primary   cursor-default hover:opacity-[1] "
                          : "border-button "
                      } `}
                      onClick={() => {
                        add({ product: value, quantity: 1 });
                      }}
                    >
                      {value.stock <= 0 ? "Hết sản phẩm" : "Thêm vào giỏ hàng"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default ProductsDiscounts;
