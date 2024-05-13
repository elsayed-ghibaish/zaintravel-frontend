import React from "react";

const BookingAndLuggageTerms = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-red-800 mb-4 text-center">
            شروط حجز الرحلات والشنط
          </h2>

          {/* Booking Terms */}
          <h3 className="text-lg sm:text-xl font-semibold text-red-700 mb-2">
            شروط حجز الرحلات:
          </h3>
          <TermDetail title="مواعيد الحجز:">
            <ul className="list-disc pl-5 text-gray-600">
              <li>الحجز متاح يوميًا حتى الساعة السادسة مساءً.</li>
              <li>يُتطلب الحجز قبل تاريخ الرحيل بفترة لا تقل عن 24 ساعة.</li>
            </ul>
          </TermDetail>
          <TermDetail title="معلومات الهوية للمسافرين:">
            <ul className="list-disc pl-5 text-gray-600">
              <li>
                يجب تقديم معلومات هوية صحيحة للمسافرين بما فى ذلك الاسم بالكامل
                وارقام الهواتف الصحيحة.
              </li>
            </ul>
          </TermDetail>
          <TermDetail title="حجز المرافقين:">
            <ul className="list-disc pl-5 text-gray-600">
              <li>طريقة الحجز: مماثلة لحجز المسافر الرئيسي.</li>
              <li>تأكيد الحجز: عبر رسالة على الواتساب تتضمن اسم المرافق.</li>
            </ul>
          </TermDetail>
          <TermDetail title="في حال إغلاق الحجز:">
            <ul className="list-disc pl-5 text-gray-600">
              <li>
                التواصل عبر واتساب على الرقم 01012930010 وانتظار الرد للتحقق من
                توافر أماكن إضافية.
              </li>
            </ul>
          </TermDetail>
          <TermDetail title="ملاحظات هامة">
            <ul className="list-disc pl-5 italic text-gray-600">
              <li>
                الشروط: لن يتم قبول حجز لأشخاص غير موجودين في الجروب الرئيسي أو
                لديهم بيانات خاطئة.
              </li>
              <li>الالتزام: ضرورة الالتزام بمواعيد الرحلات المحددة.</li>
            </ul>
          </TermDetail>

          {/* ... Other Booking Terms ... */}
          {/* Luggage Terms */}
          <h3 className="text-lg sm:text-xl font-semibold text-red-700 mt-6 mb-2">
            شروط حجز الشنط:
          </h3>
          <TermDetail title="الشنط المسموح بها بشكل مجاني مع المسافر:">
            <ul className="list-disc pl-5 text-gray-600">
              <li>
                يُسمح بشنطة سفر متوسطة واحدة بالإضافة إلى شنطة كتف صغيرة، ويجب
                أن لا يتجاوز وزن الاثنين معًا 20 كيلو.
              </li>
            </ul>
          </TermDetail>
          <TermDetail title="الشنط الإضافية:">
            <ul className="list-disc pl-5 text-gray-600">
              <li>الرسوم: 50 جنيه لكل قطعة إضافية بوزن لا يتجاوز 15 كيلو.</li>
              <li>الحد الأقصى: لا يسمح بأكثر من قطعتين إضافيتين.</li>
            </ul>
          </TermDetail>
          <TermDetail title="قيود الشنط:">
            <ul className="list-disc pl-5 text-gray-600">
              <li>الممنوعات: الشنط الكبيرة وأكياس البلاستيك والأجولة.</li>
              <li>الشرط: استخدام شنط سفر مناسبة.</li>
            </ul>
          </TermDetail>
          <TermDetail title="إرسال الشنط للطلبة:">
            <ul className="list-disc pl-5 text-gray-600">
              <li>الحجز عبر الموقع الرسمي فقط.</li>
              <li>ملاحظة: لن يتم قبول أي شنط بدون حجز مسبق.</li>
            </ul>
          </TermDetail>
          <TermDetail title="أسعار الشنط:">
            <ul className="list-disc pl-5 text-gray-600">
              <li>شنطة أكل صغيرة: 50 جنيه.</li>
              <li>شنطة سفر متوسطة: 100 جنيه.</li>
              <li>شنطة سفر كبيرة: 150 جنيه.</li>
              <li>الحد الادنى لارسال اى شئ : 50 جنيه.</li>
            </ul>
          </TermDetail>
          <TermDetail title="مواعيد إرسال الشنط:">
            <ul className="list-disc pl-5 text-gray-600">
              <li>
                الحسينية وأبو حماد وكفر صقر: السبت والأحد (والاثنين لكفر صقر).
              </li>
              <li>فاقوس: الثلاثاء والأربعاء والخميس.</li>
            </ul>
          </TermDetail>
          <TermDetail title="تنويهات هامة:">
            <ul className="list-disc pl-5 text-gray-600">
              <li>الدفع: عبر فودافون كاش على الرقم 01012930010.</li>
              <li>
                الشروط: في حال وجود أي خلاف، يتم دفع باقي المبلغ أثناء تسليم
                الشنط.
              </li>
            </ul>
          </TermDetail>
          <TermDetail title="ملاحظة أخيرة:">
            <ul className="list-disc pl-5 text-gray-600">
              <li>
                المسؤولية: الشركة غير مسئولة عن إرسال الشنط عبر طرق أو أشخاص غير
                مصرح بهم.
              </li>
            </ul>
          </TermDetail>

          {/* ... Other Luggage Terms ... */}
          

          {/* ... Rest of the Terms ... */}
        </div>
      </div>
    </div>
  );
};

const TermDetail = ({ title, children }: any) => (
  <div className="mb-6">
    <h4 className="text-md sm:text-lg font-medium text-gray-700 mb-1">
      {title}
    </h4>
    {children}
  </div>
);

export default BookingAndLuggageTerms;
