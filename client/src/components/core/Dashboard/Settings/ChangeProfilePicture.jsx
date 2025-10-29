import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiUpload } from "react-icons/fi";

import IconBtn from "../../../common/IconBtn";
import { updateDisplayPicture } from "../../../../services/operations/settingsAPI.service";

const ChangeProfilePicture = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = () => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("displayPicture", imageFile);
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <div className="flex items-center justify-between rounded-md greenBgShadow p-3 sm:p-8 sm:px-12 text-richblack-5">
      <div className="flex items-center gap-x-2 sm:gap-x-4">
        <img
          src={previewSource || user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-16 rounded-full object-cover"
        />
        <div className="space-y-2">
          <p>Change Profile Picture</p>
          <div className="flex gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/jpeg, image/gif"
            />
            <button
              onClick={handleClick}
              disabled={loading}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-3 sm:px-5 text-sm sm:text-lg font-semibold text-richblack-50"
            >
              Select
            </button>
            <IconBtn
              text={loading ? "Uploading..." : "Upload"}
              onClick={handleFileUpload}
              customClasses={"text-sm sm:text-lg"}
            >
              {!loading && <FiUpload className="text-sm sm:text-lg text-richblack-900" />}
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
