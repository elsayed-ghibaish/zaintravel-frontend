"use client";
import DetailsList from "./_components/DetailsList";
import UserProfileInfo from "./_components/UserProfileInfo";
import BookingNext from "./_components/BookingNext";
import BookingPrevious from "./_components/BookingPrevious";
import userFetch from "@/app/hooks/userFetch";

export default function ProfileUI() {
  const { data, loading, error } = userFetch("/users/me?populate=*");

  return (
    <section className="bg-slate-100 flow-root	">
      <UserProfileInfo user={data} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-5 mb-20 max-w-7xl m-auto">
        <div className="rounded-lg bg-white shadow-md border border-1 border-gray-300 p-5 h-fit">
          <DetailsList user={data} />
        </div>
        <div className="rounded-lg bg-white shadow-md border border-1 border-gray-300 p-5 lg:col-span-2">
          <BookingNext user={data} />
          {/* <BookingPrevious user={data} /> */}
        </div>
      </div>
    </section>
  );
}
