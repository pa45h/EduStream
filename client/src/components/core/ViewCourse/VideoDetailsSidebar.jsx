import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { convertSecondsToDuration } from "../../../utils/timeFormatter";

import IconBtn from "../../common/IconBtn";
import {
  markLectureAsComplete,
  getCourseProgress,
} from "../../../services/operations/courseDetailsAPI.service";
import {
  setCompletedLectures,
  updateCompletedLectures,
} from "../../../slices/viewCourseSlice";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

export default function VideoDetailsSidebar({ setReviewModal }) {
  const { token } = useSelector((state) => state.auth);
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { courseId, sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);
  const [sidebar, setSidebar] = useState(false);

  const fetchProgress = async () => {
    if (!courseId || !token) return;
    const response = await getCourseProgress(courseId, token);
    dispatch(setCompletedLectures(response));
  };

  useEffect(() => {
    (() => {
      fetchProgress();
      if (!courseSectionData) return;
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId);
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id;
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id);
      setVideoBarActive(activeSubSectionId);
      setSidebar(false);
    })();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const handleLectureCompletion = async () => {
    const res = await markLectureAsComplete(
      { courseId: courseEntireData._id, subSectionId: subSectionId },
      token
    );
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
  };

  return (
    <>
      <button
        className="absolute top-2 left-1 text-5xl z-[510] greenBgShadow hover:scale-95 transition-all duration-300"
        onClick={() => setSidebar((prev) => !prev)}
      >
        <div className="transition-transform duration-300">
          {sidebar ? <IoClose /> : <BiMenuAltLeft />}
        </div>
      </button>

      <div
        className={`fixed top-14 left-0 z-[500] h-[calc(100vh-3rem)] w-[344px] max-w-[350px] 
                    flex-col greenBgShadow bg-richblack-800
                    transform transition-all duration-300 ease-in-out
                    ${
                      sidebar
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-[110%] opacity-0"
                    }`}
      >
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className="flex w-full items-center justify-between ">
            <IconBtn
              text="Add Review"
              customClasses="ml-auto"
              onClick={() => setReviewModal(true)}
            />
          </div>
          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData?.map((section, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              onClick={() => setActiveStatus(section?._id)}
              key={index}
            >
              {/* Section */}
              <div className="flex flex-row justify-between bg-richblack-700 px-5 py-4 transition-all duration-500">
                <div className="w-[70%] font-semibold">
                  {section?.sectionName}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-medium">
                    Lession {section?.subSection.length}
                  </span>
                  <span>
                    <BsChevronDown
                      className={`${
                        activeStatus === section?._id
                          ? "rotate-180"
                          : "rotate-0"
                      } transition-all duration-500`}
                    />
                  </span>
                </div>
              </div>

              {/* Sub Sections */}
              {activeStatus === section?._id && (
                <div className="transition-all duration-500">
                  {section.subSection.map((topic, i) => (
                    <div
                      className={`flex gap-3  px-5 py-2 ${
                        videoBarActive === topic._id
                          ? "bg-yellow-200 font-semibold text-richblack-800"
                          : "hover:bg-richblack-900"
                      } `}
                      key={i}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                        );
                        setVideoBarActive(topic?._id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures?.includes(topic?._id)}
                        onChange={handleLectureCompletion}
                      />
                      <div className="w-full flex items-center justify-between">
                        <span>{topic.title}</span>
                        <span>
                          {convertSecondsToDuration(topic.timeDuration)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
