"use client";
import { useState } from "react";

export default function Complaint() {
  const [senderName, setSenderName] = useState<string>("");
  const [complainantPhone, setComplainantPhone] = useState<string>("");
  const [complaint, setComplaint] = useState<string>("");
  const [success, setSuccess] = useState(false);

  const handleSenderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenderName(e.target.value);
  };

  const handleComplainantPhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setComplainantPhone(e.target.value);
  };

  const handleComplaintChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComplaint(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendTelegramMessage("");
    setSenderName(""),
      setComplainantPhone(""),
      setComplaint(""),
      setSuccess(true); // تعيين الحالة إلى نجاح

    // يمكنك هنا إرسال الشكوى إلى الخادم أو إجراء أية إجراءات أخرى
  };

  const sendTelegramMessage = async (data: any) => {
    try {
      const token = "6783301682:AAFOfp15Yklus6GUyrOBEnJbrI0JYIsNEaQ";
      const chatId = "-1001953556022";

      const message = `شكوي جديدة
          الاسم: ${senderName}
          الهاتف: ${complainantPhone}
          الشكوي أو الاقتراح : ${complaint}
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
    <div className="max-w-md mx-auto mt-20 container mb-10 p-5">
      <h1 className="text-2xl font-bold mb-4 text-red-700">
        الأقتراحات والشكاوى
      </h1>
      <div className="border-t border-gray-900/10 mt-3"></div>
      <p className="text-gray-900 mt-5 mb-5">
        التعامل مع الاقتراحات والشكاوي المقدمة من قبل متلقي الخدمة بهدف التواصل
        معهم ومعرفة أسباب عدم رضاهم عن الخدمات والاجراءات المقدمة لهم بالاضافة
        إلى الاستفادة من اقتراحاتهم وأفكارهم من أجل التحسين والتطوير على الخدمات
        باستمرار.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="fullname"
          >
            اسم المرسل:
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={senderName}
            onChange={handleSenderNameChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-red-600 text-gray-900"
            pattern="[ء-ي\s]+ [ء-ي\s]+ [ء-ي\s]+" // هذا النمط يسمح بإدخال الأحرف العربية فقط
            title="الرجاء إدخال الاسم باللغة العربية ويجب أن يكون الأسم ثلاثى على الأقل"
            required
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="phone"
          >
            رقم الهاتف
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            autoComplete="phone"
            pattern="[010&011&012&015]{3}[0-9]{8}"
            title="برجاء ادخال رقم الهاتف بشكل صحيح"
            value={complainantPhone}
            onChange={handleComplainantPhoneChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-red-600 text-right text-gray-900"
            required
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="text"
          >
            الأقتراح أو الشكوى
          </label>
          <textarea
            id="text"
            name="text"
            value={complaint}
            onChange={handleComplaintChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-red-600 text-gray-900"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700"
        >
          إرسال
        </button>
        {success && (
          <div
            className="mb-3 inline-flex w-full items-center rounded-lg bg-green-100 px-6 py-5 text-base text-green-700"
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
            تم استقبال رسالتكم بنجاح !
          </div>
        )}
      </form>
    </div>
  );
}
