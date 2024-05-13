"use client";
import React, { useEffect, useState } from "react";
import useFetchTwo from "@/app/hooks/useFetchTwo";
import { StrapiClient } from "@/app/server/StrapiClient";
import { format } from "date-fns/format";
import { useRouter } from "next/navigation";
import GetControlDate from "./components/GetControlDate";
import { toast } from "react-toastify";
import { IoWarningOutline } from "react-icons/io5";
import { LuSendHorizonal } from "react-icons/lu";
import { parseISO } from "date-fns/parseISO";
import { ar } from "date-fns/locale/ar";

export default function BookingUi() {
  const { data, loading, error }: any = useFetchTwo("/users/me?populate=*");
  const { availableDays, GetEndTime } = GetControlDate();
  const [GetMedleMovePoint, setGetMedleMovePoint] = useState([]);
  const [username, setUserName] = useState("");
  const [region, setRegion] = useState("");
  const [regiontwo, setRegiontwo] = useState("");
  const [regionthree, setRegionthree] = useState("");
  const [movepoint, setMovepoint] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [timing, setTiming] = useState("");
  const [exittiming, setExittiming] = useState("");
  const [email, setEmail] = useState("");
  const [triptype, settriptype] = useState("");
  const [paymenttype, setPaymenttype] = useState("");
  const [price, setprice] = useState();
  const [avatar, setAvatar] = useState("");
  const [users_permissions_users, setUsers_permissions_users] = useState();
  const [error2, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading2, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    data && setUsers_permissions_users(data.id);
    data && setUserName(`${data.username}${data.lastname}`);
    data && setRegion(data.region);
    data && setRegiontwo(data.region);
    data && setMovepoint(data.movepoint);
    data && setPhone(data.primaryphone);
    data && setEmail(data.email);
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
    (item: any) => item.attributes.name === movepoint
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

  const dayBO =
    date &&
    format(parseISO(date), "eeee, d MMMM yyyy", {
      locale: ar,
    });

  const sendemail = async () => {
    const res = await fetch("/api/send-email", {
      method: "POST",
      body: JSON.stringify({
        subject: "تم حجز الرحلة بنجاح",
        amount: price,
        email: email,
        day: `تاريخ الحجز: ${dayBO}`,
        massage: "تم حجز الرحلة بنجاح فى انتظار تاكيد حجز الرحلة",
        fullName: `${data.username?.split(" ")[0] || ""}${
          data.lastname?.split(" ").pop() || ""
        }`,
      }),
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      !username ||
      !region ||
      !movepoint ||
      !phone ||
      !email ||
      !date ||
      !triptype ||
      !paymenttype ||
      !price ||
      !users_permissions_users
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
          region: regionthree == "" ? region : regionthree,
          movepoint,
          phone,
          email,
          date,
          timing,
          triptype,
          exittiming,
          paymenttype,
          price,
          users_permissions_users,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        setSuccess(true);
        sendemail();
        sendTelegramMessage();
        router.push("/profile");
        toast.success("تم حجز الرحلة بنجاح");
      } else {
        console.log("برجاء ملء الحقول بشكل صحيح");
      }
    } catch (error) {
      console.log("حدث خطأ أثناء التسجيل: ", error);
    }
  };

  const sendTelegramMessage = async () => {
    try {
      const token = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN;
      const chatId = `${process.env.NEXT_PUBLIC_TELEGRAM_CHATID}`;

      const message = `طلب حجز رحلة جديد
        الاسم: ${username}
        الهاتف: ${phone}
        تاريخ الرحلة: ${date}
        نوع الرحلة: ${triptype}
        موعد نهاية المحاضرة: ${exittiming}
        المنطقة: ${region}
        ${movepoint ? `نقطة التحرك: ${movepoint}` : ""}
        توقيت التحرك : ${timing}
        الدفع : ${paymenttype}
      `;

      const url = `https://api.telegram.org/bot${token}/sendMessage`;
      const params = new URLSearchParams({
        chat_id: chatId,
        text: message,
      });

      await fetch(url, {
        method: "POST",
        body: params,
      });
    } catch (error) {
      console.error("Failed to send message to Telegram:", error);
      throw error; // يمكنك رمي الخطأ مرة أخرى للتأكد من تماسكه للأقسام اللاحقة من الكود
    }
  };

  const city: any = ["فاقوس", "كوبري القصاصين"];

  const area: any = {
    فاقوس: ["بنك مصر"],
    "كوبري القصاصين": ["كوبري القصاصين"],
  };
  return (
    <section>
      <div className="m-auto text-center">
        {regiontwo == "الحسينية" || regiontwo == "أبو حماد" ? (
          <div className="grid grid-cols-1 sm:grid-cols-4 bg-yellow-400 rounded-md">
            <div className="sm:col-span-1 bg-slate-100 rounded-r-md">
              <span>
                <IoWarningOutline className="text-6xl text-center m-auto text-yellow-400 items-center animate-pulse" />
              </span>
            </div>
            <div className="sm:col-span-3">
              <h2 className="block font-medium p-2 border-r-8 border-yellow-600 ">
                الحجز غير متاح لمنطقتك الحالية برجاء اختيار منطقة بدلية من
                الخيارات المتاحة
              </h2>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <form
        id="form"
        action=""
        method="POST"
        className="mx-auto max-w-3xl px-4 py-5 sm:px-6 sm:py-5 lg:px-8"
        onSubmit={handleSubmit}
      >
        {regiontwo == "الحسينية" || regiontwo == "أبو حماد" ? (
          <>
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="regiontwo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  اختيار منطقة بديلة
                </label>
                <select
                  name="regiontwo"
                  id="regiontwo"
                  className="text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
                  value={regionthree}
                  onChange={(e) => setRegionthree(e.target.value)}
                  // disabled={!regionthree}
                  required
                >
                  <option value="" disabled hidden>
                    اختر
                  </option>
                  {city.map((country: any, index: any) => {
                    return (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="areatwo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  اختيار نقطة التحرك
                </label>
                <select
                  name="areatwo"
                  id="areatwo"
                  className="text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
                  value={movepoint}
                  onChange={(e) => setMovepoint(e.target.value)}
                  disabled={!regionthree}
                  required
                >
                  <option value="">اختر</option>
                  {area[regionthree]?.map((item: any, index: any) => {
                    return (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="border-t border-gray-900/10 mt-5"></div>
          </>
        ) : (
          ""
        )}
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
          )}
        </div>

        <div className="sm:col-span-3 mt-5">
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
          <div className="text-sm text-gray-900 mt-2 bg-red-300 p-5">
            {
              "برجاء ارسال قيمة الحجز على رقم (01012930010) مرفق معاه سكرين شوت للتحويل على واتساب لنفس الرقم"
            }
          </div>
        )}

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
            {loading ? "جاري إرسال البيانات..." : "حجــــز"}
            <LuSendHorizonal className="inline-block mr-3" />
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

        {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error2}
          </div>
        )}
      </form>
    </section>
  );
}
