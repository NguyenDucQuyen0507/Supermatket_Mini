import React from "react";
import "./footer.css";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineMail,
} from "react-icons/ai";
const index = () => {
  return (
    <>
      <div className="w-[100%] p-10 mt-5 text-white bg-primary">
        <div className="container flex justify-between">
          <div className="">
            <h5 className="font-bold">Thực Đơn Chính</h5>
            <ul className="list-content">
              <li>
                <a href="">Trang Chủ</a>
              </li>
              <li>
                <a href="">Sản Phẩm</a>
              </li>
              <li>
                <a href="">Về Chúng Tôi</a>
              </li>
              <li>
                <a href="">Cộng Đồng</a>
              </li>
              <li>
                <a href="">Liên Hệ</a>
              </li>
            </ul>
          </div>
          <div className="helps">
            <h5 className="font-bold">Chúng tôi có thể giúp gì cho bạn?</h5>
            <ul className="list-content">
              <li>
                <a href="">FAQ</a>
              </li>
              <li>
                <a href="">Chính sách bảo mật</a>
              </li>
              <li>
                <a href="">Điều khoản dịch vụ</a>
              </li>
              <li>
                <a href="">Vận chuyển, Trà hàng, Hoàn tiền</a>
              </li>
            </ul>
          </div>
          <div className="join-community">
            <h5 className="font-bold">Tham gia cộng đồng của chúng tôi</h5>
            <p className="text-[15px] list-content">
              Đăng ký tài khoản và nhận được những tin tức, chương trình khuyến
              mãi và ưu đãi hấp dẫn!
            </p>
            <div className="flex items-center gap-5 mt-5 icon-community">
              <i className="hover:cursor-pointer">
                <AiOutlineFacebook size={"22px"} />
              </i>
              <i className="hover:cursor-pointer">
                <AiOutlineInstagram size={"22px"} />
              </i>
              <i className="hover:cursor-pointer">
                <AiOutlineMail size={"25px"} />
              </i>
            </div>
          </div>
        </div>
        <div className="container flex justify-between mx-auto mt-16 text-[13px] pb-10">
          <span>@2022 Cloud Market AH</span>
          <div className="flex gap-3 payment">
            <img
              className="w-12"
              src="https://th.bing.com/th/id/OIP.SspIkdTmbJFn3CHCC469zgHaEE?pid=ImgDet&rs=1"
              alt=""
            />
            <img
              className="w-12"
              src="https://th.bing.com/th/id/OIP.SspIkdTmbJFn3CHCC469zgHaEE?pid=ImgDet&rs=1"
              alt=""
            />
            <img
              className="w-12"
              src="https://nganhangviet.org/wp-content/uploads/2019/11/tong-dai-techcombank1-696x398.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
