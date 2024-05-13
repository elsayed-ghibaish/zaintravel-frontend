// SocialIcons.tsx
import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const SocialIcons: React.FC = () => {
  return (
    <div className="flex justify-center items-center space-x-4" dir="ltr">
      <a
        href="https://www.facebook.com/zaintravel.2020"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-blue-500 transition duration-300"
      >
        <FaFacebook size={20} />
      </a>
      <a
        href="https://www.instagram.com/zaintravel2020"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-purple-500 transition duration-300"
      >
        <FaInstagram size={20} />
      </a>
      <a
        href="https://wa.me/+201012930010"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-green-500 transition duration-300"
      >
        <FaWhatsapp size={20} />
      </a>
    </div>
  );
};

export default SocialIcons;
