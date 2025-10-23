import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../../services/operations/authAPI.service";
import { useNavigate } from "react-router-dom";

function Template({
  title,
  description1,
  description2,
  image,
  formType,
  isGoogleLoginBtn = true,
}) {
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleSuccess = async (googleResponse) => {
    if (googleResponse) {
      const idToken = googleResponse.credential;
      dispatch(googleLogin(idToken, navigate));
    }
  };

  const handleGoogleError = (googleResponse) => {
    console.error("googleResponse---", googleResponse);
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-richblack-100">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                {description2}
              </span>
            </p>

            {formType === "signup" ? (
              <SignupForm />
            ) : (
              <LoginForm isGoogleLoginBtn={isGoogleLoginBtn} />
            )}

            {isGoogleLoginBtn && (
              <>
                <div className="flex w-full items-center my-4 gap-x-2">
                  <div className="w-full h-[1px] bg-richblack-700"></div>
                  <p className="text-richblack-700 font-medium leading[1.375rem]">
                    OR
                  </p>
                  <div className="w-full h-[1px] bg-richblack-700"></div>
                </div>
                <div className="w-full mx-auto transition-all duration-200 hover:scale-95">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    shape="pill"
                    theme="outline"
                    size="large"
                    width="100%"
                  />
                </div>
              </>
            )}
          </div>

          <div className="relative mx-auto my-auto w-11/12 max-w-[450px] md:mx-0">
            <img
              src={image}
              width={450}
              loading="lazy"
              className="rounded-3xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Template;
