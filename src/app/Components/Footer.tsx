import { format } from "date-fns/format";
import SocialIcons from "./SocialIcons";

const PoweredBy: string = " السيد غبيش ";
export default function Footer() {
  return (
    <footer className="bg-slate-50 print:hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-5">
          <img
            src="/logo.svg"
            className="mx-auto h-20 w-auto"
            alt="Logo Zain Travel"
          />

          <nav className="mt-5 text-sm print:hidden" aria-label="quick links">
            <div className="-my-1 flex justify-center gap-x-6">
              <a
                className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                href="/"
              >
                الصفحة الرئيسية
              </a>
              <a
                className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                href="/page/booking-conditions"
              >
                شروط الحجز
              </a>
              <a
                className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                href="/page/cancellation-terms"
              >
                إلغاء الحجز
              </a>
              <a
                className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                href="/page/complaint"
              >
                الأقتراحات والشكاوي
              </a>
            </div>
          </nav>
        </div>
        <div className="flex flex-col items-center border-t border-slate-400/10 py-5 sm:flex-row-reverse sm:justify-between">
          <div className="flex gap-x-6">
            <SocialIcons />
          </div>
          <p className="mt-6 text-sm text-slate-500 sm:mt-0">
            العلامة التجارية وجميع الحقوق محفوظة ©{" "}
            {`${format(new Date(), "yyyy")}`} | <span>برمجة وتصميم</span>
            <a
              href="https://wa.me/+201017732845"
              target="_blank"
              className="text-red-600 font-bold hover:text-red-900"
            >{`${PoweredBy} `}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
