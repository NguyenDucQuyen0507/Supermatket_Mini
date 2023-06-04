import React from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../../Constants/URL";
import { useCart } from "../../../Hook/useCart";
import { axiosClient } from "../../../Libraries/axiosClient";
import numeral from "numeral";
import Modal from "../Modal/modal";
import ModalDetail from "../Modal/modalDetail";
const Products = () => {
  const { add } = useCart((state) => state);
  const { categoryId } = useParams();
  const [productsId, setProductsId] = React.useState([]);
  React.useEffect(() => {
    if (categoryId) {
      //Nếu có categoryId thì nó sẽ lấy theo Id của sản phẩm đó
      axiosClient.get(`/products/${categoryId}`).then((response) => {
        setProductsId(response.data);
      });
    } else {
      //Nếu không có thì nó chỉ lấy sp có discount trong products
      axiosClient.get("/products").then((respone) => {
        let listProducts = respone.data.filter((product) => {
          return product.discount;
        });
        setProductsId(listProducts);
      });
    }
  }, [categoryId]);
  console.log("Prod", productsId);
  const [isModal, setIsModal] = React.useState(false);
  const [body, setBody] = React.useState("");
  const handleModal = (body) => {
    setIsModal(!isModal);
    setBody(body);
    //Giải thích phần body, khi map từ products thì nó sẽ map hết tất cả nhưng trong mỗi lần map thì có một nút xem nhanh nghĩa là khi click vào nút xem nhanh đó thì chỉ là dữ liệu của 1 products đó thôi.
    //trong handleModal ta có nhận vào một đối số và khi click vào nút xem nhanh ta truyền đối số đó là giá trị value thì tức nghĩa là nó chỉ nhận đúng giá trị products dó thôi và ta set nó vào setBody.
  };
  const handleCloseModal = () => {
    setIsModal(false);
  };
  return (
    <div className="pl-5 flex-1">
      <div className="grid grid-cols-4 gap-4">
        {productsId &&
          productsId.map((product, index) => {
            return (
              <div key={index} className=" h-auto">
                <div className=" border">
                  {/* <Link to={`/shop/${product.categoryId}/${product._id}`}> */}
                  <div className="thumbnail-discount relative">
                    <img
                      className="w-[100%] h-[100%]"
                      src={`${API_URL}${product.imageProduct}`}
                      alt=""
                    />
                    <div
                      className={product.discount ? "discount-products" : ""}
                    >
                      {product.discount ? "Sale" : ""}
                    </div>
                    <div className="thumbnail-overplay">
                      <button
                        onClick={() => {
                          {
                            handleModal(product);
                          }
                        }}
                        className="info "
                      >
                        Xem nhanh
                      </button>
                    </div>
                  </div>
                  {/* </Link> */}
                  <Link to={`/shop/${product.categoryId}/${product._id}`}>
                    <div className="p-5">
                      <h2 className="text-primary text-center font-bold">
                        {product.name}
                      </h2>
                      <div className="flex justify-center">
                        <h3
                          className={
                            product.discount ? "text-red-600 mr-3" : "hidden"
                          }
                        >
                          {numeral(product.total).format("0,0$")}
                        </h3>
                        <h3 className={product.discount ? "line-through" : ""}>
                          {numeral(product.price).format("0,0$")}
                        </h3>
                      </div>
                    </div>
                  </Link>
                  <div className="text-center pb-4">
                    <button
                      disabled={product.stock <= 0}
                      className={`${
                        product.stock <= 0
                          ? " rounded-tl-[24px] rounded-tr-[6px] rounded-br-[24px] rounded-bl-[6px] px-[10px] py-[5px] border border-primary   cursor-default hover:opacity-[1] "
                          : "border-button "
                      } `}
                      onClick={() => {
                        add({ product: product, quantity: 1 });
                      }}
                    >
                      {product.stock <= 0
                        ? "Hết sản phẩm"
                        : "Thêm vào giỏ hàng"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        <Modal modal={isModal} closeModal={handleCloseModal}>
          <ModalDetail body={body} />
          {/* khi tôi gọi như này thì bên Modak tôi gọi nó là children. Nó là định dạng của React khi gọi 1 component lồng nhau */}
        </Modal>
      </div>
    </div>
  );
};

export default Products;
