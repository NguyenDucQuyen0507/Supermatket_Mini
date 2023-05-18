import React from "react";

const index = () => {
  return (
    <div className="container mt-[150px] mb-4">
      <h1 className="text-left text-primary text-[35px] font-bold ">
        Cộng đồng
      </h1>
      <hr style={{ background: "#008848", height: "2px" }} />

      <div className="mt-8">
        <h1 className=" text-[27px] text-[#429f5e] font-medium">
          Siêu thị mini cam kết với cộng động:
        </h1>
        <ul className="mt-3 text-[18px]">
          <li>1. Đưa ra những sản phẩm tốt đến tay người tiêu dùng</li>
          <li>2. Bán sản phẩm đúng giá niêm yết</li>
          <li>3. Đảm bảo an toàn vệ sinh thực phẩm</li>
          <li>4. Luôn luôn lắng nghe ý kiến từ cộng đồng</li>
        </ul>
      </div>
      <hr style={{ background: "#008848", height: "2px", marginTop: "50px" }} />
      <div className="text-center mt-4">
        <div>
          <span>Bạn có thể liên hệ với tôi qua số điện thoại: </span>
          <span className="text-primary text-[20px]">0398232567</span>
        </div>
        <div>
          <span>Hoặc qua gmail: </span>
          <span className="text-primary text-[20px]">
            sieuthimini@gmail.com
          </span>
        </div>
      </div>
    </div>
  );
};

export default index;
