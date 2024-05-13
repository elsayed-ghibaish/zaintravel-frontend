import React from "react";
import Sidebar from "../Components/Sidebar";

export default function PageDashboardUI() {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 p-10">
        <h1 className="text-2xl font-bold">محتوى لوحة التحكم</h1>
        {/* يمكنك إضافة محتوى الصفحة الرئيسية هنا */}
      </div>
    </div>
  );
}
