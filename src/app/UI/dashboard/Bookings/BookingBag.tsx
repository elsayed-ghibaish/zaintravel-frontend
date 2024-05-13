"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import useFetch from "@/app/hooks/useFetch";
import { format } from "date-fns/format";
import { addDays, parseISO } from "date-fns";
import { StrapiClient } from "@/app/server/StrapiClient";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";
import { FcCancel } from "react-icons/fc";
import { toast } from "react-toastify";
import axios from "axios";

export default function BookingBag() {
  const { data, loading, error }: any = useFetch("/regions");

  const [datatwo, setdatatwo]: any = useState([]);
  const [dataThree, setDataThree]: any = useState();
  const [dataFour, setDataFour]: any = useState([]);
  const [totalPrice2, settotalPrice2]: any = useState([]);
  const [OperatingCosts, setOperatingCosts]: any = useState([]);

  const [BookingDay, setBookingDay] = useState(
    format(addDays(new Date(), 1), "yyyy-MM-dd")
  );
  const [selectedCities, setselectedCities] = useState<string[]>([]);
  const [selectedTypeOfTrip, setselectedTypeOfTrip] = useState<string | null>(
    null
  );
  const [TimingMov, setTimingMov] = useState<string>("");
  const [TimingEnd, setTimingEnd] = useState<string>("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30); // تحديد عدد العناصر في كل صفحة

  let counter = 1; // تهيئة متغير الـ counter لكل بيان

  useEffect(() => {
    setDataThree(data?.data);
    GetBookings();
    GetControls();
  }, [data]);

  const GetBookings = () => {
    StrapiClient.get(`/bookingbags`).then((res) => {
      setdatatwo(res.data.data);
    });
  };

  const GetControls = () => {
    StrapiClient.get(`/controls/1`).then((res) => {
      setDataFour(res.data.data);
    });
  };

  // Reject Booking item
  const RejectBooking = async (id: any) => {
    const confirmed = confirm("هل أنت متاكد من إلغاء الحجز");
    if (confirmed) {
      const Urlc = process.env.NEXT_PUBLIC_STRAPI_URL_API;
      try {
        const res = await axios.put(`${Urlc}/bookings/${id}`, {
          data: {
            valded: false,
          },
        });

        if (res.status !== 200) {
          throw new Error(
            `Failed to delete booking. Server response: ${res.statusText}`
          );
        }
        toast.success("تم إلغاء الحجز بنجاح");
        // تحديث حالة البيانات بعد الحذف
        const updatedData = datatwo.filter((item: any) => item.id !== id);
        setdatatwo(updatedData);
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

  // Print Page Button
  const handlePrint = () => {
    // يمكنك وضع الكود الذي يتم تنفيذه عند النقر على الزر هنا
    window.print();
  };

  // فلترة البيانات واستبعاد التي لا تستوفي الشرط
  const filteredData = datatwo
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
    .filter((item: any) => item.attributes.confirmation === true);

  // حساب عدد الصفحات الإجمالي بناءً على البيانات المفلترة
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // حساب مؤشر البداية والنهاية للعناصر في الصفحة الحالية
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // إضافة متغيرات لحساب الصفحة السابقة والتالية
  const nextPage = currentPage < totalPages ? currentPage + 1 : currentPage;
  const prevPage = currentPage > 1 ? currentPage - 1 : currentPage;

  useEffect(() => {
    if (currentItems && currentItems.length > 0) {
      const totalPrice = filteredData.reduce((acc: number, item: any) => {
        // تحويل قيمة السعر إلى عدد وإضافتها إلى الناتج الجزئي
        return acc + parseFloat(item.attributes.price);
      }, 0);
      settotalPrice2(totalPrice);
    }
  }, [currentItems]);

  // console.log(dataFour?.attributes.GoingTime);
  return (
    <div className="print:my-10">
      <div className="flex my-5">
        <h2 className="m-auto items-center text-center text-red-600 font-bold">
          كشف حجز توصيل الشنط
        </h2>
      </div>
      <div className="mt-10 bg-slate-300 border-2 border-white shadow-sm rounded-t-lg grid grid-cols-6 gap-x-7 gap-y-2 sm:grid-cols-9 p-5  print:hidden print:bg-none">
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
          {dataThree?.map((cityName: any) => (
            <label
              htmlFor={`checkboxes-2-${cityName.id}`}
              key={cityName.id}
              className="flex m-auto items-center justify-center cursor-pointer"
            >
              <input
                type="checkbox"
                id={`checkboxes-2-${cityName.id}`}
                name={`checkboxes-2-${cityName.id}`}
                className="ml-2 border shadow form-checkbox h-5 w-5   text-red-700 focus:ring-red-600 accent-red-600 overflow-auto"
                value={cityName.attributes.name}
                checked={selectedCities.includes(cityName.attributes.name)}
                onChange={() => handleCityChange(cityName.attributes.name)}
              />
              {cityName.attributes.name}
            </label>
          ))}
        </div>

        <div className="sm:col-span">
          <label
            htmlFor="connter-6"
            className="block text-sm w-36 font-medium leading-6 text-gray-900"
          >
            عدد الصفوف
          </label>
          <input
            type="number"
            id="connter-6"
            name="connter-6"
            min={1}
            value={itemsPerPage}
            onChange={(e) => {
              const newValue = parseInt(e.target.value);
              if (!isNaN(newValue) && newValue > 0) {
                setItemsPerPage(newValue);
              }
            }}
            className="text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
          />
        </div>

        <div className="sm:col-span">
          <label
            htmlFor="OperatingCosts-2"
            className="block text-sm w-36 font-medium leading-6 text-gray-900"
          >
            تكاليف تشغيل
          </label>
          <input
            type="number"
            id="OperatingCosts-2"
            name="OperatingCosts-2"
            min={0}
            value={OperatingCosts}
            onChange={(e) => setOperatingCosts(Number(e.target.value))}
            className="text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
          />
        </div>
      </div>

      <div className="bg-slate-50 border-2 border-white shadow-sm rounded-b-lg p-5 print:rounded-none print:border-none print:p-0 print:shadow-none">
        <table className="table-fixed w-full overflow-auto lg:inline-table md:flow-root sm:inline-table flow-root">
          <thead className="bg-slate-300 text-slate-700">
            <tr className="*:p-3 *:border-l *:font-bold text-sm">
              <th className="w-14">م</th>
              <th className="w-52">الاسم</th>
              <th>نوع الرحلة</th>
              <th>المواعيد</th>
              <th className="w-40">نقطة التحرك</th>
              <th>رقم التليفون</th>
              <th>نوع الدفع</th>
              <th className="print:hidden">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="*:text-center  *:border-stone-50">
            {currentItems?.map((item: any) => {
              if (item.attributes.confirmation === true) {
                const currentColorClass =
                  item.id % 2 === 0 ? "bg-zinc-200" : "bg-zinc-300";

                const firstName =
                  item.attributes.name?.split(" ").slice(0, 3).join(" ") || [];
                const lastName = item.attributes.name?.split(" ").pop() || "";

                return (
                  <tr
                    className={` *:border *:border-l *:border-gray-100 ${currentColorClass}`}
                    key={item.id}
                  >
                    <td className="border border-l border-gray-100 p-2">
                      {counter++}
                    </td>
                    <td className="pr-2 text-right">{`${firstName} ${lastName}`}</td>
                    <td>{`${
                      selectedTypeOfTrip
                        ? selectedTypeOfTrip
                        : item.attributes.triptype
                    }`}</td>
                    <td>{item.attributes.exittiming}</td>
                    <td className="text-sm">
                      {`${
                        item.attributes.movepoint
                          ? item.attributes.movepoint +
                            ` - ${
                              item.attributes.timing?.split("-")[0]
                                ? item.attributes.timing?.split("-")[0]
                                : ""
                            }`
                          : item.attributes.region
                      }`}
                    </td>
                    <td>{item.attributes.phone}</td>
                    <td className="bolder border-l border-gray-100 text-sm">
                      {item.attributes.paymenttype}
                    </td>
                    <td className="print:hidden">
                      <Link
                        href={`/dashboard/bookings/update/${item.id}`}
                        id={item.id}
                      >
                        <ol className="bg-slate-100 p-2  rounded hover:bg-slate-300 inline-flex">
                          <HiPencilAlt title="تعديل" />
                        </ol>
                      </Link>

                      <button
                        onClick={() => RejectBooking(item.id)}
                        className="bg-slate-100 text-white p-2 m-1 rounded hover:bg-slate-300"
                      >
                        <FcCancel title="إلغاء الحجز" />
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

        <div className="flex justify-between p-5 print:hidden">
          <h4 className="text-xl font-bold text-red-500">
            التكلفة: <span>{totalPrice2 - OperatingCosts} ج.م </span>
          </h4>

          <div className="flex justify-end print:hidden">
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
