"use client";
import React, { useEffect, useState } from "react";
import RegionApis from "@/app/server/RegionApis";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function RegisterUi() {
  const [username, setusername] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [PrimaryPhone, setPrimaryPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmed, setConfirmed] = useState(true);
  const [error, setError] = useState("");

  const [PrimaryAddress, setPrimaryAddress] = useState("");
  const [SecondaryPhone, setSecondaryPhone] = useState("");
  const [Region, setRegion] = useState("");
  const [MovePoint, setMovePoint] = useState("");

  const [University, setUniversity] = useState("");
  const [college, setCollege] = useState("");
  const [SecondaryAddress, setSecondaryAddresse] = useState("");

  const [GetRegion, setGetRegion]: any = useState([]);
  const [GetUniversity, setGetUniversity]: any = useState([]);
  const [classroom, setClassroom] = useState("");

  const [success, setSuccess] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false); // إضافة حالة للتحكم في حالة التحميل

  const [selectedTime, setSelectedTime] = useState([]); // إضافة حالة للتحكم في حالة التحميل

  const handleCheckboxChange = () => {
    setAgreeTerms(!agreeTerms);
    setSubmitButtonDisabled(!!agreeTerms); // تعطيل زر الإرسال عند عدم الموافقة
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(event.target.value);
    setMovePoint(""); // Reset the selected state when the country changes
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMovePoint(event.target.value);
  };

  const [selectedRegionData, setSelectedRegionData]: any = useState(null);
  const [selectedUniversityData, setSelectedUniversityData]: any =
    useState(null);

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

    const selectedUniversity = GetUniversity.find(
      (university: any) => university.attributes.name === University
    );
    if (selectedUniversity) {
      // حدد البيانات المرتبطة بالمنطقة المحددة
      setSelectedUniversityData(selectedUniversity.attributes.college.data);
    } else {
      setSelectedUniversityData(null); // قم بمسح البيانات إذا لم يتم اختيار منطقة
    }
  }, [Region, GetRegion, University, GetUniversity]);

  useEffect(() => {
    getlestRegions_();
    getlestUniversitys_();
  }, []);

  const getlestRegions_ = () => {
    RegionApis.GetRegone().then((res) => {
      setGetRegion(res.data.data);
    });
  };

  const getlestUniversitys_ = () => {
    RegionApis.GetUniversity().then((res) => {
      setGetUniversity(res.data.data);
    });
  };

  // console.log(productList);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      !username ||
      !lastName ||
      !email ||
      !PrimaryPhone ||
      !password ||
      !confirmed ||
      !PrimaryAddress ||
      !SecondaryPhone ||
      !Region ||
      !MovePoint ||
      !University ||
      !college ||
      !classroom ||
      !SecondaryAddress
    ) {
      setError("برجاء استكمال جميع البيانات بشكل صحيح");
      return;
    }

    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          lastName,
          email,
          PrimaryPhone,
          password,
          confirmed,
          PrimaryAddress,
          SecondaryPhone,
          Region,
          MovePoint,
          University,
          college,
          classroom,
          SecondaryAddress,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/sign-in");
        toast.success("تم تسجيل طالب جديد بنجاح");
      } else {
        console.log("برجاء ملء الحقول بشكل صحيح");
      }
    } catch (error) {
      console.log("حدث خطأ أثناء التسجيل: ", error);
    }
  };

  return (
    <section>
      <div className="mt-5"></div>
      <div className="mx-auto max-w-2xl text-center mt-20">
        <h2 className="text-3xl font-bold tracking-tight text-red-600 sm:text-4xl font-tajawal">
          تسجيل بيانات طالب جديد
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600 font-tajawal">
          برجاء تعبئة البيانات التالية بشكل صحيح
        </p>
      </div>

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
                onChange={(e) => setusername(e.target.value)}
                value={username}
                pattern="[ء-ي\s]+ [ء-ي\s]+ [ء-ي\s]+" // هذا النمط يسمح بإدخال الأحرف العربية فقط
                title="الرجاء إدخال الاسم باللغة العربية ويجب أن يكون الأسم ثلاثى على الأقل"
                required
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {" "}
              اللقب ( اسم العائلة ){" "}
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="last-name"
                id="last-name"
                className="bg-gray-200 text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                pattern="[ء-ي\s]+" // هذا النمط يسمح بإدخال الأحرف العربية فقط
                title="الرجاء إدخال الاسم باللغة العربية ويجب أن يكون الأسم ثلاثى على الأقل"
                required
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {" "}
              البريد الجامعي{" "}
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="bg-gray-200 text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                // pattern=" " // هذا النمط يسمح بإدخال الأحرف العربية فقط
                title="الرجاء إدخال الاسم باللغة العربية ويجب أن يكون الأسم ثلاثى على الأقل"
                required
                dir="ltr"
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
                onChange={(e) => setPrimaryPhone(e.target.value)}
                value={PrimaryPhone}
                required
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {" "}
              كلمة المرور{" "}
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                className="bg-gray-200 text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                // pattern="[ء-ي\s]+ [ء-ي\s]+ [ء-ي\s]+" // هذا النمط يسمح بإدخال الأحرف العربية فقط
                title="الرجاء إدخال الاسم باللغة العربية ويجب أن يكون الأسم ثلاثى على الأقل"
                required
              />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-900/10 mt-10 mb-10"></div>
        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="primary address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {" "}
              العنوان الاساسى{" "}
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="primary address"
                id="primary address"
                autoComplete="primary address"
                className="bg-gray-200 text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
                onChange={(e) => setPrimaryAddress(e.target.value)}
                value={PrimaryAddress}
                // pattern="[ء-ي\s]+ [ء-ي\s]+ [ء-ي\s]+" // هذا النمط يسمح بإدخال الأحرف العربية فقط
                title="الرجاء إدخال الاسم باللغة العربية ويجب أن يكون الأسم ثلاثى على الأقل"
                required
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="secondary phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {" "}
              رقم هاتف ولى الأمر{" "}
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
                name="secondary phone"
                id="secondary phone"
                autoComplete="tel"
                pattern="[0-5]{3}[0-9]{8}"
                title="من فضلك ادخل رقم الهاتف الصحيح"
                className="bg-gray-200 text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-10 block w-full focus:outline-red-500"
                onChange={(e) => setSecondaryPhone(e.target.value)}
                value={SecondaryPhone}
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
              value={MovePoint}
              onChange={(e) => setMovePoint(e.target.value)}
              required
              disabled={!selectedRegionData} // تعطيل حقل نقطة التحرك إذا لم يتم اختيار منطقة
            >
              <option value="" disabled hidden>
                اختر
              </option>
              {selectedRegionData &&
                selectedRegionData.map((point: any, index: any) => (
                  <option key={index} value={point.attributes.name}>
                    {point.attributes.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="border-t border-gray-900/10 mt-10">
          <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3 mt-5 ">
              <label
                htmlFor="university"
                className="text-sm font-medium leading-6 text-gray-900"
              >
                الجامعة
              </label>
              <select
                name="university"
                id="university"
                className="text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
                value={University}
                onChange={(e) => {
                  setUniversity(e.target.value);
                  // Update the selected time based on the selected college
                  const selectedsecondaryaddress = GetUniversity.find(
                    (item: any) => item.attributes.name === e.target.value
                  );
                  if (selectedsecondaryaddress) {
                    setSelectedTime(
                      selectedsecondaryaddress.attributes.secondaryaddress
                        ? selectedsecondaryaddress.attributes.secondaryaddress
                        : []
                    );
                  } else {
                    setSelectedTime([]);
                  }
                }}
                required
              >
                <option value="" disabled hidden>
                  اختر
                </option>
                {GetUniversity.map((item: any, index: any) => (
                  <option key={index} value={item?.attributes?.name}>
                    {item?.attributes?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3 mt-5 ">
              <label
                htmlFor="college"
                className="text-sm font-medium leading-6 text-gray-900"
              >
                الكلية
              </label>
              <select
                name="college"
                id="college"
                className="text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                disabled={!selectedUniversityData} // تعطيل حقل نقطة التحرك إذا لم يتم اختيار منطقة
                required
              >
                <option value="" disabled hidden>
                  اختر
                </option>
                {selectedUniversityData &&
                  selectedUniversityData.map((college: any, index: any) => (
                    <option key={index} value={college.attributes.name}>
                      {college.attributes.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="classroom"
                className="text-sm font-medium leading-6 text-gray-900"
              >
                الصف الدراسى
              </label>
              <select
                data-te-select-init
                name="classroom"
                id="classroom"
                className="text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full sm:max-w-xs focus:outline-red-500"
                value={classroom}
                onChange={(e) => setClassroom(e.target.value)}
                disabled={!selectedUniversityData} // تعطيل حقل نقطة التحرك إذا لم يتم اختيار منطقة
                required
              >
                <option value="" disabled hidden>
                  اختر
                </option>
                <option value="الصف الأول">الصف الأول</option>
                <option value="الصف الثانى">الصف الثانى</option>
                <option value="الصف الثالث">الصف الثالث</option>
                <option value="الصف الرابع">الصف الرابع</option>
                <option value="الصف الخامس">الصف الخامس</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="UniversityHousing"
                className="text-sm font-medium leading-6 text-gray-900"
              >
                السكن الجامعى
              </label>
              <select
                data-te-select-init
                name="UniversityHousing"
                id="UniversityHousing"
                className="text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full sm:max-w-xs focus:outline-red-500"
                value={SecondaryAddress}
                onChange={(e) => setSecondaryAddresse(e.target.value)}
                disabled={!selectedUniversityData} // تعطيل حقل نقطة التحرك إذا لم يتم اختيار منطقة
                required
              >
                <option value="" disabled hidden>
                  اختر
                </option>
                {selectedTime.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="agree-terms" className="flex items-center">
            <input
              type="checkbox"
              id="agree-terms"
              checked={agreeTerms}
              onChange={handleCheckboxChange}
              className="form-checkbox h-5 w-5 text-red-700 focus:ring-red-600 accent-red-600"
            />
            <span className="mr-5 text-sm text-gray-900 cursor-pointer">
              الموافقة على{" "}
              <span className="text-red-700 font-bold underline">
                <a href="/pages/booking-conditions" target="_blank">
                  شروط التسجيل
                </a>
              </span>
            </span>
          </label>
        </div>

        <div className="border-t border-gray-900/10 mt-3"></div>
        <div className="mt-5">
          <button
            type="submit"
            name="submit"
            id="submit"
            className={`block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm 
             focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600
            ${
              submitButtonDisabled || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-700 hover:bg-red-800"
            }`}
            disabled={submitButtonDisabled || loading}
          >
            {loading ? "جاري إرسال البيانات..." : "تسجيل"}
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
            تم إرسال البيانات بنجاح !
          </div>
        )}

        {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error}
          </div>
        )}
      </form>
      <div>
        <p className="mt-5 text-center text-sm text-gray-500 mb-10">
          لديك حساب بالفعل ؟{" "}
          <a
            href="/sign-in"
            className="font-semibold leading-6 text-red-600 hover:text-red-500"
          >
            تسجيل الدخول الآن
          </a>
        </p>
      </div>
    </section>
  );
}
