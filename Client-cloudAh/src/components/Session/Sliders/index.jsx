import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderData from "./sliderData";
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const SliderComponent = () => {
  return (
    <div className="slider-slick overflow-hidden">
      <Slider {...settings}>
        {SliderData.map((img, index) => {
          return (
            <div key={index} className="">
              <img className="w-[100%] h-[700px] " src={img.imgSlider} alt="" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SliderComponent;
