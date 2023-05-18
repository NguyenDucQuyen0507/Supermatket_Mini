import React from "react";
import ProductsDiscounts from "./ProductsDiscounts";

const SliderProducts = () => {
  return (
    <div className="container mt-[50px]">
      <h1 className="text-center text-primary text-[35px] font-bold ">
        Ưu đãi hấp dẫn và khuyến mãi
      </h1>
      <hr style={{ background: "#008848", height: "2px" }} />
      <ProductsDiscounts />
    </div>
  );
};

export default SliderProducts;
