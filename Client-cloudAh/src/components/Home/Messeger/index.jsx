import React from "react";
import { io } from "socket.io-client";
import { TbBrandMessenger } from "react-icons/tb";
import { AiOutlineClose } from "react-icons/ai";
import { BiSend } from "react-icons/bi";
import { FiPhone } from "react-icons/fi";
import { SOCKET_URL } from "../../../Constants/URL";
import { socketConfig } from "../../../Constants/SETTINGS";

let socket = io(SOCKET_URL, socketConfig);
socket.on("connect", () => {
  //khi kết nối thành công thì nó sẽ trả về trên trình duyệt
  console.log(`Socket is connected with id: ${socket.id}`);
});

const index = () => {
  const [routed, setRouted] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [conversation, setConversation] = React.useState(false);
  const [messager, setMessager] = React.useState("");
  const [contentMessager, setContentMessager] = React.useState([]);
  const inputRef = React.useRef(null);
  //"" false
  const handleActive = () => {
    setRouted(!routed);
    setTimeout(() => {
      setActive(!active);
      setConversation(!conversation);
      setRouted(!routed);
    }, 500);
  };
  React.useEffect(() => {
    socket.on("server-message", (data) => {
      // nhận data được kích hoạt từ server để trả về cho client
      // console.log("server-message", data);
      const temp = contentMessager;
      temp.push(data);
      setContentMessager([...temp]);
    });
  }, []);
  console.log("Content", contentMessager);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    setMessager("");
    inputRef.current.focus();
  };
  return (
    <div>
      <div className="fixed bottom-[150px] right-[20px]  bg-primary rounded-[50%] p-1 ">
        <form action="" onSubmit={handleSubmit}>
          <ul
            className={`absolute w-[350px] right-[120px] top-[-60px] ${
              conversation ? "show__menu" : "show__close "
            }  box__shadow z-[100] rounded-[5px] overflow-hidden `}
          >
            <div className="flex items-center bg-primary px-2 py-5 gap-2 justify-center">
              <div className="border-[3px] p-2 rounded-[50%]">
                <TbBrandMessenger className="text-white text-[25px] rotating-icon" />
              </div>
              <div className="flex flex-col">
                <h1 className=" text-white font-semibold text-[17px]">
                  Bạn có thắc mắc gì về sản phẩm?
                </h1>
                <p className="text-white font-thin text-[13px]">
                  Bất đầu cuộc trò chuyện
                </p>
              </div>
            </div>
            <li className="w-[100%] bg-white px-4 py-2 flex flex-col">
              {contentMessager.map((content, index) => {
                return (
                  <div key={index} className="flex justify-end">
                    <h1 className="max-w-[150px] bg-blue-500 py-1 px-2 rounded-[15px] overflow-hidden break-words text-white mb-2">
                      {content.messager}
                    </h1>
                  </div>
                );
              })}
              {/* <div className="flex items-center"> */}
              <div className="flex">
                <input
                  ref={inputRef}
                  value={messager}
                  onChange={(event) => {
                    setMessager(event.target.value);
                  }}
                  type="text"
                  className="w-[90%] outline-none p-3"
                  placeholder="Bạn có câu hỏi gì?"
                />
                <button
                  onClick={() => {
                    socket.emit("client-message", {
                      messager,
                    });
                    //sau khi kích hoạt client-message thì truyền về dữ liệu để server nhận r trả về cho server
                  }}
                  disabled={!messager}
                  className={`${
                    !messager ? "" : "cursor-pointer hover:opacity-[0.7]"
                  } flex-1 flex items-center justify-center `}
                >
                  <BiSend
                    className={`text-[25px] ${
                      !messager ? "text-gray-300" : "text-primary"
                    }`}
                  />
                </button>
              </div>
              {/* </div> */}
            </li>
          </ul>
        </form>
        <div
          onClick={handleActive}
          className={`text-white flex items-center justify-center text-[35px] w-[50px] h-[50px] cursor-pointer hover:opacity-[0.7] ${
            routed ? "routed__icons " : ""
          } ${active ? " " : "routed__icons--back"} z-[99]`}
        >
          {active ? <AiOutlineClose size={"25px"} /> : <TbBrandMessenger />}
        </div>
      </div>
      {/* <h1>Quỳne</h1> */}
    </div>
  );
};

export default index;
