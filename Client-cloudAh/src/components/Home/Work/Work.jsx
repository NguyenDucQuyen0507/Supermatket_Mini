import React from "react";
import workData from "./WorkData";
const Work = () => {
  return (
    <div className="container mt-[35px]">
      <h1 className="text-center text-primary text-[40px] font-bold ">
        Cách thức hoạt động
      </h1>
      <hr style={{ background: "#008848", height: "2px" }} />
      <ul className="grid grid-cols-3 justify-center gap-2 my-[100px]">
        {workData.map((value, index) => {
          return (
            <li key={index} className="text-center">
              <img className="m-auto" src={value.img} alt="" />
              <h2 className="text-primary text-[20px] font-bold">
                {value.title}
              </h2>
              <p>{value.content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Work;
