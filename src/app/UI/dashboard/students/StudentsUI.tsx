"use client";
import React, { useEffect, useState } from "react";
import useFetch from "@/app/hooks/useFetch";
import Sidebar from "../Components/Sidebar";
import NextBreadcrumb from "@/app/Components/NextBreadcrumb";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import { FcCancel } from "react-icons/fc";
import { StrapiClient } from "@/app/server/StrapiClient";
import { format, parseISO } from "date-fns";
import { ar } from "date-fns/locale";

export default function StudentsUI() {
  // const { data, loading, error }: any = useFetch("/users");
  const { data, loading, error }: any = useFetch("/regions");
  const [datatwo, setdatatwo]: any = useState([]);
  const [dataThree, setDataThree]: any = useState();
  const [dataFour, setDataFour]: any = useState([]);
  const [selectedCities, setselectedCities] = useState<string[]>([]);
  const [selectedTypeOfTrip, setselectedTypeOfTrip] = useState<string | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30); // تحديد عدد العناصر في كل صفحة

  let counter = 1; // تهيئة متغير الـ counter لكل بيان

  useEffect(() => {
    setDataThree(data?.data);
    GetBookings();
  }, [data]);

  const GetBookings = () => {
    StrapiClient.get(`/users?populate=*`).then((res) => {
      setdatatwo(res.data);
    });
  };

  const handleCityChange = (city: string) => {
    const updatedCities = selectedCities.includes(city)
      ? selectedCities.filter((c) => c !== city)
      : [...selectedCities, city];

    setselectedCities(updatedCities);
  };

  // فلترة البيانات واستبعاد التي لا تستوفي الشرط
  const filteredData = datatwo.filter((item: any) => {
    // تحقق من المنطقة
    if (selectedCities.length > 0 && !selectedCities.includes(item.region)) {
      return false;
    }

    // العنصر يفي بجميع شروط الفلتر
    return true;
  });

  // حساب عدد الصفحات الإجمالي بناءً على البيانات المفلترة
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // حساب مؤشر البداية والنهاية للعناصر في الصفحة الحالية
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // إضافة متغيرات لحساب الصفحة السابقة والتالية
  const nextPage = currentPage < totalPages ? currentPage + 1 : currentPage;
  const prevPage = currentPage > 1 ? currentPage - 1 : currentPage;

  console.log(data);
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

          <div className="bg-slate-300 mt-5 border-2 border-white shadow-sm rounded-t-lg grid grid-cols-6 gap-x-7 gap-y-2 sm:grid-cols-9 p-5  print:hidden print:bg-none">
            <div className="sm:col-span-6 lg:flex bg-slate-200 p-1 rounded-md">
              <span className="text-2 font-medium text-gray-900 justify-center flex items-center">
                حسب المدينة
              </span>
              {dataThree?.map((cityName: any) => (
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

            <div className="sm:col-span">
              <label
                htmlFor="connter-3"
                className="block text-sm w-36 font-medium leading-6 text-gray-900"
              >
                عدد الصفوف
              </label>
              <input
                type="number"
                id="connter-3"
                name="connter-3"
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
          </div>

          <div className="bg-slate-50 border-2 border-white shadow-sm rounded-b-lg p-5 print:rounded-none print:border-none print:p-0 print:shadow-none">
            <table className="table-fixed w-full overflow-auto lg:inline-table md:flow-root sm:inline-table flow-root">
              <thead className="bg-slate-300 text-slate-700">
                <tr className="*:p-3 *:border-l *:font-bold text-sm">
                  <th className="w-14">م</th>
                  <th className="w-60">الاسم</th>
                  <th>المنطقة</th>
                  <th>البريد الالكترونى</th>
                  <th>رقم التليفون</th>
                  <th className="w-40">تاريخ الانضام</th>
                  <th>الحالة</th>
                  <th className="print:hidden">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="*:text-center  *:border-stone-50">
                {currentItems?.map((item: any) => {
                  const firstName =
                    item.username?.split(" ").slice(0, 3).join(" ") || [];
                  const lastName = item.lastname?.split(" ").pop() || "";

                  return (
                    <tr
                      className={` *:border *:border-l *:border-gray-100  ${
                        item.id % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
                      }`}
                      key={item.id}
                    >
                      <td className="border border-l border-gray-100 p-2">
                        {counter++}
                      </td>
                      <td className="pr-2 text-right"><img className="inline-block h-6 ml-5 w-6 rounded-full ring-2 ring-white" src={item.avatar?.formats?.small.url} alt="" />{`${firstName} ${lastName}`}</td>
                      <td>{item.region}</td>
                      <td>{item.email}</td>
                      <td>{item.primaryphone}</td>
                      <td className="text-sm">${format(parseISO(item.createdAt), "MM yyyy dd", {
                        locale: ar,
                      })}</td>
                      <td className="bolder border-l border-gray-100 text-sm">
                        {item.confirmed === true ? (
                          <span className="list-disc text-green-500">
                            ◉ نشط
                          </span>
                        ) : (
                          <span className="list-disc text-red-500">
                            ◉ موقوف
                          </span>
                        )}
                      </td>
                      <td className="print:hidden">
                        <a
                          href={`/dashboard/students/student/${item.id}`}
                          id={item.id}
                        >

                          <ol className="bg-slate-100 p-2  rounded hover:bg-slate-300 inline-flex">
                            <HiPencilAlt title="تعديل" />
                          </ol>
                        </a>

                        <button className="bg-slate-100 text-white p-2 m-1 rounded hover:bg-slate-300">
                          <FcCancel title="إلغاء الحجز" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="flex justify-end p-5 print:hidden">
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
        </section>
      </div>
    </div>
  );
}
