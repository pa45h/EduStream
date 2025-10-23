import React from "react";
import EduStreamLogo from "../../assets/Logo/Logo-Full-Light.png";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-richblack-800 border-y border-richblack-500">
      <div className="max-w-maxContent mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-8">
          <div className="col-span-1 lg:col-span-1 flex flex-col gap-5">
            <Link to="/">
              <img
                src={EduStreamLogo}
                alt="EduStream Logo"
                className="object-contain w-40"
              />
            </Link>

            <div className="flex flex-col gap-2">
              <h1 className="text-richblack-50 font-semibold text-lg mb-1">
                Company
              </h1>
              <Link
                to="/about"
                className="text-richblack-400 hover:text-richblack-50 transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-richblack-400 hover:text-richblack-50 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                to="/careers"
                className="text-richblack-400 hover:text-richblack-50 transition-colors"
              >
                Careers
              </Link>
              <Link
                to="/partners"
                className="text-richblack-400 hover:text-richblack-50 transition-colors"
              >
                Partners
              </Link>
            </div>

            <div className="flex gap-4 text-xl">
              <a
                href="https://github.com/pa45h"
                target="_blank"
                rel="noopener noreferrer"
                className="text-richblack-300 hover:text-black transition-colors duration-200"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/parthkatariya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-richblack-300 hover:text-blue-400 transition-colors duration-200"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://x.com/0a45h"
                target="_blank"
                rel="noopener noreferrer"
                className="text-richblack-300 hover:text-blue-300 transition-colors duration-200"
              >
                <FaTwitter />
              </a>
              <a
                href="mailto:parth.katariya87@gmail.com"
                className="text-richblack-300 hover:text-pink-400 transition-colors duration-200"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>

          <div className="col-span-1 flex flex-col gap-3">
            <h1 className="text-richblack-50 font-semibold text-lg">
              Learning
            </h1>
            <Link
              to="/catalog/web-dev"
              className="text-richblack-400 hover:text-richblack-50 transition-colors"
            >
              Web Development
            </Link>
            <Link
              to="/catalog/java"
              className="text-richblack-400 hover:text-richblack-50 transition-colors"
            >
              Java
            </Link>
            <Link
              to="/catalog/python"
              className="text-richblack-400 hover:text-richblack-50 transition-colors"
            >
              Python
            </Link>
            <Link
              to="/catalog/c"
              className="text-richblack-400 hover:text-richblack-50 transition-colors"
            >
              C
            </Link>
            <Link
              to="/catalog/c++"
              className="text-richblack-400 hover:text-richblack-50 transition-colors"
            >
              C++
            </Link>
          </div>

          <div className="col-span-1 flex flex-col gap-3">
            <h1 className="text-richblack-50 font-semibold text-lg">
              Resources
            </h1>
            <Link
              to="/Articles"
              className="text-richblack-400 hover:text-richblack-50 transition-colors"
            >
              Articles
            </Link>
            <Link
              to="/Blog"
              className="text-richblack-400 hover:text-richblack-50 transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/FAQs"
              className="text-richblack-400 hover:text-richblack-50 transition-colors"
            >
              FAQs
            </Link>
            <Link
              to="/help-center"
              className="text-richblack-400 hover:text-richblack-50 transition-colors"
            >
              Help Center
            </Link>
          </div>

          <div className="col-span-1 flex flex-col gap-3">
            <h1 className="text-richblack-50 font-semibold text-lg">
              Community
            </h1>
            <Link
              to="/Whatsapp"
              className="text-richblack-400 hover:text-richblack-50 transition-colors"
            >
              Whatsapp
            </Link>
            <Link
              to="/Discord"
              className="text-richblack-400 hover:text-richblack-50 transition-colors"
            >
              Discord
            </Link>
            <Link
              to="/YouTube"
              className="text-richblack-400 hover:text-richblack-50 transition-colors"
            >
              YouTube
            </Link>
            <Link
              to="/forums"
              className="text-richblack-400 hover:text-richblack-50 transition-colors"
            >
              Forums
            </Link>
            <Link
              to="/events"
              className="text-richblack-400 hover:text-richblack-50 transition-colors"
            >
              Events
            </Link>
          </div>

          <div className="col-span-1 flex flex-col gap-3">
            <h1 className="text-richblack-50 font-semibold text-lg">Utility</h1>
            <Link
              to="/Privacy-Policy"
              className="text-richblack-400 hover:text-richblack-50 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/Terms-of-Service"
              className="text-richblack-400 hover:text-richblack-50 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/Affiliate-Program"
              className="text-richblack-400 hover:text-richblack-50 transition-colors"
            >
              Affiliate Program
            </Link>
            <Link
              to="/Accessibility"
              className="text-richblack-400 hover:text-richblack-50 transition-colors"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-richblack-700">
        <div className="max-w-maxContent mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center text-sm text-richblack-400">
          <p className="mb-2 md:mb-0">
            Made by Parth Katariya &copy; {new Date().getFullYear()} EduStream
          </p>

          <div className="flex gap-4">
            <span className="hover:text-richblack-50 cursor-pointer transition-colors">
              Security & Compliance
            </span>
            <span className="hidden sm:inline-block text-richblack-600">|</span>
            <span className="hover:text-richblack-50 cursor-pointer transition-colors">
              Cookie Preferences
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
