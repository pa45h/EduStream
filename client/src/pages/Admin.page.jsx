import React from "react";
import Template from "../components/core/Auth/Template";
import adminLoginImg from "../assets/Images/adminLogin.jpg";

const Admin = () => {
  return (
    <Template
      title={"Admin Log In"}
      description1={"Sign In To Access"}
      description2={"ADMIN PORTAL"}
      formType={"login"}
      image={adminLoginImg}
      isGoogleLoginBtn={false}
    />
  );
};

export default Admin;
