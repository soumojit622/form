import React from "react";
import { Home, FileText, Info, Phone } from "lucide-react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 py-16">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-3xl font-semibold text-violet-800">About Us</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Formy.ai is an AI-powered platform that transforms business
              automation and data management. We build intelligent solutions to
              boost efficiency, reduce manual tasks, and enhance
              decision-making, empowering businesses to innovate and optimize
              workflows.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-3xl font-semibold text-violet-800">Quick Links</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Home className="text-gray-600 hover:text-violet-800 transition-all duration-300" />
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-800 transition-all duration-300"
                >
                  Home
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FileText className="text-gray-600 hover:text-violet-800 transition-all duration-300" />
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-800 transition-all duration-300"
                >
                  Services
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Info className="text-gray-600 hover:text-violet-800 transition-all duration-300" />
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-800 transition-all duration-300"
                >
                  About
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-gray-600 hover:text-violet-800 transition-all duration-300" />
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-800 transition-all duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-3xl font-semibold text-violet-800">Contact Us</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Email:{" "}
              <a
                href="mailto:contact@formy.ai"
                className="text-blue-600 hover:text-blue-800"
              >
                contact@formy.ai
              </a>
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Phone: +91 987 654 3210
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Address: 45, Tech Park, Sector 21, Gurugram, Haryana, India
            </p>
          </div>

          {/* Social Media Section */}
          <div className="space-y-4">
            <h3 className="text-3xl font-semibold text-violet-800">Follow Us</h3>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-600 hover:text-violet-800 text-2xl transform hover:scale-125 transition-all duration-300"
              >
                <Facebook />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-violet-800 text-2xl transform hover:scale-125 transition-all duration-300"
              >
                <Twitter />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-violet-800 text-2xl transform hover:scale-125 transition-all duration-300"
              >
                <Linkedin />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-violet-800 text-2xl transform hover:scale-125 transition-all duration-300"
              >
                <Instagram />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-12 border-t border-gray-300 pt-8 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-violet-800">Formy.ai</span>. All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
