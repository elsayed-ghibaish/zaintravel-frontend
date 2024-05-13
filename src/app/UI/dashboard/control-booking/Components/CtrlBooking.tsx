"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { StrapiClient } from "@/app/server/StrapiClient";
import { useRouter } from "next/navigation";

export default function CtrlBooking() {
  const [data, setData]: any = useState();
  const [date, setdate] = useState("");
  const [days, setdays] = useState("");
  const [friday, setfriday] = useState(true);
  const [openEdit, setOpenEdit] = useState(false); // تم تغيير اسم المتغير ليتبع التسميات القياسية في React

  const router = useRouter();

  useEffect(() => {
    GetControls();
  }, []);

  const GetControls = () => {
    StrapiClient.get(`/controls/1`).then((res) => {
      const data = res.data.data.attributes;
      setData(data);
      setdate(data.from);
      setfriday(data.ClosedFriday);
      setdays(data.days);
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const Urlc = process.env.NEXT_PUBLIC_STRAPI_URL_API;
    try {
      const res = await axios.put(`${Urlc}/controls/1`, {
        data: {
          from: date,
          days: days,
          ClosedFriday: friday,
        },
      });
      if (res.status !== 200) {
        throw new Error(
          `Failed to update booking. Server response: ${res.statusText}`
        );
      }
      // const updatedData = data2.filter((item: any) => item.id !== id);
      toast.success("تم حفظ التعديلات بنجاح");
      handleSave();
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFilter = () => {
    setfriday(!friday);
  };

  function handelcheckedFriday() {
    console.log("Good");
  }

  function handleEditClick() {
    setOpenEdit(true);
  }

  function handleSave() {
    setOpenEdit(false); // عند الحفظ يتم إغلاق كومبوننت التعديل والعودة للكومبوننت الأصلي
  }

  return (
    <>
      {openEdit ? (
        <section>
          <div className="m-auto p-5">
            <span className="flex items-center mb-3">
              <span className="h-px flex-1 bg-slate-200"></span>
              <span className="px-3 font-medium text-red-700">
                تعديل حجز الرحلات
              </span>
              <span className="h-px flex-1 bg-slate-200"></span>
            </span>
            {data && (
              <form id="form" action="" method="POST" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="date-01"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      التاريخ
                    </label>
                    <input
                      type="date"
                      name="date-01"
                      id="date-01"
                      className="bg-gray-100 text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
                      value={date}
                      onChange={(e) => setdate(e.target.value)}
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="day-01"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      عدد أيام الحجز
                    </label>
                    <input
                      type="number"
                      name="day-01"
                      id="day-01"
                      className="bg-gray-100 text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
                      value={days}
                      onChange={(e) => setdays(e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="Friday-01"
                      className="text-sm font-medium leading-6 text-gray-900 flex items-center cursor-pointer"
                    >
                      إلغاء حجز الجمعة
                      <input
                        type="checkbox"
                        id="Friday-01"
                        checked={friday}
                        onChange={toggleFilter}
                        className="mr-5 form-checkbox h-5 w-5 text-red-700 focus:ring-red-600 accent-red-600"
                      />
                    </label>
                  </div>
                </div>
                <div className="block border-t border-gray-900/10 mt-3 mb-3"></div>

                <div className="flex flex-col-2 gap-x-6 gap-y-8">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="block w-full rounded-md  py-2 text-center text-sm font-semibold text-white shadow-sm 
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 bg-red-700 hover:bg-red-800"
                  >
                    حفظ
                  </button>

                  <button
                    className="block w-full rounded-md  py-2 text-center text-sm font-semibold text-white shadow-sm 
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 bg-red-700 hover:bg-red-800"
                    onClick={handleSave}
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      ) : (
        <section>
          <div className="m-auto p-5">
            <span className="flex items-center mb-3">
              <span className="h-px flex-1 bg-slate-200"></span>
              <span className="px-3 font-medium text-red-700">حجز الرحلات</span>
              <span className="h-px flex-1 bg-slate-200"></span>
            </span>
            {data && (
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    التاريخ
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    className="bg-gray-200 text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
                    value={data.from}
                    disabled
                  />
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="day"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    عدد أيام الحجز
                  </label>
                  <input
                    type="number"
                    name="day"
                    id="day"
                    className="bg-gray-200 text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
                    value={data.days}
                    disabled
                  />
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="Friday"
                    className="text-sm font-medium text-gray-900 flex items-center w-52"
                  >
                    يوم الجمعة
                    <span className="mr-2">
                      {data.ClosedFriday === false ? (
                        <span className="list-disc text-green-500">
                          ◉ متاح للحجز
                        </span>
                      ) : (
                        <span className="list-disc text-red-500">
                          ◉ غير متاح للحجز
                        </span>
                      )}
                    </span>
                  </label>
                  <input
                    type="text"
                    id="Friday"
                    name="Friday"
                    className="m-0 hidden"
                  />
                </div>
              </div>
            )}
            <div className="block border-t border-gray-900/10 mt-3 mb-3"></div>

            <button
              className="block w-full rounded-md  py-2 text-center text-sm font-semibold text-white shadow-sm 
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 bg-red-700 hover:bg-red-800"
              onClick={handleEditClick} // تم تغيير الحدث إلى onClick
            >
              تعديل
            </button>
          </div>
        </section>
      )}
    </>
  );
}
