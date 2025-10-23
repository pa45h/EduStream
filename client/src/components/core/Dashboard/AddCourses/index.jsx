import { useDispatch, useSelector } from "react-redux";
import RenderSteps from "./RenderSteps";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserDetails } from "../../../../services/operations/profileAPI.service";
import { setUser } from "../../../../slices/profileSlice";

export default function AddCourse() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user?.approved) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center text-richblack-100">
        <h2 className="text-2xl font-semibold mb-2">Approval Pending ⏳</h2>
        <p className="text-richblack-400 max-w-md mb-4">
          Your instructor profile is under review. Once approved by the admin,
          you’ll be able to create and publish courses here.
        </p>
        <button
          onClick={() => dispatch(getUserDetails(token, navigate))}
          className="px-4 py-2 bg-yellow-50 text-richblack-900 rounded-md font-semibold hover:scale-95 transition-all duration-300"
        >
          🔄 Refresh Status
        </button>
      </div>
    );
  } else {
    return (
      <div className="w-11/12 mx-auto min-h-screen">
        <div className="flex flex-1 flex-col">
          <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            Add Course
          </h1>
          <RenderSteps />
        </div>
      </div>
    );
  }
}
