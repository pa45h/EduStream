import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  deleteCategory,
  getAllData,
  updateInstructorApproval,
} from "../../../../services/operations/profileAPI.service";
import SummaryCard from "./SummaryCard";
import TableSection from "./TableSection";
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaHourglassHalf,
  FaRupeeSign,
  FaUsers,
} from "react-icons/fa";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [allData, setAllData] = useState({
    students: [],
    instructors: [],
    courses: [],
    totalRevenue: 0,
    pendingApprovals: 0,
    totalEnrollments: 0,
    categories: [],
  });

  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");

  const handleCreateCategory = async () => {
    const newCat = await createCategory(token, categoryName, categoryDesc);
    if (newCat) setCategories((prev) => [...prev, newCat]);
  };

  const handleDeleteCategory = async (id) => {
    const success = await deleteCategory(token, id);
    if (success) setCategories((prev) => prev.filter((c) => c._id !== id));
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await dispatch(getAllData(token));

      if (res) {
        setAllData({
          students: res?.allStudents,
          instructors: res?.allInstructors,
          courses: res?.allCourses,
          totalRevenue: res?.totalRevenue,
          pendingApprovals: res?.pendingApprovals,
          totalEnrollments: res?.totalEnrollments,
          categories: res?.allCategories,
        });
        setCategories(res?.allCategories);
      }

      setLoading(false);
    })();
  }, [dispatch, token]);

  if (loading) {
    return (
      <div className="w-full h-[calc(100vh-3.5rem)] flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-6 bg-richblack-900 text-richblack-25">
      <h1 className="text-3xl font-semibold text-yellow-50 mb-8">
        Admin Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <SummaryCard
          icon={<FaChalkboardTeacher />}
          title="Total Instructors"
          value={allData?.instructors?.length || 0}
        />
        <SummaryCard
          icon={<FaUsers />}
          title="Total Students"
          value={allData?.students?.length || 0}
        />
        <SummaryCard
          icon={<FaBookOpen />}
          title="Total Courses"
          value={allData?.courses?.length || 0}
        />
        <SummaryCard
          icon={<FaRupeeSign />}
          title="Total Revenue"
          value={`₹${allData?.totalRevenue || 0}`}
        />
        <SummaryCard
          icon={<FaHourglassHalf />}
          title="Pending Instructor Approvals"
          value={allData?.pendingApprovals?.length || 0}
        />
        <SummaryCard
          icon={<FaUsersBetweenLines />}
          title="Total Enrollments"
          value={allData?.totalEnrollments}
        />
      </div>

      <div className="flex flex-wrap justify-between gap-2 mt-8">
        <h2 className="text-2xl font-semibold text-yellow-50">
          Manage Categories
        </h2>
        <div className="text-xs flex flex-wrap items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="px-2 py-2 rounded-md text-white bg-richblack-800"
          />
          <input
            type="text"
            placeholder="Category Description"
            value={categoryDesc}
            onChange={(e) => setCategoryDesc(e.target.value)}
            className="px-2 py-2 rounded-md text-white bg-richblack-800"
          />
          <button
            onClick={handleCreateCategory}
            className="px-4 py-1 bg-caribbeangreen-600 text-white rounded-md hover:bg-caribbeangreen-700 transition-all duration-300 w-full sm:w-fit text-sm"
          >
            Add
          </button>
        </div>
      </div>

      <TableSection
        title=""
        headers={["Category", "Description", "Action"]}
        data={categories}
        rowRenderer={(cat) => [
          cat.name,
          cat.description,
          <button
            onClick={() => handleDeleteCategory(cat._id)}
            className="px-3 py-1 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-all duration-300"
          >
            Delete
          </button>,
        ]}
      />

      <TableSection
        title="All Instructors"
        headers={["Profile", "Name", "Email", "Courses", "Status", "Action"]}
        data={allData?.instructors}
        rowRenderer={(inst) => [
          <img
            src={inst.image}
            alt={`${inst.firstName}`}
            className="w-10 h-10 rounded-full object-cover border border-richblack-700"
          />,
          `${inst.firstName} ${inst.lastName}`,
          inst.email,
          inst.courses.length || 0,
          <span
            className={`px-2 py-1 rounded-md text-sm font-medium border ${
              inst.approved
                ? "text-caribbeangreen-400 border-caribbeangreen-800"
                : inst.approvalStatus === "rejected"
                ? "border-pink-800 text-pink-400"
                : "border-yellow-800 text-yellow-400"
            }`}
          >
            {inst.approvalStatus || (inst.approved ? "Approved" : "Pending")}
          </span>,
          <button
            onClick={async () => {
              const newStatus = !inst.approved;
              const success = await updateInstructorApproval(
                token,
                inst._id,
                newStatus
              );
              if (success) {
                setAllData((prev) => ({
                  ...prev,
                  instructors: prev.instructors.map((i) =>
                    i._id === inst._id
                      ? {
                          ...i,
                          approved: newStatus,
                          approvalStatus: newStatus ? "approved" : "rejected",
                        }
                      : i
                  ),
                }));
              }
            }}
            className={`px-3 py-1 rounded-md text-white ${
              inst.approved
                ? "bg-pink-600 hover:bg-pink-700 transition-all duration-300"
                : "bg-caribbeangreen-600 hover:bg-caribbeangreen-700 transition-all duration-300"
            }`}
          >
            {inst.approved ? "Reject" : "Approve"}
          </button>,
        ]}
      />

      {/* Students Table */}
      <TableSection
        title="All Students"
        headers={["Profile", "Name", "Email", "Enrolled Courses"]}
        data={allData?.students}
        rowRenderer={(stu) => [
          <img
            src={stu.image}
            alt={`${stu.firstName}`}
            className="w-10 h-10 rounded-full object-cover border border-richblack-700"
          />,
          `${stu.firstName} ${stu.lastName}`,
          stu.email,
          stu.courses?.length || 0,
        ]}
      />

      {/* Courses Table */}
      <TableSection
        title="All Courses"
        headers={["Thumbnail", "Title", "Instructor", "Category", "Price"]}
        data={allData?.courses}
        rowRenderer={(course) => [
          <img
            src={course.thumbnail}
            alt={course.courseName}
            className="w-16 h-10 object-cover rounded-md border border-richblack-700"
          />,
          course.courseName,
          `${course?.instructor?.firstName} ${course?.instructor?.lastName}`,
          course.category?.name || "N/A",
          `₹${course.price}`,
        ]}
      />
    </div>
  );
};

export default AdminDashboard;
