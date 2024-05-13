"use client";
import React, { useState } from "react";
import BookingUi from "@/app/UI/Booking/BookingUi";
import { BsBag } from "react-icons/bs";
import { TbBus } from "react-icons/tb";
import BookingBagUI from "@/app/UI/Booking/BookingBagUI";

export default function Booking() {
  const [openTab, setOpenTab] = useState(1);

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="/booking.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="/">
              <span className="sr-only">Home</span>
              <img src="/logo.svg" className="max-w-40 bg-white" alt="" />
            </a>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              جدولة رحلتك القادمة
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              حجز رحلتك الى الجامعة أصبح اسهل من الماضى
            </p>
          </div>
        </section>

        <main className="lg:flex md:flex sm:block items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                href="/"
              >
                <span className="sr-only">Home</span>
                <img src="/logo.svg" alt="Zain Travel" />
              </a>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                احجز رحلتك القادمة
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                حجز رحلتك الى الجامعة أصبح اسهل من الماضى
              </p>
            </div>

            <div className="mx-auto">
              <div className="mb-4 flex space-x-4 p-2 gap-5 bg-white rounded-lg shadow-md">
                <button
                  onClick={() => setOpenTab(1)}
                  className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-red transition-all duration-300 ${
                    openTab === 1 ? "bg-red-600 text-white" : ""
                  }`}
                >
                  <TbBus className="inline ml-2" /> حجز رحلة
                </button>
                <button
                  onClick={() => setOpenTab(2)}
                  className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-red transition-all duration-300 ${
                    openTab === 2 ? "bg-red-600 text-white" : ""
                  }`}
                >
                  <BsBag className="inline ml-2" /> حجز توصيل شنطة
                </button>
              </div>

              <div
                className={`transition-all duration-300 bg-white p-4 rounded-lg shadow-md ${
                  openTab === 1 ? "border-red-600" : ""
                }`}
                style={{ display: openTab === 1 ? "block" : "none" }}
              >
                <BookingUi />
              </div>

              <div
                className={`transition-all duration-300 bg-white p-4 rounded-lg shadow-md ${
                  openTab === 2 ? "border-blue-600" : ""
                }`}
                style={{ display: openTab === 2 ? "block" : "none" }}
              >
                <BookingBagUI />
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
