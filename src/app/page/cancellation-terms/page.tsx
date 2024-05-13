import React from 'react';

const CancellationPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-red-700 mb-4">شروط إلغاء الحجز</h2>

          <div className="mb-5">
            <h3 className="text-lg sm:text-xl font-medium text-gray-700 mb-2">1. الإلغاء قبل الساعة 6 مساءً:</h3>
            <p className="text-gray-600 text-sm sm:text-base">يجب إرسال رسالة إلغاء عبر الواتساب إلى الرقم 01012930010 قبل الساعة السادسة مساءً.</p>
          </div>

          <div className="mb-5">
            <h3 className="text-lg sm:text-xl font-medium text-gray-700 mb-2">2. الإلغاء بعد الساعة 6 مساءً:</h3>
            <ul className="list-disc pl-5 text-gray-600 text-sm sm:text-base">
              <li>تحويل مبلغ 100 جنيه مصري فورًا عبر فودافون كاش إلى الرقم 01012930010.</li>
              <li>في حالة تكرار الإلغاء، يُطلب دفع كامل مبلغ الحجز.</li>
              <li>إذا لم يتم الدفع، لن يتم قبول أي حجوزات مستقبلية حتى يتم سداد جميع المبالغ المستحقة.</li>
            </ul>
          </div>

          <div className="text-gray-600 italic text-sm sm:text-base">
            <p>ملاحظة: يُسمح بإلغاء الحجز دون رسوم في الظروف القهرية فقط.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CancellationPolicy;
