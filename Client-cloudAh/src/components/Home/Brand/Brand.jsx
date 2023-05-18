import React from "react";
import brand from "./BrandData";
const Brand = () => {
  return (
    <div className="container mt-[50px]">
      <h1 className="text-center text-primary text-[35px] font-bold ">
        Thương hiệu
      </h1>
      <hr style={{ background: "#008848", height: "2px" }} />
      <div className="my-[100px] grid grid-cols-4 w-[70%] m-auto gap-4">
        {brand &&
          brand.map((value, index) => {
            return (
              <div key={index}>
                <img width={"200px"} src={value.img} alt="" />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Brand;
