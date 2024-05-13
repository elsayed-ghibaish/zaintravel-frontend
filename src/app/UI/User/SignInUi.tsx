"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function SignInUi() {
  const [identifier, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const jsonData = Object.fromEntries(formData);
    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    };
    const UrlStrapi = process.env.NEXT_PUBLIC_STRAPI_URL_API;
    const req = await fetch(`${UrlStrapi}/auth/local`, reqOptions);
    const info = await req.json();
    try {
      const res = await signIn("credentials", {
        identifier,
        password,
        redirect: false,
      });
      if (res?.ok) {
        // console.log(info)
        Cookies.set("jwt", info.jwt);
        // localStorage.setItem("jwt", info.jwt);
      }

      if (res?.error) {
        setError("البريد الالكتروني او كلمة المرور غير صحيحة");
        return;
      }
      router.push("/profile");
      toast.success("تم تسجيل الدخول بنجاح");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div className="py-16">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div className="w-full p-8 lg:w-1/2">
            <a href="/">
              <img
                src="/logo.svg"
                className="h-52 flex items-center m-auto"
                alt="Zain Travel"
              />
            </a>
            <p className="text-xl text-gray-600 text-center">
              الزين ترافل للرحلات و النقل السياحي
            </p>

            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/4 lg:w-1/3" />
              تسجيل الدخول
              <span className="border-b w-1/4 lg:w-1/3" />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  البريد الجامعى
                </label>
                <input
                  className="bg-gray-200 text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
                  type="text"
                  name="identifier"
                  id="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <div className="flex justify-between">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    كلمة المرور
                  </label>
                  <a href="#" className="text-xs text-red-500">
                    استعادة كلمة المرور؟
                  </a>
                </div>
                <input
                  className="bg-gray-200 text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full focus:outline-red-500"
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="bg-red-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-red-600"
                >
                  تسجيل الدخول
                </button>
              </div>
              {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                  {error}
                </div>
              )}

              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-10 md:w-15 lg:w-1/5" />
                <p className="text-center text-sm text-gray-500">
                  ليس لديك حساب ؟{" "}
                  <a
                    href="/sign-up"
                    className="font-semibold leading-6 text-red-600 hover:text-red-500"
                  >
                    قم بالتسجيل الآن
                  </a>
                </p>
                <span className="border-b w-10 md:w-15 lg:w-1/5" />
              </div>
            </form>
          </div>
          <div
            className="hidden lg:block lg:w-1/2 bg-cover"
            style={{
              backgroundImage: 'url("sign.jpg")',
            }}
          ></div>
        </div>
      </div>
    </section>
  );
}
