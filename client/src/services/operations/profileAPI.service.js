import { toast } from "react-hot-toast";
import { setLoading, setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector.service";
import { adminEndPoints, profileEndpoints } from "../apis.service";
import { logout } from "./authAPI.service";

const {
  GET_USER_DETAILS_API,
  GET_USER_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_DATA_API,
} = profileEndpoints;

const {
  GET_ALL_DATA,
  UPDATE_INSTRUCTOR_APPROVAL,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
} = adminEndPoints;

export const createCategory = async (token, name, description) => {
  const toastId = toast.loading("Creating category...");
  try {
    const res = await apiConnector(
      "POST",
      CREATE_CATEGORY,
      { name, description },
      { Authorization: `Bearer ${token}` }
    );

    if (res.data.success) {
      toast.success(res.data.message);
      return res.data.categoryDetails;
    } else {
      throw new Error(res.data.message);
    }
  } catch (err) {
    console.error("Error creating category:", err);
    toast.error("Could not create category!");
  } finally {
    toast.dismiss(toastId);
  }
};

export const deleteCategory = async (token, categoryId) => {
  const toastId = toast.loading("Deleting category...");
  try {
    const res = await apiConnector(
      "DELETE",
      `${DELETE_CATEGORY}/${categoryId}`,
      null,
      { Authorization: `Bearer ${token}` }
    );

    if (res.data.success) {
      toast.success(res.data.message);
      return true;
    } else {
      throw new Error(res.data.message);
    }
  } catch (err) {
    console.error("Error deleting category:", err);
    toast.error("Could not delete category!");
  } finally {
    toast.dismiss(toastId);
  }
};

export function getAllData(token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("GET", GET_ALL_DATA, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response?.data;
    } catch (error) {
      toast.error("Could Not Get All Data");
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export const updateInstructorApproval = async (
  token,
  instructorId,
  approved
) => {
  try {
    const res = await apiConnector(
      "POST",
      UPDATE_INSTRUCTOR_APPROVAL,
      {
        instructorId,
        approved,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (res.data.success) {
      toast.success(res.data.message);
      return true;
    }
  } catch (err) {
    console.error("Error approving/rejecting instructor:", err);
    toast.error("Something went wrong!");
  }
  return false;
};

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;
      dispatch(setUser({ ...response.data.data, image: userImage }));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...response.data.data, image: userImage })
      );
    } catch (error) {
      dispatch(logout(navigate));
      toast.error("Could Not Get User Details");
    }
    toast.dismiss(toastId);
  };
}

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.data;
  } catch (error) {
    toast.error("Could Not Get Enrolled Courses");
  }
  toast.dismiss(toastId);
  return result;
}

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    });
    result = response?.data?.courses;
  } catch (error) {
    toast.error("Could Not Get Instructor Data");
  }
  toast.dismiss(toastId);
  return result;
}
