const CourseProgress = require("../models/CourseProgress.model");
const SubSectionModel = require("../models/SubSection.model");
const User = require("../models/User.model");

exports.getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req?.body;
    const userId = req?.user?.id;

    const courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    }).populate("completedVideos");

    if (!courseProgress) {
      return res.status(404).json({
        success: false,
        message: "Course Progress Not Found!",
      });
    }

    res.status(200).json({
      success: true,
      completedVideos: courseProgress.completedVideos.map((v) => v._id),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCourseProgress = async (req, res) => {
  try {
    const { courseId, subSectionId } = req.body;
    const userId = req?.user?.id;

    const subSection = await SubSectionModel.findById(subSectionId);

    if (!subSection) {
      return res.status(400).json({
        success: false,
        message: "Invalid subSection!",
      });
    }

    let courseProgress = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    });

    console.log("courseProgress---", courseProgress);

    if (!courseProgress) {
      return res.status(404).json({
        success: false,
        message: "Course Progress Not Found 28!",
      });
    } else {
      if (courseProgress.completedVideos.includes(subSectionId)) {
        return res.status(400).json({
          success: false,
          message: "Sub Section Already Completed!",
        });
      }
      courseProgress.completedVideos.push(subSectionId);
    }
    await courseProgress.save();

    return res.status(200).json({
      success: true,
      message: "Course Progress Updated Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Could Not Update Course Progress, Please Try Again Later!",
      error: error.message,
    });
  }
};
