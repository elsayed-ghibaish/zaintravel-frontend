import SignInUi from "@/app/UI/User/SignInUi";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الزين للرحلات و النقل السياحي - تسجيل الدخول",
  description: "شركة الزين ترافل للرحلات و النقل السياحي",
};

export default function Page() {
  return <SignInUi />;
}
