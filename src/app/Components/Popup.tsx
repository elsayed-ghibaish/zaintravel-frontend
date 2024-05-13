import React from "react";

const Popup = ({ isOpen, onClose, title, content }: any) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-xl font-bold mb-4">تحذير</div>
            <p>
              برجاء العلم انه سيتم خصم تكلفة الرحلة فى حالة إلغاء الحجز قبل
              الموعد بـ 8 ساعات
            </p>
            <div className="m-auto float-left">
              <button
                onClick={onClose}
                className="mt-4 px-4 ml-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                إلغاء
              </button>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                موافق
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
