import React from "react";
import SliderComponent from "../Session/Sliders";
import Brand from "./Brand/Brand";
import Categories from "./Categories/Categories";
// import Categories from "./Categories/Categories";
import SliderProducts from "./SliderProducts/SliderProducts";
import Testimonials from "./Testimonials/Testimonials";
import Work from "./Work/Work";

const index = () => {
  return (
    <div>
      <SliderComponent />
      <Work />
      <SliderProducts />
      <Categories />
      <Testimonials />
      <Brand />
    </div>
  );
};

export default index;
