const RatingAndReviews = require("../models/RatingAndReviews.model");
const Course = require("../models/Course.model");
const { default: mongoose } = require("mongoose");

exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, rating, review } = req.body;

    const courseDetails = await Course.findOne({
      _id: courseId,
      studentEnrolled: userId,
    });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student Is Not Enrolled In This Course!",
      });
    }

    const alreadyReviewed = await RatingAndReviews.findOne({
      user: userId,
      course: courseId,
    });
    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "Course Is Already Reviewed By The User!",
      });
    }

    const newRatingAndReviews = await RatingAndReviews.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });

    await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          ratingAndReviews: newRatingAndReviews._id,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      ratingAndReviews: newRatingAndReviews,
      message: "Rating-Review Created successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Could Not Create Rating-Review, Please Try Again Later!",
      error: error.message,
    });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const { courseId } = req.body;

    const result = await RatingAndReviews.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Average Rating is 0, No Rating Given Till Now ",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Could Not Get Average Rating, Please Try Again Later!",
      error: error.message,
    });
  }
};

exports.getAllRatings = async (req, res) => {
  try {
    const allReviews = await RatingAndReviews.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        populate: {
          path: "courses",
        },
      })
      .populate("course")
      .exec();

    return res.status(200).json({
      success: true,
      data: allReviews,
      message: "All Ratings-Reviews Fetched Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Could Not Get All rating-Review, Please Try Again Later!",
      error: error.message,
    });
  }
};
