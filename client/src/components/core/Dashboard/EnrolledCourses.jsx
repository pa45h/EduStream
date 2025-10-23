import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import { BiDotsVerticalRounded } from "react-icons/bi";

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI.service";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getUserEnrolledCourses(token);

        const filterPublishCourse = res.filter((ele) => ele.status !== "Draft");

        setEnrolledCourses(filterPublishCourse);
      } catch (error) {
        console.log("Could not fetch enrolled courses.");
      }
    })();
  }, []);

  return (
    <>
      <div className="text-3xl text-richblack-50">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <div className="my-8 text-richblack-5 greenBgShadow rounded-lg">
          <div className="flex rounded-t-lg bg-richblack-800">
            <p className="w-[45%] px-2 md:px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>
          {/* Course Name */}
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`flex items-center border border-richblack-700 
                ${i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"}`}
              key={i}
            >
              <div
                className="flex flex-col sm:flex-row w-[45%] cursor-pointer items-center gap-4 px-2 md:px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  );
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-16 w-[90%] sm:w-16 rounded-lg object-cover hidden md:block"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>
                  <p className="text-xs text-richblack-300">
                    {course.courseDescription.length > 30
                      ? `${course.courseDescription.slice(0, 30)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
              <div>
                <p className="w-1/4 mx-auto text-base">
                  {course.progressPercentage || 0}/100
                </p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  width="85px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default EnrolledCourses;
