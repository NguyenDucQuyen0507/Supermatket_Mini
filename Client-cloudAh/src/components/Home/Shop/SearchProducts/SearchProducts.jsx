import React from "react";
import SideBar from "../SideBar";
import { useSearchParams } from "react-router-dom";
import { axiosClient } from "../../../../Libraries/axiosClient";
import NameProducts from "./NameProducts";
function SearchProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  //lấy tên vừa tìm kiếm khi nó nó được đẩy lên trên trinhd duyệt và dùng searchParams của useSearchParams để lưu giá trị
  const name = searchParams.get("name");
  const [products, setProducts] = React.useState([]);
  console.log("name: " + name);
  React.useEffect(() => {
    if (name) {
      axiosClient
        .get(`/products/timkiem?name=${name}`)
        .then((response) => {
          console.log(response.data);
          setProducts(response.data);
        })
        .catch((err) => {
          message.error("🤦‍♂️", err);
        });
    }
  }, [name]);
  console.log("nameProducts", products);
  return (
    <div className="container flex mt-[150px]">
      <SideBar />
      {products.length === 0 ? (
        //   console.log("",1)
        <div>
          <p>Không tìm thấy sản phẩm nào</p>
        </div>
      ) : (
        <NameProducts products={products} />
      )}
    </div>
  );
}

export default SearchProducts;
