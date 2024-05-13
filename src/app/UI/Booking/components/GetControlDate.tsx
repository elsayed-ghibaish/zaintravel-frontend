import React, { useEffect, useState } from "react";
import useFetch from "@/app/hooks/useFetch";
import { format, addDays, eachDayOfInterval, isBefore, getDay } from "date-fns";
import { ar } from "date-fns/locale";

export default function GetControlDate() {
  const { data, loading, error }: any = useFetch("/controls/1");
  const [newdata, setnewdata]: any = useState();
  const [GetEndTime, setGetEndTime]: any = useState();

  useEffect(() => {
    setnewdata(data);
    setGetEndTime(data?.data?.attributes.exitTime);
  }, [data]);

  // إنشاء قائمة بالأيام المتاحة
  const inputStartDate = new Date(newdata?.data?.attributes.from); // قم بتعديل هذا التاريخ حسب رغبتك
  const inputEndDate = addDays(
    inputStartDate,
    data && newdata?.data?.attributes.days
  ); // قم بتعديل هذا التاريخ حسب رغبتك

  // تاريخ البداية
  const startDate = inputStartDate;

  // تاريخ النهاية
  const endDate = inputEndDate;

  const filterEnabled = newdata?.data?.attributes.ClosedFriday;

  // إنشاء قائمة بالأيام المتاحة
  const availableDays: any = eachDayOfInterval({
    start: startDate,
    end: endDate,
  })
    .filter(
      (day) =>
        isBefore(new Date(), day) && (filterEnabled ? getDay(day) !== 5 : true)
    ) // حذف الأيام التي انتهت والجمعة
    .map((day) => ({
      value: format(day, "yyyy-MM-dd"),
      label: format(day, "EEEE, d MMMM yyyy", { locale: ar }),
    }));

  return { availableDays, GetEndTime };
}
