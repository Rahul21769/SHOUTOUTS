import React, { useState } from "react";
import HomePage from '../Pages/HomePage';


const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    document.body.classList.add("overflow-y-hidden");
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.classList.remove("overflow-y-hidden");
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      closeModal();
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <button
        className="bg-rose-500 text-white rounded-md px-4 py-2 hover:bg-rose-700 transition"
        onClick={openModal}
      >
       Media
      </button>

      {isOpen && (
        <div
          id="modelConfirm"
          className="fixed z-50 inset-0  overflow-y-auto h-full w-full px-4"
        >
          <div className="relative top-20 mx-auto shadow-xl rounded-md bg-white max-w-2xl">
          <div className="flex justify-end p-2">
              <button
                onClick={closeModal}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-red-500 hover:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="p-2 pt-0 text-center">

            <HomePage className='bg-blue-500 w-100' /> {/* Tailwind equivalent for bg-primary */}

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
