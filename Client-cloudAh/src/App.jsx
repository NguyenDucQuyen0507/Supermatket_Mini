import "./App.css";
import Header from "./components/Header/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./components/Account/Login";
import AboutUs from "./components/AboutUs/index";
import ContactUs from "./components/ContactUs/index";
import HomePage from "./components/Home/index";
import Community from "./components/Community/index";
import NavProductId from "./components/Home/Shop/NavProductId";
import ProductsDetail from "./components/Home/Shop/ProductsDetail";
import Register from "./components/Account/Register";
import ShoppingCart from "./components/Home/Shop/ShoppingCart";
import "numeral/locales/vi";
import numeral from "numeral";
import ProductsPay from "./components/Home/Shop/ProductsPay";
import HistoryProduct from "./components/Home/History/HistoryProduct";
import HistoryProductDetails from "./components/Home/History/HistoryProductDetails";
import UserInformation from "./components/Account/UserInformation";
import SearchProducts from "./components/Home/Shop/SearchProducts/SearchProducts";
import Messeger from "./components/Home/Messeger/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosClient } from "./Libraries/axiosClient";
import React from "react";
numeral.locale("vi");
function App() {
  const [loading, setLoading] = React.useState(true);
  axiosClient.get("/products").then((product) => {
    setLoading(false);
  });
  return (
    <div className="">
      {loading && (
        <div className="bg-green-200 h-[100vh] flex  justify-center items-center w-[100%] ">
          <p className="text-[20px] animation_loading">
            Đang tải dữ liệu, vui lòng chờ giây lát ...
          </p>
        </div>
      )}
      {!loading && (
        <div className="App">
          <BrowserRouter>
            <ToastContainer />
            <header>
              <Header />
            </header>
            <section style={{ marginTop: "130px" }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/account/login" element={<Login />} />
                <Route path="/account/register" element={<Register />} />
                <Route path="/accounts/user" element={<UserInformation />} />
                <Route path="/components/aboutUs" element={<AboutUs />} />
                <Route path="/components/contactUs" element={<ContactUs />} />
                <Route path="/components/community" element={<Community />} />
                <Route path="/shop/hotdeal" element={<NavProductId />} />
                <Route path="/shop/:categoryId" element={<NavProductId />} />
                <Route
                  path="/shop/:categoryId/:id"
                  element={<ProductsDetail />}
                />
                <Route path="/shop/shoppingCart" element={<ShoppingCart />} />
                <Route path="/shop/productpay" element={<ProductsPay />} />
                <Route path="/history/products" element={<HistoryProduct />} />
                <Route
                  path="/history/productsDetails/:id"
                  element={<HistoryProductDetails />}
                />
                <Route path="/shop/search" element={<SearchProducts />} />
                <Route
                  path="*"
                  element={
                    <main style={{ padding: "1rem" }}>
                      <p>404 Page not found 😂😂😂</p>
                    </main>
                  }
                />
              </Routes>
            </section>
            <footer>
              <Messeger />
              <Footer />
            </footer>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;
