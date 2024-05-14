"use client";
import React, { useEffect, useState } from "react";
import useFetchTwo from "@/app/hooks/useFetchTwo";
import { StrapiClient } from "@/app/server/StrapiClient";
import { format } from "date-fns/format";
import { useRouter } from "next/navigation";
import GetControlDate from "./components/GetAvailableDays";
import { toast } from "react-toastify";
import { LuSendHorizonal } from "react-icons/lu";
import { parseISO } from "date-fns/parseISO";
import { ar } from "date-fns/locale/ar";

export default function BookingBagUI() {
  const { data, loading, error }: any = useFetchTwo("/users/me?populate=*");
  const { availableDays, GetEndTime } = GetControlDate();
  const [GetMedleMovePoint, setGetMedleMovePoint] = useState([]);
  const [username, setUserName] = useState("");
  const [region, setRegion] = useState("");
  const [movepoint, setMovepoint] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [timing, setTiming] = useState("");
  const [universityhousing, setuniversityhousing] = useState("");
  const [email, setEmail] = useState("");
  const [typeofbag, settypeofbag] = useState("");
  const [paymenttype, setPaymenttype] = useState("");
  const [price, setprice]: any = useState("");
  const [avatar, setAvatar] = useState("");
  const [user, setUser] = useState();
  const [error2, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading2, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    data && setUser(data.id);
    data && setUserName(`${data.username}${data.lastname}`);
    data && setRegion(data.region);
    data && setMovepoint(data.movepoint);
    data && setPhone(data.primaryphone);
    data && setEmail(data.email);
    data && setuniversityhousing(data.secondaryaddress);
    GetPrise();
    GetCost();
  }, [data, typeofbag]);

  const GetPrise = () => {
    StrapiClient.get(`/movepoints`).then((res) => {
      setGetMedleMovePoint(res.data.data);
    });
  };

  function GetCost() {
    if (typeofbag === "شنطة أكل صغيرة") {
      setprice("40");
    } else if (typeofbag === "شنطة سفر") {
      setprice("60");
    } else if (typeofbag === "أخري") {
      setprice("75");
    }
  }

  //   console.log(price)

  // البحث عن العنصر بواسطة الاسم
  const GetDataMP: any = GetMedleMovePoint.find(
    (item: any) => item.attributes.name === movepoint
  );

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
        subject: "تم حجز توصيل شنطة بنجاح",
        amount: price,
        email: email,
        day: `تاريخ الحجز: ${dayBO}`,
        massage: "تم حجز توصيل حجز شنطة بنجاح فى انتظار تاكيد الطلب",
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
      !typeofbag ||
      !universityhousing ||
      !paymenttype ||
      !price ||
      !user
    ) {
      setError("جميع الحقول ضرورية");
      return;
    }

    try {
      const res = await fetch("/api/user/bookingbag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          region,
          movepoint,
          phone,
          email,
          date,
          timing,
          typeofbag,
          universityhousing,
          paymenttype,
          price,
          user,
        }),
      });

      if (res.ok) {
        sendemail();
        sendTelegramMessage();
        const form = e.target;
        form.reset();
        setSuccess(true);
        router.push("/profile");
        toast.success("تم الحجز بنجاح");
      } else if (res.status === 500) {
        // تحقق من حالة الاستجابة 500
        // console.log("غير مسموح بالحجز");
        setError("غير مسموح بالحجز الرجاء الاتصال بإدارة الموقع");
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

      const message = `طلب حجز  توصيل شنطة جديد
          الاسم: ${username}
          الهاتف: ${phone}
          تاريخ الرحلة: ${date}
          نوع الشنطة: ${typeofbag}
          المنطقة: ${region}
          ${movepoint ? `نقطة التحرك: ${movepoint}` : ""}
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
              htmlFor="TripType"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              نوع الشنطة
            </label>
            <select
              name="TripType"
              id="TripType"
              className="text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
              value={typeofbag}
              onChange={(e) => settypeofbag(e.target.value)}
              required
            >
              <option value="" disabled hidden>
                اختر الشنطة
              </option>
              <option value="شنطة أكل صغيرة">شنطة أكل صغيرة</option>
              <option value="شنطة سفر">شنطة سفر</option>
              <option value="أخري">أخري</option>
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

              {/* <option value="">{GetDataMP?.attributes.time}</option> */}

              {GetDataMP?.attributes.time.map((item: any, index: any) => {
                if (index === 1) {
                  return null;
                }
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}

              {/* {GetDataMP?.attributes.time.map((item: any, index: any) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))} */}
            </select>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="time"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              الدفع
            </label>
            <div className="sm:col-span-3">
              <select
                name="time"
                id="time"
                value={paymenttype}
                onChange={(e) => setPaymenttype(e.target.value)}
                className="text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
                required
              >
                <option value="" disabled hidden>
                  اختر
                </option>

                <option value="نقداً">نقداً</option>
                <option value="فودافون كاش">فودافون كاش</option>
              </select>
            </div>
          </div>
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

        {error2 && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error2}
          </div>
        )}
      </form>
    </section>
  );
}
