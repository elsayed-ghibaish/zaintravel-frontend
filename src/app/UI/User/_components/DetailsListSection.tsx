import React from "react";

export default function DetailsListSection() {
  return (
    <div className="flex-auto p-6">
      <h2 className="mb-0 text-2xl font-bold">بياناتى</h2>
      <ul className="list-unstyled mb-4 mt-3">
        <li className="flex items-center mb-3 w-80 h-5 rounded-md bg-gray-400 animate-pulse"></li>
        <li className="flex items-center mb-3 w-52 h-5 rounded-md bg-gray-400 animate-pulse"></li>
        <li className="flex items-center mb-3 w-72 h-5 rounded-md bg-gray-400 animate-pulse"></li>
        <li className="flex items-center mb-3 w-52 h-5 rounded-md bg-gray-400 animate-pulse"></li>
        <li className="flex items-cente mb-3 w-60 h-5 rounded-md bg-gray-400 animate-pulse"></li>
      </ul>
      <small className="mb-0 font-semibold uppercase">بيانات الاتصال</small>
      <ul className="list-unstyled mb-4 mt-3">
        <li className="flex items-center mb-3 w-72 h-5 rounded-md bg-gray-400 animate-pulse"></li>
        <li className="flex items-center mb-3 w-80 h-5 rounded-md bg-gray-400 animate-pulse"></li>
        <li className="flex items-center mb-3 w-72 h-5 rounded-md bg-gray-400 animate-pulse"></li>
        <li className="flex items-center mb-3 w-60 h-5 rounded-md bg-gray-400 animate-pulse"></li>
        <li className="flex items-center mb-3 w-80 h-5 rounded-md bg-gray-400 animate-pulse"></li>
      </ul>
    </div>
  );
}
