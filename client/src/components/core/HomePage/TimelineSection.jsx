import React from "react";
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImg from "../../../assets/Images/TimelineImage.jpg";

const timeLine = [
  {
    logo: logo1,
    heading: "Leadership",
    description: "Lead projects with confidence.",
  },
  {
    logo: logo2,
    heading: "Accountability",
    description: "Student's success comes first.",
  },
  {
    logo: logo3,
    heading: "Adaptability",
    description: "Thrive in any situation.",
  },
  {
    logo: logo4,
    heading: "Problem Solving",
    description: "Turn challenges into solutions.",
  },
];

const TimelineSection = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-14 items-center">
        <div className="md:w-[45%] flex flex-col gap-0 relative">
          <div className="absolute h-full w-[2px] bg-richblack-200 left-[24px] top-0"></div>

          {timeLine.map((element, index) => {
            const isLast = index === timeLine.length - 1;

            return (
              <div
                className={`flex flex-row gap-6 ${
                  !isLast ? "mb-12" : ""
                } relative`}
                key={index}
              >
                <div className="hidden md:block absolute w-[14px] h-[14px] bg-white rounded-full border-2 border-richblack-200 left-[18px] top-[18px] z-10"></div>

                <div className="w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full shadow-md z-20 flex-shrink-0">
                  <img
                    src={element.logo}
                    alt={`${element.heading} icon`}
                    className="w-[30px] h-[30px]"
                  />
                </div>

                <div className="flex flex-col">
                  <h2 className="font-bold text-[18px] text-richblack-900">
                    {element.heading}
                  </h2>
                  <p className="text-base text-richblack-700">
                    {element.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative transition-all duration-300 hover:-translate-y-2 hover:shadow-richblue-500 hover:shadow-lg rounded-2xl border border-richblue-500">
          <img src={timelineImg} width={450} className="rounded-2xl" />
          <div className="absolute bg-richblue-900 flex gap-5 flex-row text-white uppercase py-7 items-center justify-center left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl p-5">
            <div className="flex flex-row gap-5 items-center border-r border-richblack-50 pr-5">
              <p className="text-lg sm:text-2xl font-bold">15</p>
              <p className="text-xs sm:text-sm font-bold text-richblue-50">
                Years of Expertise
              </p>
            </div>
            <div className="flex flex-row gap-5 items-center">
              <p className="text-lg sm:text-2xl font-bold">100+</p>
              <p className="text-xs sm:text-sm font-bold text-richblue-50">
                valuable courses
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
