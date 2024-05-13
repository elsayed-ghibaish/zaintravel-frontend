import React from "react";
import {
  FaCheckCircle,
  FaCity,
  FaCrown,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import { GiModernCity } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import DetailsListSection from "./DetailsListSection";

export default function DetailsList({ user }: any) {
  return (
    <div>
      {user?.id ? (
        <div className="flex-auto p-6">
          <h2 className="mb-0 text-2xl font-bold">بياناتى</h2>
          <ul className="list-unstyled mb-4 mt-3">
            <li className="flex items-center mb-3">
              <FaUser />
              <span className="font-medium mx-2 text-heading">الاسم:</span>{" "}
              <span>{`${user.username} ${user.lastname}`}</span>
            </li>
            <li className="flex items-center mb-3">
              <FaCheckCircle />
              <span className="font-medium mx-2 text-heading">
                الحالة:
              </span>{" "}
              <span>
                {user.confirmed === true ? (
                  <span className="list-disc text-green-500">◉ مفعل</span>
                ) : (
                  <span className="list-disc text-red-500">◉ موقوف</span>
                )}
              </span>
            </li>
            <li className="flex items-center mb-3">
              <FaCrown />
              <span className="font-medium mx-2 text-heading">
                الصلاحيات:
              </span>{" "}
              <span>{user.role?.name}</span>
            </li>
            <li className="flex items-center mb-3">
              <FaCity />
              <span className="font-medium mx-2 text-heading">
                المدينة:
              </span>{" "}
              <span>{user.region}</span>
            </li>
            <li className="flex items-center mb-3">
              <GiModernCity />
              <span className="font-medium mx-2 text-heading">
                نقطة التحرك:
              </span>{" "}
              <span>{user.movepoint}</span>
            </li>
          </ul>
          <small className="mb-0 font-semibold uppercase">بيانات الاتصال</small>
          <ul className="list-unstyled mb-4 mt-3">
            <li className="flex items-center mb-3">
              <FaPhone />
              <span className="font-medium mx-2 text-heading">
                رقم التليفون:
              </span>{" "}
              <span>{`EG +2${user.primaryphone}`}</span>
            </li>
            <li className="flex items-center mb-3">
              <FaPhone />
              <span className="font-medium mx-2 text-heading">
                رقم هاتف ولى الأمر:
              </span>{" "}
              <span>{`EG +2${user.secondaryphone}`}</span>
            </li>
            <li className="flex items-center mb-3">
              <MdEmail />
              <span className="font-medium mx-2 text-heading">
                الايميل:
              </span>{" "}
              <span>{user.email}</span>
            </li>
            <li className="flex items-center mb-3">
              <FaMapMarkerAlt />
              <span className="font-medium mx-2 text-heading">
                عنوان السكن الجامعى:
              </span>{" "}
              <span>{user.secondaryaddress}</span>
            </li>
            <li className="flex items-center mb-3">
              <FaMapMarkerAlt />
              <span className="font-medium mx-2 text-heading">
                العنوان الاساسى:
              </span>{" "}
              <span>{user.primaryaddress}</span>
            </li>
          </ul>
        </div>
      ) : (
        <DetailsListSection />
      )}
    </div>
  );
}
