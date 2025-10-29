import { toast } from "react-hot-toast";

import { settingsEndpoints } from "../apis.service";
import { apiConnector } from "../apiConnector.service";
import { setUser } from "../../slices/profileSlice";
import { logout } from "./authAPI.service";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Display Picture Updated Successfully");
      dispatch(setUser(response.data.user));
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      toast.error("Could Not Update Display Picture");
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Profile Updated Successfully");
      dispatch(setUser(response.data.updatedProfileDetails));
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.updatedProfileDetails)
      );
    } catch (error) {
      toast.error("Could Not Update Profile");
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export function changePassword(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector(
        "POST",
        CHANGE_PASSWORD_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Password Changed Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Profile Deleted Successfully");
      dispatch(logout(navigate));
    } catch (error) {
      toast.error("Could Not Delete Profile");
    } finally {
      toast.dismiss(toastId);
    }
  };
}
