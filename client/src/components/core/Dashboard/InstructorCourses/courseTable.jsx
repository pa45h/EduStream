import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formatDate } from "../../../../utils/dateFormatter";

import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI.service";
import { COURSE_STATUS } from "../../../../utils/constants";
import ConfirmationModal from "../../../common/ConfirmationModal";

export default function CourseTable({ courses, setCourses }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const TRUNCATE_LENGTH = 5;

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }
    setConfirmationModal(null);
    setLoading(false);
  };

  return (
    <div className="p-4 greenBgShadow rounded-lg">
      <Table className="w-full">
        <Thead>
          <Tr className="border-b border-richblack-600">
            <Th className="px-6 py-3 text-left text-sm font-medium uppercase text-richblack-100 w-full">
              Courses
            </Th>
            <Th className="px-6 py-3 text-left text-sm font-medium uppercase text-richblack-100">
              Duration
            </Th>
            <Th className="px-6 py-3 text-left text-sm font-medium uppercase text-richblack-100">
              Price
            </Th>
            <Th className="px-6 py-3 text-left text-sm font-medium uppercase text-richblack-100">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses?.length === 0 ? (
            <Tr>
              <Td
                className="py-10 text-center text-2xl font-medium text-richblack-100"
                colSpan="4"
              >
                No Courses Found
              </Td>
            </Tr>
          ) : (
            courses?.map((course) => (
              <Tr key={course._id} className="border-b border-richblack-700">
                <Td className="px-6 py-4">
                  <div className="flex items-center gap-x-4">
                    <img
                      src={course?.thumbnail}
                      alt={course?.courseName}
                      className="w-[220px] min-w-[220px] h-[148px] rounded-lg object-cover hidden lg:block"
                    />
                    <div className="flex flex-col gap-y-2">
                      <p className="text-lg font-semibold text-richblack-5">
                        {course.courseName}
                      </p>
                      <p className="text-xs text-richblack-300">
                        {course.courseDescription.split(" ").length >
                        TRUNCATE_LENGTH
                          ? course.courseDescription
                              .split(" ")
                              .slice(0, TRUNCATE_LENGTH)
                              .join(" ") + "..."
                          : course.courseDescription}
                      </p>
                      <p className="text-[12px] text-white">
                        Created: {formatDate(course.createdAt)}
                      </p>
                      {course.status === COURSE_STATUS.DRAFT ? (
                        <p className="flex w-fit items-center gap-2 rounded-full bg-richblack-700 px-2 py-1 text-[12px] font-medium text-pink-100">
                          <HiClock size={14} />
                          DRAFT
                        </p>
                      ) : (
                        <p className="flex w-fit items-center gap-2 rounded-full bg-richblack-700 px-2 py-1 text-[12px] font-medium text-yellow-100">
                          <FaCheck size={8} />
                          PUBLISHED
                        </p>
                      )}
                    </div>
                  </div>
                </Td>
                <Td className="px-6 py-4 text-sm font-medium text-richblack-100">
                  {course?.timeDuration}
                </Td>
                <Td className="px-6 py-4 text-sm font-medium text-richblack-100">
                  ₹{course.price}
                </Td>
                <Td className="px-6 py-4 text-sm font-medium text-richblack-100">
                  <button
                    disabled={loading}
                    onClick={() =>
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }
                    title="Edit"
                    className="pr-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All data related to this course will be deleted.",
                        btn1Text: !loading ? "Delete" : "Loading...",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      });
                    }}
                    title="Delete"
                    className="transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}
