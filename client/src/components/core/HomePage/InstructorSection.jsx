import React from "react";
import Button from "./Button";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import HighlightText from "./HighlightText";
const Instructor = require("../../../assets/Images/Instructor.jpg");

const InstructorSection = () => {
  return (
    <div className="mt-10">
      <h2 className="text-4xl mx-auto text-center font-semibold my-8 text-richblack-25">
        Become An <HighlightText text={"Instructor"} />
      </h2>
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="lg:w-[40%] flex items-center justify-center rounded-full shadow-[0px_0px_100px_0px_rgb(100,150,210)]">
          <a href="/login">
            <img
              src={Instructor}
              className="h-[400px] rounded-full object-cover hover:animate-pulse"
            />
          </a>
        </div>

        <div className="lg:w-[50%] flex flex-col gap-10 items-center text-center">
          <p className="font-medium text-[16px] lg:w-[80%] text-richblue-200">
            Instructors from around the world teach millions of students on
            EduStream. We provide the tools and skills to teach what you love.
          </p>
          <div className="w-fit">
            <Button active={true} linkto={"/signup"}>
              <div className="flex flex-row gap-2 items-center">
                Start Teaching Today
                <FaRegArrowAltCircleRight />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
