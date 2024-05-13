"use client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns/format";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import GetControlDate from "./Components/GetControlDate";
import GetApiData from "@/app/server/GetApiData";

export default function GuestBookingUI() {
  const { availableDays, GetEndTime } = GetControlDate();
  const [GetMedleMovePoint, setGetMedleMovePoint] = useState([]);
  const [username, setUserName] = useState("");
  const [Region, setRegion] = useState("");
  const [Movepoint, setMovepoint] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [timing, setTiming] = useState("");
  const [exittiming, setExittiming] = useState("");
  const [email, setEmail] = useState("");
  const [triptype, settriptype] = useState("");
  const [paymenttype, setPaymenttype] = useState("");
  const [price, setprice] = useState();
  const [error2, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading2, setLoading] = useState(false);
  const [GetRegion, setGetRegion]: any = useState([]);

  const router = useRouter();

  useEffect(() => {
    getlestRegions_();
    getlestMovepoints_();
    GetCost();
  }, [triptype]);

  const getlestMovepoints_ = () => {
    GetApiData.GetMovePoints().then((res) => {
      setGetMedleMovePoint(res.data.data);
    });
  };

  const [selectedRegionData, setSelectedRegionData]: any = useState(null);

  useEffect(() => {
    // ابحث عن بيانات المنطقة المحددة في القائمة
    const selectedRegion = GetRegion.find(
      (region: any) => region.attributes.name === Region
    );
    if (selectedRegion) {
      // حدد البيانات المرتبطة بالمنطقة المحددة
      setSelectedRegionData(selectedRegion.attributes.movepoint.data);
    } else {
      setSelectedRegionData(null); // قم بمسح البيانات إذا لم يتم اختيار منطقة
    }
  }, [Region, GetRegion]);

  const getlestRegions_ = () => {
    GetApiData.GetRegone().then((res) => {
      setGetRegion(res.data.data);
    });
  };

  // البحث عن العنصر بواسطة الاسم
  const GetDataMP: any = GetMedleMovePoint.find(
    (item: any) => item.attributes.name === Movepoint
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      !username ||
      !Region ||
      !Movepoint ||
      !phone ||
      // !email ||
      !date ||
      !triptype ||
      !paymenttype ||
      !price
      // !users_permissions_users
    ) {
      setError("جميع الحقول ضرورية");
      return;
    }

    try {
      const res = await fetch("/api/user/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          region: Region,
          movepoint: Movepoint,
          phone,
          // email,
          date,
          timing,
          triptype,
          exittiming,
          paymenttype,
          price,
          // users_permissions_users,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        setSuccess(true);
        router.push("/profile");
        toast.success("تم حجز الرحلة بنجاح");
      } else {
        console.log("برجاء ملء الحقول بشكل صحيح");
      }
    } catch (error) {
      console.log("حدث خطأ أثناء التسجيل: ", error);
    }
  };
  return (
    <section>
      <form
        id="form"
        action=""
        method="POST"
        className="mx-auto max-w-3xl px-4 py-5 sm:px-6 sm:py-5 lg:px-8"
        onSubmit={handleSubmit}
      >
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {" "}
              الاسم الثلاثى{" "}
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                className="bg-gray-200 text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
                onChange={(e) => setUserName(e.target.value)}
                value={username}
                pattern="[ء-ي\s]+ [ء-ي\s]+ [ء-ي\s]+" // هذا النمط يسمح بإدخال الأحرف العربية فقط
                title="الرجاء إدخال الاسم باللغة العربية ويجب أن يكون الأسم ثلاثى على الأقل"
                required
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="primary phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {" "}
              رقم الهاتف{" "}
            </label>
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 flex items-center">
                <svg className="pointer-events-none absolute left-3 top-2 h-full w-5 text-gray-400 fill-red-600">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 
                0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 
                1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963
                3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </div>
              <input
                type="tel"
                name="primary phone"
                id="primary phone"
                autoComplete="primary phone"
                pattern="[0-5]{3}[0-9]{8}"
                title="من فضلك ادخل رقم الهاتف الصحيح"
                className="bg-gray-200 text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-10 block w-full focus:outline-red-500"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                required
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="Region"
              className="text-sm font-medium leading-6 text-gray-900"
            >
              المنطقة
            </label>
            <select
              name="Region"
              id="Region"
              autoComplete="Region"
              className="text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
              value={Region}
              onChange={(e) => setRegion(e.target.value)}
              required
            >
              <option value="" disabled hidden>
                اختر
              </option>
              {GetRegion.map((Region: any, index: any) => {
                return (
                  <option key={index} value={Region?.attributes?.name}>
                    {Region?.attributes?.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="Movepoint"
              className="text-sm font-medium leading-6 text-gray-900"
            >
              نقطة التحرك
            </label>
            <select
              name="Movepoint"
              id="Movepoint"
              className="text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
              value={Movepoint}
              onChange={(e) => setMovepoint(e.target.value)}
              required
              disabled={!selectedRegionData} // تعطيل حقل نقطة التحرك إذا لم يتم اختيار منطقة
            >
              <option value="">اختر</option>
              {selectedRegionData &&
                selectedRegionData.map((point: any, index: any) => (
                  <option key={index} value={point.attributes.name}>
                    {point.attributes.name}
                  </option>
                ))}
            </select>
          </div>

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
              <select
                name="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
                required
              >
                <option value="" disabled hidden>
                  اختر التاريخ
                </option>
                {availableDays.map((day: any) => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </select>
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
                disabled={!GetDataMP}
                required
              >
                <option value="" disabled hidden>
                  اختر
                </option>
                {GetDataMP &&
                  GetDataMP?.attributes.time.map((item: any, index: any) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <div className="sm:col-span-3">
            <label
              htmlFor="paymenttype"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              الدفع
            </label>
            <select
              name="paymenttype"
              id="paymenttype"
              className="text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
              value={paymenttype}
              onChange={(e) => setPaymenttype(e.target.value)}
              required
            >
              <option value="" disabled hidden>
                اختر
              </option>
              <option value="نقداً">نقداً</option>
              <option value="فودافون كاش">فودافون كاش</option>
            </select>
          </div>

          {paymenttype === "فودافون كاش" && (
            <div className="sm:col-span-6">
              <div className="text-sm text-gray-900 bg-red-300 p-5">
                {
                  "برجاء ارسال قيمة الحجز على رقم (01012930010) مرفق معاه سكرين شوت للتحويل على واتساب لنفس الرقم"
                }
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-900/10 mt-3"></div>
        <div className="mt-3">
          <h3>
            <span className="text-red-500 font-medium">تكلفة الرحلة : </span>
            {`${price ? price : "0"} ج.م`}
          </h3>
        </div>
        <div className="border-t border-gray-900/10 mt-3"></div>

        <div className="mt-5">
          <button
            type="submit"
            name="submit"
            id="submit"
            className="block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm 
             focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600
            bg-red-700 hover:bg-red-800"
          >
            {loading2 ? "جاري إرسال البيانات..." : "تسجيل"}
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
            تم تسجيل الحجز بنجاح
          </div>
        )}

        {error2 && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error2}
          </div>
        )}
      </form>
    </section>
  );
}
