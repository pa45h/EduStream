import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../common/ConfirmationModal";

import { logout } from "../../../services/operations/authAPI.service";
import { NavbarLinks } from "../../../data/navbar-links";
import { apiConnector } from "../../../services/apiConnector.service";
import { categories } from "../../../services/apis.service";
import { IoMdArrowDropdown } from "react-icons/io";
import { GiShoppingCart } from "react-icons/gi";

export default function ProfileDropDown() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [confirmationModal, setConfirmationModal] = useState(null);
  const ref = useRef(null);
  const [subLinks, setSubLinks] = useState([]);
  const [navMenu, setNavMenu] = useState(false);
  const [catalog, setCatalog] = useState(false);

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      const subLinksArr = await result.data.allCategories;
      setSubLinks(subLinksArr);
    } catch (error) {
      console.log("Could Not Fetch The Category List :- ", error);
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  useEffect(() => {
    setCatalog(false);
    setNavMenu(false);
  }, [location.pathname]);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const handleNavMenuClick = () => {
    if (navMenu) setNavMenu(false);
    else setNavMenu(true);
  };

  const handleCatalogClick = () => {
    if (catalog) setCatalog(false);
    else setCatalog(true);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-x-1"
        onClick={handleNavMenuClick}
      >
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-8 min-w-[32px] flex-shrink-0 rounded-full object-cover transition-all duration-200 group-hover:scale-105"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100 transition-all duration-200 group-hover:text-white" />
      </button>

      {navMenu && (
        <>
          <div className="absolute top-[35px] left-1 h-6 w-6 rotate-45 rounded bg-richblue-900 border-richblue-300 border-t-2 border-l-2 z-[51]"></div>
          <div
            className="absolute top-12 -left-[150px] z-50 divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md greenBgShadow transition-all duration-200 min-w-[200px]"
            ref={ref}
          >
            <Link to="/dashboard/my-profile">
              <div
                className={`flex w-full items-center gap-x-1 pt-2 pb-1 px-3 text-base transition-all duration-200 ${
                  matchRoute("/dashboard/my-profile")
                    ? "text-yellow-25"
                    : "text-richblack-100"
                } transition-all duration-200 hover:text-white`}
              >
                <VscDashboard className="text-lg" />
                Dashboard
              </div>
            </Link>
            <Link to="/dashboard/Cart">
              <div
                className={`flex md:hidden w-full items-center gap-x-1 pb-2 px-3 text-base transition-all duration-200 ${
                  matchRoute("/dashboard/Cart")
                    ? "text-yellow-25"
                    : "text-richblack-100"
                } transition-all duration-200 hover:text-white`}
              >
                <GiShoppingCart className="text-lg" />
                Cart
              </div>
            </Link>
            {navMenu && (
              <ul className="block md:hidden text-richblack-100 p-3">
                {NavbarLinks.map((link, index) => {
                  return (
                    <li key={index}>
                      {link.title === "Catalog" ? (
                        <div className="flex flex-col gap-1 group cursor-pointer">
                          <button
                            className="flex items-center gap-1 cursor-pointer"
                            onClick={handleCatalogClick}
                          >
                            <p className=" transition-all duration-200 group-hover:text-white">
                              {link.title}
                            </p>
                            {catalog ? (
                              <IoMdArrowDropdown className=" transition-all duration-200 group-hover:text-white rotate-180" />
                            ) : (
                              <IoMdArrowDropdown className=" transition-all duration-200 group-hover:text-white" />
                            )}
                          </button>

                          {catalog && (
                            <div className="flex flex-col gap-1 transition-all duration-200 justify-center group text-base pb-2">
                              {subLinks.length > 0 ? (
                                subLinks.map((subLink, index) => (
                                  <Link
                                    to={`/catalog/${subLink.name
                                      .split(" ")
                                      .join("-")
                                      .toLowerCase()}`}
                                    key={index}
                                  >
                                    <p className="hover:text-white transition-all duration-200 flex gap-1 items-center">
                                      <IoMdArrowDropdown className=" transition-all duration-200 group-hover:text-white -rotate-90" />
                                      {subLink.name}
                                    </p>
                                  </Link>
                                ))
                              ) : (
                                <div className="text-center text-sm text-richblack-400">
                                  No Categories
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link to={link?.path}>
                          <p
                            className={`${
                              matchRoute(link?.path)
                                ? "text-yellow-25"
                                : "text-richblack-100"
                            } transition-all duration-200 hover:text-white`}
                          >
                            {link.title}
                          </p>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
            <div
              onClick={() =>
                setConfirmationModal({
                  text1: "Are You Sure ?",
                  text2: "You will be logged out of your account",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:text-white cursor-pointer"
            >
              <VscSignOut className="text-lg" />
              <p>Logout</p>
            </div>
          </div>
        </>
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}
