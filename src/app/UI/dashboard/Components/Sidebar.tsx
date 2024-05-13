"use client";
import React from "react";

export default function Sidebar() {
  return (
    <>
      {/* الشريط الجانبي */}
      <div className="flex flex-col w-full md:w-1/6 bg-gray-800 text-white lg:h-screen print:hidden">
        <div className="p-5 flex flex-col items-center">
          <div className="mb-2">
            <img className="h-32" src="/logo.svg" alt="شعار اللوحة" />
          </div>
        </div>
        <div className="w-full flex border-b border-b-gray-700 mb-2"></div>{" "}
        {/* الخط الرفيع */}
        <h1 className="text-xl font-bold items-center text-center mb-2">
          لوحة التحكم
        </h1>
        <div className="w-full h-1 border-b border-b-gray-700 mb-2"></div>{" "}
        {/* الخط الرفيع */}
        <ul className="flex flex-col space-y-2">
          <a href="/dashboard">
            <li className={`px-5 py-3 hover:bg-gray-700 cursor-pointer  `}>
              الرئيسية
            </li>
          </a>
          <a href="/dashboard/students">
            <li className="px-5 py-3 hover:bg-gray-700 cursor-pointer">
              الطلاب
            </li>
          </a>
          <a href="/dashboard/bookings">
            <li className="px-5 py-3 hover:bg-gray-700 cursor-pointer">
              الحجوزات
            </li>
          </a>
          <a href="/dashboard/booking-confirmation">
            <li className={`px-5 py-3 hover:bg-gray-700 cursor-pointer `}>
              تاكيد الحجز
            </li>
          </a>
          <a href="/dashboard/bag-confirmation">
            <li className="px-5 py-3 hover:bg-gray-700 cursor-pointer">
              تاكيد حجز الشنط
            </li>
          </a>
          <a href="/dashboard/control-booking">
            <li className="px-5 py-3 hover:bg-gray-700 cursor-pointer">
              التحكـم فى الحجـز
            </li>
          </a>
        </ul>
      </div>{" "}
    </>
  );
}
