import React from "react";
import Slider from "react-slick";

const dataStar = [
  {
    start: "⭐⭐⭐⭐⭐",
    tittle: "Chất lượng tốt",
  },
  {
    start: "⭐⭐⭐⭐",
    tittle: "Website đẹp",
  },
];
var settings = {
  dots: true,
  infinite: true,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};
const Testimonials = () => {
  return (
    <div className="container mt-[50px]">
      <h1 className="text-center text-primary text-[35px] font-bold ">
        Đánh giá
      </h1>
      <hr style={{ background: "#008848", height: "2px" }} />
      <div className="w-[50%] m-auto my-[100px] overflow-hidden">
        <Slider {...settings}>
          {dataStar &&
            dataStar.map((star, index) => {
              return (
                <div key={index} className="text-center">
                  <div className="text-[45px]">{star.start}</div>
                  <h2 className="text-[25px]">{star.tittle}</h2>
                </div>
              );
            })}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
