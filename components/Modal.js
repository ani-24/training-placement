import React from "react";

const Modal = ({ children }) => {
  return (
    <>
      <div className="fixed h-screen w-screen top-0 left-0 flex justify-center items-center pointer-events-none z-50">
        <div className="bg-white shadow-lg w-[800px] z-50 pointer-events-auto rounded-md">
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
