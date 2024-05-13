import React, { useState } from "react";
import { format } from "date-fns/format";
import { ar } from "date-fns/locale/ar";
import { parseISO } from "date-fns/parseISO";
import { AiOutlineClose, AiOutlineExclamation } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import BookingSection from "./BookingSection";
import { MdPayment } from "react-icons/md";
import { VscArrowSwap } from "react-icons/vsc";
import axios from "axios";
import { toast } from "react-toastify";

export default function BookingNext({ user }: any) {
  const currentDate = new Date();
  const [massge, setmassge] = useState("");
  const [idItem, setidItem] = useState("");

  const InfoBooking = (time: any, dateV: any, id: any) => {
    const timj = time;
    var parts = timj?.split(":"); // قسم النص إلى جزئين باستخدام الفاصلة
    var hours = parseInt(parts[0]); // الساعات
    var minutes = parseInt(parts[1].split(" ")[0]); // الدقائق

    setidItem(id);

    // تحقق من الفترة (صباحًا أم مساءً)
    var period = parts[1].split(" ")[1];
    if (period === "م") {
      // إذا كان المساء، قم بإضافة 12 ساعة
      hours += 12;
    }

    // إنشاء كائن التاريخ
    var date: any = new Date(dateV);
    date.setHours(hours);
    date.setMinutes(minutes);

    var timeFormat = date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });

    console.log(date); // الإخراج: وقت صحيح يمثل "05:30 ص" ككائن Date
    // حساب الفارق بين التوقيت الحالي والتوقيت المحدد بالساعات
    var currentTime: any = new Date(); // التوقيت الحالي

    var timeDifferenceHours = (currentTime - date) / (1000 * 60 * 60);

    // إذا كان الفارق أقل من 8 ساعات وأقل من 3 ساعات، قم بعرض رسالة تحذير 2
    if (Math.abs(timeDifferenceHours) <= 8) {
      setmassge(
        "برجاء العلم انه سيتم خصم تكلفة الرحلة فى حالة إلغاء الحجز قبل الموعد بـ 8 ساعات"
      );
    } else {
      setmassge(
        "! تحذير : هل انت موافق على إلغاء الحجز لن يتم خصم تكلفة الرحلة "
      );
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const Popup = ({ isOpen, onClose, bookingId }: any) => {
    // Cancel Booking
    const CancelBooking = async (id: any) => {
      console.log(idItem);
      const Url = process.env.NEXT_PUBLIC_STRAPI_URL_API;
      try {
        const res = await axios.put(`${Url}/bookings/${idItem}`, {
          data: {
            valded: false,
          },
        });
        if (res.status !== 200) {
          throw new Error(
            `Failed to update booking. Server response: ${res.statusText}`
          );
        }
        // const updatedData = user.filter((item: any) => item.id !== id);
        toast.success("تم تحويل الحجز الى مدفوع بنجاح");
        onClose();
        // setData(updatedData);
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <>
        {isOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-xl font-bold mb-4">تحذير</div>
              <p>{massge}</p>
              {}
              <div className="m-auto float-left">
                <button
                  onClick={onClose}
                  className="mt-4 px-4 ml-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  إلغاء
                </button>
                <button
                  onClick={() => CancelBooking(bookingId)}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

  return (
    <>
      <Popup isOpen={isOpen} onClose={togglePopup} />

      <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 card-action mb-4">
        <div className="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900 items-center">
          <h5 className="font-bold mb-0">الحجوزات القادمة</h5>
        </div>

        <div className="container">
          <div className="flex flex-col md:grid grid-cols-12 text-gray-50 overflow-auto max-h-64">
            {user?.id ? (
              <>
                {user.booking

                  ?.filter(
                    (booking: any) => new Date(booking.date) >= currentDate
                  )
                  // فرز الحجوزات بناءً على التاريخ
                  .sort((a: any, b: any) => b.id - a.id)
                  // تحويل الحجوزات إلى عناصر JSX
                  .map((booking: any) => (
                    <div className="flex md:contents" key={booking.id}>
                      <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                        <div className="h-full w-6 flex items-center justify-center">
                          <div
                            className={
                              booking.valded === null
                                ? "h-full w-1 bg-amber-500 pointer-events-none"
                                : booking.valded === true
                                ? "h-full w-1 bg-green-500 pointer-events-none"
                                : booking.valded === false
                                ? "h-full w-1 bg-red-500 pointer-events-none"
                                : "h-full w-1 bg-green-500 pointer-events-none"
                            }
                          />
                        </div>
                        <div
                          className={
                            booking.valded === null
                              ? "w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-amber-500 shadow text-center"
                              : booking.valded === true
                              ? "w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center"
                              : booking.valded === false
                              ? "w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-red-500 shadow text-center"
                              : "w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center"
                          }
                        >
                          {booking.valded === null && (
                            <div className="text-xl absolute bottom-[-3px] right-1 animate-pulse">
                              ◉
                            </div>
                          )}
                          {booking.valded === true && (
                            <FaCheck className="mt-1 mr-1" />
                          )}
                          {booking.valded === false && (
                            <AiOutlineClose className="mt-1 mr-1" />
                          )}
                        </div>
                      </div>
                      <div
                        className={
                          booking.valded === null
                            ? "bg-amber-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full"
                            : booking.valded === true
                            ? "bg-green-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full"
                            : booking.valded === false
                            ? "bg-red-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full"
                            : "bg-green-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full"
                        }
                      >
                        <h3 className="font-semibold text-lg mb-1">
                          {booking.date &&
                            format(
                              parseISO(booking.date),
                              "eeee, d MMMM yyyy",
                              {
                                locale: ar,
                              }
                            )}
                        </h3>

                        {booking.valded == true && (
                          <button
                            onClick={() => {
                              InfoBooking(
                                booking.timing,
                                booking.date,
                                booking.id
                              );
                              togglePopup();
                            }}
                            className="mr-5 text-justify w-fit bg-red-600 text-white font-medium p-2 shadow-sm text-sm rounded-lg float-left"
                          >
                            إلغاء الحجز
                          </button>
                        )}

                        <p className="leading-tight text-justify w-fit bg-gray-600 text-white font-medium p-2 shadow-sm border text-sm rounded-lg float-left">
                          {booking.valded === null && "في انتظار التأكيد"}
                          {booking.valded === true && "الحجز مؤكد"}
                          {booking.valded === false && "حجز مرفوض"}
                        </p>

                        <p className="leading-tight text-justify w-full">
                          <VscArrowSwap className="inline text-white m-3" />
                          {booking.triptype}{" "}
                          <MdPayment className="inline text-white m-3" />
                          {booking.paymentstatus ? "مدفوعة" : "غير مدفوعة"}
                        </p>
                      </div>
                    </div>
                  ))}
              </>
            ) : (
              <BookingSection />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
