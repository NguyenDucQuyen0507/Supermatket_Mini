import { Input, message } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { axiosClient } from "../../../Libraries/axiosClient";
function Search() {
  const [search, setSearch] = React.useState("");
  const [result, setResult] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState("");
  const onFinish = (values) => {
    if (search.trim() !== "") {
      axiosClient
        .get(`/products/timkiem?name=${search}`, values)
        .then((response) => {
          console.log(response.data);
          setResult(response.data);
        })
        .catch((err) => {
          message.error("🤦‍♂️");
        });
    } else {
      setResult([]);
    }
  };
  console.log("Search", result);
  const handleProduct = (event) => {
    //kt người dùng click vào thẻ li
    const productSearch = event.target.textContent;
    //sau đó lưu thẻ li vào setSearch để hiển thị lên thẻ input
    setSearch(productSearch);
    //Sau đó set lại result trở về mảng rỗng là nó tự biến mất
    setResult([]);
    //
  };

  return (
    <div className="ml-20 search-content ">
      <Input.Search
        value={search}
        className=" rounded-tr-md rounded-bl-md rounded-br-3xl rounded-tl-3xl input-search flex-1"
        placeholder="Nhập từ khóa tìm kiếm"
        onSearch={onFinish}
        //onFinish chỉ được gọi khi người dùng nhấn enter và nút search
        onChange={(e) => {
          //khi ta kích vào và để ghi vào ô input thì nó sẽ lấy giá trị vừa ghi đó lưu vào setSearch
          setSearch(e.target.value);
          //Nếu muốn nó tự động hiển thị kết quả thì phải gọi lại hàm onFinish
          onFinish(e.target.value);
        }}
        enterButton
      />
      {/* {showList && ( */}
      {result.length > 0 && (
        <div className="absolute left-0 mt-1 w-full bg-white shadow-md z-20">
          <ul>
            {result.map((product) => (
              <li
                key={product._id}
                onClick={handleProduct}
                className=" cursor-pointer hover:bg-gray-100 
               pl-5  "
                style={{ width: "100%", height: "35px" }}
              >
                <Link
                  to={`/shop/search?name=${product.name.replace(/%20/g, " ")}`}
                  className="h-[100%] flex items-center"
                >
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default Search;
