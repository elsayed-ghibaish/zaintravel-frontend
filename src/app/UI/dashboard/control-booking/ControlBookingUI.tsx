import React from "react";
import NextBreadcrumb from "@/app/Components/NextBreadcrumb";
import Sidebar from "../Components/Sidebar";
import CtrlBooking from "./Components/CtrlBooking";
import CtrlBookingBag from "./Components/CtrlBookingBag";
import CtrlBookingGuest from "./Components/CtrlBookingGuest";

export default function ControlBookingUI() {
  return (
    <div className="flex flex-col md:flex-row container-fluid group-data-[content=boxed]:max-w-boxed mx-auto bg-slate-200">
      <Sidebar />

      <div className="flex-1 p-10">
        <section>
          <NextBreadcrumb
            homeElement={"Home"}
            separator={""}
            activeClasses="relative bg-gray-100 rounded-l-lg "
            containerClasses=""
            listClasses=""
            capitalizeLinks
          />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-2">
            <div className="rounded-lg bg-slate-50">
              <CtrlBooking />
            </div>
            <div className="rounded-lg bg-slate-50">
              <CtrlBookingBag />
            </div>
            <div className="rounded-lg bg-slate-50">
              <CtrlBookingGuest />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
