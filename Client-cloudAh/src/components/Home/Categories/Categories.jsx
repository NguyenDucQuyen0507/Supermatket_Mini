import React from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../../Constants/URL";
import { axiosClient } from "../../../Libraries/axiosClient";

const Categories = () => {
  const [categories, setCategories] = React.useState([]);
  React.useEffect(() => {
    axiosClient.get("/categories").then((response) => {
      setCategories(response.data);
      // console.log("dataCate", categories);
    });
  }, []);
  return (
    <div className="container mt-[50px]">
      <h1 className="text-center text-primary text-[35px] font-bold ">
        Theo thể loại khách hàng
      </h1>
      <hr style={{ background: "#008848", height: "2px" }} />
      <div className="my-[100px]">
        <div className="grid grid-cols-4 gap-4">
          {categories &&
            categories.map((categorie, index) => {
              return (
                <div key={index} className="">
                  <Link to={`shop/${categorie._id}`}>
                    <img
                      className="rounded-[50%]"
                      src={`${API_URL}${categorie.imageURL}`}
                      alt=""
                    />
                  </Link>
                  <div className="text-center">
                    <Link to={`shop/${categorie._id}`}>
                      <button className="border-button  text-center mt-5 font-semibold text-primary text-[15px]">
                        Cửa hàng {categorie.name}
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
