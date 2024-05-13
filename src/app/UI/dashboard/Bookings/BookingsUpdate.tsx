"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useFetch from "@/app/hooks/useFetch";
import { StrapiClient } from "@/app/server/StrapiClient";
import { format } from "date-fns/format";
import GetControlDate from "@/app/UI/Booking/components/GetControlDate";
import { toast } from "react-toastify";
import Sidebar from "../Components/Sidebar";
import NextBreadcrumb from "@/app/Components/NextBreadcrumb";

export default function BookingsUpdate(id: any) {
  const { data, loading, error }: any = useFetch(
    `/bookings/${id.id.params.id}`
  );

  const [dataTwo, setDataTwo]: any = useState("");

  const { availableDays, GetEndTime } = GetControlDate();
  const [GetMedleMovePoint, setGetMedleMovePoint] = useState([]);
  const [username, setUserName] = useState("");
  const [date, setDate] = useState("");
  const [timing, setTiming] = useState("");
  const [exittiming, setExittiming] = useState("");
  const [triptype, settriptype] = useState("");
  const [paymenttype, setPaymenttype] = useState("");
  const [price, setprice] = useState();
  const [movepoint, setMovepoint] = useState("");
  const [error2, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading2, setLoading] = useState(false);

  useEffect(() => {
    dataTwo && settriptype(dataTwo.triptype);
  }, [data]);

  useEffect(() => {
    data && setDataTwo(data?.data?.attributes);
    dataTwo && setUserName(dataTwo.name);
    dataTwo && setDate(dataTwo.date);
    data && setTiming(dataTwo.timing);
    data && setExittiming(dataTwo.exittiming);
    // data && setMovepoint(dataTwo.movepoint)
    data && setPaymenttype(dataTwo.paymenttype);
    // data && setUsers_permissions_users(data.id);
    // data && setUserName(`${data.username}${data.lastname}`);
    // data && setRegion(data.region);
    data && setMovepoint(data.movepoint);
    // data && setPhone(data.primaryphone);
    // data && setEmail(data.email);
    GetPrise();
    GetCost();
  }, [data, triptype]);

  const GetPrise = () => {
    StrapiClient.get(`/movepoints`).then((res) => {
      setGetMedleMovePoint(res.data.data);
    });
  };

  // البحث عن العنصر بواسطة الاسم
  const GetDataMP: any = GetMedleMovePoint.find(
    (item: any) => item.name === movepoint
  );

  function GetCost() {
    if (triptype === "ذهاب") {
      setprice(GetDataMP?.attributes.price);
    } else if (triptype === "عودة") {
      setprice(GetDataMP?.attributes.pricetwo);
    } else if (triptype === "ذهاب وعودة") {
      setprice(GetDataMP?.attributes.pricethree);
    }
  }

  const handleDateChange = (event: any) => {
    // استقبال التاريخ من حقل الإدخال
    const selectedDate = event.target.value;

    // تحويل التاريخ إلى الصيغة المطلوبة
    const date = format(new Date(selectedDate), "yyyy-MM-dd");

    // تعيين التاريخ بالصيغة المحولة إلى الحالة
    setDate(date);
  };

  const handleTimeChange = (event: any) => {
    // استقبال الوقت من حقل الإدخال
    const selectedTime = event.target.value;

    // تحويل الوقت إلى الصيغة المطلوبة
    const formattedTime = format(new Date(`${selectedTime}`), "HH:mm:ss");

    // تعيين الوقت بالصيغة المحولة إلى الحالة
    setTiming(formattedTime);
  };
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const Urlc = process.env.NEXT_PUBLIC_STRAPI_URL_API;
    try {
      const res = await axios.put(`${Urlc}/bookings/${id.id.params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          date,
          timing,
          triptype,
          exittiming,
          paymenttype,
          price,
        },
      });

      if (res.status) {
        toast.success("تم تحديث الحجز بنجاح");
        setSuccess(true);
        router.push("/dashboard/bookings");
      }
    } catch (error) {
      console.log("حدث خطأ أثناء التسجيل: ", error);
    }
  };

  const firstName = username?.split(" ").slice(0, 3).join(" ") || [];
  const lastName = username?.split(" ").pop() || "";
  return (
    <div className="flex flex-col md:flex-row container-fluid group-data-[content=boxed]:max-w-boxed mx-auto bg-slate-200 print:bg-white ">
      <Sidebar />

      <div className="flex-1 p-10">
        <section>
          <NextBreadcrumb
            homeElement={"Home"}
            separator={""}
            activeClasses="relative bg-gray-100 rounded-l-lg "
            containerClasses=""
            listClasses=""
            capitalizeLinks
          />

          <div className="mx-auto max-w-3xl text-center mt-5">
            <h2 className="text-xl font-medium bg-slate-200 border-2 border-white shadow-sm rounded-t-lg p-5">
              تحديث حجز{" "}
              <span className="text-red-600">{`  ${firstName} ${lastName}`}</span>
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-3xl border-2 bg-gray-100 border-white p-5 rounded-b-lg shadow-sm"
          >
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="TripType"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  نوع الرحلة
                </label>
                <select
                  name="TripType"
                  id="TripType"
                  className="text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
                  value={triptype}
                  onChange={(e) => settriptype(e.target.value)}
                  required
                >
                  <option disabled hidden></option>
                  <option value="ذهاب">ذهاب</option>
                  <option value="عودة">عودة</option>
                  <option value="ذهاب وعودة">ذهاب وعودة</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  تاريخ الرحلة
                </label>
                <div className="sm:col-span-3">
                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
                    required
                  />
                </div>
              </div>

              {triptype !== "عودة" && (
                <div className="sm:col-span-3">
                  <label
                    htmlFor="timing"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    التوقيت
                  </label>
                  <select
                    name="timing"
                    id="timing"
                    className="text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
                    value={timing}
                    onChange={(e) => setTiming(e.target.value)}
                    required
                  >
                    <option value="" disabled hidden>
                      اختر
                    </option>
                    {GetDataMP?.attributes.time.map((item: any, index: any) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {triptype !== "ذهاب" && (
                <div className="sm:col-span-3">
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    موعد نهاية المحاضرات
                  </label>
                  <div className="sm:col-span-3">
                    <select
                      name="time"
                      id="time"
                      value={exittiming}
                      onChange={(e) => setExittiming(e.target.value)}
                      className="text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
                      required
                    >
                      <option value="" disabled hidden>
                        نهاية المحاضرات
                      </option>
                      {GetEndTime?.map((time: any) => (
                        <option key={time.value} value={time.value}>
                          {time.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div className="sm:col-span-3">
                <label
                  htmlFor="paymenttype"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  الدفع
                </label>
                <div className="sm:col-span-3">
                  <select
                    name="paymenttype"
                    id="paymenttype"
                    value={paymenttype}
                    onChange={(e) => setPaymenttype(e.target.value)}
                    className="text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
                    required
                  >
                    <option value="" disabled hidden>
                      اختر
                    </option>
                    <option value="اونلاين">اونلاين</option>
                    <option value="نقدا">نقدا</option>
                    <option value="فودافون كاش">فودافون كاش</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-900/10 mt-3"></div>
            <div className="mt-3">
              <h3>
                <span className="text-red-500 font-medium">
                  تكلفة الرحلة :{" "}
                </span>
                {`${price ? price : "0"} ج.م`}
              </h3>
            </div>
            <div className="border-t border-gray-900/10 mt-3"></div>

            <div className="mt-5">
              <button
                type="submit"
                className="block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm 
             focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600
            bg-red-700 hover:bg-red-800"
              >
                {loading ? "جاري تحديث البيانات..." : "تحديث الحجز"}
              </button>
            </div>

            {success && (
              <div
                className="mb-3 mt-5 inline-flex w-full items-center rounded-lg bg-green-100 px-6 py-5 text-base text-green-700"
                role="alert"
              >
                <span className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                تم تحديث الحجز بنجاح
              </div>
            )}

            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error2}
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}
