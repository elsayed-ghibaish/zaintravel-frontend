import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Providers";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "الزين للرحلات و النقل السياحي",
  description: "شركة الزين ترافل للرحلات و النقل السياحي",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        <AuthProvider>
          <ToastContainer position="bottom-right" />
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
