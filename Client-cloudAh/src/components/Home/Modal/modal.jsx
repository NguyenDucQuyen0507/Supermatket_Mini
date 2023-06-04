import React from "react";

const Modal = ({ modal, closeModal, children }) => {
  // console.log("Modal", modal);
  return (
    <>
      {modal ? (
        <div className=" bg-[rgba(0, 0, 0, 0.5)] inset-0 fixed z-[999] flex justify-center items-center">
          <div className=" w-[800px] shadow-2xl border fixed z-[1000] bg-white p-5 ">
            <div className=" border-b-2">
              <h1 className="text-black text-[25px] font-medium">
                Chi tiết sản phẩm
              </h1>
            </div>
            <div className="my-4">{children}</div>
            <div className="text-right text-red-500 py-4 text-[20px] font-medium">
              <button
                onClick={() => {
                  closeModal();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
