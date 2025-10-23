import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, matchPath, useLocation } from "react-router-dom";

const SidebarLink = ({ link, iconName }) => {
  const Icon = iconName;
  const location = useLocation();
  const dispatch = useDispatch();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <NavLink
      to={link.path}
      className={`relative px-2 md:px-8 py-2 text-sm font-medium hover:text-white  
                        ${
                          matchRoute(link.path)
                            ? "bg-yellow-800 text-yellow-50"
                            : "bg-opacity-0 text-richblack-300"
                        } transition-all duration-200 active`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 
                            ${
                              matchRoute(link.path)
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
      ></span>

      <div className="flex items-center gap-x-2">
        <Icon className="text-xl" />
        <span className="hidden md:block">{link.name}</span>
      </div>
    </NavLink>
  );
};

export default SidebarLink;
