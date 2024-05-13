"use client";
import useFetch from "@/app/hooks/useFetch";
import React from "react";
import UserProfileInfo from "../../User/_components/UserProfileInfo";
import DetailsList from "../../User/_components/DetailsList";
import BookingNext from "../../User/_components/BookingNext";
import BookingPrevious from "../../User/_components/BookingPrevious";

export default function StudentUI( id: any) {
    const { data, loading, error } = useFetch(`/users/${id.id.params.id}?populate=*`);

  console.log(data);

  return (
    <section className="bg-slate-100 flow-root	">
      <UserProfileInfo user={data} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-5 mb-20 max-w-7xl m-auto">
        <div className="rounded-lg bg-white shadow-md border border-1 border-gray-300 p-5 h-fit">
          <DetailsList user={data} />
        </div>
        <div className="rounded-lg bg-white shadow-md border border-1 border-gray-300 p-5 lg:col-span-2">
          <BookingNext user={data} />
          <BookingPrevious user={data} />
        </div>
      </div>
    </section>
  )
}
