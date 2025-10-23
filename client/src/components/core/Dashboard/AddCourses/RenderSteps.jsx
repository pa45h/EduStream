import React from "react";
import { useSelector } from "react-redux";

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import PublishCourse from "./PublishCourse";
import { FaCheck } from "react-icons/fa";

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <>
      <div className="relative mb-2 flex w-full mx-auto justify-center">
        {steps.map((item) => (
          <React.Fragment key={item.id}>
            <div className="flex flex-col items-center gap-2 mb-16">
              <button
                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px]
                  ${
                    step === item.id
                      ? "border-yellow-50 bg-yellow-900 text-yellow-50 shadow-[0_0_10px_0_rgb(110,110,110)]"
                      : "border-richblack-700 bg-richblue-900 text-richblack-300"
                  } 
                  ${step > item.id && "bg-yellow-50 text-yellow-50"}`}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-richblack-900" />
                ) : (
                  item.id
                )}
              </button>
              <p
                className={`text-sm text-center ${
                  step >= item.id ? "text-richblack-5" : "text-richblack-500"
                }`}
              >
                {item.title}
              </p>
            </div>

            {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-2
                    ${
                      step > item.id
                        ? "border-yellow-50"
                        : "border-richblack-500"
                    } `}
                ></div>
              </>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Rnder specific component based on current step */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  );
}
