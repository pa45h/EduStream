import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteProfile } from "../../../../services/operations/settingsAPI.service";
import ConfirmationModal from "../../../common/ConfirmationModal";

const DeleteAccount = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  async function handleDeleteAccount() {
    dispatch(deleteProfile(token, navigate));
  }

  return (
    <>
      <div className="my-10 flex flex-col sm:flex-row gap-y-3 gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-3 sm:p-8 sm:px-12 shadow-[0_0_5px_0_rgb(255,0,100)]">
        <div className="flex aspect-square h-12 sm:h-14 sm:w-14 items-center justify-center rounded-full sm:bg-pink-700">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
          <div className="text-pink-25">
            <p>Would You Like To Delete Account?</p>
            <p className="italic">
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the contain associated with it.
            </p>
          </div>
          <button
            type="button"
            className="w-fit cursor-pointer italic text-pink-300 hover:underline"
            onClick={() =>
              setConfirmationModal({
                text1: "Are You Sure ?",
                text2: "Your Account and Data will be Deleted",
                btn1Text: "Delete",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(handleDeleteAccount),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
          >
            I want to delete my account
          </button>
        </div>
        {confirmationModal && (
          <ConfirmationModal modalData={confirmationModal} />
        )}
      </div>
    </>
  );
};

export default DeleteAccount;
