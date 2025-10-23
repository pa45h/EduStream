const { categories } = require("../../client/src/services/apis.service");
const Category = require("../models/Category.model");
const Course = require("../models/Course.model");
const CourseProgress = require("../models/CourseProgress.model");
const Profile = require("../models/Profile.model");
const User = require("../models/User.model");
const { uploadToCloudinary } = require("../utils/cloudinary.util");

exports.updateProfile = async (req, res) => {
  try {
    const { gender = "", dateOfBirth = "", about = "", contactNo } = req.body;

    const userId = req.user.id;

    const userDetails = await User.findById(userId);
    const profileDetails = await Profile.findOne(userDetails.additionalDetails);

    const updatedProfileDetails = await Profile.findByIdAndUpdate(
      profileDetails._id,
      {
        gender: gender,
        dateOfBirth: dateOfBirth,
        about: about,
        contactNo: contactNo,
      },
      { new: true }
    );

    const updatedUserdetails = await User.findById(userId)
      .populate("additionalDetails")
      .exec();

    return res.status(200).json({
      success: true,
      updatedProfileDetails: updatedUserdetails,
      message: "Profile Updated Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Could Not Update Profile, Please Try Again Later!",
      error: error.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findById(userId);

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User Not Found!",
      });
    }

    await Profile.findByIdAndDelete(userDetails.additionalDetails);

    await Course.updateMany(
      { studentEnrolled: userId },
      {
        $pull: {
          studentEnrolled: userId,
        },
      }
    );

    await Course.deleteMany({ instructor: userId });

    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "Account Deleted Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Could Not Delete Account, Please Try Again Later!",
      error: error.message,
    });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;

    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    return res.status(200).json({
      success: true,
      message: "User Data Fetched Successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    const image = await uploadToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    console.log(image);
    const user = await User.findByIdAndUpdate(
      userId,
      { image: image.secure_url },
      { new: true }
    );
    res.send({
      success: true,
      message: `Image Updated Successfully`,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

function convertSecondsToDuration(totalSeconds) {
  if (!totalSeconds || totalSeconds <= 0) return "0s";

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const parts = [];

  if (hours > 0) parts.push(`${hours}h`);

  if (minutes > 0) parts.push(`${minutes}m`);

  if (seconds > 0) parts.push(`${seconds}s`);

  return parts.join(" ");
}

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();

    userDetails = userDetails.toObject();

    let SubSectionLength = 0;
    for (let i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      SubSectionLength = 0;

      for (let j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration),
          0
        );

        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        );

        SubSectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length;
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseId: userDetails.courses[i]._id,
        userId: userId,
      });

      courseProgressCount = courseProgressCount?.completedVideos.length;

      if (SubSectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100;
      } else {
        const multiplier = Math.pow(10, 2);
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubSectionLength) * 100 * multiplier
          ) / multiplier;
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could Not Find User With Id: ${userDetails}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.fetchInstructorDashboardData = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req?.user?.id });

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course?.studentEnrolled?.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated,
      };
      return courseDataWithStats;
    });
    return res.status(200).json({
      success: true,
      courses: courseData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Could Not fetch instructorDashboard Data!",
    });
  }
};

exports.fetchAllData = async (req, res) => {
  try {
    const allInstructors = await User.find({ accountType: "instructor" })
      .populate("additionalDetails")
      .exec();

    const allStudents = await User.find({ accountType: "student" })
      .populate("additionalDetails")
      .populate("courseProgress")
      .exec();

    const allCourses = await Course.find({})
      .populate("ratingAndReviews")
      .populate("instructor")
      .populate("studentEnrolled")
      .populate("courseContent")
      .populate("category")
      .exec();

    const allCategories = await Category.find({});

    const totalRevenue = allCourses.reduce(
      (sum, course) =>
        sum + course.price * (course.studentEnrolled?.length || 0),
      0
    );

    const pendingApprovals = allInstructors?.filter(
      (inst) => inst.approved === false
    );

    const totalEnrollments = allCourses?.reduce(
      (sum, course) => sum + (course.studentEnrolled?.length || 0),
      0
    );

    return res.status(200).json({
      success: true,
      allInstructors,
      allStudents,
      allCourses,
      totalRevenue,
      pendingApprovals,
      totalEnrollments,
      allCategories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Could Not Get All Instructors!",
    });
  }
};

exports.updateInstructorApproval = async (req, res) => {
  try {
    const { instructorId, approved } = req.body;

    const instructor = await User.findById(instructorId);

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found!",
      });
    }

    instructor.approved = approved;
    instructor.approvalStatus = approved ? "approved" : "rejected";
    await instructor.save();

    return res.status(200).json({
      success: true,
      message: `Instructor ${approved ? "approved" : "rejected"} successfully!`,
      instructor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
