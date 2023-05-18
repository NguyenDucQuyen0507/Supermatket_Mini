import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../../Constants/URL";
import { axiosClient } from "../../../Libraries/axiosClient";

const SideBar = () => {
  const { categoryId } = useParams();
  console.log(categoryId);
  const [nameCategory, setnameCategory] = useState([]);
  React.useEffect(() => {
    axiosClient.get("/categories").then((response) => {
      setnameCategory(response.data);
      console.log("side", nameCategory);
    });
  }, []);
  return (
    <div className="w-[20%]  border-r border-primary">
      <div className="pr-5">
        <h1 className="text-primary text-[20px] font-medium">
          Sản phẩm của chúng tôi
        </h1>
        <ul>
          {nameCategory &&
            nameCategory.map((value, index) => {
              return (
                <div key={index} className="">
                  <li className="mt-2">
                    <Link to={`/shop/${value._id}`}>
                      <div
                        className={`flex items-center ${
                          categoryId === value._id ? "bg-gray-300" : ""
                        } `}
                      >
                        <img
                          width={"30px"}
                          src={`${API_URL}${value.imageURL}`}
                          alt=""
                        />
                        <p className="ml-3">{value.name}</p>
                      </div>
                    </Link>
                  </li>
                </div>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
