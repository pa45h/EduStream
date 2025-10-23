const User = require("../models/User.model");
const Course = require("../models/Course.model");
const Category = require("../models/Category.model");
const CourseProgress = require("../models/CourseProgress.model");
const { uploadToCloudinary } = require("../utils/cloudinary.util");
const { findById } = require("../models/OTP.model");
require("dotenv").config();

exports.createCourse = async (req, res) => {
  try {
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      category,
      tag,
      status,
      instructions,
    } = req.body;

    const thumbnail = req.files.thumbnailImage;

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category ||
      !tag ||
      !thumbnail ||
      !instructions
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required!",
      });
    }
    if (!status || status === undefined) {
      status = "Draft";
    }

    if (typeof tag === "string") {
      try {
        tag = JSON.parse(tag);
      } catch (err) {
        tag = [tag];
      }
    }

    if (typeof instructions === "string") {
      try {
        instructions = JSON.parse(instructions);
      } catch (err) {
        instructions = [instructions];
      }
    }

    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);
    console.log("Instructor Details : ", instructorDetails);
    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Not Found!",
      });
    }

    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Not Found!",
      });
    }

    const thumbnailImageUrl = await uploadToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      instructions,
      category: categoryDetails._id,
      tag: tag,
      thumbnail: thumbnailImageUrl.secure_url,
      status: status,
    });

    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    await Category.findByIdAndUpdate(
      { _id: categoryDetails._id },
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Could Not Create Course, Please Try Again Later!",
      error: error.message,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        instructor: true,
        price: true,
        studentEnrolled: true,
        thumbnail: true,
        ratingAndReviews: true,
      }
    )
      .populate("instructor")
      .exec();
    return res.status(200).json({
      success: true,
      data: allCourses,
      message: "Got Courses successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Could Not Fetch All Courses, Please Try Again Later!",
      error: error.message,
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      });

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could Not Find Course By Id - ${courseId}, Please Try Again Later!`,
      });
    }

    return res.status(200).json({
      success: true,
      courseDetails,
      message: "Course details fetched successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Could Not Fetch All Courses, Please Try Again Later!",
      error: error.message,
    });
  }
};

exports.editCourse = async (req, res) => {
  try {
    let {
      courseId,
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      category,
      tag,
      status,
      instructions,
    } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    if (typeof tag === "string") {
      try {
        tag = JSON.parse(tag);
      } catch (err) {
        tag = [tag];
      }
    }
    if (typeof instructions === "string") {
      try {
        instructions = JSON.parse(instructions);
      } catch (err) {
        instructions = [instructions];
      }
    }

    const updates = {};
    if (courseName) updates.courseName = courseName;
    if (courseDescription) updates.courseDescription = courseDescription;
    if (whatYouWillLearn) updates.whatYouWillLearn = whatYouWillLearn;
    if (price) updates.price = price;
    if (tag) updates.tag = tag;
    if (instructions) updates.instructions = instructions;
    if (status) updates.status = status;

    if (category) {
      const categoryDetails = await Category.findById(category);
      if (!categoryDetails) {
        return res.status(404).json({
          success: false,
          message: "Invalid category",
        });
      }
      updates.category = categoryDetails._id;
    }

    if (req.files && req.files.thumbnailImage) {
      const thumbnailImageUrl = await uploadToCloudinary(
        req.files.thumbnailImage,
        process.env.FOLDER_NAME
      );
      updates.thumbnail = thumbnailImageUrl.secure_url;
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: updates },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .populate("category")
      .exec();

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    let totalDurationSeconds = 0;
    updatedCourse.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationSeconds += timeDurationInSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationSeconds);

    updatedCourse.timeDuration = totalDuration;

    await updatedCourse.save();

    return res.status(200).json({
      success: true,
      updatedCourse,
      message: "Course edited successfully!",
    });
  } catch (error) {
    console.log("EditCourse error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not edit course",
      error: error.message,
    });
  }
};

exports.getInstructorCourses = async (req, res) => {
  try {
    const { id } = req.user;

    const instructorDetails = await User.findById(id)
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .populate("additionalDetails")
      .exec();

    return res.status(200).json({
      success: true,
      instructorDetails,
      message: "Instructor Courses Fetched successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Could Not Fetch Courses, Please Try Again Later!",
      error: error.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (course.category) {
      await Category.findByIdAndUpdate(course.category, {
        $pull: { courses: courseId },
      });
    }

    if (course.instructor) {
      await User.findByIdAndUpdate(course.instructor, {
        $pull: { courses: courseId },
      });
    }

    await User.updateMany(
      { courses: courseId },
      { $pull: { courses: courseId } }
    );

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course Deleted successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Could Not Delete Course, Please Try Again Later!",
      error: error.message,
    });
  }
};

function convertSecondsToDuration(totalSeconds) {
  if (!totalSeconds || isNaN(totalSeconds)) return "0m";

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let result = "";
  if (hours > 0) result += `${hours}h `;
  if (minutes > 0) result += `${minutes}m `;
  if (seconds > 0) result += `${Math.floor(seconds)}s`;

  return result.trim();
}

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user?.id;

    console.log(courseId, userId);

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    let courseProgressCount = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    });

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id : ${courseId}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: courseDetails,
      completedVideos: courseProgressCount?.completedVideos || [],
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Could Not Fetch Full Course Details, Please Try Again Later!",
      error: error.message,
    });
  }
};
