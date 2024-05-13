"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { addDays, format, parseISO } from "date-fns";
import Link from "next/link";
import useFetch from "@/app/hooks/useFetch";
import { StrapiClient } from "@/app/server/StrapiClient";
import axios from "axios";
import { toast } from "react-toastify";
import { FaAmazonPay } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import { HiPencilAlt } from "react-icons/hi";
import { FcCancel, FcCheckmark } from "react-icons/fc";

export default function ConfirmBagUI() {
  const { data, loading, error }: any = useFetch("/regions");

  const [data3, setData3]: any = useState();
  const [data2, setData]: any = useState([]);
  const [dataFour, setDataFour]: any = useState([]);

  const [BookingDay, setBookingDay] = useState<string | null>(
    format(addDays(new Date(), 1), "yyyy-MM-dd")
  );

  const [selectedCities, setselectedCities] = useState<string[]>([]);
  const [selectedTypeOfTrip, setselectedTypeOfTrip] = useState<string | null>(
    null
  );
  const [TimingMov, setTimingMov] = useState<string>("");
  const [TimingEnd, setTimingEnd] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  let counter = 1; // تهيئة متغير الـ counter لكل بيان

  useEffect(() => {
    setData3(data);
    GetPrise();
    GetControls();
  }, [data]);

  const GetPrise = () => {
    StrapiClient.get(`/bookingbags`).then((res) => {
      setData(res.data.data);
    });
  };

  const GetControls = () => {
    StrapiClient.get(`/controls/1`).then((res) => {
      setDataFour(res.data.data);
    });
  };

  // Pay Booking Bag
  const PayBooking = async (id: any) => {
    const Urlc = process.env.NEXT_PUBLIC_STRAPI_URL_API;
    try {
      const res = await axios.put(`${Urlc}/bookingbags/${id}`, {
        data: {
          paymentstatus: true,
        },
      });
      if (res.status !== 200) {
        throw new Error(
          `Failed to update booking. Server response: ${res.statusText}`
        );
      }
      const updatedData = data2.filter((item: any) => item.id !== id);
      toast.success("تم تحويل الحجز الى مدفوع بنجاح");
      setData(updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  // Un Pay Booking Bag
  const UnPayBooking = async (id: any) => {
    const Urlc = process.env.NEXT_PUBLIC_STRAPI_URL_API;
    try {
      const res = await axios.put(`${Urlc}/bookingbags/${id}`, {
        data: {
          paymentstatus: false,
        },
      });
      if (res.status !== 200) {
        throw new Error(
          `Failed to update booking. Server response: ${res.statusText}`
        );
      }
      const updatedData = data2.filter((item: any) => item.id !== id);
      toast.success("تم إلغاء دفع الحجز بنجاح");
      setData(updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  // Confirm Booking Bag
  const ConfirmBooking = async (id: any) => {
    const Urlc = process.env.NEXT_PUBLIC_STRAPI_URL_API;
    try {
      const res = await axios.put(`${Urlc}/bookingbags/${id}`, {
        data: {
          confirmation: true,
        },
      });
      if (res.status !== 200) {
        throw new Error(
          `Failed to update booking. Server response: ${res.statusText}`
        );
      }
      const updatedData = data2.filter((item: any) => item.id !== id);
      toast.success("تم تأكيد الحجز بنجاح");
      setData(updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  // Reject Booking item
  const RejectBooking = async (id: any) => {
    const confirmed = confirm("هل أنت متاكد من إلغاء الحجز");
    if (confirmed) {
      const Urlc = process.env.NEXT_PUBLIC_STRAPI_URL_API;
      try {
        const res = await axios.put(`${Urlc}/bookingbags/${id}`, {
          data: {
            confirmation: false,
          },
        });

        if (res.status !== 200) {
          throw new Error(
            `Failed to delete booking. Server response: ${res.statusText}`
          );
        }
        toast.success("تم إلغاء الحجز بنجاح");
        // تحديث حالة البيانات بعد الحذف
        const updatedData = data2.filter((item: any) => item.id !== id);
        setData(updatedData);
        // يمكنك أيضًا استخدام router.replace لتوجيه المستخدم إلى صفحة محددة بعد الحذف
        // router.replace("/your-redirect-path");
      } catch (error) {
        console.error(error);
      }
    }
  };

  // valed
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookingDay(event.target.value);
  };

  const handleTypeOfTripSelChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setselectedTypeOfTrip(event.target.value);
  };

  const handleTimeMovChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimingMov(event.target.value);
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimingEnd(event.target.value);
  };

  const handleCityChange = (city: string) => {
    const updatedCities = selectedCities.includes(city)
      ? selectedCities.filter((c) => c !== city)
      : [...selectedCities, city];

    setselectedCities(updatedCities);
  };

  // فلترة البيانات واستبعاد التي لا تستوفي الشرط
  const filteredData = data2
    .filter((item: any) => {
      // تحقق من التاريخ
      if (
        BookingDay &&
        format(parseISO(item.attributes.date), "yyyy-MM-dd") !== BookingDay
      ) {
        return false;
      }

      // تحقق من الوقت
      if (TimingMov) {
        if (item.attributes.timing.includes(TimingMov)) {
          return true;
        } else if (item.attributes.timing.includes(TimingMov)) {
          return true;
        } else {
          return false;
        }
      }
      // تحقق من المنطقة
      if (
        selectedCities.length > 0 &&
        !selectedCities.includes(item.attributes.region)
      ) {
        return false;
      }
      // تحديد نوع الرحلة
      if (selectedTypeOfTrip) {
        if (selectedTypeOfTrip === "ذهاب وعودة") {
          // إذا كان نوع الرحلة هو "ذهاب وعودة"، فقط عرض الحجوزات التي تحمل هذا النوع
          return item.attributes.triptype === "ذهاب وعودة";
        } else {
          // إذا كان نوع الرحلة هو "ذهاب" أو "عودة"، فقط تجاهل الحجوزات التي تحمل نوع "ذهاب وعودة"
          return (
            item.attributes.triptype === selectedTypeOfTrip ||
            item.attributes.triptype === "ذهاب وعودة"
          );
        }
      }

      // تحقق من نهاية المحاضرة
      if (TimingEnd) {
        if (item.attributes.exittiming.includes(TimingEnd)) {
          return true;
        } else if (item.attributes.exittiming.includes(TimingEnd)) {
          return true;
        } else {
          return false;
        }
      }

      // العنصر يفي بجميع شروط الفلتر
      return true;
    })
    .filter((item: any) => item.attributes.confirmation === null);

  // حساب عدد الصفحات الإجمالي بناءً على البيانات المفلترة
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // حساب مؤشر البداية والنهاية للعناصر في الصفحة الحالية
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // إضافة متغيرات لحساب الصفحة السابقة والتالية
  const nextPage = currentPage < totalPages ? currentPage + 1 : currentPage;
  const prevPage = currentPage > 1 ? currentPage - 1 : currentPage;

  // console.log(data2?.data?.attributes.paymentstatus)

  return (
    <div className="flex flex-col md:flex-row container-fluid group-data-[content=boxed]:max-w-boxed mx-auto bg-slate-200">
      <Sidebar />

      <div className="flex-1 p-10">
        <div className="bg-slate-300 border-2 border-white shadow-sm rounded-t-lg grid grid-cols-6 gap-x-7 gap-y-2 sm:grid-cols-9 p-5  print:hidden print:bg-none">
          <div className="sm:col-span-3 justify-center items-center flex">
            <label
              className="block text-sm w-36 font-medium leading-6 text-gray-900"
              htmlFor="date"
            >
              حسب التاريخ
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
              value={BookingDay || ""}
              onChange={handleDateChange}
            />
          </div>

          <div className="sm:col-span-6 lg:flex bg-slate-200 p-1 rounded-md">
            <span className="text-2 font-medium text-gray-900 justify-center flex items-center">
              حسب المدينة
            </span>
            {data3?.data.map((cityName: any) => (
              <label
                htmlFor={`checkboxes-${cityName.id}`}
                key={cityName.id}
                className="flex m-auto items-center justify-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  id={`checkboxes-${cityName.id}`}
                  name={`checkboxes-${cityName.id}`}
                  className="ml-2 border shadow form-checkbox h-5 w-5   text-red-700 focus:ring-red-600 accent-red-600 overflow-auto"
                  value={cityName.attributes.name}
                  checked={selectedCities.includes(cityName.attributes.name)}
                  onChange={() => handleCityChange(cityName.attributes.name)}
                />
                {cityName.attributes.name}
              </label>
            ))}
          </div>
        </div>{" "}
        <div className="bg-slate-50 border-2 border-white shadow-sm rounded-b-lg p-5">
          <table className="table-fixed w-full overflow-auto lg:inline-table md:flow-root sm:inline-table flow-root">
            <thead className="bg-slate-300 text-slate-700">
              <tr className="*:p-3 *:border-l *:font-bold text-sm">
                <th className="w-14">م</th>
                <th className="w-56">الاسم</th>
                <th>حالة الدفع</th>
                <th>نوع الشنطة - السعر</th>
                <th className="w-64">نقطة التحرك</th>
                <th>نوع الدفع</th>
                <th className="w-52">الاجراءات</th>
              </tr>
            </thead>
            <tbody className="*:text-center  *:border-stone-50">
              {currentItems.map((item: any, index: any) => {
                if (item.attributes.confirmation === null) {
                  const currentColorClass =
                    index % 2 === 0 ? "bg-zinc-200" : "bg-zinc-300";

                  const firstName =
                    item.attributes.name?.split(" ").slice(0, 3).join(" ") ||
                    [];
                  const lastName = item.attributes.name?.split(" ").pop() || "";
                  // تحقق من الشرط قبل عرض البيانات
                  return (
                    <tr
                      className={` *:border-l hover:bg-zinc-500 hover:text-white ${currentColorClass}`}
                      key={index}
                    >
                      <td className="p-2">{counter++}</td>
                      <td className="text-right pr-2">{`${firstName} ${lastName}`}</td>
                      <td
                        className={
                          item.attributes.paymentstatus
                            ? "text-green-500 font-semibold text-sm"
                            : "text-red-500 font-semibold text-sm"
                        }
                      >{`${
                        item.attributes.paymentstatus ? "مدفوعة" : "غير مدفوعة"
                      }`}</td>
                      <td>
                        {item.attributes.typeofbag}- {item.attributes.price} ج
                      </td>

                      <td className="text-sm">
                        {`${
                          item.attributes.movepoint
                            ? item.attributes.movepoint +
                              ` - ${item.attributes.timing}`
                            : item.attributes.region
                        }`}
                      </td>
                      <td>{item.attributes.paymenttype}</td>
                      <td>
                        <button
                          onClick={() => PayBooking(item.id)}
                          className="bg-slate-100 text-slate-900 p-2 m-1 rounded hover:bg-slate-300"
                        >
                          <FaAmazonPay title="تحويل الى مدفوعة" />
                        </button>

                        <button
                          onClick={() => UnPayBooking(item.id)}
                          className="bg-slate-100 text-slate-900 p-2 m-1 rounded hover:bg-slate-300"
                        >
                          <GiPayMoney title="تحويل الى غير مدفوعة" />
                        </button>

                        <button
                          onClick={() => ConfirmBooking(item.id)}
                          className="bg-slate-100 text-white p-2 m-1 rounded hover:bg-slate-300"
                        >
                          <FcCheckmark title="تاكيد الحجز" />
                        </button>

                        <Link href={`/dashboard/bookings/update/${item.id}`}>
                          <ol className="bg-slate-100 p-2  rounded hover:bg-slate-300 text-gray-800 inline-flex">
                            <HiPencilAlt title="تعديل الحجز" />
                          </ol>
                        </Link>

                        <button
                          onClick={() => RejectBooking(item.id)}
                          className="bg-slate-100 text-white p-2 m-1 rounded hover:bg-slate-300"
                        >
                          <FcCancel title="رفض الحجز" />
                        </button>
                      </td>
                    </tr>
                  );
                } else {
                  // إذا لم يتوافق مع الشرط، يمكنك إرجاع شيء آخر أو تركه فارغًا

                  return null;
                }
              })}
            </tbody>
          </table>
          <div className="flex justify-center mt-5">
            <button
              onClick={() => setCurrentPage(prevPage)}
              className={`mx-2 p-2 rounded ${
                currentPage === prevPage
                  ? "bg-gray-300 text-gray-700"
                  : "bg-red-600 text-white"
              }`}
            >
              السابق
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`mx-2 p-2 px-5 rounded ${
                  currentPage === i + 1
                    ? "bg-red-600 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              key={nextPage}
              onClick={() => setCurrentPage(nextPage)}
              className={`mx-2 p-2 rounded ${
                currentPage === nextPage
                  ? "bg-gray-300 text-gray-700"
                  : "bg-red-600 text-white"
              }`}
            >
              التالي
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
