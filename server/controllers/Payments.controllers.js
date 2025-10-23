const { instance } = require("../config/razorpay.config");
const Course = require("../models/Course.model");
const User = require("../models/User.model");
const mailSender = require("../utils/mailSender.util");
const { courseEnrollment } = require("../mail/courseEnrollment.mail");
const { default: mongoose } = require("mongoose");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress.model");

exports.capturePayment = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;
  console.log("courses--", courses);

  if (courses.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please Provide Course Id!",
    });
  }

  let totalAmount = 0;

  for (const course_id of courses) {
    let course;
    try {
      course = await Course.findById(course_id);
      if (!course) {
        return res.status(500).json({
          success: false,
          message: "Could Not Find Course!",
        });
      }

      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentEnrolled.includes(uid)) {
        return res.status(500).json({
          success: false,
          message: "Student Already Enrolled!",
        });
      }

      totalAmount += course.price;

      console.log("totalAmount---", totalAmount);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  const options = {
    amount: totalAmount * 100,
    currency: "INR",
  };

  try {
    const paymentResponse = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      message: paymentResponse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Could not initiate Patment!",
    });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courses ||
      !userId
    ) {
      return res.status(500).json({
        success: false,
        message: "Payment Verification Details Missing!",
      });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      await enrollStudents(courses, userId, res);

      return res.status(200).json({
        success: true,
        message: "Payment Verified!",
      });
    } else {
      return res.status(500).json({
        success: true,
        message: "Payment Failed!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Could not Verify Patment!",
    });
  }
};

enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please provide proper data for courses and userId!",
    });
  }

  try {
    for (const course_id of courses) {
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: course_id },
        { $push: { studentEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "Course Not Found!",
        });
      }

      const courseProgress = await CourseProgress.create({
        courseId: course_id,
        userId: userId,
        completedVideos: [],
      });

      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: course_id,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      );

      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollment(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName}`
        )
      );
      console.log("emailResponse---", emailResponse);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Could not Enroll Student!",
    });
  }
};

exports.sendEmailSuccessEmail = async (req, res) => {
  try {
    const { orderId, paymentId, amount } = req.body;

    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
      return res.status(400).json({
        success: false,
        message: "Please provide proper data!",
      });
    }

    const enrolledStudent = await User.findById(userId);

    const emailResponse = await mailSender(
      enrolledStudent.email,
      "Payment Recieved!",
      courseEnrollment(orderId, enrolledStudent.firstName)
    );
    console.log("emailResponse---", emailResponse);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Could not Send Success Email to Student!",
    });
  }
};