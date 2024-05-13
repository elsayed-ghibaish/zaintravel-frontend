import React from "react";
import { format } from "date-fns/format";
import { ar } from "date-fns/locale/ar";
import { parseISO } from "date-fns/parseISO";
import { AiOutlineClose, AiOutlineExclamation } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import BookingSection from "./BookingSection";

export default function BookingPrevious({ user }: any) {
  const currentDate = new Date();
  return (
    <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 card-action mb-4">
      <div className="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900 items-center">
        <h5 className="font-bold mb-0">الحجوزات السابقة</h5>
      </div>

      <div className="container">
        <div className="flex flex-col md:grid grid-cols-12 text-gray-50 overflow-auto max-h-64">
          {user?.id ? (
            <>
              {user.booking

                .filter((booking: any) => new Date(booking.date) <= currentDate)
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
                          <AiOutlineExclamation className="mt-1 mr-1 animate-pulse" />
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
                          format(parseISO(booking.date), "eeee, d MMMM yyyy", {
                            locale: ar,
                          })}
                      </h3>
                      <p className="leading-tight text-justify w-fit bg-gray-600 text-white font-medium p-2 shadow-sm border text-sm rounded-lg float-left">
                        {booking.valded === null && "في انتظار التأكيد"}
                        {booking.valded === true && "الحجز مؤكد"}
                        {booking.valded === false && "حجز مرفوض"}
                      </p>
                      <p className="leading-tight text-justify w-full">
                        {booking.triptype}
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
  );
}
