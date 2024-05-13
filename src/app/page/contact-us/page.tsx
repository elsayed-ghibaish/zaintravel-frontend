// React and Next.js imports
import { Metadata } from "next";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

// Metadata configuration
export const metadata: Metadata = {
  title: "الزين تراڤل - الاتصال بنا",
  description:
    "تواصل معنا عبر الارقام الموضحة او من خلال صفحات التواصل التالية",
};

/**
 * ContactUs Component
 * This component renders the contact page for الزين تراڤل.
 * It includes contact information and social media links.
 */
export default function ContactUs() {
  return (
    <main className="m-auto">
      <div className="isolate bg-white px-6  lg:px-8 mb-6">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50% - 40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto container text-gray-900 lg:w-3/5 rounded-lg mt-10 p-10 shadow-lg mb-10">
          {/* Contact Information Section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-red-700">الاتصال بنا</h1>
            <p className="text-gray-600">
              نحن هنا للمساعدة. تواصل معنا من خلال الطرق المتاحة أدناه.
            </p>
          </div>

          <div className="bg-red-100 rounded-lg p-6 mb-6">
            {/* Individual Contact Card */}
            <ContactCard name="أ. صابر" phoneNumber="01012930010" />
            <ContactCard name="أ. منصور" phoneNumber="01099606853" />
          </div>

          {/* Social Media Links Section */}
          <div
            className="flex justify-center items-center space-x-4 mt-6 stroke-red-500"
            dir="ltr"
          >
            <SocialMediaLink
              href="https://www.facebook.com/zaintravel.2020"
              icon={FaFacebook}
              hoverColor="text-blue-500"
            />
            <SocialMediaLink
              href="https://www.instagram.com/zaintravel2020"
              icon={FaInstagram}
              hoverColor="text-purple-500"
            />
            <SocialMediaLink
              href="https://wa.me/+201012930010"
              icon={FaWhatsapp}
              hoverColor="text-green-500"
            />
            <span className="">تواصل معنا ايضا على</span>
          </div>
        </div>
      </div>
    </main>
  );
}

// Contact Card Component
function ContactCard({ name, phoneNumber }: any) {
  return (
    <div className="mb-4">
      <p className="font-semibold text-gray-800">{name}</p>
      <a href={`tel:+2${phoneNumber}`} className="text-gray-600">
        {phoneNumber}
      </a>
    </div>
  );
}

// Social Media Link Component
function SocialMediaLink({ href, icon: Icon, hoverColor }: any) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-gray-200 hover:${hoverColor} transition duration-300`}
    >
      <Icon size={30} />
    </a>
  );
}
