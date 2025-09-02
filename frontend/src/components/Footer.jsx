import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookSquare, FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full">
      <footer className="bg-gray-900 text-white pt-16 pb-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8 mb-8">
          {/* Kolom 1 - Tentang Sekolah */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl md:text-3xl font-bold text-sky-500">
              SMAN 1 Cibitung
            </h2>
            <p className="text-gray-300 text-base font-sans mt-4 leading-relaxed">
              SMAN 1 Cibitung – Sekolah menengah di Bekasi yang menghadirkan
              pendidikan berkualitas dan lingkungan belajar yang mendukung.
            </p>
          </div>

          {/* Kolom 2 - Tautan Cepat */}
          <div className="md:justify-self-center">
            <h3 className="text-lg font-semibold mb-4 text-sky-500">
              Tautan Cepat
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="hover:text-sky-500 transition-colors duration-200">
                <Link to={"/"} className="block py-1">
                  Beranda
                </Link>
              </li>
              <li className="hover:text-sky-500 transition-colors duration-200">
                <Link to={"/about"} className="block py-1">
                  Tentang Kami
                </Link>
              </li>
              <li className="hover:text-sky-500 transition-colors duration-200">
                <Link to={"/services"} className="block py-1">
                  Layanan
                </Link>
              </li>
              <li className="hover:text-sky-500 transition-colors duration-200">
                <Link to={"/contact"} className="block py-1">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3 - Support */}
          <div className="md:justify-self-center">
            <h3 className="text-lg font-semibold mb-4 text-sky-500">Support</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="hover:text-sky-500 transition-colors duration-200">
                <Link to={"/faq"} className="block py-1">
                  FAQ
                </Link>
              </li>
              <li className="hover:text-sky-500 transition-colors duration-200">
                <Link to={"/policy"} className="block py-1">
                  Kebijakan Privasi
                </Link>
              </li>
              <li className="hover:text-sky-500 transition-colors duration-200">
                <Link to={"/terms"} className="block py-1">
                  Syarat dan Ketentuan
                </Link>
              </li>
              <li className="hover:text-sky-500 transition-colors duration-200">
                <Link to={"/help"} className="block py-1">
                  Pusat Bantuan
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 4 - Media Sosial */}
          <div className="md:justify-self-center">
            <h3 className="text-lg font-semibold mb-4 text-sky-500">
              Ikuti Kami
            </h3>
            <div className="flex gap-5 items-center">
              <Link
                to={"http://instagram.com/officialsmanci_/"}
                className="hover:opacity-80 transition-opacity"
              >
                <FaInstagram size={24} className="text-pink-500" />
              </Link>
              <Link
                to={"https://www.facebook.com/sman1cibitung"}
                className="hover:opacity-80 transition-opacity"
              >
                <FaFacebookSquare size={24} className="text-blue-500" />
              </Link>
              <Link to={""} className="hover:opacity-80 transition-opacity">
                <FaYoutube size={24} className="text-red-500" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} SMAN 1 Cibitung. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;