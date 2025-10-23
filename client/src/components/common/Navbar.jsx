import React, { useState, useEffect } from "react";
import { Link, matchPath, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { GiShoppingCart } from "react-icons/gi";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiConnector.service";
import { categories } from "../../services/apis.service";
import { IoMdArrowDropdown, IoMdHome } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);
  const [catalog, setCatalog] = useState(false);
  const [navMenu, setNavMenu] = useState(false);

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

  const handleCatalogClick = () => {
    if (catalog) setCatalog(false);
    else setCatalog(true);
  };

  const handleNavMenuClick = () => {
    if (navMenu) setNavMenu(false);
    else setNavMenu(true);
  };

  return (
    <div className="flex flex-wrap h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link to={"/"}>
          <img className="w-40 min-w-[160px] flex-shrink-0" src={logo} />
        </Link>

        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => {
              return (
                <li className="hidden md:block" key={index}>
                  {link.title === "Catalog" ? (
                    <div className="relative flex items-center gap-1 group cursor-pointer">
                      <button
                        className="flex items-center gap-1 group cursor-pointer"
                        onClick={handleCatalogClick}
                      >
                        <p className="text-richblack-500 transition-all duration-200 group-hover:text-white">
                          {link.title}
                        </p>
                        <IoMdArrowDropdown className="text-richblack-500 transition-all duration-200 group-hover:text-white" />
                      </button>

                      {catalog && (
                        <div className="absolute left-[50%] top-[60%] flex flex-col rounded-md greenBgShadow transition-all duration-200 md:w-[200px] translate-x-[-50%] translate-y-[12%] z-50 justify-center p-4 group text-lg font-medium">
                          <div className="absolute left-[50%] -top-[6px] h-6 w-6 rotate-45 rounded bg-richblue-900 border-richblue-300 border-t-2 border-l-2 translate-y-[-30%] translate-x-[85%] -z-50"></div>
                          {subLinks.length > 0 ? (
                            subLinks.map((subLink, index) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                key={index}
                              >
                                <p className="hover:bg-richblue-600 p-4 rounded-md transition-all duration-200">
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
                            : "text-richblack-500"
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
        </nav>

        <div className="flex gap-x-4 items-center justify-center">
          {user && user?.accountType !== "instructor" && totalItems > 0 && (
            <Link to={"/dashboard/cart"} className="relative p-2">
              <GiShoppingCart className="transition-all duration-200 scale-150 hover:scale-[1.7]" />
              {totalItems > 0 && (
                <span className="absolute w-[16px] h-[16px] flex items-center justify-center bottom-4 right-0 text-black bg-yellow-100 rounded-full text-xs font-bold animate-bounce">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <div className="relative text-richblack-100 rounded-md transition-all duration-200 md:hidden">
              <button className="hover:scale-95" onClick={handleNavMenuClick}>
                <CiMenuFries className="scale-150" />
              </button>
              {navMenu && (
                <ul className="absolute min-w-[200px] top-12 left-[66%] translate-x-[-66%] z-50 greenBgShadow px-6 py-4 text-lg rounded-lg">
                  <div className="absolute left-[50%] -top-[6px] h-6 w-6 rotate-45 rounded bg-richblue-900 border-richblue-300 border-t-2 border-l-2 translate-y-[-30%] translate-x-[85%] -z-50"></div>
                  {NavbarLinks.map((link, index) => {
                    return (
                      <li key={index}>
                        {link.title === "Catalog" ? (
                          <div className="flex flex-col gap-1 group cursor-pointer">
                            <button
                              className="flex items-center gap-1 cursor-pointer"
                              onClick={handleCatalogClick}
                            >
                              <p className="text-richblack-500 transition-all duration-200 group-hover:text-white">
                                {link.title}
                              </p>
                              {catalog ? (
                                <IoMdArrowDropdown className="text-richblack-500 transition-all duration-200 group-hover:text-white rotate-180" />
                              ) : (
                                <IoMdArrowDropdown className="text-richblack-500 transition-all duration-200 group-hover:text-white" />
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
                                        <IoMdArrowDropdown className="text-richblack-500 transition-all duration-200 group-hover:text-white -rotate-90" />
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
                                  : "text-richblack-500"
                              } transition-all duration-200 hover:text-white`}
                            >
                              {link.title}
                            </p>
                          </Link>
                        )}
                      </li>
                    );
                  })}
                  <li>
                    <Link
                      to={"/signup"}
                      className={`${
                        matchRoute("/signup")
                          ? "text-yellow-25"
                          : "text-richblack-500"
                      } transition-all duration-200 hover:text-white`}
                    >
                      Sign Up
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          )}
          {token === null && (
            <Link to={"/login"}>
              <button className="border border-richblack-700 bg-richblack-800 min-w-[80px] px-[12px] py-[8px] text-richblack-100 rounded-md transition-all duration-200 hover:scale-95">
                Log In
              </button>
            </Link>
          )}
          {token === null && (
            <Link to={"/signup"}>
              <button className="border border-richblack-700 bg-richblack-800 min-w-[80px] px-[12px] py-[8px] text-richblack-100 rounded-md transition-all duration-200 hover:scale-95 hidden md:block">
                Sign Up
              </button>
            </Link>
          )}
          {token && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
