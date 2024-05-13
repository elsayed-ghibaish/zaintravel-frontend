import { format } from "date-fns/format";
import { ar } from "date-fns/locale/ar";
import { parseISO } from "date-fns/parseISO";
import React from "react";
import { AiOutlineEnvironment } from "react-icons/ai";
import { MdOutlineDateRange } from "react-icons/md";
import UserProfileInfoSection from "./UserProfileInfoSection";

export default function UserProfileInfo({ user }: any) {
  const firstName = user?.username?.split(" ")[0] || "";
  const lastName = user?.lastname?.split(" ").pop() || "";
  return (
    <div>
      {user?.id ? (
        <div className=" ">
          <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 mb-4 max-w-7xl m-auto mt-10">
            <div className="w-100 h-[150px] object-cover bg-gradient-to-r from-cyan-500 to-blue-500 rounded-t">

            </div>
            <div className="sm:text-right flex flex-col sm:flex-row text-sm-start text-center mb-4">
              <div className="flex-shrink-0 mt-n2 sm:mx-0 mx-auto">
                <img
                  src={`${user.avatar?.formats?.small.url || "/avatar.webp"}`}
                  alt={user.username}
                  className="block h-[120px] ms-0 sm:ms-6 max-w-lg rounded "
                />
              </div>
              <div className="flex-grow mt-3 sm:mt-12">
                <div className="flex md:items-end sm:items-start items-center md:justify-between justify-start mx-4 md:flex-row flex-col gap-4">
                  <div className="">
                    <h4 className="font-bold text-xl mr-2">
                      مرحبا,{" "}
                      <span className="text-red-500">{`${firstName} ${lastName}`}</span>
                    </h4>
                    <ul className="list-inline mb-0 flex items-center flex-wrap sm:justify-start justify-center gap-2">
                      <li className="list-inline-item flex gap-1">
                        <i className="ti ti-color-swatch" />{" "}
                        {user.confirmed === true ? (
                          <span className="list-disc text-green-500">
                            ◉ مفعل
                          </span>
                        ) : (
                          <span className="list-disc text-red-500">
                            ◉ موقوف
                          </span>
                        )}
                      </li>
                      <li className="list-inline-item flex gap-1">
                        <MdOutlineDateRange className="mt-1" />{" "}
                        {user.createdAt &&
                          `${`انضم فى `}
                      ${format(parseISO(user.createdAt), "MMMM yyyy", {
                        locale: ar,
                      })}`}
                      </li>
                      <li className="list-inline-item flex gap-1">
                        <AiOutlineEnvironment className="mt-1" /> {user.region}
                      </li>
                    </ul>
                  </div>
                 
                 {user?.confirmed === true && (
                   <a
                   href="/profile/booking"
                   className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-red-600 text-white hover:bg-red-500 waves-effect waves-light"
                 >
                   <i className="ti ti-check me-1" />
                   حجز رحلة
                 </a>
                 )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <UserProfileInfoSection />
      )}
    </div>
  );
}
