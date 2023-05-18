import React from "react";
import { axiosClient } from "../../Libraries/axiosClient";
function AboutUs() {
  const [employess, setEmployess] = React.useState([]);
  React.useEffect(() => {
    axiosClient.get("/employees").then((response) => {
      setEmployess(response.data);
    });
  }, []);
  return (
    <div className="container  mt-[150px] mb-4">
      <h1 className="text-left text-primary text-[35px] font-bold ">
        Về chúng tôi
      </h1>
      <hr style={{ background: "#008848", height: "2px" }} />
      <div className="grid grid-cols-3">
        {employess &&
          employess.map((empl) => {
            return (
              <div key={empl._id} className="block m-auto">
                <img src={empl.avatar} alt="" />
              </div>
            );
          })}
      </div>
      <div className="mt-8">
        <h1 className=" text-[27px] text-[#429f5e] font-medium">
          Cloud Market AH Cam Kết :
        </h1>
        <div className="mt-3 ml-8">
          <ul className=" text-text text-[17px]">
            <li className="mb-3">
              1. Giúp những người bán hàng rong ở chợ tươi địa phương số hóa
            </li>
            <li className="mb-3">
              2. Chuyên cung cấp thực phẩm tươi sống hàng ngày chất lượng hàng
              đầu
            </li>
            <li className="mb-3">
              3. Cung cấp trải nghiệm mua sắm hàng tạp hóa trực tuyến tuyệt vời
            </li>
            <li className="mb-3">
              4. Tạo cộng đồng đam mê ẩm thực và nấu nướng
            </li>
          </ul>
        </div>
        <div className="mt-8">
          <h1 className=" text-[27px] text-[#429f5e] font-medium">
            Tất Cả Đã Bắt Đầu Như Thế Nào
          </h1>
          <div className="mt-6 text-[17px]">
            <p className="mb-[15px]">
              Hành trình của Cloud Market AH bắt đầu vào tháng 11 năm 2022 trong
              giai đoạn làm đồ án qua môn như một sáng kiến ​​nhằm giúp số hóa
              những người bán hàng rong ở chợ tươi sống tại địa phương cũng như
              giúp đỡ những gia đình gặp khó khăn trong việc mua hàng tạp hóa
              tươi sống do nhiều hạn chế và biện pháp an toàn được áp dụng.
            </p>
            <p className="mb-[15px]">
              Cho đến nay, chúng tôi mới thử nghiệm, cho phép chúng tôi đưa toàn
              bộ thị trường ẩm ướt lên mạng thành công. Chỉ trong một thời gian
              ngắn, Cloud Market AH đã nhận được sự ủng hộ của rất nhiều người
              tiêu dùng. Cho đến nay, chúng tôi đã phục vụ hơn 0 khách hàng trên
              toàn quốc.
            </p>
            <p className="mb-[15px]">
              Tuy nhiên, bất chấp những thành công của chúng tôi, hành trình của
              Cloud Market AH trong việc số hóa thị trường ẩm thực Đà Nẵng mới
              chỉ bắt đầu. Chúng tôi đặt mục tiêu một ngày nào đó sẽ số hóa bối
              cảnh chợ ẩm ướt của quốc gia và cung cấp chất lượng và sự tiện lợi
              chưa từng có cho tất cả người tiêu dùng.
            </p>
            <p className="mb-[15px]">
              Mua sắm hàng tạp hóa tươi nên đơn giản và dễ dàng. Chúng tôi rất
              mong được phục vụ bạn và nhu cầu mua sắm của bạn :D
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
